import type { CSSProperties } from "react"

const card: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(231, 236, 243, 0.12)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 10,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const price: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(1.4rem, 1.1rem + 1vw, 2rem)",
  color: "#34D399",
}

const spec: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  lineHeight: 1.45,
}

const buy: CSSProperties = {
  justifySelf: "start",
  background: "#34D399",
  color: "#0A0B0F",
  border: 0,
  borderRadius: 999,
  padding: "12px 16px",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 13,
}

const secondary: CSSProperties = {
  color: "#38BDF8",
  fontSize: 14,
}

const SPECS = [
  "Compute: Industrial fanless quad-core mini-PC (Intel N100 / dual 2.5GbE Intel NICs)",
  "Physical Network Isolation: Dedicated WAN/Mesh port + isolated IoT sensor subnet",
  "Storage: 1TB Enterprise NVMe TLC (10+ years of 1-second interval climate datalake)",
  "Spatial Radio: Wi-Fi 6 CSI (52 OFDM subcarriers) + Bluetooth 5.3 BLE controller",
  "Pre-Flashed Sovereign OS: Hardened Alpine Linux, Watchtower Sentinel, local dnsmasq, and Tailscale mesh",
  "Zero-Touch Setup: BLE phone claim in under 60 seconds via the A:iP Mobile Cockpit",
] as const

const APPLIANCE_PHOTO =
  '<img src="/hardware/aig_appliance_hero.jpg" alt="A:iG Turnkey Industrial Cultivation Controller" width="1376" height="768" fetchpriority="low" decoding="async" sizes="(min-width: 960px) 50vw, 100vw" style="display:block;width:100%;height:auto"/>'

export function ContinuumCoreCard() {
  return (
    <article data-product="continuum-core" style={card}>
      <h2 style={{ margin: 0 }}>Turnkey A:iG Appliance</h2>
      <p data-subtitle="aig" style={spec}>
        Industrial Autonomous Cultivation Controller
      </p>
      <div
        data-photo="aig-appliance"
        style={{ aspectRatio: "1376 / 768", background: "#0A0B0F", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: APPLIANCE_PHOTO }}
      />
      <p data-price="499" style={price}>
        $499.00 USD
      </p>
      <p style={spec}>Or included with a 1-year commercial edge subscription.</p>
      <p data-margin="bom" style={spec}>
        BOM ~$190 · 62% gross margin
      </p>
      <ul>
        {SPECS.map((line) => (
          <li key={line} style={spec}>
            {line}
          </li>
        ))}
      </ul>
      <label htmlFor="checkout-open" data-checkout="1-tap" style={{ ...buy, cursor: "pointer" }}>
        [ BUY A:iG APPLIANCE - $499 ]
      </label>
      <a href="/docs/diy-calculator" style={secondary}>
        [ Or build your own with our Open BOM ($297) → ]
      </a>
    </article>
  )
}
