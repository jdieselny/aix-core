import { createHmac } from "node:crypto"
import { attachReferral, referralFromUnknown, type ReferralData } from "./referral_tracker.js"

export const CHECKOUT_CATALOG = {
  "aig-appliance": { name: "Turnkey A:iG Appliance", cents: 49900 },
  "sniffer-pod": { name: "Sniffer Pod", cents: 8900 },
  "chernobyl-switch": { name: "Chernobyl Switch", cents: 4900 },
  "op2026-bundle": { name: "OP2026 Cultivator Bundle", cents: 59900 },
} as const

export type CheckoutSku = keyof typeof CHECKOUT_CATALOG

const OFFLINE_SIGNING_KEY = "aix-offline-checkout-v1"

export interface CheckoutItem {
  id: CheckoutSku
  quantity: number
}

export interface CheckoutCommand {
  items: CheckoutItem[]
  referral: ReferralData | null
  successUrl: string
  cancelUrl: string
}

export interface CheckoutResult {
  status: number
  body: Record<string, unknown>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isSku(value: string): value is CheckoutSku {
  return Object.prototype.hasOwnProperty.call(CHECKOUT_CATALOG, value)
}

function allowedReturnUrl(value: string): boolean {
  try {
    const url = new URL(value.replaceAll("{CHECKOUT_SESSION_ID}", "SESSION"))
    if (url.protocol === "https:" && url.hostname === "aix-core.com") return true
    if (url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) return true
    return false
  } catch {
    return false
  }
}

export function parseCommand(body: unknown): CheckoutCommand | { error: string } {
  if (!isRecord(body)) return { error: "invalid payload" }
  if (!Array.isArray(body.items) || body.items.length === 0) return { error: "empty cart" }
  const seen = new Set<string>()
  const items: CheckoutItem[] = []
  for (const entry of body.items) {
    if (!isRecord(entry) || typeof entry.id !== "string" || !isSku(entry.id)) return { error: "invalid product" }
    if (seen.has(entry.id)) return { error: "duplicate product" }
    seen.add(entry.id)
    if (typeof entry.quantity !== "number" || !Number.isInteger(entry.quantity) || entry.quantity < 1 || entry.quantity > 99) {
      return { error: "invalid quantity" }
    }
    items.push({ id: entry.id, quantity: entry.quantity })
  }
  const referral = body.referral == null ? null : referralFromUnknown(body.referral)
  if (body.referral != null && referral == null) return { error: "invalid referral" }
  const successUrl = typeof body.successUrl === "string" ? body.successUrl : "https://aix-core.com/checkout/success?session_id={CHECKOUT_SESSION_ID}"
  const cancelUrl = typeof body.cancelUrl === "string" ? body.cancelUrl : "https://aix-core.com/"
  if (!allowedReturnUrl(successUrl) || !allowedReturnUrl(cancelUrl)) return { error: "invalid return url" }
  return { items, referral, successUrl, cancelUrl }
}

export function signOfflineOrder(payload: string): string {
  return createHmac("sha256", OFFLINE_SIGNING_KEY).update(payload).digest("hex")
}

export function mockOrderId(payload: string): string {
  return `ORD-${signOfflineOrder(payload).slice(0, 5).toUpperCase()}`
}

export function totalCents(items: readonly CheckoutItem[]): number {
  return items.reduce((sum, item) => sum + CHECKOUT_CATALOG[item.id].cents * item.quantity, 0)
}

export function canonicalPayload(command: CheckoutCommand): string {
  const lines = command.items.map((item) => `${item.id}:${item.quantity}`).join(",")
  return `${lines}|${command.referral?.code ?? ""}|${command.referral?.source ?? ""}`
}

export async function stripeSession(command: CheckoutCommand, stripeKey: string, fetchImpl: typeof fetch): Promise<CheckoutResult> {
  const fields: Array<[string, string]> = [
    ["mode", "payment"],
    ["success_url", command.successUrl],
    ["cancel_url", command.cancelUrl],
  ]
  command.items.forEach((item, index) => {
    const product = CHECKOUT_CATALOG[item.id]
    fields.push(
      [`line_items[${index}][quantity]`, String(item.quantity)],
      [`line_items[${index}][price_data][currency]`, "usd"],
      [`line_items[${index}][price_data][unit_amount]`, String(product.cents)],
      [`line_items[${index}][price_data][product_data][name]`, product.name],
    )
  })
  if (command.referral) {
    fields.push(
      ["metadata[referral_source]", command.referral.source],
      ["metadata[referral_code]", command.referral.code],
    )
  }
  const form = fields
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replaceAll("%7BCHECKOUT_SESSION_ID%7D", "{CHECKOUT_SESSION_ID}")}`)
    .join("&")
  let response: Response
  try {
    response = await fetchImpl("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    })
  } catch {
    return { status: 502, body: { success: false, error: "stripe unreachable" } }
  }
  if (!response.ok) return { status: 502, body: { success: false, error: "stripe rejected the session" } }
  const payload = (await response.json()) as { id?: unknown; url?: unknown }
  if (typeof payload.id !== "string" || typeof payload.url !== "string") {
    return { status: 502, body: { success: false, error: "stripe response incomplete" } }
  }
  return {
    status: 200,
    body: {
      success: true,
      url: payload.url,
      sessionId: payload.id,
      mode: "stripe",
      referral: command.referral,
    },
  }
}

export async function createCheckout(
  body: unknown,
  env: { stripeKey?: string; fetchImpl?: typeof fetch } = {},
): Promise<CheckoutResult> {
  const command = parseCommand(body)
  if ("error" in command) return { status: 400, body: { success: false, error: command.error } }
  const cart = attachReferral(command.items, command.referral)
  const key = env.stripeKey?.trim()
  if (key) return stripeSession(command, key, env.fetchImpl ?? fetch)
  const signed = canonicalPayload(command)
  const orderId = mockOrderId(signed)
  return {
    status: 200,
    body: {
      success: true,
      url: `/checkout/mock?order=${orderId}`,
      orderId,
      mode: "mock",
      total: totalCents(command.items) / 100,
      currency: "usd",
      signature: signOfflineOrder(signed),
      items: cart.items,
      referral: cart.referral,
    },
  }
}
