import type { Metadata } from "next"
import React from "react"
import { OpenSourceHubView } from "../../components/OpenSourceHubView.js"

export const metadata: Metadata = {
  title: "Open Source Hub · Right to Repair | A:iX Core",
  description:
    "Local-first protocols: aig-esp32-par-pod, govee-ble-reverse, cisco-tzsp-radar, ep-receipt-jcs, esphome, rtl_433, tuya-local, and the $297 DIY BOM.",
}

export default function OpenSourcePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      <a href="/" style={{ color: "#FF334B", fontWeight: 700, textDecoration: "none" }}>
        ← BACK TO A:iX CORE APEX
      </a>
      <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", margin: "1rem 0", color: "#34D399" }}>
        Open-source hub
      </h1>
      <OpenSourceHubView />
    </main>
  )
}
