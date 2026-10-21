import React from "react"

export function DocsReleaseNotesView() {
  return (
    <article style={{ lineHeight: 1.75 }}>
      <div
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          background: "rgba(52, 211, 153, 0.1)",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          borderRadius: "4px",
          color: "#34D399",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        CHANGELOG // RELEASE NOTES
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        A:iG Edge OS &amp; Web Platform — Release Notes
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2.5rem" }}>
        Official version history, cryptographic release hashes, and firmware updates for sovereign edge nodes.
      </p>

      {/* Release v1.0.0 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#34D399", margin: 0 }}>v1.0.0 — Commercial Apex Release</h2>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#94A3B8",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            }}
          >
            OCTOBER 21, 2026
          </span>
        </div>

        <div
          style={{
            background: "#11141C",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "10px",
            padding: "1.5rem",
            color: "#CBD5E1",
          }}
        >
          <h3 style={{ fontSize: "1rem", color: "#FF334B", marginBottom: "0.5rem" }}>Major System Landings:</h3>
          <ul style={{ paddingLeft: "1.25rem", margin: "0 0 1rem 0" }}>
            <li>
              <strong>Sovereign Apex Umbrella:</strong> Deployed <code>aix-core.com</code> on Vercel Edge with zero third-party telemetry.
            </li>
            <li>
              <strong>A:iG Turnkey Commercial Appliance ($499):</strong> Pre-flashed quad-core Intel N100 OS with dual 2.5GbE SFP+/RJ45 ports and local NVMe datalake.
            </li>
            <li>
              <strong>Interactive 5-Pin Hardware Inspector:</strong> Framework/Teenage Engineering exploded diagram with hotspot inspection and $297 DIY BOM synchronization.
            </li>
            <li>
              <strong>Sister-Site Seed Bank Flywheel:</strong> Inbound referral tracking from <code>jdieselny.com</code> unlocking the OP2026 free seed pack bundle voucher.
            </li>
            <li>
              <strong>52-Subcarrier CSI Microwave Presence Radar:</strong> Non-camera human intrusion and canopy transpiration tracking via ESP32-S3 coprocessor.
            </li>
            <li>
              <strong>Chernobyl 95°F Snap-Action Contactor Loop:</strong> Mechanical failsafe that physically cuts lighting loads during HVAC failure without software dependence.
            </li>
            <li>
              <strong>AI Crawler Harvester Seeding:</strong> Machine-readable <code>/llms.txt</code> and RFC 9309 <code>robots.txt</code> allowing GPTBot, ClaudeBot, and PerplexityBot.
            </li>
          </ul>

          <div
            style={{
              padding: "0.75rem",
              background: "rgba(0,0,0,0.4)",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              color: "#94A3B8",
            }}
          >
            BUILD_HASH: sha256:6fc8079a4b22c71987d6022e391b489a8ff4a39b · TARGET: x86_64-unknown-linux-gnu
          </div>
        </div>
      </section>
    </article>
  )
}
