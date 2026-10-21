"use client"

import { useState } from "react"
import type { CSSProperties } from "react"

export const INSPECTOR_PINS = [
  {
    id: "pin-network",
    x: 20,
    y: 48,
    title: "Dual 2.5GbE Ethernet Ports",
    aria: "Dual 2.5GbE Ethernet Ports",
    body: "Dedicated air-gapped Enclave link plus local LAN switch uplink. Zero cloud dependence. Dual stacked shielded 2.5GbE RJ45 ports.",
    bom: "diy-n100",
  },
  {
    id: "pin-thermal",
    x: 40,
    y: 26,
    title: "Anodized CNC Aluminum Chassis",
    aria: "Anodized CNC Aluminum Chassis",
    body: "Micro-fin passive thermal dissipation. Fanless and dust-proof for high-humidity grow rooms.",
    bom: "diy-enclosure",
  },
  {
    id: "pin-radar",
    x: 64,
    y: 64,
    title: "ESP32-S3 Microwave CSI Radar Coprocessor",
    aria: "ESP32-S3 Microwave CSI Radar Coprocessor",
    body: "Non-camera volumetric human presence detection and canopy micro-vibration analysis.",
    bom: "diy-radio",
  },
  {
    id: "pin-chernobyl",
    x: 40,
    y: 80,
    title: "Chernobyl Snap-Action Bimetallic Safety Port",
    aria: "Chernobyl Snap-Action Bimetallic Safety Port (95°F cutoff)",
    body: "Analog bimetallic mechanical kill-switch interface. 95°F emergency circuit breaker.",
    bom: "diy-contactor",
  },
  {
    id: "pin-relays",
    x: 72,
    y: 70,
    title: "Optoisolated 4-Channel Actuator Headers",
    aria: "Optoisolated 4-Channel 24V/120V Actuator Headers",
    body: "24V/120V dry contacts for 4-ton A/C, Quest dehumidifier, CO2 solenoid, and irrigation pumps.",
    bom: "diy-pin-relays",
  },
] as const

const frame: CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  background: "#0A0B0F",
}

const sheet: CSSProperties = {
  display: "grid",
  gap: 8,
  minHeight: "9rem",
  padding: 16,
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(52, 211, 153, 0.45)",
  borderRadius: 16,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const DIAGRAM =
  '<img src="/hardware/aig_exploded_diagram.jpg" alt="A:iG appliance exploded diagram" width="1376" height="768" loading="lazy" decoding="async" sizes="(min-width: 960px) 70vw, 100vw" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain"/>'

export function InteractiveHardwareInspector() {
  const [active, setActive] = useState<(typeof INSPECTOR_PINS)[number]["id"]>("pin-network")
  return (
    <section data-inspector="hardware" data-diagram="aig-exploded" style={{ display: "grid", gap: 12 }}>
      <div data-aspect="16/9" style={frame}>
        <div dangerouslySetInnerHTML={{ __html: DIAGRAM }} />
        {INSPECTOR_PINS.map((item) => {
          const on = item.id === active
          const pinStyle: CSSProperties = {
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: 44,
            height: 44,
            transform: "translate(-50%, -50%)",
            borderRadius: 999,
            border: "2px solid #34D399",
            background: on ? "#34D399" : "rgba(10, 11, 15, 0.72)",
            boxShadow: on ? "0 0 16px #34D399" : "none",
            color: on ? "#0A0B0F" : "#34D399",
            cursor: "pointer",
          }
          return (
            <button
              key={item.id}
              id={item.id}
              type="button"
              data-pin={item.id}
              data-x={item.x}
              data-y={item.y}
              aria-label={item.aria}
              aria-pressed={on}
              onClick={() => setActive(item.id)}
              style={pinStyle}
            />
          )
        })}
      </div>
      {INSPECTOR_PINS.map((item) => {
        const on = item.id === active
        return (
          <aside
            key={item.id}
            data-sheet={item.id}
            hidden={!on}
            style={{ ...sheet, display: on ? "grid" : "none" }}
          >
            <h2 style={{ margin: 0, fontSize: "1.05rem" }}>{item.title}</h2>
            <p style={{ margin: 0, fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "0.85rem" }}>
              {item.body}
            </p>
            <a href={`#${item.bom}`} data-bom-link={item.id} style={{ color: "#34D399" }}>
              [ View in DIY BOM Calculator ($297) ]
            </a>
          </aside>
        )
      })}
    </section>
  )
}
