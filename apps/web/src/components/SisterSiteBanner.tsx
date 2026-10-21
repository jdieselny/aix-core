import type { CSSProperties } from "react"

export const SISTER_SITE_URL = "https://jdieselny.com"

export const SISTER_SITE_TEXT =
  "POWERED BY J DIESEL NY GENETICS · GET MEDICAL-GRADE FEMINIZED SEEDS →"

const bar: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "10px 16px",
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  borderBottom: "1px solid rgba(52, 211, 153, 0.45)",
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
  fontSize: "clamp(0.72rem, 0.68rem + 0.25vw, 0.9rem)",
  letterSpacing: "0.08em",
}

const link: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "#34D399",
  textDecoration: "none",
}

export function SeedLeaf() {
  return (
    <svg data-badge="seed" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="#34D399"
        d="M8 1.2c2.8 1.6 5.2 4.4 5.6 8.2.3 2.6-1.2 5-3.8 5.4-2.2.3-4.3-.8-5.4-2.6C3.2 10.2 3 7.2 4.2 4.6 5.2 2.6 6.6 1.6 8 1.2Z"
      />
      <path d="M8 3.2v9.2" stroke="#0A0B0F" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function SisterSiteBanner() {
  return (
    <aside data-sister="banner" style={bar}>
      <a href={SISTER_SITE_URL} style={link}>
        <SeedLeaf />
        <span>{SISTER_SITE_TEXT}</span>
      </a>
    </aside>
  )
}
