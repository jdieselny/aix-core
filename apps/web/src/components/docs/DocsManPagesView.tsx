import React from "react"

export function DocsManPagesView() {
  return (
    <article style={{ lineHeight: 1.75 }}>
      <div
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          background: "rgba(255, 51, 75, 0.1)",
          border: "1px solid rgba(255, 51, 75, 0.3)",
          borderRadius: "4px",
          color: "#FF334B",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        UNIX MANUAL PAGES // SECTION 1
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.75rem" }}>
        A:iX Command-Line Reference &amp; Man Pages
      </h1>

      <p style={{ color: "#94A3B8", fontSize: "1.15rem", marginBottom: "2.5rem" }}>
        Canonical command-line interfaces for managing edge controller relays, sensor buses, cryptographic
        leases, and radar streams.
      </p>

      {/* Man Page 1: aigctl(1) */}
      <section
        style={{
          background: "#11141C",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "10px",
          padding: "1.5rem",
          marginBottom: "2.5rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        <div style={{ color: "#34D399", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>
          AIGCTL(1) — Agent-in-Garden Edge Daemon Control
        </div>
        <div style={{ color: "#94A3B8", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>NAME:</strong> aigctl — control and query the local A:iG cultivation engine
        </div>
        <div style={{ color: "#CBD5E1", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>SYNOPSIS:</strong>
          <br />
          <code>aigctl [options] &lt;command&gt; [arguments]</code>
        </div>
        <div style={{ color: "#CBD5E1", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>COMMANDS:</strong>
          <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
            <li><code>aigctl status</code> — Print live telemetry, VPD, active relays, and uptime.</li>
            <li><code>aigctl relays [set|get] &lt;ch&gt; [0|1]</code> — Inspect or toggle optoisolated relay channels.</li>
            <li><code>aigctl photoperiod lock</code> — Verify or enforce the 423 photoperiod dark interlock.</li>
            <li><code>aigctl calibrate --sensor sht45</code> — Zero-point calibration routine for SHT45 sniffer pod.</li>
            <li><code>aigctl csi stream</code> — Stream live 52-subcarrier CSI radar amplitude/phase variance.</li>
          </ul>
        </div>
        <div style={{ color: "#64748B", fontSize: "0.8rem" }}>
          EXIT STATUS: 0 on success, 1 on hardware bus error, 423 on photoperiod refusal.
        </div>
      </section>

      {/* Man Page 2: aip(1) */}
      <section
        style={{
          background: "#11141C",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "10px",
          padding: "1.5rem",
          marginBottom: "2.5rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        <div style={{ color: "#FF334B", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>
          AIP(1) — Agent-in-Pocket Tactical Sync Tool
        </div>
        <div style={{ color: "#94A3B8", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>NAME:</strong> aip — peer-to-peer telemetry bridge for mobile cockpits
        </div>
        <div style={{ color: "#CBD5E1", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>SYNOPSIS:</strong>
          <br />
          <code>aip [options] &lt;subcommand&gt;</code>
        </div>
        <div style={{ color: "#CBD5E1", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>COMMANDS:</strong>
          <ul style={{ paddingLeft: "1.25rem", margin: "0.5rem 0" }}>
            <li><code>aip link --node &lt;ip&gt;</code> — Pair local smartphone/tablet with an A:iG appliance via mTLS.</li>
            <li><code>aip glance --json</code> — Output instant snapshot for smartwatch and widget display.</li>
            <li><code>aip radar alert --threshold &lt;db&gt;</code> — Arm mobile buzzer for perimeter microwave intrusion.</li>
          </ul>
        </div>
      </section>

      {/* Man Page 3: watchtower(1) */}
      <section
        style={{
          background: "#11141C",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "10px",
          padding: "1.5rem",
          fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        }}
      >
        <div style={{ color: "#FBBF24", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>
          WATCHTOWER(1) — Multi-Node Fleet Datalake &amp; Sentinel
        </div>
        <div style={{ color: "#94A3B8", fontSize: "0.85rem", marginBottom: "1rem" }}>
          <strong>NAME:</strong> watchtower — centralized telemetry datalake and RF radar aggregator
        </div>
        <div style={{ color: "#CBD5E1", fontSize: "0.85rem" }}>
          <strong>SYNOPSIS:</strong>
          <br />
          <code>watchtower daemon --port 37008 --bind 192.168.1.193</code>
          <br />
          <br />
          Aggregates TZSP probe frames from Cisco 2802 APs, fuses CSI microwave subcarrier streams from ESP32 nodes,
          and writes encrypted immutable JSONL receipts to Synology NAS storage (/mnt/datalake).
        </div>
      </section>
    </article>
  )
}
