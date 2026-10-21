import type { Metadata } from "next"
import { BadassProjectionHud } from "../../components/BadassProjectionHud.js"
import { CompetitorMatrix } from "../../components/CompetitorMatrix.js"
import { SubstrateDrybackTelemetryCard } from "../../components/SubstrateDrybackTelemetryCard.js"

export const metadata: Metadata = {
  title: "Commercial Cultivation Controller Matrix · A:iG vs TrolMaster vs Growlink | A:iX Core",
  description:
    "Direct engineering comparison between the Turnkey A:iG Appliance ($499), TrolMaster Hydro-X ($1,800+), Growlink ($2,500+), and Priva enterprise PLCs. Zero monthly cloud tax.",
}

export default function ComparePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", "Inter", sans-serif',
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 1100,
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

      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(255, 51, 75, 0.15)",
            color: "#FF334B",
            border: "1px solid rgba(255, 51, 75, 0.3)",
            borderRadius: 6,
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          COMPETITIVE ARCHITECTURE AUDIT
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Commercial Controller Comparison
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            color: "#9AA3B5",
            maxWidth: 750,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Why commercial cultivators are replacing cloud-tethered controllers with sovereign, air-gapped
          edge appliances with 100% local NVMe telemetry and zero recurring cloud subscriptions.
        </p>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <CompetitorMatrix />
      </section>

      <section style={{ display: "grid", gap: "1.25rem", marginBottom: "3rem" }}>
        <BadassProjectionHud />
        <SubstrateDrybackTelemetryCard />
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
          Ready to deploy sovereign hardware?{" "}
          <a href="/#storefront" style={{ color: "#34D399", fontWeight: 700 }}>
            Order the Turnkey A:iG Appliance ($499) →
          </a>
        </div>
        <div>
          <a href="/badass" style={{ color: "#FF334B", textDecoration: "none" }}>
            Explore the B.A.D.-A.S.S. Wall Projection HUD →
          </a>
        </div>
      </footer>
    </main>
  )
}
