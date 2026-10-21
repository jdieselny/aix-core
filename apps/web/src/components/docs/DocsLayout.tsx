import React, { type ReactNode } from "react"

export interface DocSection {
  slug: string
  title: string
  category: string
  summary: string
}

export const DOC_SECTIONS: readonly DocSection[] = [
  {
    slug: "fast-start",
    title: "Fast-Start Guide (Pre-Built)",
    category: "GETTING STARTED",
    summary: "5-step deployment for the pre-assembled Turnkey A:iG Appliance from unboxing to autonomous crop protection.",
  },
  {
    slug: "datasheet",
    title: "Hardware Datasheet",
    category: "SPECIFICATIONS",
    summary: "Complete electrical ratings, sensor tolerances, pinouts, thermal profiles, and mechanical dimensions.",
  },
  {
    slug: "user-guide",
    title: "Operator Field Manual",
    category: "SPECIFICATIONS",
    summary: "Comprehensive guide to closed-loop VPD, CO2 dosing, 423 Photoperiod Lock, and Chernobyl safety contactors.",
  },
  {
    slug: "brochure",
    title: "Commercial Brochure",
    category: "SPECIFICATIONS",
    summary: "Executive one-pager on sovereign edge cultivation, cloud failure analysis, and 62% hardware gross margins.",
  },
  {
    slug: "man-pages",
    title: "UNIX Man Pages & CLI",
    category: "DEVELOPER & CLI",
    summary: "Command-line manual for aigctl(1), aip(1), and watchtower(1) edge daemons.",
  },
  {
    slug: "release-notes",
    title: "Release Notes & Firmware",
    category: "DEVELOPER & CLI",
    summary: "Changelog and version history for A:iG Edge OS, CSI microwave presence assist, and patch notes.",
  },
  {
    slug: "isr-program",
    title: "ISR Program (Seeds & Hardware)",
    category: "PARTNERSHIPS",
    summary: "Independent Software & Representative program: 10% referral commissions and seed bank flywheel with jdieselny.com.",
  },
] as const

export function DocsLayout({
  activeSlug,
  children,
}: {
  activeSlug?: string
  children: ReactNode
}) {
  const categories = Array.from(new Set(DOC_SECTIONS.map((d) => d.category)))

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(10, 11, 15, 0.85)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="/"
              style={{
                color: "#E7ECF3",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34D399",
                  boxShadow: "0 0 8px #34D399",
                }}
              />
              <span>A:iX CORE</span>
            </a>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>/</span>
            <span
              style={{
                color: "#94A3B8",
                fontSize: "0.875rem",
                fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              }}
            >
              DOCUMENTATION
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.85rem" }}>
            <a href="/#storefront" style={{ color: "#94A3B8", textDecoration: "none" }}>
              Storefront ($499)
            </a>
            <a href="/#diy-calculator" style={{ color: "#94A3B8", textDecoration: "none" }}>
              DIY BOM ($297)
            </a>
            <a href="/blog" style={{ color: "#94A3B8", textDecoration: "none" }}>
              Blog
            </a>
            <a
              href="https://github.com/jdieselny/aix-core"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#38BDF8",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              GitHub ↗
            </a>
            <a
              href="https://jdieselny.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#34D399",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Seeds ↗
            </a>
          </div>
        </div>
      </header>

      {/* Main Documentation Shell */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {/* Sidebar Nav */}
        <aside
          style={{
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "2rem 1.5rem",
            position: "sticky",
            top: 60,
            height: "calc(100vh - 60px)",
            overflowY: "auto",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <a
              href="/docs"
              style={{
                display: "block",
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                background: !activeSlug ? "rgba(52, 211, 153, 0.12)" : "transparent",
                color: !activeSlug ? "#34D399" : "#94A3B8",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Documentation Overview
            </a>
          </div>

          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#64748B",
                  letterSpacing: "0.1em",
                  marginBottom: "0.6rem",
                  paddingLeft: "0.75rem",
                  fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
                }}
              >
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {DOC_SECTIONS.filter((s) => s.category === cat).map((doc) => {
                  const isActive = activeSlug === doc.slug
                  return (
                    <a
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      style={{
                        padding: "0.45rem 0.75rem",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        color: isActive ? "#34D399" : "#94A3B8",
                        background: isActive ? "rgba(52, 211, 153, 0.12)" : "transparent",
                        fontWeight: isActive ? 700 : 500,
                        borderLeft: isActive ? "2px solid #34D399" : "2px solid transparent",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {doc.title}
                    </a>
                  )
                })}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#11141C",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: "0.75rem",
              color: "#94A3B8",
            }}
          >
            <div style={{ fontWeight: 700, color: "#E7ECF3", marginBottom: "0.25rem" }}>
              Cleanroom Git Source
            </div>
            <div>Public repo &amp; man pages available under the MIT / Sovereign A:iX License.</div>
            <a
              href="https://github.com/jdieselny/aix-core"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                color: "#38BDF8",
                marginTop: "0.5rem",
                textDecoration: "underline",
              }}
            >
              github.com/jdieselny/aix-core ↗
            </a>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ padding: "2.5rem 3rem", maxWidth: 960 }}>{children}</main>
      </div>
    </div>
  )
}
