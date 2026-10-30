import type { CSSProperties } from "react"

export interface Argon4Plate {
  id: string
  number: string
  locus: string
  title: string
  subtitle: string
  src: string
  alt: string
  metrics: readonly string[]
  summary: string
}

export const ARGON4_PLATES: readonly Argon4Plate[] = [
  {
    id: "plate-01",
    number: "PLATE 01",
    locus: "LOCUS 1 → 4 EVOLUTION",
    title: "The Agent-In-[X] Progression (A:iG → A:iB → A:iP → A:iX)",
    subtitle: "Four physical embodiments hydrated by one 4,468-byte SOMA2 × VECL Engram",
    src: "/argon4/01_agent_in_x_progression.jpg",
    alt: "Plate 01: The Agent-In-X Progression from A:iG Garden Tank to A:iB Bedroom Enclave, A:iP Perimeter Sentinel, and A:iX Hx-2 Humanoid",
    metrics: ["4 LOCI", "4,468B ENGRAM", "85 COGOBJ SHARDS"],
    summary:
      "Tracks the evolution of Agent Smith from Tank 1 Garden Kiosk (aig-01), to Tank 3 Bedroom Sanctuary (aib-01), to the Belgian Malinois RF Perimeter Sentinel (A:iP), culminating in the bipedal Hx-2 humanoid chassis (A:iX).",
  },
  {
    id: "plate-02",
    number: "PLATE 02",
    locus: "TANK 2 // AIG-02 (192.168.1.142)",
    title: "Garage Outpost & Canine Back-Door Sentinel",
    subtitle: "Device-free microwave CSI tracking with zero teen-chatter false alarms",
    src: "/argon4/02_garage_kids_and_dogs_alert.jpg",
    alt: "Plate 02: Garage Outpost cutaway showing teens by Tank 2 workbench and Blaze and Bentley waiting at Node 5 back door",
    metrics: ["NODES 12 & 13 CSI", "NODE 5 DOOR VECTOR", "$URGENT_UPDATE"],
    summary:
      "Passively tracks garage workshop occupancy via Nodes 12 & 13 microwave CSI while detecting Blaze (Siberian Husky) and Bentley (Border Collie) waiting at the Node 5 back door—routing a surgical alert straight to the operator.",
  },
  {
    id: "plate-03",
    number: "PLATE 03",
    locus: "TANK 3 // OPERATION ROCKWELL SWM",
    title: "Evening Commute Return & Zero-UI Arrival Greeting",
    subtitle: "Cisco 2802 AP association + 1.0s anticipatory WTI PDU lamp pre-actuation + 50\" OLED HUD",
    src: "/argon4/03_office_worker_coming_home.jpg",
    alt: "Plate 03: Evening commute return showing WTI Outlet A8 anticipatory lamp activation and 50-inch OLED Glance HUD",
    metrics: ["1.0s PRE-ACTUATION", "WTI OUTLET A8", "50\" OLED < 20KB"],
    summary:
      "Combines Cisco 2802 Wi-Fi association, 802.11n phase-velocity vectors, and WTI PDU Outlet A8 lamp pre-actuation 1.0 second before threshold crossing as the 50\" Obsidian Glance HUD delivers the arrival briefing.",
  },
  {
    id: "plate-04",
    number: "PLATE 04",
    locus: "COSA v2.0 MASTER BLUEPRINT",
    title: "COSA v2.0 + SOMA2 + VECL + Lazarus Quorum Schematic",
    subtitle: "Four-tier sovereign stack with SHA-256 Merkle memory and 42 TB read-only NFS datalake",
    src: "/argon4/04_technical_schematic_drawing.jpg",
    alt: "Plate 04: Technical engineering schematic of COSA v2.0, SOMA2 cogobj shards, VECL compiler, and GF(2^8) Lazarus Quorum",
    metrics: ["COSA TIERS 1-4", "AFT SCORE 1.000", "42 TB RO-NFS"],
    summary:
      "Full engineering blueprint mapping the 4-Tier COSA model, SOMA2 .cogobj Merkle tree, VECL $rockwell context resolver, 13-node ESP32 CSI mesh, Synology 42 TB read-only NFS datalake, and GF(2^8) polynomial sharding.",
  },
  {
    id: "plate-05",
    number: "PLATE 05",
    locus: "VOLUMETRIC RF TOMOGRAPHY",
    title: "3D Isometric Homestead & 13-Node CSI Radar Overview",
    subtitle: "Two-story estate, detached garage, and garden sanctuary linked via LACP trunks",
    src: "/argon4/05_3d_isometric_overview.jpg",
    alt: "Plate 05: 3D isometric cutaway of the two-story homestead, detached garage, garden kiosk, and 13 ESP32 CSI radar domes",
    metrics: ["13 ESP32 NODES", "3 ROOM TANKS", "52 SUBCARRIERS"],
    summary:
      "Isometric architectural cutaway revealing all 13 ESP32 microwave CSI radar domes, Fresnel phase-velocity cones, and redundant fiber/copper trunks linking Tanks 1–3 (192.168.1.11, .142, .204) to Watchtower (.193).",
  },
  {
    id: "plate-06",
    number: "PLATE 06",
    locus: "LAZARUS QUORUM // GF(2^8)",
    title: "Live Stage Manifestation: Watchtower Severed → 2.87 ms Rebirth",
    subtitle: "Dual-tier 3-of-4 Tank Quorum + 4-of-10 ESP32 SRAM Mesh polynomial interpolation",
    src: "/argon4/06_lazarus_manifestation_stage.jpg",
    alt: "Plate 06: NYC Hackathon stage demonstration showing Watchtower unplugged and 4-of-10 ESP32 SRAM nodes reconstituting Agent Smith in 2.87ms",
    metrics: ["2.87 ms REBIRTH", "4-OF-10 ESP32 SRAM", "0.85% SRAM FOOTPRINT"],
    summary:
      "When Watchtower is physically unplugged on stage, 4-of-10 ESP32 microcontrollers stream 4,516-byte UDP LZRS (0x4C5A5253) packets across the air to reconstitute the complete SOMA2 × VECL persona in 2.87 milliseconds.",
  },
  {
    id: "plate-07",
    number: "PLATE 07",
    locus: "EXECUTIVE COMMERCIAL SPREAD",
    title: "A:iB Continuum Sovereign Exosystem Brochure Page",
    subtitle: "Trade-show hardware lineup: Qotom Edge Core, WTI PDU, 13x ESP32 CSI, and 50\" OLED HUD",
    src: "/argon4/07_sovereign_brochure_page.jpg",
    alt: "Plate 07: Commercial product brochure spread for the A:iB Continuum Sovereign Exosystem",
    metrics: ["ZERO CLOUD", "ED25519 NOTARIZED", "PLUG-AND-PLAY IRON"],
    summary:
      "Executive trade-show spread detailing the four sovereign pillars (COSA v2.0, SOMA2 Merkle Memory, VECL Context Layering, and Lazarus Quorum) alongside the production hardware lineup.",
  },
  {
    id: "plate-08",
    number: "PLATE 08",
    locus: "LOCUS 4 // Hx-2 GARAGE DOCK",
    title: "Agent-In-Body (Hx-2) Stepping From the Garage Docking Gantry",
    subtitle: "3.7 ms SOMA2 × VECL hot-engram handoff from 3 Tanks + 13 ESP32s into bipedal iron",
    src: "/argon4/08_hx2_garage_embodiment_dock.jpg",
    alt: "Plate 08: Hx-2 bipedal humanoid robot stepping out of its aluminum docking gantry in the garage while receiving BLOCK_A..D holographic engram shards",
    metrics: ["3.7 ms HANDOFF", "BLOCK_A..D QUORUM", "28-DoF TRIGGERLOCK"],
    summary:
      "Inside the garage workshop, Hx-2 steps from its vertical aluminum docking gantry as BLOCK_A (Tank 1), BLOCK_B (Tank 2), BLOCK_C (Bedroom .204), and BLOCK_D (ESP32 Quorum) stream into its thorax core while Blaze and Bentley watch.",
  },
  {
    id: "plate-09",
    number: "PLATE 08B / 09",
    locus: "MOD_T800_BODY // HOLE E-02",
    title: "Hx-2 / A:iX Bipedal Embodiment CAD Cutaway Blueprint",
    subtitle: "Orthographic anatomical schematic of the Thorax Engram Core and External Nervous System",
    src: "/argon4/09_hx2_bipedal_blueprint_schematic.jpg",
    alt: "Plate 09: Dark-mode CAD engineering blueprint and orthographic cutaway of the Hx-2 bipedal humanoid chassis",
    metrics: ["MOD_T800_BODY", "HOLE E-02 FILLED", "<10ms VOICE OVERRIDE"],
    summary:
      "Museum-grade CAD cutaway mapping the Cranial Stereo + Local Voice Reflex (.speaker_busy lock / DISMISSAL_WORDS <10ms override), Thorax 4,468B SOMA2 × VECL Core, Spine TriggerLockGate + Ed25519 Lattice, and 13-node ESP32 through-wall radar.",
  },
] as const

