import type { CSSProperties } from "react"

const PLATFORMS = [
  "A:iG (The Appliance)",
  "AC Infinity Controller 69 Pro",
  "TrolMaster Hydro-X Pro",
  "Pulse Pro",
] as const

const ROWS = [
  {
    vector: "Local-First Zero Cloud",
    cells: ["YES (100% Sovereign)", "No (Cloud-dependent)", "No", "No"],
  },
  {
    vector: "Encrypted mTLS / WireGuard",
    cells: ["YES", "No (Unencrypted BLE)", "No", "No"],
  },
  {
    vector: "Photoperiod Hardware Interlock",
    cells: ["YES (423 LOCKED)", "No", "Basic Relay", "Read-only"],
  },
  {
    vector: "Through-the-Wall Presence Radar",
    cells: ["YES (52-Subcarrier CSI)", "None", "None", "None"],
  },
  {
    vector: "Crop Protection Billing Grace",
    cells: ["YES (14-Day Grace; Never Kills Crops)", "N/A / Locked", "N/A / Locked", "N/A / Locked"],
  },
  {
    vector: "Price",
    cells: ["$499 Turnkey (or $297 DIY)", "~$150-$400", "$900-$2,500", "$500+"],
  },
] as const

const wrap: CSSProperties = {
  background: "#0A0B0F",
  color: "#E7ECF3",
  overflowX: "auto",
  scrollbarGutter: "stable",
}

const table: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(18, 20, 28, 0.72)",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.68rem, 0.64rem + 0.15vw, 0.8rem)",
}

const cell: CSSProperties = {
  border: "1px solid rgba(231, 236, 243, 0.12)",
  padding: "8px 10px",
  textAlign: "left",
  verticalAlign: "top",
}

export function CompetitorMatrix() {
  return (
    <section data-matrix="competitors" style={wrap}>
      <h2 style={{ fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif' }}>Competitor teardown</h2>
      <table style={table}>
        <thead>
          <tr>
            <th style={cell}>Vector</th>
            {PLATFORMS.map((platform) => (
              <th key={platform} data-platform={platform} style={cell}>
                {platform}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.vector} data-vector={row.vector}>
              <th style={cell}>{row.vector}</th>
              {row.cells.map((value, index) => (
                <td key={PLATFORMS[index]} style={{ ...cell, color: index === 0 ? "#34D399" : "#E7ECF3" }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
