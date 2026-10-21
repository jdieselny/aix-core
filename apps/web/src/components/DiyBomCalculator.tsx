import type { CSSProperties } from "react"
import { InteractiveHardwareInspector } from "./InteractiveHardwareInspector.js"

export const PUBLISHED_DIY_CENTS = 29700
export const TURNKEY_CENTS = 49900

export const DIY_PARTS = [
  { id: "n100", label: "Intel N100 Quad-Core Mini-PC", cents: 13000 },
  { id: "nvme", label: "1TB TLC Industrial NVMe", cents: 4200 },
  { id: "radio", label: "ESP32-WROOM Microwave CSI + BLE", cents: 1800 },
  { id: "scd41", label: "Sensirion SCD41 CO2 Sensor", cents: 2200 },
  { id: "sht45", label: "Sensirion SHT45 Temp/RH", cents: 480 },
  { id: "par", label: "Calibrated PAR Quantum Photodiode", cents: 750 },
  { id: "contactor", label: "40A Contactor & 95°F Thermal Cutoff", cents: 1650 },
  { id: "enclosure", label: "Custom Enclosure & Cables", cents: 1400 },
] as const

export type DiyPartId = (typeof DIY_PARTS)[number]["id"]

const TURNKEY = [
  "Pre-assembled, CNC anodized aluminum chassis",
  "48-Hour burned-in stress test passed",
  "Factory-calibrated Sensirion sensors with zero calibration drift",
  "Pre-enrolled cryptographic key on hardened OS",
  "Zero-Touch BLE setup via phone in 60s",
  "1-Year hardware replacement warranty and operator support",
] as const

const frame: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  gap: 16,
  background: "#0A0B0F",
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const column: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(231, 236, 243, 0.12)",
  borderRadius: 16,
  padding: 16,
  display: "grid",
  gap: 8,
}

const price: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(1.3rem, 1rem + 1vw, 1.8rem)",
  color: "#34D399",
}

const line: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.72rem, 0.68rem + 0.15vw, 0.85rem)",
}

const order: CSSProperties = {
  justifySelf: "start",
  background: "#34D399",
  color: "#0A0B0F",
  border: 0,
  borderRadius: 999,
  padding: "12px 16px",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
}

export function formatUsd(cents: number): string {
  const dollars = Math.trunc(cents / 100)
  const rem = Math.abs(cents % 100)
  return `$${dollars}.${String(rem).padStart(2, "0")}`
}

export function selectedPartsCents(omit: readonly string[]): number {
  const dropped = new Set(omit)
  return DIY_PARTS.reduce((sum, part) => (dropped.has(part.id) ? sum : sum + part.cents), 0)
}

export function DiyBomCalculator({ omit = [] }: { omit?: readonly string[] }) {
  const dropped = new Set(omit)
  const selected = selectedPartsCents(omit)
  return (
    <section data-calculator="diy-bom" style={frame}>
      <style>{`:target { outline: 2px solid #34D399; background: rgba(52, 211, 153, 0.16); }`}</style>
      <div style={{ gridColumn: "1 / -1" }}>
        <InteractiveHardwareInspector />
      </div>
      <article data-column="diy" style={column}>
        <h2 style={{ margin: 0 }}>Build It Yourself (DIY)</h2>
        <p data-diy-total="297.00" style={price}>
          DIY total: {formatUsd(PUBLISHED_DIY_CENTS)} USD
        </p>
        <ul>
          {DIY_PARTS.map((part) => {
            const on = !dropped.has(part.id)
            return (
              <li
                key={part.id}
                id={`diy-${part.id}`}
                data-part={part.id}
                data-checked={on ? "true" : "false"}
                style={line}
              >
                <label>
                  <input type="checkbox" defaultChecked={on} /> {part.label}: {formatUsd(part.cents)}
                </label>
              </li>
            )
          })}
        </ul>
        <p style={line}>Soldering, flashing OS, compiling systemd, and calibrating: ~12 hours of your time</p>
        <p data-selected-parts={formatUsd(selected)} style={line}>
          Selected parts: {formatUsd(selected)}
        </p>
        <p style={line}>Listed part prices sum to {formatUsd(selectedPartsCents([]))}. The published DIY column is {formatUsd(PUBLISHED_DIY_CENTS)}.</p>
      </article>
      <article data-column="turnkey" style={column}>
        <h2 style={{ margin: 0 }}>Turnkey A:iG Appliance</h2>
        <p data-turnkey-total="499.00" style={{ ...price, color: "#38BDF8" }}>
          {formatUsd(TURNKEY_CENTS)} USD
        </p>
        <ul>
          {TURNKEY.map((item, index) => (
            <li key={item} id={index === 0 ? "diy-pin-relays" : undefined} style={line}>
              {item}
            </li>
          ))}
        </ul>
        <label htmlFor="checkout-open" data-checkout="1-tap" style={{ ...order, cursor: "pointer" }}>
          [ Order Turnkey A:iG Appliance - $499 ]
        </label>
      </article>
    </section>
  )
}
