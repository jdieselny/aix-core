import React from "react"

export const CAMPAIGN_IDS = ["microgrowery", "homelab", "commercial-9-lighter"] as const

export type CampaignId = (typeof CAMPAIGN_IDS)[number]

export interface CampaignCopy {
  id: CampaignId
  kicker: string
  title: string
  lede: string
  points: readonly string[]
}

export const CAMPAIGNS: Record<CampaignId, CampaignCopy> = {
  microgrowery: {
    id: "microgrowery",
    kicker: "r/microgrowery",
    title: "Never Kill a Crop",
    lede:
      "A 650 PPFD closed-loop PAR pod holds the canopy while the room drops offline. $297 DIY versus $499 Turnkey. Same bill of materials, published in the open.",
    points: [
      "Never Kill a Crop stays true past a missed invoice. Local actuation does not go dark.",
      "650 PPFD closed-loop PAR pod on the ESP32-WROOM backpack.",
      "$297 DIY and $499 Turnkey are both on the page. No hidden street price.",
    ],
  },
  homelab: {
    id: "homelab",
    kicker: "r/homelab · r/selfhosted",
    title: "Dual 2.5GbE. Zero cloud telemetry.",
    lede:
      "The homestead node ships with Dual 2.5GbE, zero cloud telemetry, and Ed25519 JCS receipts on every physical actuation. Presence is Cisco CleanAir fused with ESP32 CSI.",
    points: [
      "Dual 2.5GbE on the appliance. The WAN is optional.",
      "Ed25519 signatures over JCS canonical JSON. Receipts verify offline.",
      "Cisco CleanAir and ESP32 CSI radar. No vendor cloud console.",
    ],
  },
  "commercial-9-lighter": {
    id: "commercial-9-lighter",
    kicker: "Instagram · Search",
    title: "Marty's 9-Lighter",
    lede:
      "Marty's 9-Lighter is a 6,030W testbed. Coco dryback protection holds the root zone, and the 150\" B.A.D.-A.S.S. projection HUD is the room clock.",
    points: [
      "6,030W across the 9-lighter canopy.",
      "Coco dryback curve stays above the overdry floor.",
      "150\" B.A.D.-A.S.S. HUD for the mixing timers and the dimmer rows.",
    ],
  },
}

export function isCampaignId(value: string): value is CampaignId {
  return (CAMPAIGN_IDS as readonly string[]).includes(value)
}

export function CampaignLandingView({ campaign }: { campaign: CampaignId }) {
  const copy = CAMPAIGNS[campaign]
  return (
    <article data-campaign={copy.id} style={{ display: "grid", gap: "1rem" }}>
      <p style={{ color: "#FF334B", fontWeight: 700, margin: 0 }}>{copy.kicker}</p>
      <h1 style={{ color: "#34D399", margin: 0 }}>{copy.title}</h1>
      <p style={{ margin: 0, fontSize: "1.15rem" }}>{copy.lede}</p>
      <ul>
        {copy.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <a href="/hardware/core" style={{ color: "#34D399", fontWeight: 700 }}>
        [ View the Turnkey A:iG Appliance ]
      </a>
    </article>
  )
}