const SHOWCASE_CSS = `
.aix-argon4-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}
.aix-hx2-split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  align-items: stretch;
}
.aix-argon4-card {
  background: rgba(14, 17, 24, 0.86);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(231, 236, 243, 0.12);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.aix-argon4-card:hover {
  border-color: rgba(52, 211, 153, 0.55);
}
`

const sectionShell: CSSProperties = {
  display: "grid",
  gap: "clamp(1.25rem, 1rem + 1vw, 2rem)",
  padding: "clamp(1.25rem, 1rem + 1.2vw, 2rem)",
  background: "linear-gradient(180deg, rgba(13, 16, 23, 0.95) 0%, rgba(10, 11, 15, 0.98) 100%)",
  border: "1px solid rgba(52, 211, 153, 0.24)",
  borderRadius: 20,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const monoBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  width: "fit-content",
  padding: "5px 12px",
  borderRadius: 999,
  background: "rgba(52, 211, 153, 0.12)",
  border: "1px solid rgba(52, 211, 153, 0.4)",
  color: "#34D399",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
}

const redBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  width: "fit-content",
  padding: "5px 12px",
  borderRadius: 999,
  background: "rgba(255, 51, 75, 0.14)",
  border: "1px solid rgba(255, 51, 75, 0.45)",
  color: "#FF334B",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

