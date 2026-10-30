import type { CSSProperties } from "react"
import { InventoryPill } from "./InventoryPill.js"
import { SISTER_SITE_URL, SisterSiteBanner } from "./SisterSiteBanner.js"

const ANCHORS = [
  { href: "#trifecta", label: "A:iX Trifecta" },
  { href: "#argon4-showcase", label: "Argon 4 Series" },
  { href: "#hx2-embodiment", label: "Hx-2 Body" },
  { href: "#storefront", label: "A:iG Garden Hardware" },
  { href: "#diy-calculator", label: "Open DIY BOM" },
  { href: "#compare", label: "Compare" },
  { href: SISTER_SITE_URL, label: "Seeds (jdieselny)" },
] as const

const NAV = [
  { href: "/hardware/core", label: "Hardware" },
  { href: "/docs/diy-calculator", label: "DIY Calculator" },
  { href: "/compare", label: "Compare" },
  { href: "/badass", label: "B.A.D.-A.S.S." },
  { href: "/docs", label: "Docs" },
  { href: SISTER_SITE_URL, label: "Seeds (jdieselny)" },
] as const

const header: CSSProperties = {
  background: "#0A0B0F",
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const bar: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  borderBottom: "1px solid rgba(231, 236, 243, 0.12)",
}

const brand: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  margin: 0,
  color: "#E7ECF3",
  textDecoration: "none",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.85rem, 0.8rem + 0.3vw, 1rem)",
  letterSpacing: "0.08em",
}

const pip: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: "#FF334B",
  boxShadow: "0 0 10px #FF334B",
}

const nav: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 14,
  fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.9rem)",
}

const navLink: CSSProperties = {
  color: "#E7ECF3",
  textDecoration: "none",
}

const cart: CSSProperties = {
  marginLeft: "auto",
  background: "#12141C",
  color: "#FF334B",
  border: "1px solid #FF334B",
  borderRadius: 999,
  padding: "8px 12px",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
}

export function SiteHeader({ stock, showBanner = true }: { stock: number; showBanner?: boolean }) {
  return (
    <header data-header="site" style={header}>
      {showBanner ? <SisterSiteBanner /> : null}
      <div data-bar="nav" style={bar}>
        <a data-brand="aix" href="/hardware/core" style={brand}>
          <span
            data-mark="aix"
            dangerouslySetInnerHTML={{
              __html:
                '<img src="/brand/aix_mark.svg" alt="A:iX mark" width="28" height="28" fetchpriority="low" decoding="async" style="display:block;width:28px;height:28px"/>',
            }}
          />
          <span data-pip="red" style={pip} />
          A:iX CORE
        </a>
        <nav aria-label="On this page" style={nav}>
          {ANCHORS.map((item) => (
            <a key={item.href} href={item.href} style={navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Primary" style={nav}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} style={navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <InventoryPill stock={stock} />
        <label htmlFor="checkout-open" data-cart="drawer" style={{ ...cart, cursor: "pointer" }}>
          Quick Cart · 1-Tap
        </label>
      </div>
    </header>
  )
}
