"use client"

import React, { useEffect, useState, type CSSProperties } from "react"

interface TimerItem {
  id: string
  target: string
  action: string
  remainingSeconds: number
  totalSeconds: number
}

const INITIAL_TIMERS: TimerItem[] = [
  { id: "TMR-103882", target: "Table 3", action: "pH check ring me (dry salts dissolved)", remainingSeconds: 1124, totalSeconds: 1200 },
  { id: "TMR-104150", target: "Table 9", action: "come back out don't let me forget", remainingSeconds: 7118, totalSeconds: 7200 },
  { id: "TMR-104199", target: "Table 1", action: "silica buffer stabilization check", remainingSeconds: 285, totalSeconds: 900 },
]

export function BadassHudView() {
  const [layoutMode, setLayoutMode] = useState<"default" | "split" | "radar">("split")
  const [row3Dimmed, setRow3Dimmed] = useState(true)
  const [timers, setTimers] = useState<TimerItem[]>(INITIAL_TIMERS)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
      setTimers((prev) =>
        prev.map((t) => ({
          ...t,
          remainingSeconds: Math.max(0, t.remainingSeconds - 1),
        }))
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`
    return `${m}m ${s.toString().padStart(2, "0")}s`
  }

  return (
    <main
      data-view="badass-hud"
      style={{
        minHeight: "100vh",
        background: "#07080B",
        color: "#E7ECF3",
        fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
        padding: "clamp(1rem, 2vw, 2.5rem)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Top Banner & Voice Command Bar */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="/"
            style={{
              color: "#34D399",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "clamp(1rem, 1.2vw, 1.4rem)",
              letterSpacing: "0.08em",
            }}
          >
            A:iX CORE // B.A.D.-A.S.S.
          </a>
          <span
            style={{
              background: "rgba(52, 211, 153, 0.15)",
              color: "#34D399",
              border: "1px solid rgba(52, 211, 153, 0.4)",
              borderRadius: 6,
              padding: "0.2rem 0.6rem",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            BIG ASS DISPLAY · AUTOMATED SELECTIVE SHOWCASE
          </span>
          <span
            style={{
              background: "rgba(255, 51, 75, 0.15)",
              color: "#FF334B",
              border: "1px solid rgba(255, 51, 75, 0.3)",
              borderRadius: 6,
              padding: "0.2rem 0.6rem",
              fontSize: "0.75rem",
            }}
          >
            PILOT 001: MARTY 9-LIGHTER
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F8FAFC" }}>
              {now.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
              {now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>
      </header>

      {/* Voice Simulation & Control Pill Ribbon */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          background: "rgba(18, 20, 28, 0.8)",
          padding: "0.75rem 1.25rem",
          borderRadius: 12,
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>
            VOICE COMMAND PROFILES:
          </span>
          <button
            onClick={() => {
              setLayoutMode("split")
              setRow3Dimmed(true)
            }}
            style={{
              background: layoutMode === "split" ? "#34D399" : "rgba(255, 255, 255, 0.06)",
              color: layoutMode === "split" ? "#07080B" : "#E2E8F0",
              border: "none",
              borderRadius: 6,
              padding: "0.35rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            &quot;Agent Smith, put scheduler on right &amp; toss wait timers on screen&quot;
          </button>
          <button
            onClick={() => {
              setLayoutMode("default")
            }}
            style={{
              background: layoutMode === "default" ? "#FF334B" : "rgba(255, 255, 255, 0.06)",
              color: layoutMode === "default" ? "#07080B" : "#E2E8F0",
              border: "none",
              borderRadius: 6,
              padding: "0.35rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            &quot;Agent Smith, show standard cockpit&quot;
          </button>
          <button
            onClick={() => {
              setLayoutMode("radar")
            }}
            style={{
              background: layoutMode === "radar" ? "#F59E0B" : "rgba(255, 255, 255, 0.06)",
              color: layoutMode === "radar" ? "#07080B" : "#E2E8F0",
              border: "none",
              borderRadius: 6,
              padding: "0.35rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            &quot;Agent Smith, full-screen radar sweep&quot;
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>ROW 3 OPTICAL ZONE:</span>
          <button
            onClick={() => setRow3Dimmed(!row3Dimmed)}
            style={{
              background: row3Dimmed ? "rgba(52, 211, 153, 0.2)" : "rgba(245, 158, 11, 0.2)",
              color: row3Dimmed ? "#34D399" : "#F59E0B",
              border: `1px solid ${row3Dimmed ? "#34D399" : "#F59E0B"}`,
              borderRadius: 6,
              padding: "0.25rem 0.6rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {row3Dimmed ? "DIMMED TO 15% (HIGH CONTRAST)" : "100% UNATTENUATED"}
          </button>
        </div>
      </div>

      {/* Main Tactical Grid Display (120"-200" Projection Ready) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            layoutMode === "radar"
              ? "1fr"
              : layoutMode === "split"
              ? "minmax(280px, 1fr) minmax(360px, 1.4fr) minmax(280px, 1fr)"
              : "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
          flex: 1,
        }}
      >
        {/* Quadrant 1: Canopy Climate & DLI Photons */}
        <section
          style={{
            background: "rgba(18, 20, 28, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 16,
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "#34D399", fontWeight: 700 }}>
              [ CANOPY CLIMATE COCKPIT ]
            </span>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>SNIFFER POD 1</span>
          </div>

          {/* Primary VPD Gauge */}
          <div
            style={{
              background: "#0D0F16",
              borderRadius: 12,
              padding: "1rem",
              textAlign: "center",
              border: "1px solid rgba(52, 211, 153, 0.2)",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#94A3B8", letterSpacing: "0.05em" }}>
              LEAF-TO-AIR VPD
            </div>
            <div style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, color: "#34D399" }}>
              1.28 <span style={{ fontSize: "1.2rem", fontWeight: 400 }}>kPa</span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#34D399" }}>TARGET: 1.25 - 1.35 kPa · OPTIMAL FLOWER</div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{ background: "#0D0F16", padding: "0.75rem", borderRadius: 8 }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>CANOPY TEMP</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F8FAFC" }}>77.4°F</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Leaf: 75.1°F (-2.3°F)</div>
            </div>
            <div style={{ background: "#0D0F16", padding: "0.75rem", borderRadius: 8 }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>RELATIVE HUMIDITY</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#FF334B" }}>62.1%</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Quest Dehum Idle</div>
            </div>
            <div style={{ background: "#0D0F16", padding: "0.75rem", borderRadius: 8 }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>ATMOSPHERIC CO2</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#A78BFA" }}>1,180</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Solenoid Gated ON</div>
            </div>
            <div style={{ background: "#0D0F16", padding: "0.75rem", borderRadius: 8 }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>ACCUMULATED DLI</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F59E0B" }}>38.4</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Target 42.0 mol/m² (91%)</div>
            </div>
          </div>

          {/* Fail-Safe Thermal Status */}
          <div
            style={{
              marginTop: "auto",
              padding: "0.75rem",
              background: "rgba(52, 211, 153, 0.08)",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              borderRadius: 8,
              fontSize: "0.75rem",
            }}
          >
            <div style={{ fontWeight: 700, color: "#34D399" }}>95°F CHERNOBYL COIL: ARMED</div>
            <div style={{ fontSize: "0.65rem", color: "#94A3B8", marginTop: "0.2rem" }}>
              Mechanical bimetal snap circuit closed. Instantaneous hardware cutoff verified.
            </div>
          </div>
        </section>

        {/* Quadrant 2: Multi-Reservoir Wait Timers & Dissolution Engine */}
        {(layoutMode === "default" || layoutMode === "split") && (
          <section
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 16,
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#FF334B", fontWeight: 700 }}>
                [ MULTI-RESERVOIR BATCH TIMERS // DRY SALTS ]
              </span>
              <span style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700 }}>
                {timers.filter((t) => t.remainingSeconds > 0).length} ACTIVE TIMERS
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
              {timers.map((t) => {
                const progressPct = ((t.totalSeconds - t.remainingSeconds) / t.totalSeconds) * 100
                const isUrgent = t.remainingSeconds < 300 && t.remainingSeconds > 0
                return (
                  <div
                    key={t.id}
                    style={{
                      background: isUrgent ? "rgba(245, 158, 11, 0.12)" : "#0D0F16",
                      border: `1px solid ${isUrgent ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.06)"}`,
                      borderRadius: 12,
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#F8FAFC" }}>
                          {t.target}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "#64748B", marginLeft: "0.5rem" }}>
                          [{t.id}]
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: isUrgent ? "#F59E0B" : "#FF334B",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {formatTimer(t.remainingSeconds)}
                      </div>
                    </div>

                    <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{t.action}</div>

                    {/* Progress bar */}
                    <div style={{ height: 4, background: "rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${progressPct}%`,
                          background: isUrgent ? "#F59E0B" : "#FF334B",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Root-Zone Dryback Pods Subpanel */}
            <div
              style={{
                marginTop: "auto",
                background: "#0D0F16",
                borderRadius: 12,
                padding: "0.85rem",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
                WIRELESS DRYBACK PODS (21700 LI-ION // FLOOD TABLES)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", fontSize: "0.75rem" }}>
                <div>
                  <div style={{ color: "#64748B" }}>TABLE 1</div>
                  <div style={{ fontWeight: 700, color: "#F8FAFC" }}>58.4% VWC</div>
                  <div style={{ fontSize: "0.65rem", color: "#34D399" }}>Optimal Dryback</div>
                </div>
                <div>
                  <div style={{ color: "#64748B" }}>TABLE 2</div>
                  <div style={{ fontWeight: 700, color: "#F8FAFC" }}>61.2% VWC</div>
                  <div style={{ fontSize: "0.65rem", color: "#FF334B" }}>Field Capacity</div>
                </div>
                <div>
                  <div style={{ color: "#64748B" }}>TABLE 3</div>
                  <div style={{ fontWeight: 700, color: "#F59E0B" }}>34.1% VWC</div>
                  <div style={{ fontSize: "0.65rem", color: "#F59E0B" }}>Pulse Near (32%)</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quadrant 3: Sovereign Scheduler & Microwave Radar */}
        {(layoutMode === "default" || layoutMode === "split" || layoutMode === "radar") && (
          <section
            style={{
              background: "rgba(18, 20, 28, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 16,
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#A78BFA", fontWeight: 700 }}>
                [ SOVEREIGN SCHEDULE &amp; RADAR ]
              </span>
              <span
                style={{
                  background: "rgba(167, 139, 250, 0.15)",
                  color: "#A78BFA",
                  padding: "0.15rem 0.5rem",
                  borderRadius: 4,
                  fontSize: "0.7rem",
                }}
              >
                12/12 BLOOM CYCLE
              </span>
            </div>

            {/* 12/12 Photoperiod Lock Law Card */}
            <div
              style={{
                background: "#0D0F16",
                borderRadius: 12,
                padding: "1rem",
                border: "1px solid rgba(167, 139, 250, 0.2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>PHOTOPERIOD WINDOW</span>
                <span style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700 }}>ACTIVE DAY</span>
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#F8FAFC" }}>
                06:00 <span style={{ color: "#64748B", fontSize: "1rem" }}>→</span> 18:00
              </div>
              <div style={{ fontSize: "0.75rem", color: "#A78BFA", marginTop: "0.3rem" }}>
                Remaining Light: 03h 48m 12s
              </div>
              <div
                style={{
                  marginTop: "0.6rem",
                  fontSize: "0.7rem",
                  color: "#64748B",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  paddingTop: "0.4rem",
                }}
              >
                🔒 HTTP 423 Hardware Dark-Lock Enforced. Accidental overrides rejected.
              </div>
            </div>

            {/* Fertigation Pulse Timeline */}
            <div
              style={{
                background: "#0D0F16",
                borderRadius: 12,
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#FF334B", fontWeight: 700, marginBottom: "0.4rem" }}>
                FERTIGATION PULSE SEQUENCE
              </div>
              <div style={{ fontSize: "0.85rem", color: "#E2E8F0" }}>
                Next Scheduled Pulse: <span style={{ fontWeight: 700, color: "#FF334B" }}>42m 00s</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.2rem" }}>
                Pulse Volume: 60s runtime @ 2.2 EC · Athena Bloom Line
              </div>
            </div>

            {/* ESP32-WROOM Microwave Spatial Radar Mini-Sweep */}
            <div
              style={{
                background: "#0D0F16",
                borderRadius: 12,
                padding: "1rem",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700 }}>
                  ESP32-WROOM RF RADAR (52 CSI SUBCARRIERS)
                </span>
                <span style={{ fontSize: "0.7rem", color: "#34D399" }}>ZONE: ROOM 1</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#34D399",
                    boxShadow: "0 0 10px #34D399",
                  }}
                />
                <div style={{ fontSize: "0.8rem", color: "#E2E8F0" }}>
                  Operator Present at Table 3 (Resin Hands Active)
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Projection Footer Readout */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "#64748B",
        }}
      >
        <div>
          B.A.D.-A.S.S. ENGINE v1.0.0 · Dual 4K HDMI Output · Turnkey A:iG Sovereign Controller
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <span>LATENCY: 12ms</span>
          <span>MESH: CONNECTED</span>
          <span>TELEMETRY: 1-SEC INTERVAL</span>
        </div>
      </footer>
    </main>
  )
}
