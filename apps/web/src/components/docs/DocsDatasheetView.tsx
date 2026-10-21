import React from "react"

export function DocsDatasheetView() {
  return (
    <article style={{ lineHeight: 1.75 }}>
      <div
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          background: "rgba(56, 189, 248, 0.1)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: "4px",
          color: "#38BDF8",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        HARDWARE SPECIFICATION // DS-AIG-001-REV1
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        Turnkey A:iG Appliance — Technical Datasheet
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2.5rem" }}>
        Electrical ratings, processor architectures, sensor bus interfaces, and environmental operating limits.
      </p>

      {/* System Architecture Table */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "#34D399", marginBottom: "1rem" }}>
          1. System Compute &amp; Storage Architecture
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              background: "#11141C",
              borderRadius: "8px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left", color: "#94A3B8" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Parameter</th>
                <th style={{ padding: "0.75rem 1rem" }}>Specification</th>
                <th style={{ padding: "0.75rem 1rem" }}>Notes</th>
              </tr>
            </thead>
            <tbody style={{ color: "#CBD5E1" }}>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Main Processor</td>
                <td style={{ padding: "0.75rem 1rem" }}>Intel Alder Lake-N N100 Quad-Core (Up to 3.4GHz)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>6W TDP ultra-low thermal dissipation</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>System Memory</td>
                <td style={{ padding: "0.75rem 1rem" }}>16GB DDR5 4800MHz SO-DIMM</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>High-throughput local analytics buffer</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Telemetry Datalake</td>
                <td style={{ padding: "0.75rem 1rem" }}>512GB M.2 NVMe PCIe 3.0 SSD (AES-XTS-256)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>Store 5+ years of 1-second raw sensor data locally</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>RF / CSI Coprocessor</td>
                <td style={{ padding: "0.75rem 1rem" }}>ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>52-Subcarrier 802.11n microwave presence radar</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Network Interfaces</td>
                <td style={{ padding: "0.75rem 1rem" }}>Dual 2.5GbE RJ45 (Intel i226-V)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#94A3B8" }}>Port 1: Local LAN; Port 2: Air-gapped Secure Enclave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Electrical & Relay Ratings */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "#34D399", marginBottom: "1rem" }}>
          2. Electrical Specifications &amp; Relay Ratings
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              background: "#11141C",
              borderRadius: "8px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left", color: "#94A3B8" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Channel</th>
                <th style={{ padding: "0.75rem 1rem" }}>Contact Type</th>
                <th style={{ padding: "0.75rem 1rem" }}>Max Voltage / Current</th>
                <th style={{ padding: "0.75rem 1rem" }}>Isolation</th>
              </tr>
            </thead>
            <tbody style={{ color: "#CBD5E1" }}>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Relay 1 (Lighting)</td>
                <td style={{ padding: "0.75rem 1rem" }}>SPDT Form C (Dry Contact)</td>
                <td style={{ padding: "0.75rem 1rem" }}>250VAC @ 10A / 30VDC @ 10A</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>3,750VRMS Optoisolated</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Relay 2 (HVAC Call)</td>
                <td style={{ padding: "0.75rem 1rem" }}>SPDT Form C (Dry Contact)</td>
                <td style={{ padding: "0.75rem 1rem" }}>24VAC/VDC @ 5A (Thermostat Y1/Y2)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>3,750VRMS Optoisolated</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Relay 3 (Dehumidifier)</td>
                <td style={{ padding: "0.75rem 1rem" }}>SPDT Form C (Dry Contact)</td>
                <td style={{ padding: "0.75rem 1rem" }}>24VAC/VDC @ 5A (Quest terminal)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>3,750VRMS Optoisolated</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Relay 4 (CO2 / Solenoid)</td>
                <td style={{ padding: "0.75rem 1rem" }}>SPDT Form C (Dry Contact)</td>
                <td style={{ padding: "0.75rem 1rem" }}>120VAC @ 10A / 24VDC @ 10A</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>3,750VRMS Optoisolated</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Chernobyl Port</td>
                <td style={{ padding: "0.75rem 1rem" }}>Series Contactor Break Loop</td>
                <td style={{ padding: "0.75rem 1rem" }}>240VAC @ 40A Contactor Coil Loop</td>
                <td style={{ padding: "0.75rem 1rem", color: "#EF4444" }}>Analog Bimetallic Failsafe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sensor Tolerances */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "#34D399", marginBottom: "1rem" }}>
          3. Sensirion Sniffer Pod Tolerances
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              background: "#11141C",
              borderRadius: "8px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left", color: "#94A3B8" }}>
                <th style={{ padding: "0.75rem 1rem" }}>Sensor Module</th>
                <th style={{ padding: "0.75rem 1rem" }}>Measurement Range</th>
                <th style={{ padding: "0.75rem 1rem" }}>Accuracy Tolerance</th>
                <th style={{ padding: "0.75rem 1rem" }}>Response Time (t63)</th>
              </tr>
            </thead>
            <tbody style={{ color: "#CBD5E1" }}>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Sensirion SHT45 (RH)</td>
                <td style={{ padding: "0.75rem 1rem" }}>0% to 100% RH</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>±1.5% RH (Typical)</td>
                <td style={{ padding: "0.75rem 1rem" }}>4 seconds</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Sensirion SHT45 (Temp)</td>
                <td style={{ padding: "0.75rem 1rem" }}>-40°C to +125°C (-40°F to 257°F)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>±0.1°C (±0.18°F)</td>
                <td style={{ padding: "0.75rem 1rem" }}>2 seconds</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>Senseair S8 (NDIR CO2)</td>
                <td style={{ padding: "0.75rem 1rem" }}>400 to 2,000 ppm (Extended to 10k ppm)</td>
                <td style={{ padding: "0.75rem 1rem", color: "#34D399" }}>±30 ppm ±3% of reading</td>
                <td style={{ padding: "0.75rem 1rem" }}>15 seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Mechanical Dimensions */}
      <section>
        <h2 style={{ fontSize: "1.3rem", color: "#34D399", marginBottom: "1rem" }}>
          4. Mechanical &amp; Environmental Ratings
        </h2>
        <div style={{ background: "#11141C", padding: "1.25rem", borderRadius: "8px", fontSize: "0.9rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", color: "#CBD5E1" }}>
            <div><strong>Dimensions:</strong> 210mm × 145mm × 42mm (8.27" × 5.71" × 1.65")</div>
            <div><strong>Weight:</strong> 1.15 kg (2.53 lbs) with heatsink</div>
            <div><strong>Enclosure Material:</strong> 6061-T6 Anodized Aluminum + Copper Fin Array</div>
            <div><strong>Ingress Protection:</strong> IP54 (Dust protected, splash water resistant)</div>
            <div><strong>Operating Ambient:</strong> 0°C to +50°C (32°F to 122°F)</div>
            <div><strong>Operating Humidity:</strong> 10% to 95% Non-condensing</div>
          </div>
        </div>
      </section>
    </article>
  )
}
