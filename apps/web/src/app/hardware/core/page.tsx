import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Turnkey A:iG Appliance ($499) · Industrial Cultivation Controller | A:iX Core",
  description:
    "The Turnkey A:iG Appliance is an industrial fanless cultivation controller with dual 2.5GbE Intel NICs, 1TB NVMe datalake, ESP32-WROOM microwave CSI presence radar, and the 423 Hardware Dark-Lock Law.",
}

export default function HardwareCorePage() {
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
          HARDWARE CATALOG · SKU: AIG-APP-499
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
            fontWeight: 800,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Turnkey A:iG Appliance
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
            color: "#9AA3B5",
            maxWidth: 780,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Industrial autonomous cultivation controller with physical air-gapped sensor subnets,
          local 1TB NVMe datalake, ESP32-WROOM microwave CSI spatial presence, and the immutable
          HTTP 423 Photoperiod Lock Law.
        </p>
      </header>

      {/* Hero Visual */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background: "#11141C",
          marginBottom: "3rem",
        }}
      >
        <img
          src="/hardware/aig_appliance_hero.jpg"
          alt="Turnkey A:iG Industrial Cultivation Controller"
          width="1376"
          height="768"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Specifications Grid */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.4rem",
            fontFamily: '"JetBrains Mono", monospace',
            color: "#FF334B",
            marginBottom: "1.25rem",
          }}
        >
          [ PHYSICAL HARDWARE ARCHITECTURE ]
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
              Fanless Quad-Core Compute
            </div>
            <p style={{ fontSize: "0.9rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
              Intel N100 SoC with 16GB DDR5 RAM, dual 2.5GbE Intel i226-V NICs, and hardened Alpine Linux OS.
              Zero moving parts, fanless solid-state heatsink impervious to dust and humidity.
            </p>
          </div>

          <div
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
              ESP32-WROOM Spatial Radar
            </div>
            <p style={{ fontSize: "0.9rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
              52 OFDM subcarriers microwave CSI channel state information. Detects personnel movement through
              walls and canopy foliage without intrusive optical cameras that leak plant genetics.
            </p>
          </div>

          <div
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
              423 Hardware Dark-Lock
            </div>
            <p style={{ fontSize: "0.9rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
              Strict cryptographic lock law during 12/12 flowering dark cycle. Refuses software overrides
              preventing accidental nocturnal light pollution that causes crop herming.
            </p>
          </div>

          <div
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
              B.A.D.-A.S.S. Wall Projection Out
            </div>
            <p style={{ fontSize: "0.9rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
              Dual 4K60 HDMI outputs natively power 120&quot; to 200&quot; wall HUD displays with automated optical
              dimming zone control for resin-hands commercial monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(255, 51, 75, 0.12), rgba(18, 20, 28, 0.9))",
          border: "1px solid rgba(255, 51, 75, 0.35)",
          borderRadius: 16,
          padding: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div>
          <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>$499.00 USD</div>
          <div style={{ fontSize: "0.85rem", color: "#9AA3B5", marginTop: "0.25rem" }}>
            Pre-assembled · 48h Stress-Tested · Zero Cloud Telemetry · Shipped in 24 Hours
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="/#storefront"
            style={{
              background: "#34D399",
              color: "#0A0B0F",
              textDecoration: "none",
              fontWeight: 700,
              padding: "0.85rem 1.5rem",
              borderRadius: 8,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.9rem",
            }}
          >
            [ ORDER APPLIANCE - $499 ]
          </a>
          <a
            href="/docs/datasheet"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              color: "#E7ECF3",
              textDecoration: "none",
              fontWeight: 700,
              padding: "0.85rem 1.5rem",
              borderRadius: 8,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.9rem",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            TECHNICAL DATASHEET →
          </a>
        </div>
      </section>
    </main>
  )
}
