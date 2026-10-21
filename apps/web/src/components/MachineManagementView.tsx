"use client"

import { useState } from "react"

const CYBER_RED = "#FF334B"
const EMERALD = "#34D399"
const OBSIDIAN = "#0A0B0F"

export const LICENSE_BOOTSTRAP =
  "curl -sSL https://get.aix-core.com | sh -s -- --license-key=AIX-PRO-2026-XXXX"

export const TOKEN_BOOTSTRAP =
  "curl -sSL https://get.aix-core.com | sh -s -- --token=<JWT>"

export const NEVER_KILL_GUARANTEE =
  "Local PID climate, Mars Hydro PAR curves, and Chernobyl thermal breakers execute 100% offline in perpetuity."

interface Appliance {
  id: string
  title: string
  mac: string
  uuid: string
  nodes: number
  tier: string
  heartbeat: string
}

const APPLIANCES: readonly Appliance[] = [
  {
    id: "aig-01",
    title: "Qotom J1900 Turnkey Core",
    mac: "02:A1:60:00:00:01",
    uuid: "hw-aig-01",
    nodes: 4,
    tier: "TIER_PRO",
    heartbeat: "LIVE",
  },
  {
    id: "aig-wlc-01",
    title: "Cisco 3504 RF Radar Controller",
    mac: "02:A1:60:00:00:02",
    uuid: "hw-wlc-01",
    nodes: 2,
    tier: "TIER_COMMERCIAL",
    heartbeat: "LIVE",
  },
  {
    id: "esp32-par-01",
    title: "Flood Table Photon Node",
    mac: "02:A1:60:00:00:03",
    uuid: "hw-par-01",
    nodes: 1,
    tier: "TIER_PRO",
    heartbeat: "LIVE",
  },
]

export function MachineManagementView() {
  const [copied, setCopied] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [targetUuid, setTargetUuid] = useState("")

  async function copyBootstrap() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(LICENSE_BOOTSTRAP)
    }
    setCopied(true)
  }

  function downloadLicense() {
    const body = JSON.stringify(
      {
        path: "/etc/aix/license.jwt",
        local_actuation_allowed: true,
        policy: "NEVER_KILL_A_CROP_V1",
      },
      null,
      2,
    )
    const blob = new Blob([body], { type: "application/jwt" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "license.jwt"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section
      data-portal="machines"
      style={{
        background: OBSIDIAN,
        color: "#E7ECF3",
        display: "grid",
        gap: "1rem",
        fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
      }}
    >
      <header style={{ display: "grid", gap: "0.35rem" }}>
        <div style={{ color: CYBER_RED, fontWeight: 800 }}>REGISTERED A:iG APPLIANCES</div>
        <p
          data-guarantee="never-kill-a-crop"
          style={{
            margin: 0,
            color: EMERALD,
            border: `1px solid ${EMERALD}`,
            borderRadius: 10,
            padding: "0.75rem 0.9rem",
          }}
        >
          Never Kill a Crop Hardware Guarantee: {NEVER_KILL_GUARANTEE}
        </p>
      </header>

      {APPLIANCES.map((machine) => (
        <article
          key={machine.id}
          data-machine={machine.id}
          style={{
            background: "var(--aix-card, rgba(18, 20, 29, 0.8))",
            border: "1px solid var(--aix-border, rgba(255, 51, 75, 0.2))",
            borderRadius: 12,
            padding: "0.9rem 1rem",
            display: "grid",
            gap: "0.3rem",
          }}
        >
          <strong>
            {machine.id} // {machine.title}
          </strong>
          <span>MAC {machine.mac}</span>
          <span>UUID {machine.uuid}</span>
          <span>
            Radar mesh nodes {machine.nodes} · {machine.tier} · heartbeat {machine.heartbeat}
          </span>
        </article>
      ))}

      <label style={{ display: "grid", gap: "0.4rem" }}>
        <span style={{ color: "#9AA3B5" }}>Provisioning command</span>
        <code
          data-bootstrap="license-key"
          style={{
            display: "block",
            background: "rgba(18, 20, 29, 0.8)",
            border: `1px solid ${CYBER_RED}`,
            borderRadius: 8,
            padding: "0.75rem",
            overflowX: "auto",
          }}
        >
          {LICENSE_BOOTSTRAP}
        </code>
        <code data-bootstrap="token" style={{ color: "#9AA3B5" }}>
          {TOKEN_BOOTSTRAP}
        </code>
      </label>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => void copyBootstrap()}
          style={{
            background: CYBER_RED,
            color: OBSIDIAN,
            border: "none",
            borderRadius: 8,
            padding: "0.5rem 0.75rem",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {copied ? "Copied" : "Copy bootstrapper"}
        </button>
        <button
          type="button"
          onClick={downloadLicense}
          style={{
            background: "transparent",
            color: EMERALD,
            border: `1px solid ${EMERALD}`,
            borderRadius: 8,
            padding: "0.5rem 0.75rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          [ Download /etc/aix/license.jwt ]
        </button>
        <button
          type="button"
          onClick={() => setTransferOpen(true)}
          style={{
            background: "transparent",
            color: "#E7ECF3",
            border: `1px solid ${CYBER_RED}`,
            borderRadius: 8,
            padding: "0.5rem 0.75rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          [ Transfer Hardware UUID ]
        </button>
      </div>

      {transferOpen ? (
        <form
          data-drawer="transfer-hardware"
          onSubmit={(event) => {
            event.preventDefault()
            setTransferOpen(false)
          }}
          style={{
            background: "rgba(18, 20, 29, 0.8)",
            border: `1px solid ${CYBER_RED}`,
            borderRadius: 12,
            padding: "0.9rem",
            display: "grid",
            gap: "0.5rem",
          }}
        >
          <label>
            Target hardware UUID
            <input
              value={targetUuid}
              onChange={(event) => setTargetUuid(event.target.value)}
              style={{
                display: "block",
                marginTop: "0.35rem",
                width: "100%",
                background: OBSIDIAN,
                color: "#E7ECF3",
                border: `1px solid ${EMERALD}`,
                borderRadius: 8,
                padding: "0.45rem 0.6rem",
              }}
            />
          </label>
          <button type="submit" style={{ justifySelf: "start", cursor: "pointer" }}>
            Hold transfer for operator confirm
          </button>
        </form>
      ) : null}
    </section>
  )
}
