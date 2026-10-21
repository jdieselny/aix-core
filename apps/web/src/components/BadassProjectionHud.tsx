"use client"

import { useEffect, useState } from "react"

/** Sovereign Cyber Red, Botanical Emerald, Deep Obsidian. No baby blue. */
export const CYBER_RED = "#FF334B"
export const EMERALD = "#34D399"
export const OBSIDIAN = "#0A0B0F"

export const PROJECTION_IMAGE = "/hardware/bad_ass_projection_display.jpg"
export const QUICK_ADD_SECONDS = 15 * 60

export type ProjectionMode = "HUD Overlay Mode" | "Cinema Pure HUD Mode"
export type TimerBadge = "PENDING" | "STABILIZING" | "READY FOR INSPECTION"
export type ProjectionRow = "Row 1" | "Row 2" | "Row 3" | "Row 4"

export const PROJECTION_ROWS: readonly ProjectionRow[] = ["Row 1", "Row 2", "Row 3", "Row 4"]

export interface WaitTimer {
  id: string
  table: string
  detail: string
  remainingSeconds: number
  totalSeconds: number
  ticking: boolean
}

export const DEFAULT_WAIT_TIMERS: readonly WaitTimer[] = [
  {
    id: "table-3",
    table: "Table 3",
    detail: "20 min (pH stabilization check)",
    remainingSeconds: 20 * 60,
    totalSeconds: 20 * 60,
    ticking: false,
  },
  {
    id: "table-9",
    table: "Table 9",
    detail: "2 hrs (CalMag dissolution & EC settle)",
    remainingSeconds: 2 * 60 * 60,
    totalSeconds: 2 * 60 * 60,
    ticking: true,
  },
  {
    id: "table-12",
    table: "Table 12",
    detail: "45 min (Silica pre-mix buffer)",
    remainingSeconds: 45 * 60,
    totalSeconds: 45 * 60,
    ticking: false,
  },
]

export function rowLuminosity(dimmed: boolean): 20 | 100 {
  return dimmed ? 20 : 100
}

export function timerBadge(timer: Pick<WaitTimer, "remainingSeconds" | "ticking">): TimerBadge {
  if (timer.remainingSeconds <= 0) {
    return "READY FOR INSPECTION"
  }
  if (timer.ticking) {
    return "STABILIZING"
  }
  return "PENDING"
}

