import type { CSSProperties } from "react"
import { SeedLeaf } from "./SisterSiteBanner.js"

export const BUNDLE_URL = "https://jdieselny.com/?ref=aix-core-bundle"

const card: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(52, 211, 153, 0.45)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 10,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const hook: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.05rem, 0.95rem + 0.4vw, 1.35rem)",
  lineHeight: 1.35,
}

const line: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
}

const anchor: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "#34D399",
  fontSize: 15,
}

export function Op2026BundleCard() {
  return (
    <article data-product="op2026-bundle" style={card}>
      <h2 style={{ margin: 0 }}>The OP2026 Joint Cultivator Bundle</h2>
      <p style={hook}>Protect your investment with autonomous iron. Power your run with legendary genetics.</p>
      <ul>
        <li style={line}>1x Turnkey A:iG Controller ($499 value)</li>
        <li style={line}>1x ESP32 "Sniffer" Environmental Pod ($89 value)</li>
        <li style={line}>FREE 3-Pack of Medical-Grade Feminized Seeds shipped directly from jdieselny.com</li>
      </ul>
      <a data-referral="aix-core-bundle" href={BUNDLE_URL} style={anchor}>
        <SeedLeaf />
        Get the seed pack at jdieselny.com
      </a>
    </article>
  )
}
