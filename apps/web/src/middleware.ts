import type { NextRequest } from "next/server.js"
import { NextResponse } from "next/server.js"

/** Sliding window for checkout posts. Default 15 requests per minute per IP. */
export const CHECKOUT_LIMIT_PER_MINUTE = 15
export const CHECKOUT_WINDOW_MS = 60_000

const CHECKOUT_HITS = new Map<string, number[]>()

export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
}

export interface EdgeSecurityDecision {
  allowed: boolean
  status: number
  headers: Record<string, string>
  reason: "OK" | "CHECKOUT_RATE_LIMIT" | "CHECKOUT_BOT"
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get("x-real-ip")
  if (realIp) return realIp.trim()
  return "unknown"
}

function checkoutAllowed(ip: string, now: number): boolean {
  const recent = (CHECKOUT_HITS.get(ip) ?? []).filter((ts) => now - ts < CHECKOUT_WINDOW_MS)
  if (recent.length >= CHECKOUT_LIMIT_PER_MINUTE) {
    CHECKOUT_HITS.set(ip, recent)
    return false
  }
  recent.push(now)
  CHECKOUT_HITS.set(ip, recent)
  return true
}

export function resetCheckoutWindows(): void {
  CHECKOUT_HITS.clear()
}

export function evaluateEdgeSecurity(req: NextRequest, nowMs = Date.now()): EdgeSecurityDecision {
  const path = req.nextUrl.pathname
  const headers = { ...SECURITY_HEADERS }
  if (path === "/api/checkout" || path.startsWith("/api/checkout/")) {
    const agent = req.headers.get("user-agent") ?? ""
    if (/\b(bot|crawler|spider|scrapy)\b/i.test(agent)) {
      return { allowed: false, status: 403, headers, reason: "CHECKOUT_BOT" }
    }
    if (!checkoutAllowed(clientIp(req), nowMs)) {
      return { allowed: false, status: 429, headers, reason: "CHECKOUT_RATE_LIMIT" }
    }
  }
  return { allowed: true, status: 200, headers, reason: "OK" }
}

export function middleware(req: NextRequest) {
  const decision = evaluateEdgeSecurity(req)
  if (!decision.allowed) {
    return new NextResponse(decision.reason, { status: decision.status, headers: decision.headers })
  }
  const response = NextResponse.next()
  for (const [name, value] of Object.entries(decision.headers)) {
    response.headers.set(name, value)
  }
  return response
}

export const config = {
  matcher: ["/api/checkout/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
