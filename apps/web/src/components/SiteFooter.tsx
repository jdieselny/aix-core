import type { CSSProperties } from "react"
import { SeedLeaf, SISTER_SITE_URL } from "./SisterSiteBanner.js"

const NAV = [
  { href: "/hardware/core", label: "Hardware Catalog" },
  { href: "/docs/hcl", label: "HCL v1.0" },
  { href: "/docs/diy-calculator", label: "Open-Source BOM" },
  { href: "/docs", label: "Documentation" },
] as const

const footer: CSSProperties = {
  display: "grid",
  gap: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 2rem)",
  background: "#0A0B0F",
  color: "#E7ECF3",
  borderTop: "1px solid rgba(231, 236, 243, 0.12)",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const columns: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
  gap: 16,
}

const brand: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  letterSpacing: "0.06em",
}

const nav: CSSProperties = {
  display: "grid",
  gap: 8,
}

const link: CSSProperties = {
  color: "#E7ECF3",
  textDecoration: "none",
}

const sister: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "#34D399",
}

const legal: CSSProperties = {
  margin: 0,
  color: "#9AA3B5",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
}

export function SiteFooter() {
  return (
    <footer data-footer="site" style={footer}>
      <div style={columns}>
        <p style={brand}>A:iX CORE · Sovereign Edge Operations & Environmental Robotics</p>
        <nav aria-label="Footer" style={nav}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} style={link}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href={SISTER_SITE_URL} style={sister}>
          <SeedLeaf />
          Cultivating elite genetics? Visit our sister seed bank at jdieselny.com
        </a>
      </div>
      <p style={legal}>© 2026 J Diesel NY, LLC. All rights reserved. Zero telemetry. 100% sovereign.</p>
    </footer>
  )
}
