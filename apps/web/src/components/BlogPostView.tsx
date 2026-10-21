import React from "react"
import { blogPostJsonLd, CANONICAL_BLOG_URL, FAQS, faqJsonLd } from "../lib/seo_metadata.js"

export function BlogPostView() {
  const articleSchema = JSON.stringify(blogPostJsonLd()).replace(/</g, "\\u003c")
  const faqSchema = JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c")

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "0 1.5rem 5rem 1.5rem",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      {/* Top Navigation Bar */}
      <nav
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "#34D399",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "0.05em",
          }}
        >
          <span>← A:iX CORE STOREFRONT</span>
        </a>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem" }}>
          <a
            href="/#storefront"
            style={{ color: "#94A3B8", textDecoration: "none" }}
          >
            A:iG Hardware ($499)
          </a>
          <a
            href="/#diy-calculator"
            style={{ color: "#94A3B8", textDecoration: "none" }}
          >
            Open DIY BOM ($297)
          </a>
          <a
            href="https://jdieselny.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#38BDF8", textDecoration: "none" }}
          >
            Seeds (jdieselny.com) ↗
          </a>
        </div>
      </nav>

      {/* Main Article Container */}
      <article
        style={{
          maxWidth: 820,
          margin: "3rem auto 0 auto",
          lineHeight: 1.75,
        }}
      >
        {/* Article Header */}
        <header style={{ marginBottom: "2.5rem" }}>
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
              marginBottom: "1.25rem",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
            }}
          >
            Sovereign Hardware Architecture // Essay 001
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            The Death of Cloud Grow Controllers: Why Autonomous Sovereign Edge
            Hardware is the Future of Commercial Cultivation
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#94A3B8",
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            An engineering analysis of why centralized cloud platforms fail
            commercial cultivation facilities, the thermodynamics of high-density
            LED heat death, and how local-first edge compute protects living crops.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
              fontSize: "0.85rem",
              color: "#64748B",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div>
              <strong style={{ color: "#E7ECF3" }}>AUTHORS:</strong> Justin D.
              Kintzele &amp; Agent Smith
            </div>
            <div>
              <strong style={{ color: "#E7ECF3" }}>PUBLISHED:</strong> October 21,
              2026
            </div>
            <div>
              <strong style={{ color: "#E7ECF3" }}>READ TIME:</strong> 14 min
            </div>
            <div>
              <strong style={{ color: "#34D399" }}>TARGET:</strong> A:iG
              Appliance ($499)
            </div>
          </div>
        </header>

        {/* Section 1 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            1. The Cloud Trap: The 3:00 AM Blackout
          </h2>
          <p>
            The modern indoor agricultural automation market is dominated by a
            dangerous illusion: <em>the cloud-connected consumer gadget</em>.
            Companies like AC Infinity, TrolMaster, and Pulse Grow have convinced
            thousands of growers to surrender physical control of their lighting,
            cooling, and fertigation to remote third-party data centers in North
            Virginia or Dublin.
          </p>
          <p>
            When an AWS us-east-1 regional outage occurs at 3:00 AM, the
            consequences for a cloud-dependent grow room are catastrophic:
          </p>
          <ul style={{ paddingLeft: "1.5rem", color: "#CBD5E1" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Mobile applications spin indefinitely, displaying stale or blank
              telemetry.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Automated vapor pressure deficit (VPD) regulation loops freeze at
              the last known setpoint.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Dehumidifier and air conditioning interlocks fail to trigger because
              logic resides in the cloud rather than on the physical silicon
              beside the crop.
            </li>
          </ul>
          <p>
            Commercial cultivation is an unforgiving industrial process. A single
            crop cycle can represent $50,000 to $200,000 in wholesale value.
            Surrendering the survival of living biological assets to consumer
            Wi-Fi dongles and cloud telemetry brokers is unacceptable engineering.
          </p>
          <div
            style={{
              padding: "1.25rem",
              background: "rgba(56, 189, 248, 0.05)",
              borderLeft: "3px solid #38BDF8",
              borderRadius: "0 6px 6px 0",
              margin: "1.5rem 0",
              fontSize: "0.95rem",
            }}
          >
            <strong>The Sovereign Axiom:</strong> If an automation system requires
            an active internet connection to execute a photoperiod light switch,
            regulate CO2, or trip an emergency cooling contactor, it is not an
            industrial controller—it is an operational liability.
          </div>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            2. The Thermodynamics of LED Heat Runaway: The Chernobyl Solution
          </h2>
          <p>
            As cultivation facilities transition from 1,000W High-Pressure Sodium
            (HPS) to high-efficiency LED arrays (such as 9× Iluminar 670W fixtures
            generating 6,030W of total radiant power), an engineering paradox
            emerges:
          </p>
          <p>
            While LEDs emit less radiant infrared heat than HPS bulbs, high-density
            commercial facilities operate in heavily insulated, airtight sealed
            envelopes. When 6 to 50 kW of LED power is concentrated in a sealed
            room and a 4-ton A/C compressor trips due to a blown thermal fuse or
            condenser coil freeze-up, ambient temperatures skyrocket:
          </p>
          <div
            style={{
              background: "#11141C",
              padding: "1.25rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: "0.9rem",
              margin: "1.25rem 0",
            }}
          >
            <div style={{ color: "#EF4444" }}>
              [HEAT RUNAWAY MODEL: 9× 670W LED (6,030W) // 4-TON A/C LOSS]
            </div>
            <div>T+00 min: 78.0°F (Set point maintained)</div>
            <div>T+08 min: 86.5°F (A/C compressor lockout detected)</div>
            <div>T+15 min: 94.2°F (Stomatal shutdown; leaf transpiration collapses)</div>
            <div style={{ color: "#EF4444" }}>
              T+22 min: 104.8°F (Cellular protein denaturation // IRREVERSIBLE CROP DEATH)
            </div>
          </div>
          <p>
            Software-based alarms are insufficient. If the controller’s
            operating system hangs, if the microcontroller experiences an ESD
            lockup, or if an over-the-air firmware update stalls the CPU, software
            fails to cut power.
          </p>
          <p>
            To eliminate this failure mode, the A:iX ecosystem introduces the{" "}
            <strong>Chernobyl 95°F Thermal Safety Switch ($49)</strong>:
          </p>
          <ul style={{ paddingLeft: "1.5rem", color: "#CBD5E1" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              An analog, bimetallic snap-action mechanical thermostat is wired
              directly in series with the 24VAC or 120VAC control coil of the
              heavy-duty lighting contactor.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              When ambient canopy temperature reaches 95°F (35°C), the bimetallic
              disc physically snaps open, dropping the magnetic contactor and
              instantly de-energizing all 6,000+ watts of lighting.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Zero Software Dependency:</strong> It requires no Wi-Fi, no
              microcontroller, no battery, and no code. Physics protects the crop.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            3. The 423 Photoperiod Lock Law
          </h2>
          <p>
            During the critical 12/12 flowering cycle, living cannabis cultivars
            are acutely sensitive to nocturnal light interruption. A momentary
            accidental illumination of high-power LEDs during the 12-hour dark
            cycle can stress genetics, trigger hormonal confusion, and cause
            hermaphroditism—seeding an entire commercial flower crop and destroying
            its market valuation.
          </p>
          <p>
            Consumer apps feature soft touchscreens with toggle switches right next
            to the status display. An operator accidentally tapping "LIGHTS ON"
            while checking humidity at 2:00 AM can ruin an entire harvest.
          </p>
          <p>
            A:iG enforces the <strong>423 Photoperiod Lock Law</strong>:
          </p>
          <div
            style={{
              background: "#11141C",
              padding: "1rem",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: "0.85rem",
              color: "#FBBF24",
            }}
          >
            HTTP/1.1 423 Locked
            <br />
            X-Continuum-Security: PHOTOPERIOD_DARK_CYCLE_ENGAGED
            <br />
            Message: CANOPY LIGHTING ACTUATOR HARDWARE MUTED UNTIL 06:00:00 UTC
          </div>
          <p style={{ marginTop: "1rem" }}>
            The physical relay driver will reject any software, API, or mobile
            override during the scheduled dark cycle unless a physical, two-factor
            hardware bypass pin is held on the appliance chassis.
          </p>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            4. 52-Subcarrier CSI Microwave Radar vs. Cloud Cameras
          </h2>
          <p>
            Commercial indoor farms frequently install Wi-Fi security cameras to
            monitor grow rooms. This creates severe legal and security exposure:
          </p>
          <ul style={{ paddingLeft: "1.5rem", color: "#CBD5E1" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Video feeds hosted on Ring, Nest, or overseas cloud servers have
              been repeatedly breached, exposing facility layouts and security
              flaws to bad actors.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Optical cameras require illumination or infrared emitters that can
              leak photons and disrupt photoperiod genetics.
            </li>
          </ul>
          <p>
            A:iG solves this with <strong>CSI (Channel State Information) Microwave
            Radar</strong>:
          </p>
          <p>
            By leveraging 802.11 Wi-Fi chipsets operating across 52 orthogonal
            subcarriers, the A:iG appliance measures microsecond phase shifts and
            amplitude attenuation across the room.
          </p>
          <p>
            Human tissue (which is mostly water) and high-density plant canopies
            produce distinct multipath scattering signatures:
          </p>
          <ul style={{ paddingLeft: "1.5rem", color: "#CBD5E1" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Zero-Camera Intruder Detection:</strong> Detects unauthorized
              human movement through drywall and partitions even in pitch-black
              darkness, without capturing or storing a single visual pixel.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Canopy Transpiration Tracking:</strong> Measures the subtle
              micro-vibrations and humidity boundary layer shifts produced by
              active plant transpiration, alerting the operator to stomatal closure
              hours before optical wilting occurs.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            5. Radical Transparency: $297 Open DIY vs. $499 Turnkey Appliance
          </h2>
          <p>
            Most hardware startups attempt to hide their bills of materials behind
            trade secrets and 400% markups. A:iX takes the opposite approach:
          </p>
          <p>
            We publish our exact, tested Bill of Materials for anyone to build at
            home for <strong>$297.00 USD</strong>:
          </p>
          <div
            style={{
              background: "#11141C",
              padding: "1.25rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <div>Intel N100 Quad-Core Mini-PC (16GB RAM / 512GB NVMe)</div>
              <div style={{ color: "#34D399" }}>$130.00</div>
              <div>Sensirion SHT45 Industrial Temp/RH Sensor Breakout</div>
              <div style={{ color: "#34D399" }}>$4.80</div>
              <div>ESP32-S3 Microwave CSI Radar Coprocessor Node</div>
              <div style={{ color: "#34D399" }}>$12.00</div>
              <div>Optoisolated 4-Channel 10A/250VAC Relay Board</div>
              <div style={{ color: "#34D399" }}>$8.50</div>
              <div>Senseair S8 NDIR CO2 Optical Sensor</div>
              <div style={{ color: "#34D399" }}>$48.00</div>
              <div>MeanWell HDR-30-12 Industrial DIN Rail Power Supply</div>
              <div style={{ color: "#34D399" }}>$18.50</div>
              <div>Chernobyl 95°F Snap-Action Thermal Kill Switch</div>
              <div style={{ color: "#34D399" }}>$4.00</div>
              <div>Shielded Industrial I2C &amp; Relay Wiring Harnesses</div>
              <div style={{ color: "#34D399" }}>$29.00</div>
              <div>IP54 Sealed ABS Wall-Mount Enclosure</div>
              <div style={{ color: "#34D399" }}>$42.20</div>
              <div
                style={{
                  gridColumn: "1 / -1",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>TOTAL OPEN DIY BOM COST:</span>
                <span style={{ color: "#34D399" }}>$297.00 USD</span>
              </div>
            </div>
          </div>
          <p>
            If you have the soldering skills, Linux familiarity, and 12 hours of
            free time to configure custom drivers, build it yourself!
          </p>
          <p>
            For commercial operators running active canopy who value their time, we
            sell the <strong>Turnkey A:iG Appliance ($499.00 USD)</strong>:
            machined CNC aluminum passive heatsink, factory burn-in test,
            pre-configured cryptographic enclave keys, and dual 2.5GbE ports.
          </p>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "#34D399",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            6. The Biological Flywheel: Hardware + Medical-Grade Genetics
          </h2>
          <p>
            Autonomous cultivation hardware is only half the equation. The finest
            controller in the world cannot rescue unstable, disease-prone, or weak
            genetics.
          </p>
          <p>
            A:iX Core is partnered with our sister site,{" "}
            <strong>
              <a
                href="https://jdieselny.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#38BDF8", textDecoration: "underline" }}
              >
                J Diesel NY (jdieselny.com)
              </a>
            </strong>
            , New York’s premier medical-grade cannabis seed bank. When you deploy
            the A:iG Turnkey Appliance or purchase the OP2026 Cultivator Bundle,
            you unlock a complimentary voucher for 3 feminized seeds tested under
            our exact environmental profiles.
          </p>
        </section>

        {/* FAQ Section */}
        <section
          style={{
            margin: "4rem 0",
            padding: "2rem",
            background: "#11141C",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Frequently Asked Engineering Questions (FAQ)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "1rem 1.25rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <summary
                  style={{
                    fontWeight: 700,
                    cursor: "pointer",
                    color: "#34D399",
                    fontSize: "1rem",
                  }}
                >
                  {faq.question}
                </summary>
                <p
                  style={{
                    marginTop: "0.75rem",
                    color: "#94A3B8",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Call to Action Footer Card */}
        <section
          style={{
            marginTop: "3rem",
            padding: "2.5rem",
            background:
              "linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(56, 189, 248, 0.05))",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
              fontWeight: 800,
            }}
          >
            Deploy Sovereign Hardware to Your Canopy
          </h3>
          <p
            style={{
              color: "#94A3B8",
              maxWidth: 580,
              margin: "0 auto 1.75rem auto",
              fontSize: "1rem",
            }}
          >
            Whether you choose the plug-and-play Turnkey A:iG Appliance ($499) or
            wire your own open-source rig ($297 BOM), protect your living crops
            with local-first intelligence.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/#storefront"
              style={{
                display: "inline-block",
                padding: "0.875rem 1.75rem",
                background: "#34D399",
                color: "#0A0B0F",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                borderRadius: "6px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Order A:iG Appliance - $499
            </a>
            <a
              href="/#diy-calculator"
              style={{
                display: "inline-block",
                padding: "0.875rem 1.75rem",
                background: "transparent",
                color: "#E7ECF3",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Inspect $297 DIY BOM
            </a>
          </div>
        </section>
      </article>
    </div>
  )
}