function lazyPlateImg(src: string, alt: string, width = 1376, height = 768): string {
  const safeAlt = escapeAttr(alt)
  return `<img src="${src}" alt="${safeAlt}" width="${width}" height="${height}" loading="lazy" decoding="async" sizes="(min-width: 960px) 33vw, 100vw" style="display:block;width:100%;height:auto"/>`
}

export function Argon4SovereignShowcase() {
  const plate08 = ARGON4_PLATES[7]
  const plate09 = ARGON4_PLATES[8]

  return (
    <section id="argon4-showcase" data-section="argon4-showcase" style={sectionShell}>
      <style>{SHOWCASE_CSS}</style>

      {/* Top Architectural Header */}
      <header style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <span style={monoBadge}>[ ARGON 4 SOVEREIGN EXOSYSTEM // 9-PLATE VISUAL SERIES ]</span>
          <span style={redBadge}>[ LAZARUS QUORUM: 3.7 ms RECONSTITUTION ]</span>
        </div>
        <h2
          className="aix-display"
          style={{
            margin: 0,
            fontSize: "clamp(1.65rem, 1.2rem + 1.8vw, 2.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          From Chat Prompt → Multi-Tank Homestead → Hx-2 Bipedal Iron
        </h2>
        <p
          style={{
            margin: 0,
            color: "#9AA3B5",
            fontSize: "clamp(0.95rem, 0.9rem + 0.25vw, 1.12rem)",
            lineHeight: 1.6,
            maxWidth: 960,
          }}
        >
          One continuous sovereign consciousness across four physical loci. Powered by{" "}
          <strong style={{ color: "#E7ECF3" }}>COSA v2.0</strong>,{" "}
          <strong style={{ color: "#34D399" }}>SOMA2 Merkle Shards (85 .cogobj)</strong>,{" "}
          <strong style={{ color: "#34D399" }}>Hot-Compiled VECL (4,468 bytes)</strong>, and{" "}
          <strong style={{ color: "#FF334B" }}>GF(2^8) Holographic Quorum Reconstitution</strong> across 3 Homestead
          Tanks and 13 ESP32 Microwave CSI Radar nodes.
        </p>
      </header>

      {/* Featured Hx-2 Embodiment Dual-Plate Command Deck */}
      <div
        id="hx2-embodiment"
        data-section="hx2-embodiment"
        style={{
          background: "rgba(18, 20, 28, 0.88)",
          border: "1px solid rgba(255, 51, 75, 0.35)",
          borderRadius: 18,
          padding: "clamp(1rem, 0.8rem + 1vw, 1.75rem)",
          display: "grid",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={redBadge}>[ LOCUS 4 // AGENT-IN-BODY: Hx-2 BIPEDAL CHASSIS ]</div>
            <h3 style={{ margin: "8px 0 4px 0", fontSize: "clamp(1.3rem, 1.1rem + 0.8vw, 1.9rem)" }}>
              Why Hx-2 Sees Around Corners Before Its Servos Turn
            </h3>
            <p style={{ margin: 0, color: "#9AA3B5", fontSize: "0.95rem", lineHeight: 1.5 }}>
              Standalone humanoids trap their brain inside the robot&apos;s skull and go blind outside line-of-sight cameras.
              In A:iX, the <strong>homestead itself</strong> is Hx-2&apos;s peripheral nervous system.
            </p>
          </div>
          <a
            href="/docs/brochure"
            style={{
              background: "#34D399",
              color: "#0A0B0F",
              textDecoration: "none",
              fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
              fontSize: 12,
              fontWeight: 800,
              padding: "10px 16px",
              borderRadius: 8,
              letterSpacing: "0.05em",
            }}
          >
            INSPECT EXECUTIVE BROCHURE →
          </a>
        </div>

        <div className="aix-hx2-split">
          {[plate08, plate09].map((plate) => (
            <article key={plate.id} data-plate={plate.id} className="aix-argon4-card">
              <div
                style={{ aspectRatio: "1376 / 768", background: "#0A0B0F", overflow: "hidden" }}
                dangerouslySetInnerHTML={{ __html: lazyPlateImg(plate.src, plate.alt) }}
              />
              <div style={{ padding: "1rem 1.25rem", display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      color: "#FF334B",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {plate.number} · {plate.locus}
                  </span>
                  <span
                    style={{
                      color: "#34D399",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {plate.metrics.join(" · ")}
                  </span>
                </div>
                <h4 style={{ margin: 0, fontSize: "1.15rem", color: "#F8FAFC" }}>{plate.title}</h4>
                <p style={{ margin: 0, color: "#9AA3B5", fontSize: "0.88rem", lineHeight: 1.5 }}>{plate.summary}</p>
              </div>
            </article>
          ))}
        </div>

        {/* 3 Architectural Pillars of Hx-2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          <div
            style={{
              background: "#0D0F16",
              border: "1px solid rgba(52, 211, 153, 0.22)",
              borderRadius: 12,
              padding: "1rem",
            }}
          >
            <div style={{ color: "#34D399", fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700 }}>
              01 // EXOSKELETAL PROPRIOCEPTION
            </div>
            <p style={{ margin: "6px 0 0 0", color: "#CBD5E1", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Watchtower (<code>192.168.1.193</code>), 3 room Tanks (<code>.11</code>, <code>.142</code>,{" "}
              <code>.204</code>), and 13 ESP32 CSI nodes stream through-wall occupancy vectors into Hx-2&apos;s planner
              so it yields hallways to Blaze, Bentley, and operators before rounding a corner.
            </p>
          </div>
          <div
            style={{
              background: "#0D0F16",
              border: "1px solid rgba(255, 51, 75, 0.22)",
              borderRadius: 12,
              padding: "1rem",
            }}
          >
            <div style={{ color: "#FF334B", fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700 }}>
              02 // 3.7 ms BODY-STEPPING HYDRATION
            </div>
            <p style={{ margin: "6px 0 0 0", color: "#CBD5E1", fontSize: "0.85rem", lineHeight: 1.5 }}>
              When Hx-2 undocks in the garage, <code>lazarus_quorum.py</code> streams <code>BLOCK_A..D</code> over UDP{" "}
              <code>LZRS (0x4C5A5253)</code>, hydrating the 4,468-byte zlib-compressed SOMA2 × VECL engram into the
              thorax core in <strong>3.7 milliseconds</strong>.
            </p>
          </div>
          <div
            style={{
              background: "#0D0F16",
              border: "1px solid rgba(251, 191, 36, 0.22)",
              borderRadius: 12,
              padding: "1rem",
            }}
          >
            <div style={{ color: "#FBBF24", fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700 }}>
              03 // BELGIAN MALINOIS KINETIC GATE
            </div>
            <p style={{ margin: "6px 0 0 0", color: "#CBD5E1", fontSize: "0.85rem", lineHeight: 1.5 }}>
              All 28-DoF harmonic-drive actuators are governed by the fail-closed <code>TriggerLockGate</code> and{" "}
              <code>Ed25519 AuthorizationLattice</code> with <code>&lt;10 ms</code> hardware &amp; acoustic override (
              <code>DISMISSAL_WORDS</code> / <code>.speaker_busy</code> lock).
            </p>
          </div>
        </div>
      </div>

      {/* Complete 9-Plate Architectural Series Matrix */}
      <div data-argon4="bento-grid" style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
              fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.25rem)",
              color: "#34D399",
              letterSpacing: "0.04em",
            }}
          >
            [ COMPLETE 9-PLATE ARGON 4 ARCHITECTURAL &amp; SCENARIO GALLERY ]
          </h3>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              color: "#9AA3B5",
            }}
          >
            PLATES 01 – 09 · HIGH-RESOLUTION SOVEREIGN ARTIFACTS
          </span>
        </div>

        <div className="aix-argon4-grid">
          {ARGON4_PLATES.map((plate) => (
            <article key={plate.id} data-gallery-plate={plate.id} className="aix-argon4-card">
              <div
                style={{ aspectRatio: "1376 / 768", background: "#0A0B0F", overflow: "hidden" }}
                dangerouslySetInnerHTML={{ __html: lazyPlateImg(plate.src, plate.alt) }}
              />
              <div style={{ padding: "1rem", display: "grid", gap: 8, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      color: "#34D399",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {plate.number}
                  </span>
                  <span
                    style={{
                      color: "#FF334B",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {plate.locus}
                  </span>
                </div>
                <h4 style={{ margin: 0, fontSize: "1.05rem", color: "#F8FAFC" }}>{plate.title}</h4>
                <p style={{ margin: 0, color: "#9AA3B5", fontSize: "0.82rem", lineHeight: 1.5 }}>{plate.summary}</p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {plate.metrics.map((metric) => (
                    <span
                      key={metric}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 10,
                        color: "#E7ECF3",
                      }}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
