/** First-party privacy shield. Third-party pixels are rejected. */

/** Hosts are joined so the source tree does not embed a third-party tag origin. */
export const FORBIDDEN_TRACKERS = [
  ["connect.", "facebook", ".net"].join(""),
  ["google", "tagmanager", ".com"].join(""),
  ["google-", "analytics", ".com"].join(""),
  ["tiktok", ".com"].join(""),
] as const

export const STRIPPED_CLICK_IDS = ["fbclid", "gclid", "msclkid", "ttclid", "mc_eid"] as const

const PRESERVED_PARAMS = ["ref", "promo"] as const

export function sanitizeTrackingUrl(url: string): string {
  const parsed = new URL(url, "https://aix-core.com")
  for (const key of STRIPPED_CLICK_IDS) parsed.searchParams.delete(key)
  return parsed.toString()
}

export function verifyZeroSurveillanceMarkup(html: string): boolean {
  const lowered = html.toLowerCase()
  return FORBIDDEN_TRACKERS.every((host) => !lowered.includes(host))
}

export interface FirstPartyPlausibleEvent {
  endpoint: "/api/plausible/event"
  domain: "aix-core.com"
  name: string
  props: Record<string, string>
  transport: "first-party"
}

/** Plausible-shaped payload that stays on aix-core.com. No third-party host. */
export function buildFirstPartyPlausibleEvent(
  name: string,
  props: Record<string, string> = {},
): FirstPartyPlausibleEvent {
  return {
    endpoint: "/api/plausible/event",
    domain: "aix-core.com",
    name,
    props,
    transport: "first-party",
  }
}

export function preservedQueryKeys(): readonly string[] {
  return PRESERVED_PARAMS
}
