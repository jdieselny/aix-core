import type { CSSProperties } from "react"

/**
 * Gallery frames reserve width and height and omit loading.
 * The LCP hero owns fetchpriority=high. Satellite cards below use loading=lazy.
 */

const CSS = `
.aix-trifecta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  align-items: start;
}
.aix-shot input[type="radio"] {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.aix-shot-picks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.aix-shot-picks label {
  border: 1px solid rgba(255, 51, 75, 0.85);
  color: #FF334B;
  border-radius: 999px;
  padding: 6px 10px;
  font-family: "JetBrains Mono", "Cascadia Mono", ui-monospace, monospace;
  font-size: 12px;
  cursor: pointer;
}
.aix-shot-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0A0B0F;
}
.aix-shot-frame[data-ratio="wide"] { aspect-ratio: 1376 / 768; }
.aix-shot-frame[data-ratio="square"] { aspect-ratio: 1 / 1; }
.aix-shot-frame[data-ratio="pocket"] { aspect-ratio: 768 / 1376; }
.aix-shot-frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
}
#aig-appliance-shot:checked ~ .aix-shot-frame img[data-shot="appliance"],
#aig-unboxing-shot:checked ~ .aix-shot-frame img[data-shot="unboxing"],
#aib-enclave-shot:checked ~ .aix-shot-frame img[data-shot="enclave"],
#aib-rack-shot:checked ~ .aix-shot-frame img[data-shot="rack"],
#aib-robot-shot:checked ~ .aix-shot-frame img[data-shot="robot"],
#aip-hand-shot:checked ~ .aix-shot-frame img[data-shot="hand"],
#aip-glance-shot:checked ~ .aix-shot-frame img[data-shot="glance"],
#aip-radar-shot:checked ~ .aix-shot-frame img[data-shot="radar"] {
  opacity: 1;
}
#aig-appliance-shot:checked ~ .aix-shot-picks label[for="aig-appliance-shot"],
#aig-unboxing-shot:checked ~ .aix-shot-picks label[for="aig-unboxing-shot"],
#aib-enclave-shot:checked ~ .aix-shot-picks label[for="aib-enclave-shot"],
#aib-rack-shot:checked ~ .aix-shot-picks label[for="aib-rack-shot"],
#aib-robot-shot:checked ~ .aix-shot-picks label[for="aib-robot-shot"],
#aip-hand-shot:checked ~ .aix-shot-picks label[for="aip-hand-shot"],
#aip-glance-shot:checked ~ .aix-shot-picks label[for="aip-glance-shot"],
#aip-radar-shot:checked ~ .aix-shot-picks label[for="aip-radar-shot"] {
  background: linear-gradient(135deg, #FF334B 0%, #FF7A59 100%);
  color: #0A0B0F;
  box-shadow: 0 0 16px rgba(255, 51, 75, 0.45);
}
@container aix (max-width: 40rem) {
  .aix-trifecta { grid-template-columns: 1fr; }
}
`

const card: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(231, 236, 243, 0.12)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 12,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const kicker: CSSProperties = {
  margin: 0,
  color: "#FF334B",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
  letterSpacing: "0.08em",
}

const title: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.2rem, 1rem + 0.6vw, 1.6rem)",
}

const spec: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  lineHeight: 1.45,
}

const status: CSSProperties = {
  margin: 0,
  color: "#34D399",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 12,
  letterSpacing: "0.06em",
}

