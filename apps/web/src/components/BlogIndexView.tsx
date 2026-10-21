import React from "react"
import { CANONICAL_BLOG_SLUG } from "../lib/seo_metadata.js"

export function BlogIndexView() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "0 1.5rem 5rem 1.5rem",
      }}
    >
      {/* Top Nav */}
      <nav
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "#34D399",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "0.05em",
          }}
        >
          <span>← A:iX CORE STOREFRONT</span>
        </a>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem" }}>
          <a href="/#storefront" style={{ color: "#94A3B8", textDecoration: "none" }}>
            A:iG Hardware ($499)
          </a>
          <a href="/#diy-calculator" style={{ color: "#94A3B8", textDecoration: "none" }}>
            Open DIY BOM ($297)
          </a>
          <a
            href="https://jdieselny.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#38BDF8", textDecoration: "none" }}
          >
            Seeds (jdieselny.com) ↗
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main style={{ maxWidth: 880, margin: "3.5rem auto 0 auto" }}>
        <header style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "4px",
              color: "#38BDF8",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            }}
          >
            TECHNICAL DISPATCHES &amp; HARDWARE ESSAYS
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            A:iX Technical Library &amp; Engineering Journal
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "1.1rem", maxWidth: 640 }}>
            Authoritative documentation, hardware schematics, and thermodynamic
            analyses for sovereign agricultural edge computing.
          </p>
        </header>

        {/* Featured Post Card */}
        <div
          style={{
            background: "#11141C",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              color: "#34D399",
            }}
          >
            <span>[ FEATURED ESSAY // ESSAY-001 ]</span>
            <span>OCTOBER 21, 2026 · 14 MIN READ</span>
          </div>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            <a
              href={`/blog/${CANONICAL_BLOG_SLUG}`}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              The Death of Cloud Grow Controllers: Why Autonomous Sovereign Edge
              Hardware is the Future of Commercial Cultivation
            </a>
          </h2>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
            }}
          >
            An engineering analysis of why centralized cloud platforms fail
            commercial cultivation facilities, the thermodynamics of high-density
            LED heat death, and how local-first edge compute protects living crops.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  color: "#CBD5E1",
                }}
              >
                Local-First
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  color: "#CBD5E1",
                }}
              >
                Chernobyl Cutoff
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  color: "#CBD5E1",
                }}
              >
                CSI Radar
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "0.2rem 0.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  color: "#CBD5E1",
                }}
              >
                $297 DIY BOM
              </span>
            </div>

            <a
              href={`/blog/${CANONICAL_BLOG_SLUG}`}
              style={{
                color: "#34D399",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Read Full Article →
            </a>
          </div>
        </div>

        {/* Secondary Dispatch Teasers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div
            style={{
              background: "#11141C",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748B",
                fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
                marginBottom: "0.5rem",
              }}
            >
              HARDWARE SPECIFICATION
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#FFFFFF",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Building a $297 DIY Grow Room Controller
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Step-by-step assembly guide: flashing the N100 mini-PC with Ubuntu
              Server, wiring optoisolated relay channels, and configuring the
              Sensirion SHT45 high-accuracy VPD bus.
            </p>
            <a
              href="/#diy-calculator"
              style={{
                color: "#38BDF8",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                marginTop: "0.75rem",
              }}
            >
              Open BOM Calculator →
            </a>
          </div>

          <div
            style={{
              background: "#11141C",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748B",
                fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
                marginBottom: "0.5rem",
              }}
            >
              RF RADAR &amp; SENSING
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#FFFFFF",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              52-Subcarrier CSI Microwave Transpiration
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5 }}>
              How 802.11 Wi-Fi channel state information detects boundary-layer
              canopy humidity shifts and through-the-wall presence without
              cameras or microphones.
            </p>
            <a
              href="/#storefront"
              style={{
                color: "#38BDF8",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                marginTop: "0.75rem",
              }}
            >
              View Sniffer Pod →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
