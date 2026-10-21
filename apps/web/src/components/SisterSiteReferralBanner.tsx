"use client"

import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import {
  CULTIVATOR_BADGE,
  CULTIVATOR_BANNER,
  type ReferralData,
  isDismissed,
  markDismissed,
  parseReferralSearch,
  resolveReferral,
  writeReferral,
  REFERRAL_STORAGE_KEY,
} from "../lib/referral_tracker.js"

const bar: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,
  padding: "10px 16px",
  background: "rgba(18, 20, 28, 0.92)",
  color: "#E7ECF3",
  borderBottom: "1px solid #34D399",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.68rem, 0.64rem + 0.2vw, 0.82rem)",
}

const badge: CSSProperties = {
  margin: 0,
  color: "#0A0B0F",
  background: "#34D399",
  borderRadius: 999,
  padding: "4px 8px",
}

const dismiss: CSSProperties = {
  marginLeft: "auto",
  background: "transparent",
  color: "#E7ECF3",
  border: "1px solid rgba(231, 236, 243, 0.3)",
  borderRadius: 999,
  padding: "4px 8px",
  cursor: "pointer",
}

export function SisterSiteReferralBanner({
  referral,
  onDismiss,
}: {
  referral: ReferralData | null
  onDismiss?: () => void
}) {
  if (!referral?.discountEligible) return null
  return (
    <aside data-referral="banner" role="status" style={bar}>
      <p data-referral-copy="cultivator" style={{ margin: 0 }}>
        {CULTIVATOR_BANNER}
      </p>
      <p data-badge="op2026" style={badge}>
        {CULTIVATOR_BADGE}
      </p>
      <button type="button" aria-label="Dismiss cultivator pass" onClick={onDismiss} style={dismiss}>
        [×]
      </button>
    </aside>
  )
}

export function ReferralBannerGate() {
  const [referral, setReferral] = useState<ReferralData | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const session = window.sessionStorage
    const local = window.localStorage
    const now = Date.now()
    const fromSearch = parseReferralSearch(window.location.search, now)
    const resolved = fromSearch
      ? fromSearch
      : resolveReferral({
          search: "",
          sessionRaw: session.getItem(REFERRAL_STORAGE_KEY),
          localRaw: local.getItem(REFERRAL_STORAGE_KEY),
        })
    if (resolved) writeReferral(resolved, session, local)
    setReferral(resolved)
    setDismissed(isDismissed(session))
  }, [])

  if (dismissed || !referral) return null
  return (
    <SisterSiteReferralBanner
      referral={referral}
      onDismiss={() => {
        markDismissed(window.sessionStorage)
        setDismissed(true)
      }}
    />
  )
}
