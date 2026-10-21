/** Sister-site attribution. First-party storage only. No third-party cookies. */

export const REFERRAL_STORAGE_KEY = "aix.referral"
export const REFERRAL_DISMISS_KEY = "aix.referral.dismissed"

export const CULTIVATOR_BANNER =
  "[ J DIESEL NY CULTIVATOR PASS DETECTED // FREE 3-PACK SEED VOUCHER INCLUDED WITH A:iG APPLIANCE ]"

export const CULTIVATOR_BADGE = "[ PROMO ACTIVE: OP2026 ]"

export interface ReferralData {
  source: string
  code: string
  timestamp: number
  discountEligible: boolean
}

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface CartLine {
  id: string
  quantity: number
}

export interface AttributedCart {
  items: CartLine[]
  referral: ReferralData | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function referralFromUnknown(value: unknown): ReferralData | null {
  if (!isRecord(value)) return null
  if (typeof value.source !== "string" || value.source.length < 1 || value.source.length > 80) return null
  if (typeof value.code !== "string" || value.code.length < 1 || value.code.length > 40) return null
  if (typeof value.timestamp !== "number" || !Number.isFinite(value.timestamp)) return null
  if (typeof value.discountEligible !== "boolean") return null
  return {
    source: value.source,
    code: value.code,
    timestamp: value.timestamp,
    discountEligible: value.discountEligible,
  }
}

export function parseReferralSearch(search: string, now = Date.now()): ReferralData | null {
  const query = search.startsWith("?") ? search.slice(1) : search
  const params = new URLSearchParams(query)
  const ref = (params.get("ref") ?? "").trim()
  const promo = (params.get("promo") ?? "").trim()
  const utm = (params.get("utm_source") ?? "").trim()
  const refOk = /^(jdieselny|seeds)$/i.test(ref)
  const promoOk = /^op2026$/i.test(promo)
  const utmOk = /^(jdieselny\.com|jdieselny)$/i.test(utm)
  if (!refOk && !promoOk && !utmOk) return null
  return {
    source: utm || ref || "jdieselny.com",
    code: promo || ref || "jdieselny",
    timestamp: now,
    discountEligible: true,
  }
}

export function readReferralRaw(raw: string | null | undefined): ReferralData | null {
  if (!raw) return null
  try {
    return referralFromUnknown(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function resolveReferral(input: {
  search?: string
  sessionRaw?: string | null
  localRaw?: string | null
  now?: number
}): ReferralData | null {
  const fromSearch = parseReferralSearch(input.search ?? "", input.now ?? Date.now())
  if (fromSearch) return fromSearch
  return readReferralRaw(input.sessionRaw) ?? readReferralRaw(input.localRaw)
}

export function writeReferral(referral: ReferralData, session: StorageLike, local: StorageLike): void {
  const raw = JSON.stringify(referral)
  session.setItem(REFERRAL_STORAGE_KEY, raw)
  local.setItem(REFERRAL_STORAGE_KEY, raw)
}

export function markDismissed(session: StorageLike): void {
  session.setItem(REFERRAL_DISMISS_KEY, "1")
}

export function isDismissed(session: Pick<StorageLike, "getItem"> | null): boolean {
  return session?.getItem(REFERRAL_DISMISS_KEY) === "1"
}

export function attachReferral(items: readonly CartLine[], referral: ReferralData | null): AttributedCart {
  return {
    items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
    referral,
  }
}
