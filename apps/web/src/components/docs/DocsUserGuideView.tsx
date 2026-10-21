import React from "react"

export function DocsUserGuideView() {
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
        OPERATOR MANUAL // DOC-002
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        A:iG Cultivation Controller — Operator Field Manual
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2.5rem" }}>
        Autonomous control strategies, environmental vapor pressure deficit algorithms, and safety interlocks.
      </p>

      {/* Chapter 1: VPD */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "0.75rem" }}>
          1. Closed-Loop Vapor Pressure Deficit (VPD) Regulation
        </h2>
        <p>
          Unlike primitive controllers that oscillate between raw temperature and relative humidity thresholds,
          the A:iG engine calculates live leaf-to-air Vapor Pressure Deficit (VPD) every second using the Tetens
          equation modified with real-time leaf temperature offset:
        </p>
        <div
          style={{
            background: "#11141C",
            padding: "1rem",
            borderRadius: "6px",
            fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            fontSize: "0.85rem",
            color: "#FF334B",
            margin: "1rem 0",
          }}
        >
          VPD = VPsat(Tleaf) - VPair(Tair, RH)
          <br />
          VPsat(T) = 0.61078 * exp((17.27 * T) / (T + 237.3)) kPa
        </div>
        <p>
          The controller modulates Relay 2 (HVAC cooling call) and Relay 3 (Quest dehumidifier) in harmonious
          sync to maintain target VPD without fighting each other:
        </p>
        <ul style={{ paddingLeft: "1.25rem", color: "#CBD5E1" }}>
          <li><strong>Vegetative Stage Target:</strong> 0.8 kPa to 1.1 kPa (Promotes rapid leaf expansion and nutrient uptake).</li>
          <li><strong>Early Flower Target:</strong> 1.1 kPa to 1.3 kPa (Balances transpiration with mold prevention).</li>
          <li><strong>Late Flower / Ripening:</strong> 1.3 kPa to 1.6 kPa (Drives terpene resin production and botrytis defense).</li>
        </ul>
      </section>

      {/* Chapter 2: CO2 & Exhaust Interlock */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "0.75rem" }}>
          2. Atmospheric CO2 Injection with Purge Interlock
        </h2>
        <p>
          CO2 enrichment (1,000 to 1,400 ppm) is only biologically beneficial when high PAR photon flux is active.
          A:iG enforces a hard software interlock:
        </p>
        <div
          style={{
            background: "rgba(251, 191, 36, 0.05)",
            borderLeft: "3px solid #FBBF24",
            padding: "1rem",
            borderRadius: "0 6px 6px 0",
            fontSize: "0.9rem",
            color: "#E7ECF3",
          }}
        >
          <strong>Interlock Law:</strong> Relay 4 (CO2 Solenoid) will refuse to energize if canopy lights are off,
          if exhaust purge dampers are open, or if ambient canopy temperature drops below 72°F.
        </div>
      </section>

      {/* Chapter 3: 423 Dark Lock */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "0.75rem" }}>
          3. The 423 Photoperiod Lock Law
        </h2>
        <p>
          During the 12-hour flowering dark period, lighting actuators enter an immutable hardware lock.
          Manual toggle attempts from the A:iP mobile app or local web UI return:
        </p>
        <div
          style={{
            background: "#11141C",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            fontSize: "0.85rem",
            color: "#EF4444",
            margin: "0.75rem 0",
          }}
        >
          HTTP 423 Locked: CANOPY_PHOTOPERIOD_NIGHT_ACTIVE
        </div>
        <p>
          To perform emergency crop inspection, operators must use green inspection lighting or hold the physical
          tamper button on the A:iG chassis for 5 continuous seconds.
        </p>
      </section>

      {/* Chapter 4: CSI Radar Presence Tuning */}
      <section>
        <h2 style={{ fontSize: "1.4rem", color: "#34D399", marginBottom: "0.75rem" }}>
          4. 52-Subcarrier CSI Microwave Presence Tuning
        </h2>
        <p>
          The onboard ESP32-S3 coprocessor continuously tracks Wi-Fi Channel State Information multipath subcarrier
          variance. In the A:iP Mobile Cockpit, operators can adjust:
        </p>
        <ul style={{ paddingLeft: "1.25rem", color: "#CBD5E1" }}>
          <li><strong>Presence Threshold (dB variance):</strong> Default is 4.5 dB. Increase to 6.5 dB if oscillating fans produce false spatial movement alarms.</li>
          <li><strong>Canopy Micro-Transpiration Window:</strong> Compares 15-minute moving variance against expected stomatal conductance curves to detect root-zone dehydration early.</li>
        </ul>
      </section>
    </article>
  )
}
