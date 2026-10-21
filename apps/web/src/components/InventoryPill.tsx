import type { CSSProperties } from "react"

export type ShelfStatus = "IN_STOCK" | "LOW_STOCK" | "BACKORDER"

export interface ShelfBadge {
  status: ShelfStatus
  label: string
  color: "#34D399" | "#FBBF24" | "#FF334B"
}

const IN_STOCK = "[2 UNITS PRE-ASSEMBLED & BURNED IN — SHIPS IN 24H]"
const LOW_STOCK = "[ONLY 1 UNIT LEFT ON SHELF — SHIPS TODAY]"
const BACKORDER = "[BUILT TO ORDER — SHIPS IN 4-6 BUSINESS DAYS]"

export function shelfBadge(stock: number): ShelfBadge {
  if (Number.isSafeInteger(stock) && stock >= 2) {
    return { status: "IN_STOCK", label: IN_STOCK, color: "#34D399" }
  }
  if (stock === 1) {
    return { status: "LOW_STOCK", label: LOW_STOCK, color: "#FBBF24" }
  }
  return { status: "BACKORDER", label: BACKORDER, color: "#FF334B" }
}

const pill: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.68rem, 0.64rem + 0.2vw, 0.8rem)",
  letterSpacing: "0.04em",
  border: "1px solid currentColor",
  borderRadius: 999,
  padding: "6px 10px",
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
}

export function InventoryPill({ stock }: { stock: number }) {
  const badge = shelfBadge(stock)
  return (
    <p
      data-inventory={badge.status}
      data-stock={Number.isSafeInteger(stock) ? String(stock) : "invalid"}
      style={{ ...pill, color: badge.color }}
    >
      {badge.label}
    </p>
  )
}
