import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hardware Compatibility List (HCL v1.0) | A:iX Core",
  description:
    "Official certified hardware components for the A:iG ecosystem: Intel N100 mini-PCs, ESP32-WROOM coprocessors, Sensirion SHT45/SCD41 sensors, 40A contactors, and bimetallic thermal switches.",
}

const HCL_CATEGORIES = [
  {
    category: "COMPUTE PLATFORMS",
    items: [
      { name: "Intel N100 Quad-Core (6W TDP)", status: "TIER 1 CERTIFIED", note: "Dual 2.5GbE Intel i226-V NICs. Primary reference architecture for Turnkey A:iG." },
      { name: "Intel N95 / N200 Mini-PCs", status: "CERTIFIED", note: "Fully compatible with Alpine Linux A:iG Sentinel OS images." },
      { name: "Raspberry Pi 4 / 5 (8GB)", status: "COMMUNITY SUPPORTED", note: "ARM64 build supported via containerized Sentinel runtime." },
    ],
  },
  {
    category: "SPATIAL RADAR & RF COPROCESSORS",
    items: [
      { name: "ESP32-WROOM-32 / 32D (Espressif)", status: "TIER 1 CERTIFIED", note: "52 OFDM subcarriers CSI extraction. Native BLE 5.0 mesh coordinator." },
      { name: "ESP32-C3 RISC-V Single-Core", status: "TIER 1 CERTIFIED", note: "Ultra-low power deep sleep (5µA). Primary coprocessor for wireless flood table dryback pods." },
    ],
  },
  {
    category: "CLIMATE & CO2 SENSORS",
    items: [
      { name: "Sensirion SHT45 (Temp / RH)", status: "TIER 1 CERTIFIED", note: "±1.0% RH, ±0.1°C accuracy. Factory-calibrated, zero drift over 10-year lifespan." },
      { name: "Sensirion SCD41 (Photoacoustic CO2)", status: "TIER 1 CERTIFIED", note: "400 - 5,000 ppm range (±40 ppm + 5%). Photoacoustic acoustic resonance chamber." },
      { name: "Senseair S8 NDIR Infrared", status: "CERTIFIED", note: "UART/Modbus interface supported via A:iG expansion header." },
    ],
  },
  {
    category: "LIFE-SAFETY & CONTACTORS",
    items: [
      { name: "KSD301 95°F (35°C) Bimetallic Snap Disc", status: "TIER 1 CERTIFIED", note: "Normally Closed (NC) physical coil interlock. Zero-software Chernobyl thermal cut." },
      { name: "Schneider / Square D 40A 2-Pole Contactor", status: "TIER 1 CERTIFIED", note: "24VAC or 120VAC pilot coil. Safely switches 6 kW+ high-inrush LED ballasts." },
    ],
  },
]

export default function HclPage() {
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

      <header style={{ marginBottom: "2.5rem" }}>
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
          OFFICIAL COMPATIBILITY SPECIFICATION · HCL v1.0
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Hardware Compatibility List
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
          Tested and certified hardware components verified for the A:iX edge runtime.
          Every component listed is guaranteed plug-and-play with pre-compiled sovereign drivers.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
        {HCL_CATEGORIES.map((cat) => (
          <section
            key={cat.category}
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 16,
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontFamily: '"JetBrains Mono", monospace',
                color: "#FF334B",
                margin: "0 0 1rem 0",
              }}
            >
              [ {cat.category} ]
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    background: "#0D0F16",
                    padding: "1rem",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#F8FAFC" }}>
                      {item.name}
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: 700,
                        color: item.status.includes("TIER 1") ? "#34D399" : "#38BDF8",
                        background: item.status.includes("TIER 1")
                          ? "rgba(52, 211, 153, 0.15)"
                          : "rgba(56, 189, 248, 0.15)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: 4,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#9AA3B5", marginTop: "0.4rem" }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

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
          <a href="/docs/datasheet" style={{ color: "#34D399", fontWeight: 700 }}>
            Read Electrical Tolerances in Datasheet →
          </a>
        </div>
        <div>
          <a href="/#diy-calculator" style={{ color: "#FF334B", textDecoration: "none" }}>
            Open $297 DIY BOM Calculator →
          </a>
        </div>
      </footer>
    </main>
  )
}
