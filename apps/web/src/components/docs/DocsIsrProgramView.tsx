import React from "react"

export function DocsIsrProgramView() {
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
        PARTNERSHIP &amp; CULTIVATOR ADVOCACY // ISR-001
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        The ISR Program: Seeds &amp; Industrial Controls Flywheel
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2.5rem" }}>
        Uniting elite artisanal genetics with autonomous edge automation. How cultivators, breeders,
        and homelabbers earn 10% hardware commissions and cross-pollinate with J Diesel NY.
      </p>

      {/* Thesis Callout */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(255, 51, 75, 0.05))",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          borderRadius: "12px",
          padding: "1.75rem",
          marginBottom: "2.5rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#34D399", marginBottom: "0.5rem" }}>
          "Do Your Thing Twin" — The Sovereign Cultivator Philosophy
        </h3>
        <p style={{ color: "#CBD5E1", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
          We don’t care about corporate gatekeeping, legacy certification mafias, or forced cloud monopolies.
          You only need your own inspiration. We provide the hardened sovereign software and the medical-grade
          curated genetics from <strong>J Diesel NY</strong>. The rest is your mastery.
        </p>
      </div>

      {/* Program Mechanics */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "1rem" }}>
          1. The Dual-Substrate Flywheel: Seeds ⟷ Hardware
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "#FF334B", fontWeight: 700, marginBottom: "0.5rem" }}>A. Free App with Seeds</div>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.5 }}>
              Every 5-pack or 10-pack of medical-grade feminized seeds ordered on <code>jdieselny.com</code> comes
              with a custom scratch-off voucher unlocking 90 days of the A:iP Mobile Cockpit cloudless telemetry app.
            </p>
          </div>
          <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>B. Free Seeds with Hardware</div>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.5 }}>
              Every Turnkey A:iG Appliance ($499) or OP2026 Cultivator Bundle ($599) includes a complimentary 3-pack
              of elite feminized genetics direct from the J Diesel NY seed vault.
            </p>
          </div>
        </div>
      </section>

      {/* ISR Commissions */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "1rem" }}>
          2. ISR Compensation &amp; Partner Benefits
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", background: "#11141C", borderRadius: "8px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left", color: "#94A3B8" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Tier</th>
                <th style={{ padding: "0.75rem 1rem" }}>Commission Rate</th>
                <th style={{ padding: "0.75rem 1rem" }}>Hardware / Seed Perks</th>
                <th style={{ padding: "0.75rem 1rem" }}>Qualification</th>
              </tr>
            </thead>
            <tbody style={{ color: "#CBD5E1" }}>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Craft Cultivator ISR</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>10% Cash ($49.90 / A:iG unit)</td>
                <td style={{ padding: "0.75rem 1rem" }}>Free 3-pack seeds on every 2 hardware sales</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>Active homegrow or craft canopy</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Commercial Facility ISR</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>12.5% Cash ($62.37 / unit)</td>
                <td style={{ padding: "0.75rem 1rem" }}>Wholesale seed pack allocations + free Sniffers</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>Licensed facility (9+ lights)</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Breeder / Influencer ISR</td>
                <td style={{ padding: "0.75rem 1rem", color: "#FF334B" }}>Custom Joint Bundles</td>
                <td style={{ padding: "0.75rem 1rem" }}>Co-branded packaging + dedicated landing page</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>Established seed brand or channel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Enrollment */}
      <section style={{ textAlign: "center", padding: "2rem", background: "rgba(255, 51, 75, 0.05)", borderRadius: "10px", border: "1px solid rgba(255, 51, 75, 0.2)" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
          Join the A:iX ISR Representative Network
        </h3>
        <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto 1.5rem auto" }}>
          Get your custom referral code, track live commission payouts, and start earning by protecting crops with sovereign hardware.
        </p>
        <a
          href="https://jdieselny.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            background: "linear-gradient(135deg, #FF334B 0%, #FF7A59 100%)",
            color: "#0A0B0F",
            boxShadow: "0 0 18px rgba(255, 51, 75, 0.4)",
            fontWeight: 800,
            textDecoration: "none",
            borderRadius: "6px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontSize: "0.9rem",
          }}
        >
          Contact J Diesel NY / Apply as ISR
        </a>
      </section>
    </article>
  )
}
