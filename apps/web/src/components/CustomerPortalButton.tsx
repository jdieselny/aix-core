import type { CSSProperties } from "react"

const BADGES = [
  "1-Click Subscription Cancellation",
  "1-Click Pause (No Phone Calls)",
  "Instant PDF Invoice & Receipt Download",
  "Transfer Machine Lease to New Node",
] as const

const frame: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(52, 211, 153, 0.45)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 10,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
  maxWidth: 420,
}

const action: CSSProperties = {
  justifySelf: "start",
  color: "#0A0B0F",
  background: "#34D399",
  textDecoration: "none",
  borderRadius: 999,
  padding: "12px 16px",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 13,
}

const badge: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  color: "#34D399",
}

export function CustomerPortalButton() {
  return (
    <section data-portal="billing" style={frame}>
      <a href="/account/billing" style={action}>
        [ MANAGE BILLING & NODE LEASES → ]
      </a>
      <ul>
        {BADGES.map((item) => (
          <li key={item} style={badge}>
            {item}
          </li>
        ))}
      </ul>
      <p style={{ ...badge, color: "#E7ECF3" }}>Zero retention hostage tricks. True operator sovereignty.</p>
    </section>
  )
}
