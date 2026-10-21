/** Cultivator and seed-bank affiliate engine. Hardware rev-share is 10%. */

export const AFFILIATE_REV_SHARE = 0.1

export const SEED_VOUCHER_PERK = "free J Diesel NY 3-pack seed voucher"

export interface AffiliatePartner {
  code: string
  partner: string
  perk: string
}

export const AFFILIATE_PARTNERS: readonly AffiliatePartner[] = [
  { code: "JDIESEL10", partner: "J Diesel NY", perk: SEED_VOUCHER_PERK },
  { code: "MARTY9L", partner: "Marty 9-Lighter", perk: SEED_VOUCHER_PERK },
  { code: "MICROGROW10", partner: "r/microgrowery", perk: SEED_VOUCHER_PERK },
]

export interface AffiliateValidation {
  valid: boolean
  code: string
  partner: string | null
  perk: string | null
}

export interface AffiliateCommission {
  valid: boolean
  code: string
  partner: string | null
  perk: string | null
  rate: number
  orderSubtotalUsd: number
  commissionUsd: number
  ledger: PayoutLedgerLine[]
}

export interface PayoutLedgerLine {
  code: string
  partner: string
  orderSubtotalUsd: number
  commissionUsd: number
  rate: number
  perk: string
}

const PARTNER_BY_CODE = new Map(AFFILIATE_PARTNERS.map((row) => [row.code, row]))

export function validateAffiliateCode(code: string): AffiliateValidation {
  const normalized = code.trim().toUpperCase()
  const partner = PARTNER_BY_CODE.get(normalized)
  if (!partner) {
    return { valid: false, code: normalized, partner: null, perk: null }
  }
  return { valid: true, code: partner.code, partner: partner.partner, perk: partner.perk }
}

function money(cents: number): number {
  return Math.round(cents) / 100
}

export function calculateAffiliateCommission(orderSubtotalUsd: number, code: string): AffiliateCommission {
  const validation = validateAffiliateCode(code)
  const subtotalCents = Number.isFinite(orderSubtotalUsd) ? Math.round(orderSubtotalUsd * 100) : 0
  const safeSubtotal = Math.max(0, subtotalCents)
  const commissionCents = validation.valid ? Math.round(safeSubtotal * AFFILIATE_REV_SHARE) : 0
  const commissionUsd = money(commissionCents)
  const orderSubtotal = money(safeSubtotal)
  const ledger: PayoutLedgerLine[] = validation.valid
    ? [
        {
          code: validation.code,
          partner: validation.partner ?? "",
          orderSubtotalUsd: orderSubtotal,
          commissionUsd,
          rate: AFFILIATE_REV_SHARE,
          perk: validation.perk ?? SEED_VOUCHER_PERK,
        },
      ]
    : []
  return {
    valid: validation.valid,
    code: validation.code,
    partner: validation.partner,
    perk: validation.perk,
    rate: AFFILIATE_REV_SHARE,
    orderSubtotalUsd: orderSubtotal,
    commissionUsd,
    ledger,
  }
}

export function buildAffiliatePayoutLedger(lines: readonly PayoutLedgerLine[]): {
  lines: PayoutLedgerLine[]
  totalCommissionUsd: number
} {
  const totalCents = lines.reduce((sum, line) => sum + Math.round(line.commissionUsd * 100), 0)
  return { lines: [...lines], totalCommissionUsd: money(totalCents) }
}