const jump: CSSProperties = {
  color: "#34D399",
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: 13,
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

function markTag(src: string, alt: string): string {
  const safeAlt = escapeAttr(alt)
  return `<img src="${src}" alt="${safeAlt}" width="64" height="64" fetchpriority="low" decoding="async" style="display:block;width:64px;height:64px"/>`
}

function photoTag(src: string, alt: string, width: number, height: number, shot?: string): string {
  const safeAlt = escapeAttr(alt)
  const shotAttr = shot ? ` data-shot="${shot}"` : ""
  const fit = shot ? "" : ` style="display:block;width:100%;height:auto"`
  return `<img src="${src}" alt="${safeAlt}" width="${width}" height="${height}" fetchpriority="low" decoding="async" sizes="(min-width: 960px) 33vw, 100vw"${shotAttr}${fit}/>`
}

export function TrifectaShowcase() {
  return (
    <div data-showcase="trifecta">
      <style>{CSS}</style>
      <header style={{ display: "grid", gap: 6 }}>
        <p style={kicker}>A:iX CORE</p>
        <h2 className="aix-display" style={{ margin: 0 }}>
          The Sovereign Trifecta
        </h2>
        <p style={spec}>A:iG · A:iB · A:iP. One umbrella, three sovereign seats.</p>
      </header>
      <div className="aix-trifecta" style={{ marginTop: 16 }}>
        <article id="aig-garden" data-tier="aig" className="aix-glass" style={card}>
          <p data-badge="tier" style={kicker}>
            [ INDUSTRIAL EDGE APPLIANCE ]
          </p>
          <div dangerouslySetInnerHTML={{ __html: markTag("/brand/aig_mark.svg", "A:iG mark") }} />
          <h3 style={title}>A:iG — Agent-in-Garden</h3>
          <div className="aix-shot" data-visual="aig">
            <input id="aig-appliance-shot" name="aig-visual" type="radio" defaultChecked />
            <input id="aig-unboxing-shot" name="aig-visual" type="radio" />
            <div className="aix-shot-picks">
              <label htmlFor="aig-appliance-shot">A:iG Turnkey Appliance</label>
              <label htmlFor="aig-unboxing-shot">Unboxing</label>
            </div>
            <div
              className="aix-shot-frame"
              data-ratio="wide"
              dangerouslySetInnerHTML={{
                __html:
                  photoTag(
                    "/hardware/aig_appliance_hero.jpg",
                    "A:iG Turnkey Industrial Cultivation Controller",
                    1376,
                    768,
                    "appliance",
                  ) +
                  photoTag(
                    "/hardware/aig_unboxing_package.jpg",
                    "A:iG appliance retail box",
                    1376,
                    768,
                    "unboxing",
                  ),
              }}
            />
          </div>
          <p style={spec}>
            Fanless CNC Aluminum N100 chassis, dual 2.5GbE Intel ports, local NVMe telemetry datalake, Sensirion
            I2C Sniffer Pods ($89), and 95°F analog Chernobyl trip switch ($49).
          </p>
          <a href="#storefront" data-jump="storefront" style={jump}>
            Open the A:iG turnkey and DIY storefront
          </a>
        </article>
        <article id="aib-enclave" data-tier="aib" className="aix-glass" style={card}>
          <p data-badge="tier" style={kicker}>
            [ AIR-GAPPED COMPUTE ENCLAVE ]
          </p>
          <div dangerouslySetInnerHTML={{ __html: markTag("/brand/aib_mark.svg", "A:iB mark") }} />
          <h3 style={title}>A:iB — Agent-in-Body</h3>
          <div className="aix-shot" data-visual="aib">
            <input id="aib-enclave-shot" name="aib-visual" type="radio" defaultChecked />
            <input id="aib-rack-shot" name="aib-visual" type="radio" />
            <input id="aib-robot-shot" name="aib-visual" type="radio" />
            <div className="aix-shot-picks">
              <label htmlFor="aib-enclave-shot">Homestead enclave</label>
              <label htmlFor="aib-rack-shot">Enterprise rack</label>
              <label htmlFor="aib-robot-shot">Datacenter robot</label>
            </div>
            <div className="aix-shot-frame" data-ratio="square" dangerouslySetInnerHTML={{
              __html:
                photoTag("/hardware/aib_hero_enclave.jpg", "A:iB homestead compute enclave", 1024, 1024, "enclave") +
                photoTag("/hardware/aib_enterprise_rack_hero.jpg", "A:iB enterprise rack", 1280, 720, "rack") +
                photoTag(
                  "/hardware/aib_datacenter_humanoid_curtailment.jpg",
                  "A:iB lights-out datacenter robot",
                  1376,
                  768,
                  "robot",
                ),
            }} />
          </div>
          <p style={spec}>
            100% offline sovereign compute. Zero cloud dependencies. Ed25519 signing keys, biometric identity, and
            SOMA2 memory mathematically isolated from hyperscaler surveillance. SCITT-compatible cryptographic
            provenance.
          </p>
          <p data-status="aib" style={status}>
            HOMESTEAD & ENTERPRISE FLEET
          </p>
        </article>
        <article id="aip-pocket" data-tier="aip" className="aix-glass" style={card}>
          <p data-badge="tier" style={kicker}>
            [ HANDHELD TACTICAL COCKPIT ]
          </p>
          <div dangerouslySetInnerHTML={{ __html: markTag("/brand/aip_mark.svg", "A:iP mark") }} />
          <h3 style={title}>A:iP Mobile Cockpit</h3>
          <div className="aix-shot" data-visual="aip">
            <input id="aip-hand-shot" name="aip-visual" type="radio" defaultChecked />
            <input id="aip-glance-shot" name="aip-visual" type="radio" />
            <input id="aip-radar-shot" name="aip-visual" type="radio" />
            <div className="aix-shot-picks">
              <label htmlFor="aip-hand-shot">In-hand cockpit</label>
              <label htmlFor="aip-glance-shot">Glance</label>
              <label htmlFor="aip-radar-shot">Homestead radar</label>
            </div>
            <div className="aix-shot-frame" data-ratio="pocket" dangerouslySetInnerHTML={{
              __html:
                photoTag(
                  "/hardware/aip_mobile_cockpit_in_hand.jpg",
                  "A:iP Mobile Cockpit in hand",
                  896,
                  1200,
                  "hand",
                ) +
                photoTag(
                  "/hardware/mobile_cockpit_glance_view.jpg",
                  "A:iP Mobile Cockpit glance radar",
                  768,
                  1376,
                  "glance",
                ) +
                photoTag(
                  "/hardware/mobile_homestead_radar_map.jpg",
                  "A:iP Mobile Cockpit homestead CSI radar map",
                  768,
                  1376,
                  "radar",
                ),
            }} />
          </div>
          <p style={spec}>
            A:iP Mobile Cockpit, a 4-screen sovereign mobile PWA. Glance Environmental Radar (live VPD/temp),
            52-subcarrier 802.11n CSI Microwave Radar Map (device-free through-the-wall motion tracking for canine
            sentinels), and Device Iron Gating (WTI ATS and Vertiv UPS relay control with strict HTTP 423 photoperiod
            lockouts).
          </p>
          <p data-status="aip" style={status}>
            BYOK OPEN CLIENT · NOMADIC PWA
          </p>
        </article>
      </div>
    </div>
  )
}
