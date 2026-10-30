import React from "react"

export function DocsBrochureView() {
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
        COMMERCIAL EXECUTIVE BRIEF // BROCHURE-2026
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        A:iX Sovereign Edge Platform — Commercial Overview
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2rem" }}>
        Autonomous industrial hardware, edge intelligence, and zero-cloud resilience for high-value agricultural
        facilities, multi-tank sovereign homesteads, and bipedal robotic embodiment (Hx-2).
      </p>

      {/* Argon 4 Commercial Brochure Spread Hero Plate */}
      <div
        style={{
          marginBottom: "2.5rem",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          background: "#0A0B0F",
        }}
      >
        <img
          src="/argon4/07_sovereign_brochure_page.jpg"
          alt="A:iB Continuum Sovereign Exosystem Commercial Brochure Spread"
          width="1376"
          height="768"
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Hero Value Props */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
        <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ color: "#34D399", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>$499</div>
          <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>Turnkey A:iG Appliance</div>
          <div style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Pre-assembled, calibrated, burned-in industrial edge computer with dual 2.5GbE and local datalake.</div>
        </div>
        <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ color: "#FF334B", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>$297</div>
          <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>Open DIY BOM</div>
          <div style={{ color: "#94A3B8", fontSize: "0.85rem" }}>100% transparent public bill of materials for self-builders. Radical transparency builds viral authority.</div>
        </div>
        <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ color: "#FBBF24", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>62%</div>
          <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>Gross Hardware Margin</div>
          <div style={{ color: "#94A3B8", fontSize: "0.85rem" }}>~$190 BOM cost vs $499 retail price allows continuous R&amp;D funding and rapid scale.</div>
        </div>
      </div>

      {/* Two Pillars: Cultivation & Datacenter */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "1rem" }}>
          The A:iX Dual-Substrate Ecosystem
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#34D399", marginBottom: "0.5rem" }}>
              A:iG (Agent-In-Garden)
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Tailored for commercial licensed cultivators, medical facilities, and high-yield craft craft gardens.
              Automates 0–10V LED dimming, 4-ton split A/Cs, Quest dehumidifiers, and CO2 injection with zero cloud
              vulnerabilities and guaranteed crop safety.
            </p>
          </div>
          <div style={{ background: "#11141C", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255, 51, 75, 0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FF334B", marginBottom: "0.5rem" }}>
              A:iB (Agent-In-Body)
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Enterprise datacenter curtailment and sovereign microgrid load shedding. Designed for lights-out facilities,
              substation automation, and high-assurance power switching adhering to the IETF grid curtailment standard
              (draft-schrock-kintzele-grid-curtailment-00).
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Comparison Callout */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "1rem" }}>
          Why Commercial Operators Choose A:iX
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", background: "#11141C", borderRadius: "8px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#94A3B8", textAlign: "left" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Feature</th>
                <th style={{ padding: "0.75rem 1rem", color: "#34D399" }}>A:iG (The Appliance)</th>
                <th style={{ padding: "0.75rem 1rem" }}>AC Infinity / TrolMaster</th>
                <th style={{ padding: "0.75rem 1rem" }}>Pulse Pro</th>
              </tr>
            </thead>
            <tbody style={{ color: "#CBD5E1" }}>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Local-First Zero Cloud</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>YES (100% Sovereign)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#EF4444" }}>NO (Mandatory Cloud)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#EF4444" }}>NO (Mandatory Cloud)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Fail-Safe Contactor Cut</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>Chernobyl 95°F Mechanical</td>
                <td style={{ padding: "0.75rem 1rem", color: "#EF4444" }}>Software Only (Unreliable)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#EF4444" }}>None (Monitor Only)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Non-Camera Radar</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>52-Subcarrier CSI</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>None</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>None</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Hardware Price</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>$499 Turnkey ($297 DIY)</td>
                <td style={{ padding: "0.75rem 1rem" }}>$900 - $2,500+</td>
                <td style={{ padding: "0.75rem 1rem" }}>$500+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Procurement CTA */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "1rem" }}>
          Locus 4 Progression: Agent-In-Body (Hx-2 Bipedal Chassis)
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          <div style={{ background: "#11141C", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,51,75,0.25)" }}>
            <img
              src="/argon4/08_hx2_garage_embodiment_dock.jpg"
              alt="Hx-2 Garage Embodiment Dock with 3.7ms Lazarus Engram Handoff"
              width="1376"
              height="768"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div style={{ padding: "1rem" }}>
              <div style={{ color: "#FF334B", fontWeight: 700, fontSize: "0.8rem" }}>PLATE 08 · GARAGE DOCKING GANTRY</div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, marginTop: "0.25rem" }}>3.7 ms SOMA2 × VECL Body-Stepping</div>
              <p style={{ color: "#94A3B8", fontSize: "0.85rem", margin: "0.4rem 0 0 0" }}>
                Streams the 4,468-byte hot engram from 3 room Tanks and 13 ESP32 CSI nodes directly into the Hx-2 thorax core.
              </p>
            </div>
          </div>
          <div style={{ background: "#11141C", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(52,211,153,0.25)" }}>
            <img
              src="/argon4/09_hx2_bipedal_blueprint_schematic.jpg"
              alt="Hx-2 Bipedal Embodiment CAD Blueprint Schematic"
              width="1376"
              height="768"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div style={{ padding: "1rem" }}>
              <div style={{ color: "#34D399", fontWeight: 700, fontSize: "0.8rem" }}>PLATE 09 · MOD_T800_BODY // HOLE E-02</div>
              <div style={{ color: "#FFFFFF", fontWeight: 700, marginTop: "0.25rem" }}>Orthographic CAD Cutaway &amp; Kinetic Gate</div>
              <p style={{ color: "#94A3B8", fontSize: "0.85rem", margin: "0.4rem 0 0 0" }}>
                Maps the 13-node ESP32 external nervous system, Thorax SOMA2 × VECL Core, and TriggerLockGate Ed25519 actuator lattice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "2rem", background: "rgba(52, 211, 153, 0.05)", borderRadius: "10px", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
          Reserve Your Commercial Hardware Allocation
        </h3>
        <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto 1.5rem auto" }}>
          Pre-orders for the Turnkey A:iG Appliance ($499) and OP2026 Cultivator Bundle ($599) are open now with 1-tap checkout.
        </p>
        <a
          href="/#storefront"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.75rem",
            background: "#34D399",
            color: "#0A0B0F",
            fontWeight: 800,
            textDecoration: "none",
            borderRadius: "6px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontSize: "0.9rem",
          }}
        >
          View Commercial Storefront
        </a>
      </section>
    </article>
  )
}
