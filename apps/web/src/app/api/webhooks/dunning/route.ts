const EVENTS = [
  "invoice.payment_failed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
] as const

interface DunningBand {
  entitlementMode: "ACTIVE" | "GRACE_PERIOD_14D" | "RESTRICTED_LOCAL_ONLY"
  graceDaysRemaining: number
  cloudRelayEnabled: boolean
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function bandFor(daysPastDue: number): DunningBand {
  if (daysPastDue <= 0) {
    return { entitlementMode: "ACTIVE", graceDaysRemaining: 14, cloudRelayEnabled: true }
  }
  if (daysPastDue <= 14) {
    return {
      entitlementMode: "GRACE_PERIOD_14D",
      graceDaysRemaining: 14 - daysPastDue,
      cloudRelayEnabled: true,
    }
  }
  return {
    entitlementMode: "RESTRICTED_LOCAL_ONLY",
    graceDaysRemaining: 0,
    cloudRelayEnabled: false,
  }
}

function safetyBody(band: DunningBand, ok: boolean) {
  return {
    ok,
    policy: "NEVER_KILL_A_CROP_V1",
    entitlementMode: band.entitlementMode,
    graceDaysRemaining: band.graceDaysRemaining,
    localActuationEnabled: true,
    localSafetyLoopsEnabled: true,
    cloudRelayEnabled: band.cloudRelayEnabled,
  }
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json(safetyBody(bandFor(0), false), { status: 400 })
  }
  if (!isRecord(payload)) {
    return Response.json(safetyBody(bandFor(0), false), { status: 400 })
  }
  const eventType = payload.eventType
  const customerId = payload.customerId
  const daysPastDue = payload.daysPastDue
  const known = typeof eventType === "string" && (EVENTS as readonly string[]).includes(eventType)
  if (!known || typeof customerId !== "string" || customerId.length === 0) {
    return Response.json(safetyBody(bandFor(0), false), { status: 400 })
  }
  if (typeof daysPastDue !== "number" || !Number.isInteger(daysPastDue)) {
    return Response.json(safetyBody(bandFor(0), false), { status: 400 })
  }
  const band = bandFor(daysPastDue)
  return Response.json(safetyBody(band, true))
}