function formatCountdown(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const remain = whole % 60
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, "0")}m ${remain.toString().padStart(2, "0")}s`
  }
  return `${minutes}m ${remain.toString().padStart(2, "0")}s`
}

export function BadassProjectionHud() {
  const [mode, setMode] = useState<ProjectionMode>("HUD Overlay Mode")
  const [dimmedRows, setDimmedRows] = useState<Record<ProjectionRow, boolean>>({
    "Row 1": false,
    "Row 2": false,
    "Row 3": false,
    "Row 4": false,
  })
  const [timers, setTimers] = useState<WaitTimer[]>(DEFAULT_WAIT_TIMERS.map((timer) => ({ ...timer })))

  useEffect(() => {
    const handle = setInterval(() => {
      setTimers((current) =>
        current.map((timer) => {
          if (!timer.ticking || timer.remainingSeconds <= 0) {
            return timer
          }
          return { ...timer, remainingSeconds: timer.remainingSeconds - 1 }
        }),
      )
    }, 1000)
    return () => clearInterval(handle)
  }, [])

  const cinema = mode === "Cinema Pure HUD Mode"

  return (
    <section
      data-projection="badass"
      data-mode={cinema ? "cinema-pure" : "hud-overlay"}
      aria-label="150 inch B.A.D.-A.S.S. wall projection simulator"
      style={{
        background: OBSIDIAN,
        color: "#E7ECF3",
        border: "1px solid var(--aix-border, rgba(255, 51, 75, 0.2))",
        borderRadius: 16,
        padding: "1.25rem",
        display: "grid",
        gap: "1rem",
        fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
      }}
    >
      <header style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem" }}>
        <div>
          <div style={{ color: CYBER_RED, fontWeight: 800, letterSpacing: "0.06em" }}>
            B.A.D.-A.S.S. 150&quot; WALL PROJECTION
          </div>
          <div style={{ color: "#9AA3B5", fontSize: "0.8rem", marginTop: "0.25rem" }}>
            Optical zone dimmer · on-the-fly nutrient mixing timers
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            type="button"
            data-mode-toggle="hud-overlay"
            onClick={() => setMode("HUD Overlay Mode")}
            style={{
              background: mode === "HUD Overlay Mode" ? CYBER_RED : "transparent",
              color: mode === "HUD Overlay Mode" ? OBSIDIAN : "#E7ECF3",
              border: `1px solid ${CYBER_RED}`,
              borderRadius: 8,
              padding: "0.4rem 0.7rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            HUD Overlay Mode
          </button>
          <button
            type="button"
            data-mode-toggle="cinema-pure"
            onClick={() => setMode("Cinema Pure HUD Mode")}
            style={{
              background: cinema ? EMERALD : "transparent",
              color: cinema ? OBSIDIAN : "#E7ECF3",
              border: `1px solid ${EMERALD}`,
              borderRadius: 8,
              padding: "0.4rem 0.7rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Cinema Pure HUD Mode
          </button>
        </div>
      </header>

      <div
        data-wall="150"
        style={{
          position: "relative",
          minHeight: 220,
          borderRadius: 12,
          overflow: "hidden",
          background: OBSIDIAN,
          border: `1px solid ${cinema ? EMERALD : CYBER_RED}`,
        }}
      >
        {cinema ? null : (
          <img
            src={PROJECTION_IMAGE}
            alt="150 inch ultra-wide-throw cultivation wall projection"
            style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
          />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            position: cinema ? "relative" : "absolute",
            inset: cinema ? undefined : 0,
            minHeight: cinema ? 180 : undefined,
          }}
        >
          {PROJECTION_ROWS.map((row) => {
            const luminosity = rowLuminosity(dimmedRows[row])
            return (
              <div
                key={row}
                data-row={row}
                data-luminosity={luminosity}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "0.75rem",
                  background: luminosity === 20 ? "rgba(10, 11, 15, 0.82)" : "rgba(10, 11, 15, 0.28)",
                  color: luminosity === 20 ? EMERALD : "#F8FAFC",
                  fontWeight: 800,
                }}
              >
                {row} · {luminosity}%
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} aria-label="Optical zone dimmer">
        {PROJECTION_ROWS.map((row) => {
          const dimmed = dimmedRows[row]
          return (
            <button
              key={row}
              type="button"
              data-dim-row={row}
              aria-pressed={dimmed}
              onClick={() => setDimmedRows((current) => ({ ...current, [row]: !current[row] }))}
              style={{
                background: dimmed ? "rgba(255, 51, 75, 0.18)" : "rgba(52, 211, 153, 0.12)",
                color: dimmed ? CYBER_RED : EMERALD,
                border: `1px solid ${dimmed ? CYBER_RED : EMERALD}`,
                borderRadius: 8,
                padding: "0.4rem 0.7rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {dimmed ? `Dim ${row} to 20%` : `${row} at 100%`}
            </button>
          )
        })}
      </div>

      <div data-timers="on-the-fly" style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ color: CYBER_RED, fontWeight: 800 }}>ON-THE-FLY WAIT TIMERS</div>
        {timers.map((timer) => {
          const badge = timerBadge(timer)
          return (
            <article
              key={timer.id}
              data-timer={timer.id}
              data-badge={badge}
              style={{
                background: "var(--aix-card, rgba(18, 20, 29, 0.8))",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--aix-border, rgba(255, 51, 75, 0.2))",
                borderRadius: 12,
                padding: "0.85rem 1rem",
                display: "grid",
                gap: "0.45rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                <strong>
                  {timer.table}: {timer.detail}
                </strong>
                <span style={{ color: badge === "READY FOR INSPECTION" ? EMERALD : CYBER_RED }}>{badge}</span>
              </div>
              <div data-countdown={timer.id} style={{ fontSize: "1.25rem", fontWeight: 800 }}>
                {formatCountdown(timer.remainingSeconds)}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() =>
                    setTimers((current) =>
                      current.map((item) =>
                        item.id === timer.id
                          ? {
                              ...item,
                              remainingSeconds: item.remainingSeconds + QUICK_ADD_SECONDS,
                              totalSeconds: item.totalSeconds + QUICK_ADD_SECONDS,
                              ticking: true,
                            }
                          : item,
                      ),
                    )
                  }
                  style={{
                    background: CYBER_RED,
                    color: OBSIDIAN,
                    border: "none",
                    borderRadius: 8,
                    padding: "0.35rem 0.65rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  [ + Quick 15m ]
                </button>
                <button
                  type="button"
                  onClick={() => setTimers((current) => current.filter((item) => item.id !== timer.id))}
                  style={{
                    background: "transparent",
                    color: "#E7ECF3",
                    border: `1px solid ${CYBER_RED}`,
                    borderRadius: 8,
                    padding: "0.35rem 0.65rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  [ Dismiss ]
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
