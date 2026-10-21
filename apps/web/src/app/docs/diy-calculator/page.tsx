import type { Metadata } from "next"
import { DiyBomCalculator } from "../../../components/DiyBomCalculator.js"

export const metadata: Metadata = {
  title: "Open-Source DIY Bill of Materials ($297) | A:iX Core",
  description:
    "Build the A:iG controller yourself for $297 in parts. Complete component breakdown with Intel N100 mini-PC, Sensirion SHT45/SCD41 sensors, and ESP32-WROOM coprocessors.",
}

export default function DiyCalculatorPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", "Inter", sans-serif',
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <a
          href="/"
          style={{
            color: "#FF334B",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
          }}
        >
          ← BACK TO A:iX CORE APEX
        </a>
      </div>

      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(52, 211, 153, 0.15)",
            color: "#34D399",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            borderRadius: 6,
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          SOVEREIGN OPEN HARDWARE · TRANSPARENT BOM
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Open-Source DIY Bill of Materials
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            color: "#9AA3B5",
            maxWidth: 720,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Every single component in the A:iG ecosystem is published under the open MIT / Sovereign A:iX
          License. Build it yourself for $297 with off-the-shelf commercial components, or buy the pre-burned
          Turnkey A:iG Appliance for $499.
        </p>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <DiyBomCalculator />
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "#9AA3B5",
        }}
      >
        <div>
          Prefer plug-and-play reliability?{" "}
          <a href="/#storefront" style={{ color: "#34D399", fontWeight: 700 }}>
            Order the Turnkey A:iG Appliance ($499) →
          </a>
        </div>
        <div>
          <a href="/docs/datasheet" style={{ color: "#FF334B", textDecoration: "none" }}>
            View Full Technical Datasheet →
          </a>
        </div>
      </footer>
    </main>
  )
}
