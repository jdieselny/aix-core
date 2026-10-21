import type { Metadata } from "next"
import { BadassHudView } from "../../components/BadassHudView.js"
import { BadassProjectionHud } from "../../components/BadassProjectionHud.js"
import { SubstrateDrybackTelemetryCard } from "../../components/SubstrateDrybackTelemetryCard.js"

export const metadata: Metadata = {
  title: "B.A.D.-A.S.S. System · Big Ass Display Automated Selective Showcase | A:iX Core",
  description:
    "Ultra-wide commercial cultivation wall projection HUD. Dynamic optical attenuation, live multi-reservoir dry-salt wait timers, Daily Light Integral (DLI) curves, and root-zone dryback tracking.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function BadassPage() {
  return (
    <div style={{ background: "#0A0B0F", display: "grid", gap: "1.25rem" }}>
      <BadassProjectionHud />
      <SubstrateDrybackTelemetryCard />
      <BadassHudView />
    </div>
  )
}
