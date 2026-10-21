import type { Metadata } from "next"
import React from "react"
import { notFound } from "next/navigation.js"
import {
  CAMPAIGNS,
  CampaignLandingView,
  isCampaignId,
  type CampaignId,
} from "../../../components/CampaignLandingView.js"

export function generateStaticParams() {
  return (Object.keys(CAMPAIGNS) as CampaignId[]).map((campaign) => ({ campaign }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campaign: string }>
}): Promise<Metadata> {
  const { campaign } = await params
  if (!isCampaignId(campaign)) return { title: "A:iX Core" }
  const copy = CAMPAIGNS[campaign]
  return { title: `${copy.title} | A:iX Core`, description: copy.lede }
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ campaign: string }>
}) {
  const { campaign } = await params
  if (!isCampaignId(campaign)) notFound()
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <a href="/" style={{ color: "#FF334B", fontWeight: 700, textDecoration: "none" }}>
        ← BACK TO A:iX CORE APEX
      </a>
      <CampaignLandingView campaign={campaign} />
    </main>
  )
}
