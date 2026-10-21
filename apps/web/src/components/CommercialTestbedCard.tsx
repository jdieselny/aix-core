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

const kicker: CSSProperties = {
  margin: 0,
  color: "#FF334B",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
  letterSpacing: "0.08em",
}

const spec: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  lineHeight: 1.45,
}

const SPECS = [
  "Lighting: 9x Iluminar 670W LEDs (6,030W / 6 kW active photoperiod load, 0–10V dimming).",
  "Climate: 4-Ton Split A/C (48,000 BTU/hr) + Quest Overhead Dehumidifier.",
  "Life-Safety: Chernobyl 95°F Mechanical Contactor Cut (hardware-level thermal drop independent of software).",
  "Substrate & Feed: Automated flood table fertigation in 100% coco coir.",
] as const

const FACILITY_PHOTO =
  '<img src="/hardware/marty_commercial_9_lighter_facility.jpg" alt="Marty\'s 9-lighter commercial cultivation facility" width="1376" height="768" loading="lazy" decoding="async" sizes="(min-width: 960px) 70vw, 100vw" style="display:block;width:100%;height:auto"/>'

export function CommercialTestbedCard() {
  return (
    <article data-testbed="marty" style={card}>
      <p data-badge="pilot" style={kicker}>
        [ 6,030W COMMERCIAL PILOT ]
      </p>
      <h2 style={{ margin: 0 }}>Real-World Commercial Iron · Marty&apos;s 9-Lighter Facility</h2>
      <div
        data-photo="marty"
        style={{ aspectRatio: "1376 / 768", background: "#0A0B0F", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: FACILITY_PHOTO }}
      />
      <ul>
        {SPECS.map((line) => (
          <li key={line} style={spec}>
            {line}
          </li>
        ))}
      </ul>
    </article>
  )
}
