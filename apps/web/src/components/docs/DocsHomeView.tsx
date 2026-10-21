import React from "react"
import { DOC_SECTIONS } from "./DocsLayout.js"

export function DocsHomeView() {
  return (
    <div>
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
        SOVEREIGN HARDWARE // DOCUMENTATION CENTER
      </div>

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}
      >
        A:iX Technical Documentation &amp; Field Manuals
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
        Official engineering specifications, wiring schematics, CLI man pages, and deployment guides
        for the A:iG Turnkey Appliance ($499), Open DIY BOM ($297), and the A:iP Mobile Cockpit.
      </p>

      {/* Grid of Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "3rem" }}>
        {DOC_SECTIONS.map((sec) => (
          <a
            key={sec.slug}
            href={`/docs/${sec.slug}`}
            style={{
              background: "linear-gradient(165deg, rgba(255, 51, 75, 0.16), #11141C 42%)",
              border: "1px solid rgba(255, 51, 75, 0.28)",
              borderRadius: "10px",
              padding: "1.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#FF334B",
                  letterSpacing: "0.08em",
                  marginBottom: "0.5rem",
                  fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
                }}
              >
                {sec.category}
              </div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                {sec.title}
              </h2>
              <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.5 }}>{sec.summary}</p>
            </div>
            <div
              style={{
                marginTop: "1rem",
                color: "#34D399",
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>Read Documentation</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Architecture Callout */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(18, 20, 28, 0.95), rgba(15, 23, 42, 0.75))",
          border: "1px solid rgba(52, 211, 153, 0.2)",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>
          Core Sovereign Architecture Laws
        </h3>
        <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Every document in this library adheres strictly to three non-negotiable operational invariants:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.25rem" }}>1. Local-First</div>
            <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
              100% of automation logic executes on-device. Zero mandatory cloud subscriptions; zero AWS outage risk.
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ color: "#FBBF24", fontWeight: 700, marginBottom: "0.25rem" }}>2. 423 Lock Law</div>
            <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
              Actuators strictly reject lighting override during the 12/12 dark cycle to prevent crop herming.
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ color: "#EF4444", fontWeight: 700, marginBottom: "0.25rem" }}>3. Chernobyl Cut</div>
            <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
              95°F analog bimetallic snap-action thermostat physically cuts lighting contactor on HVAC failure.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
