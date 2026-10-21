/** Coco flood-table dryback and Mars Hydro DLI card. No baby blue. */

export const CYBER_RED = "#FF334B"
export const EMERALD = "#34D399"
export const OBSIDIAN = "#0A0B0F"

export const SATURATION_VWC_PCT = 65
export const DRYBACK_TRIGGER_VWC_PCT = 38
export const DRYBACK_SLOPE_PCT_PER_HR = -2.1
export const MARTY_OVERDRY_VWC_PCT = 35
export const DLI_TARGET_MOL_M2_DAY = 42
export const MARS_HYDRO_PPFD = 650

export type VwcBand = "SATURATION" | "DRYBACK" | "MARTY_OVERDRY_ALERT"

export function classifyVwc(vwcPct: number): VwcBand {
  if (vwcPct <= MARTY_OVERDRY_VWC_PCT) {
    return "MARTY_OVERDRY_ALERT"
  }
  if (vwcPct <= DRYBACK_TRIGGER_VWC_PCT) {
    return "DRYBACK"
  }
  return "SATURATION"
}

/** Linear dryback from 65% saturation at -2.1%/hr. */
export function projectVwc(hours: number): number {
  const vwc = SATURATION_VWC_PCT + DRYBACK_SLOPE_PCT_PER_HR * hours
  return Math.round(vwc * 10) / 10
}

export function hoursToTrigger(): number {
  return (DRYBACK_TRIGGER_VWC_PCT - SATURATION_VWC_PCT) / DRYBACK_SLOPE_PCT_PER_HR
}

const CURVE_HOURS = [0, 4, 8, 12, 13]

export function SubstrateDrybackTelemetryCard() {
  const points = CURVE_HOURS.map((hour) => ({ hour, vwc: projectVwc(hour) }))
  const triggerHours = Math.round(hoursToTrigger() * 10) / 10
  const width = 320
  const height = 120
  const maxHour = 13
  const path = points
    .map((point, index) => {
      const x = (point.hour / maxHour) * (width - 16) + 8
      const y = height - 16 - ((point.vwc - 30) / 40) * (height - 28)
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <section
      data-telemetry="substrate-dryback"
      aria-label="Substrate dryback and PAR accumulation"
      style={{
        background: "var(--aix-card, rgba(18, 20, 29, 0.8))",
        backdropFilter: "blur(12px)",
        color: "#E7ECF3",
        border: "1px solid var(--aix-border, rgba(255, 51, 75, 0.2))",
        borderRadius: 16,
        padding: "1.25rem",
        display: "grid",
        gap: "0.9rem",
        fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ color: CYBER_RED, fontWeight: 800 }}>COCO FLOOD TABLE · VWC DRYBACK</div>
        <div style={{ color: EMERALD, fontWeight: 700 }}>ESP32-WROOM capacitive</div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
        <Metric label="Saturation" value={`${SATURATION_VWC_PCT}% VWC`} tone={EMERALD} />
        <Metric label="Dryback trigger" value={`${DRYBACK_TRIGGER_VWC_PCT}%`} tone="#E7ECF3" />
        <Metric label="Slope" value={`${DRYBACK_SLOPE_PCT_PER_HR}%/hr`} tone={CYBER_RED} />
        <Metric label="Marty Overdry Alert" value={`${MARTY_OVERDRY_VWC_PCT}%`} tone={CYBER_RED} />
      </div>

      <svg
        data-curve="vwc"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`VWC dryback from ${SATURATION_VWC_PCT}% toward ${DRYBACK_TRIGGER_VWC_PCT}% at ${DRYBACK_SLOPE_PCT_PER_HR}% per hour. Marty Overdry Alert at ${MARTY_OVERDRY_VWC_PCT}%.`}
        style={{ width: "100%", height: 120, background: OBSIDIAN, borderRadius: 10 }}
      >
        <path d={path} fill="none" stroke={EMERALD} strokeWidth="2" />
        <line x1="8" x2={width - 8} y1={height - 28} y2={height - 28} stroke={CYBER_RED} strokeDasharray="4 4" />
      </svg>
      <p style={{ margin: 0, color: "#9AA3B5", fontSize: "0.8rem" }}>
        Linear dryback reaches the {DRYBACK_TRIGGER_VWC_PCT}% trigger in {triggerHours} h.{" "}
        {classifyVwc(MARTY_OVERDRY_VWC_PCT)} fires at {MARTY_OVERDRY_VWC_PCT}% VWC. Current showcase point{" "}
        {projectVwc(12)}% is {classifyVwc(projectVwc(12))}.
      </p>

      <div
        data-dli="mars-hydro"
        style={{
          background: OBSIDIAN,
          borderRadius: 12,
          padding: "0.85rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ color: "#9AA3B5", fontSize: "0.75rem" }}>Mars Hydro TS-1000 · 650 PPFD</div>
          <div style={{ fontWeight: 800, color: EMERALD }} data-dli-target={DLI_TARGET_MOL_M2_DAY}>
            DLI target 42 mol/m²/day
          </div>
        </div>
        <div style={{ color: CYBER_RED, fontWeight: 700 }}>Heavy flower setpoint</div>
      </div>

      <div
        data-sentinel="spider-mite"
        style={{
          border: `1px solid ${EMERALD}`,
          borderRadius: 12,
          padding: "0.75rem 1rem",
          display: "grid",
          gap: "0.25rem",
        }}
      >
        <strong style={{ color: EMERALD }}>Spider Mite Sentinel</strong>
        <span>ESP32 Acoustic / Visual Micro-Vibration Mesh: ACTIVE</span>
        <span style={{ color: "#9AA3B5" }}>Remediation: Scheduled UVA/UVB 15-min burst on detection</span>
      </div>
    </section>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ background: OBSIDIAN, borderRadius: 10, padding: "0.7rem 0.8rem" }}>
      <div style={{ color: "#9AA3B5", fontSize: "0.7rem" }}>{label}</div>
      <div style={{ color: tone, fontWeight: 800 }}>{value}</div>
    </div>
  )
}
