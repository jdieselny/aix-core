"use client"

import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { REFERRAL_STORAGE_KEY, resolveReferral } from "../lib/referral_tracker.js"

const note: CSSProperties = {
  margin: 0,
  color: "#34D399",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
}

export function CheckoutReferralNote() {
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const resolved = resolveReferral({
      search: "",
      sessionRaw: window.sessionStorage.getItem(REFERRAL_STORAGE_KEY),
      localRaw: window.localStorage.getItem(REFERRAL_STORAGE_KEY),
    })
    setCode(resolved?.discountEligible ? resolved.code : null)
  }, [])

  if (!code) return null
  return (
    <p data-referral-code={code} style={note}>
      Cultivator pass {code} is attached to this checkout.
    </p>
  )
}
