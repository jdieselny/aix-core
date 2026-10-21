import React from "react"

export function DocsFastStartView() {
  return (
    <article style={{ lineHeight: 1.75 }}>
      <div
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          background: "rgba(52, 211, 153, 0.1)",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          borderRadius: "4px",
          color: "#34D399",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        DEPLOYMENT GUIDE // DOC-001
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        Turnkey A:iG Appliance — Fast-Start Guide
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2rem" }}>
        Get your pre-assembled, factory-calibrated A:iG Autonomous Cultivation Appliance mounted, wired,
        and protecting your canopy in under 15 minutes.
      </p>

      {/* Box Contents Checklist */}
      <div
        style={{
          background: "#11141C",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "10px",
          padding: "1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FF334B", marginBottom: "0.75rem" }}>
          📦 Package Contents Verification
        </h3>
        <ul style={{ paddingLeft: "1.25rem", color: "#CBD5E1", margin: 0 }}>
          <li>1× Turnkey A:iG Appliance (Anodized CNC Aluminum chassis with copper heatsink)</li>
          <li>1× Sensirion SHT45 Sniffer Pod (NDIR CO2 + precision Temp/RH with braided USB-C cable)</li>
          <li>1× Chernobyl 95°F Snap-Action Mechanical Contactor Cutoff Switch</li>
          <li>1× MeanWell 12V 2.5A Industrial DIN-Rail / Wall Power Supply</li>
          <li>1× Quick-Release Wall Mount Bracket with Drywall Anchors and Machine Screws</li>
          <li>1× Tactical Field Provisioning Pass with unique cryptographic Secure Enclave QR Code</li>
        </ul>
      </div>

      {/* Step 1 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#34D399", marginBottom: "0.75rem" }}>
          Step 1: Physical Mounting &amp; Location
        </h2>
        <p>
          Mount the A:iG Appliance on an exterior wall or inside a clean utility vestibule outside the high-humidity
          canopy envelope. While the CNC chassis is sealed and conformal-coated (IP54), locating the main computer
          outside the direct mist zone extends component lifespan.
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: "1rem",
            borderRadius: "6px",
            borderLeft: "3px solid #34D399",
            fontSize: "0.9rem",
          }}
        >
          <strong>Mounting Tip:</strong> Secure the quick-release bracket at eye level using the included anchors.
          Ensure at least 3 inches of clearance above the copper fins for natural passive convection cooling.
        </div>
      </section>

      {/* Step 2 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#34D399", marginBottom: "0.75rem" }}>
          Step 2: Wiring the Chernobyl 95°F Safety Contactor
        </h2>
        <p>
          The Chernobyl switch is your mechanical failsafe against HVAC failure. It must be wired in series
          with the low-voltage control coil of your lighting contactor:
        </p>
        <ol style={{ paddingLeft: "1.25rem", color: "#CBD5E1" }}>
          <li>De-energize lighting subpanel breaker. Verify zero voltage with a calibrated meter.</li>
          <li>Locate the 24VAC or 120VAC control coil circuit feeding your lighting contactor relay.</li>
          <li>
            Break the hot control leg and wire both lead ends into the screw terminals of the Chernobyl 95°F
            snap-action thermostat.
          </li>
          <li>Mount the Chernobyl probe sensor at canopy level near the center of the lighting footprint.</li>
        </ol>
      </section>

      {/* Step 3 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#34D399", marginBottom: "0.75rem" }}>
          Step 3: Connecting the Sensirion Sniffer Pods
        </h2>
        <p>
          Plug the braided USB-C cable from Sniffer Pod 1 into Port S1 on the bottom of the A:iG Appliance.
          Hang the pod at middle-canopy height, positioned between the top cola foliage and the root zone.
          The onboard SHT45 sensor will calibrate automatically within 30 seconds of power-up.
        </p>
      </section>

      {/* Step 4 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#34D399", marginBottom: "0.75rem" }}>
          Step 4: Network &amp; Power-Up
        </h2>
        <p>
          Connect a Cat6 Ethernet cable from your local network switch to LAN 1 (Left 2.5GbE Port). Connect the
          MeanWell 12V DC barrel jack into the appliance power input.
        </p>
        <p>
          The emerald status LED will pulse amber during boot (approx 20 seconds), then turn solid emerald green
          with a quick blue flash indicating the local telemetry datalake is active.
        </p>
      </section>

      {/* Step 5 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#34D399", marginBottom: "0.75rem" }}>
          Step 5: Pairing with A:iP Mobile Cockpit
        </h2>
        <p>
          Launch the A:iP Mobile Cockpit app on your smartphone or tablet. Tap <em>[ Link Hardware Node ]</em> and
          scan the cryptographic QR code printed on your Tactical Field Provisioning Pass.
        </p>
        <p>
          The app will establish an encrypted direct mTLS handshake over WireGuard. You will immediately see live
          VPD dials, room temperature, canopy humidity, and the 52-subcarrier CSI presence radar sweep!
        </p>
      </section>
    </article>
  )
}
