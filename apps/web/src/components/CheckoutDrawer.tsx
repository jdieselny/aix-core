import type { CSSProperties } from "react"
import { CheckoutReferralNote } from "./CheckoutReferralNote.js"

export const PURCHASE_INTENT = "AIP-PURCHASE-INTENT-v1"
export const CART_TOTAL_CENTS = 49900

const RAILS = ["Apple Pay", "Google Pay", "Credit / Debit Card (Stripe Elements)", "Cash App Pay"] as const

const frame: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255, 51, 75, 0.45)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 10,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
  maxWidth: 420,
}

const metric: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
}

const rail: CSSProperties = {
  ...metric,
  border: "1px solid rgba(231, 236, 243, 0.2)",
  borderRadius: 999,
  padding: "8px 12px",
}

const field: CSSProperties = {
  ...metric,
  background: "#0A0B0F",
  color: "#E7ECF3",
  border: "1px solid rgba(231, 236, 243, 0.2)",
  borderRadius: 8,
  padding: "8px 10px",
}

const held: CSSProperties = {
  ...metric,
  color: "#FF334B",
}

export function CheckoutDrawer({ confirmPurchase = false }: { confirmPurchase?: boolean }) {
  return (
    <aside id="checkout" data-drawer="checkout" data-open="true" data-triggers="buy-aig-appliance quick-cart" style={frame}>
      <h2 style={{ margin: 0 }}>1-Tap Checkout</h2>
      <p style={metric}>Opens from [ BUY A:iG APPLIANCE - $499 ] or [ Quick Cart · 1-Tap ].</p>
      <ul data-rails="express">
        {RAILS.map((name) => (
          <li key={name} data-rail={name} style={rail}>
            {name}
          </li>
        ))}
      </ul>
      <label style={metric}>
        Email
        <input type="email" name="email" autoComplete="email" aria-label="Email" style={field} />
      </label>
      <p style={metric}>Email is collected inside the payment element. No account and no password before payment.</p>
      <ul data-cart="summary">
        <li style={metric}>Turnkey A:iG Appliance x 1 - $499.00</li>
        <li style={metric}>Subtotal: $499.00</li>
        <li style={metric}>Tax: $0.00</li>
        <li style={metric}>Domestic shipping: $0.00 Free Shipping</li>
        <li style={metric}>Total: $499.00</li>
      </ul>
      <CheckoutReferralNote />
      {confirmPurchase ? (
        <p data-purchase-intent={PURCHASE_INTENT} data-status="HELD_DRY_RUN" style={held}>
          {PURCHASE_INTENT} cart_total_cents: {CART_TOTAL_CENTS} status: HELD_DRY_RUN. Live payment was not submitted.
        </p>
      ) : null}
    </aside>
  )
}
