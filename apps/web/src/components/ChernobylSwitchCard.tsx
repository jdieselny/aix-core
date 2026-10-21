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
  fontSize: "clamp(1.1rem, 0.95rem + 0.6vw, 1.5rem)",
  color: "#F87171",
}

const spec: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  lineHeight: 1.45,
}

const FEATURES = [
  "Analog Thermal Trip: Bimetallic 95°F thermal cutoff switch wired in series with contactor coil (cuts power with ZERO software dependency if room overheats)",
  "Manual REPO Mushroom: Heavy-duty industrial red twist-to-reset emergency disconnect button.",
  "Fire Alarm Interconnect: Kidde SM120X / First Alert RM4 dry-contact integration that drops lighting contactors and opens ventilation dampers upon smoke detection.",
] as const

const SWITCH_PHOTO =
  '<img src="/hardware/chernobyl_switch_product.jpg" alt="Chernobyl Switch 95°F thermal contactor and emergency stop" width="1200" height="896" loading="lazy" decoding="async" sizes="(min-width: 960px) 33vw, 100vw" style="display:block;width:100%;height:auto"/>'

export function ChernobylSwitchCard() {
  return (
    <article data-product="chernobyl-switch" style={card}>
      <h2 style={{ margin: 0 }}>The "Chernobyl Switch" Life-Safety Hardware Kit</h2>
      <p data-price="49" style={price}>
        $49.00 USD (Contactor + Thermal Trip)
      </p>
      <p data-price="29" style={price}>
        $29.00 USD (Fire Smoke Isolator)
      </p>
      <div
        data-photo="chernobyl"
        style={{ aspectRatio: "1200 / 896", background: "#0A0B0F", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: SWITCH_PHOTO }}
      />
      <ul>
        {FEATURES.map((line) => (
          <li key={line} style={spec}>
            {line}
          </li>
        ))}
      </ul>
    </article>
  )
}
