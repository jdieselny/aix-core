import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sovereign Customer Portal & Node Leases | A:iX Core",
  description:
    "Self-service management for A:iX hardware leases, A:iP Mobile Cockpit subscriptions, instant PDF invoices, and 1-click cancellations. Zero phone calls.",
}

export default function BillingPortalPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", "Inter", sans-serif',
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <a
          href="/"
          style={{
            color: "#FF334B",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
          }}
        >
          ← BACK TO A:iX CORE APEX
        </a>
      </div>

      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(52, 211, 153, 0.15)",
            color: "#34D399",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            borderRadius: 6,
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          SOVEREIGN CUSTOMER PORTAL // ZERO FRICTION
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            margin: "0 0 0.75rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          Manage Billing &amp; Node Leases
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            color: "#9AA3B5",
            maxWidth: 680,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          1-click pause, instant PDF invoice downloads, node lease transfers, and subscription
          cancellations. No retention calls, no chat-bot friction, 100% sovereign.
        </p>
      </header>

      {/* Lookup Card */}
      <section
        style={{
          background: "rgba(18, 20, 28, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.1rem",
            fontFamily: '"JetBrains Mono", monospace',
            color: "#FF334B",
            margin: "0 0 1rem 0",
          }}
        >
          [ LOOKUP ACTIVE ORDER OR NODE LEASE ]
        </h2>

        <form
          action="/api/checkout"
          method="GET"
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
        >
          <input
            type="text"
            placeholder="Order ID (e.g. ORD-FB20A or email)"
            defaultValue="ORD-PILOT-001"
            style={{
              flex: 1,
              minWidth: 280,
              background: "#0D0F16",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 8,
              padding: "0.85rem 1rem",
              color: "#F8FAFC",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.95rem",
            }}
          />
          <button
            type="button"
            style={{
              background: "#34D399",
              color: "#0A0B0F",
              border: "none",
              borderRadius: 8,
              padding: "0.85rem 1.5rem",
              fontWeight: 700,
              fontFamily: '"JetBrains Mono", monospace',
              cursor: "pointer",
            }}
          >
            VERIFY LEASE →
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#9AA3B5" }}>
          Active Commercial Node:{" "}
          <span style={{ color: "#34D399", fontWeight: 700 }}>
            Turnkey A:iG #001 · Marty 9-Lighter Commercial Testbed (Active)
          </span>
        </div>
      </section>

      {/* Feature Pillars */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "rgba(18, 20, 28, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 12,
            padding: "1.25rem",
          }}
        >
          <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
            1-Click Cancellation
          </div>
          <p style={{ fontSize: "0.85rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
            Never speak to a retention specialist. Pause or cancel machine lease anytime with one click.
          </p>
        </div>

        <div
          style={{
            background: "rgba(18, 20, 28, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 12,
            padding: "1.25rem",
          }}
        >
          <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
            Instant PDF Invoices
          </div>
          <p style={{ fontSize: "0.85rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
            Download signed, tax-compliant PDF commercial receipts for agricultural write-offs immediately.
          </p>
        </div>

        <div
          style={{
            background: "rgba(18, 20, 28, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 12,
            padding: "1.25rem",
          }}
        >
          <div style={{ color: "#34D399", fontWeight: 700, marginBottom: "0.5rem" }}>
            Node Lease Transfer
          </div>
          <p style={{ fontSize: "0.85rem", color: "#9AA3B5", lineHeight: 1.5, margin: 0 }}>
            Seamlessly migrate software licenses and cryptographic keys to replacement hardware.
          </p>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "#9AA3B5",
        }}
      >
        <div>
          Need immediate field assistance? Check the{" "}
          <a href="/docs/fast-start" style={{ color: "#34D399", fontWeight: 700 }}>
            Fast-Start Guide →
          </a>
        </div>
        <div>
          <a href="/docs" style={{ color: "#FF334B", textDecoration: "none" }}>
            Documentation Center →
          </a>
        </div>
      </footer>
    </main>
  )
}
