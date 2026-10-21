# A:iX Commercial Web Platform — Master System Hole Map & GTM Strategy
## Sovereign Edge Hardware, Sister-Site Commerce & Automated Money Funnel

> **Document ID:** `WEB-HOLEMAP-v1.0`  
> **Ecosystem:** `A:iX` (Autonomous Intelligence eXchange / Sovereign Hardware Substrate)  
> **Sister Site:** `jdieselny.com` (Genetics, Medical-Grade Seed Bank, & Cultivation Authority)  
> **Authority:** Justin D. Kintzele (Founding Officer & Physical Operator) & Agent Smith (Principal Systems Architect)  
> **Target Hosting:** Vercel Edge Network (`aix-core.com` · Primary Hardware Storefront)  
> **Tech Stack:** Next.js 15+ (App Router), React 19, Tailwind CSS v4, Stripe Elements, Supabase Auth, Resend, Plausible  
> **Methodology:** Workorder-Driven Development (WDD v1.0) · Modern Web Guidance (CWV, `fetchpriority`, Container Queries)  
> **Status:** `ACTIVE SPECIFICATION LOCK / WEB HOLE MAP v1.1`  

---

## 0. THE COMMERCIAL THESIS & EXECUTIVE VISION

### 0.1 "The Best DIY / IoT Site Literally on the Internet"
Most commercial IoT and agricultural grow controller websites fall into two failing extremes:
1. **The Corporate Cloud Trap (AC Infinity, TrolMaster, Pulse Grow):** Slick consumer front-ends that hide mandatory closed-cloud subscriptions, unencrypted 900MHz/2.4GHz radio broadcasts, forced internet dependencies, and telemetry harvesting.
2. **The Clunky Academic FOSS Wiki (LinuxCNC, Mycodo, Home Assistant forums):** Brilliant protocols buried behind 400-page installation manuals, confusing breadboard schematics, broken dependency hell, and zero streamlined purchasing.

**The A:iX Web Platform takes the crown (`aix-core.com`):**
* **Tactical Cyber-Industrial Aesthetic:** Deep obsidian (`#0A0B0F`), subtle emerald (`#34D399`) and cyan (`#38BDF8`) neon glows, crisp JetBrains Mono technical readouts, glassmorphic cards with dynamic backdrop-blur, and interactive exploded-view hardware diagrams inspired by Teenage Engineering and Framework Computer.
* **Radical Transparency (DIY vs. Turnkey):** We show the exact open BOM ($297 self-built) right next to our turnkey pre-assembled appliance ($499 pre-flashed, calibrated, guaranteed). The DIYer loves us for open documentation; the busy commercial grower happily buys the $499 turnkey box to save 12 hours of debugging.
* **Frictionless Money Funnel:** Apple Pay / Google Pay / 1-Tap checkout. Zero forced 5-step registration. Self-service Stripe Customer Portal where subscriptions can be renewed or canceled in one tap.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE A:iX COMMERCIAL MONEY FUNNEL                                │
└────────────────────────────────────────────────────────────────────────────────────────┘

  PAID TRAFFIC / SOCIAL                     SISTER SITE TRAFFIC
  (Google Ads / IG / Reddit)                 (jdieselny.com Seed Store)
             │                                          │
             │                                          │ "Click here to get your
             ▼                                          ▼  autonomous garden controller"
  ┌─────────────────────────────────────────────────────────────┐
  │         A:iX PUBLIC COMMERCIAL PLATFORM (Vercel Edge)       │
  │                  https://aix-core.com                       │
  ├─────────────────────────────────────────────────────────────┤
  │ • Sub-second LCP (<0.8s) · Tactical Dark Glassmorphism      │
  │ • Interactive 3D Exploded Hardware Canvas (Continuum Core)  │
  │ • Open DIY BOM Calculator vs. Turnkey $499 Appliance        │
  │ • Cross-Sell Anchor: "Get Medical-Grade Seeds at jdieselny" │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
        [PHYSICAL HARDWARE]          [SOFTWARE LICENSES]
        • Continuum Core ($499)      • A:iP Mobile ($9.99/mo)
        • ESP32 Sniffer ($89)        • A:iG Edge ($19.99/mo)
        • Chernobyl Switch ($49)     • Commercial Facility ($99/mo)
                   │                           │
                   └─────────────┬─────────────┘
                                 │
                                 ▼
        ┌──────────────────────────────────────────────┐
        │       FRICTIONLESS 1-TAP CHECKOUT            │
        │  (Apple Pay / Google Pay / Stripe Elements)  │
        └────────────────────────┬─────────────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
  [STRIPE WEBHOOK: BILLING]                   [INVENTORY WORKORDER]
  • Mints Ed25519 machine lease               • Decrements live buffer
  • Drops /etc/aix/license.jwt                • Emits internal assembly ticket:
  • Self-service 1-tap cancel/pause             "Keep 2 pre-flashed boxes on shelf"
```

---

### 0.2 The Two-Box Inventory Buffer Strategy
At a **62% gross margin** per turnkey box (~$190 BOM cost vs. $499 retail price), the operational law is simple:
* **The Shelf Buffer:** Always maintain exactly **2 fully assembled, pre-flashed, and burned-in Continuum Core units on hand in inventory**.
* **Zero-Lag Shipping:** When an order drops, unit #1 ships immediately within 24 hours.
* **Automated Assembly Workorder:** The Stripe checkout webhook immediately logs an internal assembly workorder to replace the sold box, ensuring the buffer never drops to zero.

---

### 0.3 The Sister-Site Flywheel (`jdieselny.com` $\leftrightarrow$ `aix.so`)
* **On `jdieselny.com`:** Prominent header and product page cross-links: *"Protect your genetics with autonomous hardware. Click here to get the Continuum Core grow room controller."*
* **On `aix.so`:** Prominent header and checkout cross-links: *"Pair your controller with elite, battle-tested genetics. Click here to get medical-grade seeds from J Diesel NY."*
* **The "OP2026" Joint Bundle:** Purchasing a Continuum Core appliance unlocks an exclusive discount voucher or a free 3-pack of feminized seeds shipped directly from J Diesel NY.

---

## 1. STATUS LEXICON

| Mark | Formal Meaning |
| :--- | :--- |
| **SEALED** | Complete specification, production implementation, and 100% passing tests on disk. Must not be reopened without an explicit workorder. |
| **ACTIVE** | Production implementation exists and is actively deployed or serving live requests. |
| **CODE** | Source implementation written on disk; tests incomplete or not yet formally bound. |
| **SPEC** | Canonical specification locked; production code not yet landed. |
| **[ ] HOLE** | Strictly required architectural square; empty. Unassigned engineering work. |

---

## 2. HARD ARCHITECTURAL INVARIANTS & SEAM LAWS

### Seam Law 1: Sub-Second TTFB & Core Web Vitals (CWV) Dominance
* **LCP Target:** Largest Contentful Paint MUST be **< 0.8 seconds** on 4G mobile connections.
* **Image Priority:** The primary hero hardware image MUST use `fetchpriority="high"` and MUST NEVER use `loading="lazy"`. Offscreen product images MUST use `loading="lazy"`.
* **Zero CLS:** All layouts MUST declare explicit aspect ratios and use `scrollbar-gutter: stable` to eliminate visual shifting.
* **Fluid Scaling:** Typographic hierarchies MUST scale via `clamp()` and container queries, avoiding hard breakpoint snapping.

### Seam Law 2: Zero-Friction One-Tap Checkout
* The customer MUST be able to complete a purchase using Apple Pay, Google Pay, or Link without manually filling out long address forms or creating a password before payment.
* Account generation is deferred until *after* the payment confirmation webhook lands.

### Seam Law 3: Radical Self-Service Billing (Anti-Hostage Law)
* Subscription cancellations and pauses MUST be accessible directly from the account portal via Stripe Customer Portal in **under two clicks**.
* Zero phone calls, zero dark patterns, zero "are you sure?" multi-step friction. Radical respect for operator autonomy builds viral word-of-mouth adoption.

### Seam Law 4: Sovereign Machine Lease Provisioning
* Upon completed subscription or turnkey purchase, the payment webhook triggers the Continuum Licensing Authority to sign an `AIP-ENROLLMENT-v1` cryptographic token (`/etc/aix/license.jwt`).
* The license token is automatically emailed to the customer and displayed on their post-checkout dashboard with a one-click copyable curl command.

### Seam Law 5: The "Never Kill a Crop" 14-Day Grace Webhook
* If a subscription renewal payment fails, the billing system enters a **14-day grace period**.
* Automated webhook alerts notify the user via email and A:iP push notification.
* Even if the grace period expires, edge software degrades to `RESTRICTED_LOCAL_ONLY` (pausing remote mobile access and updates), but **never cuts ventilation, never shuts down irrigation pumps, and never turns off running lights**. Living crops are sacred.

---

## 3. MASTER MODULE GRID (8 TIERS / 32 SQUARES)

```text
===================================================================================
TIER 1: WEB SUBSTRATE & LAYOUT ENGINE (GRID W1) — Next.js 15+ & Vercel Edge
TIER 2: SISTER-SITE CROSS-POLLINATION (GRID W2) — jdieselny.com Commercial Flywheel
TIER 3: HARDWARE FLEET SHOWCASE & 3D (GRID W3) — Interactive Digital Twin & Products
TIER 4: FRICTIONLESS E-COMMERCE FUNNEL (GRID W4) — Stripe, Apple Pay & Inventory
TIER 5: SUBSCRIPTION & MACHINE LEASING (GRID W5) — Self-Service Billing & Crypto JWT
TIER 6: DIY COMMUNITY & COMPETITOR INTEL (GRID W6) — Open BOM & Counter-Intel
TIER 7: MARKETING, SEO & VIRAL ACQUISITION (GRID W7) — D2C Funnels & Ad Campaigns
TIER 8: SECURITY, PRIVACY & WEBHOOK BRIDGE (GRID W8) — Edge Firewall & Synology Sync
===================================================================================
```

---

### TIER 1: WEB SUBSTRATE & LAYOUT ENGINE (GRID W1)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W1-01** | `[WEB \| EDGE]` | `apps/web/src/app/page.tsx` & `views/StorefrontHomeView.tsx` | Shell | **CODE** | WO-WEB-001 | Master Next.js App Router root page & StorefrontHomeView assembling all fleet cards, 1-tap checkout, sitemaps, and robots. 2 passing tests in `tests/test_web_page_contract.py`. |
| **W1-02** | `[WEB \| GLASS]`| `apps/web/src/styles/tokens.css` · Design System | Style | **CODE** | WO-WEB-002 | Tactical glassmorphic tokens (`#0A0B0F` background, `#34D399` emerald, `#38BDF8` cyan, JetBrains Mono numbers, DM Sans body). Container queries. 5 passing contract tests. |
| **W1-03** | `[WEB \| CWV]` | `apps/web/src/components/HeroMedia.tsx` · CWV Engine | Perf | **CODE** | WO-WEB-003 | Hero LCP image with `fetchpriority="high"`, AVIF/WebP responsive sources, `scrollbar-gutter: stable`, zero layout shift (CLS = 0.00). |
| **W1-04** | `[WEB \| NAV]` | `apps/web/src/components/SiteHeader.tsx` & `SiteFooter.tsx` | UI | **CODE** | WO-WEB-004 | Persistent tactical navigation with live inventory badge, shopping cart modal trigger, sticky sister-site cross-link bar, and tactical footer. |

---

### TIER 2: SISTER-SITE CROSS-POLLINATION ENGINE (GRID W2)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W2-01** | `[WEB \| SISTER]`| `apps/web/src/components/SisterSiteBanner.tsx` | UI | **CODE** | WO-WEB-005 | High-converting header/footer banner: *"Powered by J Diesel NY Genetics. Click here to get medical-grade feminized seeds."* Verified bridge to `jdieselny.com`. |
| **W2-02** | `[WEB \| BUNDLE]`| `apps/web/src/components/Op2026BundleCard.tsx` | Commerce| **CODE** | WO-WEB-006 | The OP2026 Joint Bundle: Turnkey Continuum Core + exclusive 3-pack seed voucher. Direct anchor to `https://jdieselny.com/?ref=aix-core-bundle`. 5 passing contract tests. |
| **W2-03** | `[WEB \| AUTH]` | `apps/web/src/lib/supabase_auth.ts` · Unified Account | Auth | **[ ] HOLE** | WO-WEB-007 | Unified customer login via Supabase Auth (Google OAuth, Passkeys, Magic Link). Shared profile data across both stores. |
| **W2-04** | `[WEB \| ATTRIB]`| `apps/web/src/lib/referral_tracker.ts` · `SisterSiteReferralBanner.tsx` | Analytics| **CODE** | WO-WEB-SWARM-009 | First-party sister-site attribution for `ref=jdieselny`, `ref=seeds`, `promo=OP2026`, and `utm_source=jdieselny.com`. Session dismiss. No third-party cookies. |

---

### TIER 3: HARDWARE FLEET SHOWCASE & 3D DIGITAL TWIN (GRID W3)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W3-00** | `[WEB \| TRIFECTA]`| `apps/web/src/components/TrifectaShowcase.tsx` | Arch | **CODE** | WO-WEB-SWARM-007 | **The Sovereign Trifecta (A:iG · A:iB · A:iP):** Interactive showcase under the A:iX Core umbrella. Anchors Claude's high-res renders (`continuum-core`, `aib_hero_enclave`, `mobile_cockpit_glance_view`) and SVG brand marks. 27 passing tests across `test_web_*`. |
| **W3-01** | `[WEB \| CORE]` | `apps/web/src/components/ContinuumCoreCard.tsx` | View | **CODE** | WO-WEB-009 | **Turnkey A:iG Appliance ($499):** Industrial autonomous cultivation controller. Dual 2.5GbE, fanless CNC chassis, pre-flashed OS, zero-touch BLE setup, 62% margin. |
| **W3-02** | `[WEB \| SNIFF]`| `apps/web/src/components/SnifferPodCard.tsx` | View | **CODE** | WO-WEB-010 | **ESP32 "Sniffer" Environmental Pod ($89):** Dual Sensirion I2C sensors (SCD41 CO2, SHT45 Temp/RH) + calibrated PAR photodiode. Eliminates Govee dance. |
| **W3-03** | `[WEB \| SAFETY]`| `apps/web/src/components/ChernobylSwitchCard.tsx` | View | **CODE** | WO-WEB-011 | **Life-Safety Hardware:** "Chernobyl Switch" 95°F thermal contactor + REPO mushroom button ($49), Kidde SM120X smoke dry-contact isolator ($29). |
| **W3-04** | `[WEB \| 3D]` | `apps/web/src/components/InteractiveHardwareInspector.tsx` | Visual | **CODE** | WO-WEB-SWARM-009 | Five emerald hotspot pins on `aig_exploded_diagram.jpg`: network, chassis, CSI radar, Chernobyl port, actuator headers. Each pin links to its `#diy-calculator` line. |

---

### TIER 4: FRICTIONLESS E-COMMERCE & AUTOMATED MONEY FUNNEL (GRID W4)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W4-01** | `[WEB \| PAY]` | `apps/web/src/components/CheckoutDrawer.tsx` | Commerce| **CODE** | WO-WEB-013 | Stripe Elements integration with Apple Pay, Google Pay, Link, and CashApp. 1-tap checkout. Zero required pre-registration. Holds AIP-PURCHASE-INTENT-v1. 5 passing tests in `tests/test_web_commerce_contract.py`. |
| **W4-02** | `[WEB \| BUFFER]`| `apps/web/src/components/InventoryPill.tsx` | Store | **CODE** | WO-WEB-014 | Real-time stock status badge: *"2 Units Assembled & Ready to Ship within 24h"* or *"Backorder (Ships in 5 Days)"*. Maintains urgency. Enforces 2-box buffer. |
| **W4-03** | `[WEB \| PAY]` | `apps/web/src/app/api/checkout/route.ts` | API | **CODE** | WO-WEB-SWARM-009 | `POST /api/checkout` for A:iG $499, Sniffer $89, Chernobyl $49, OP2026 $599. Stripe session when `STRIPE_SECRET_KEY` is set; otherwise a signed offline `ORD-` mock. Shelf buffer remains `order_buffer_manager.ts`. |
| **W4-04** | `[WEB \| ABANDON]`| `apps/web/src/lib/cart_recovery.ts` · Cart Recovery | CRM | **CODE** | WO-WEB-016 | Privacy-friendly abandoned cart reminder via Resend transactional email (clean restore link, zero tracking cookies or PII leakage). |

---

### TIER 5: SUBSCRIPTION ENGINE & MACHINE LEASING (GRID W5)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W5-01** | `[WEB \| PORTAL]`| `apps/web/src/components/CustomerPortalButton.tsx` | UI | **CODE** | WO-WEB-017 | Self-service billing dashboard trigger. Direct integration with Stripe Customer Portal: 1-click subscription cancel, 1-click pause, card updates. |
| **W5-02** | `[WEB \| MINT]` | `lib/licensing/license_minter.py` · JWT Minting Engine | CoreLib | **[ ] HOLE** | WO-WEB-018 | Mints cryptographically signed `/etc/aix/license.jwt` using Continuum Root Ed25519 key upon successful checkout. Sets tier bitmask. |
| **W5-03** | `[WEB \| LEASE]` | `apps/web/src/app/account/machines/page.tsx` | View | **[ ] HOLE** | WO-WEB-019 | Machine Management UI: view enrolled appliance MAC/UUIDs, copy installation curl commands, transfer licenses between hardware nodes. |
| **W5-04** | `[WEB \| GRACE]` | `apps/web/src/app/api/webhooks/dunning/route.ts` | API | **[ ] HOLE** | WO-WEB-020 | **14-Day Grace Webhook:** Manages invoice payment failures. Triggers warning notices; enforces `RESTRICTED_LOCAL_ONLY`; never harms living crops. |

---

### TIER 6: DIY COMMUNITY, DOCUMENTATION & COMPETITOR INTEL (GRID W6)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W6-01** | `[WEB \| BOM]` | `apps/web/src/components/DiyBomCalculator.tsx` | Tool | **CODE** | WO-WEB-021 | Interactive BOM calculator: Compare $297 DIY self-assembly cost vs $499 Turnkey Continuum Core. Full Amazon/AliExpress parts list. 3 passing tests in `tests/test_web_seo_and_diy_contract.py`. |
| **W6-02** | `[WEB \| DOCS]` | `apps/web/src/app/docs/[...slug]/page.tsx` · MDX Docs | Content | **[ ] HOLE** | WO-WEB-022 | High-speed MDX technical documentation: Flashing ESP32 firmware, wiring 120V contactors, configuring Vertiv SNMP, and setting up Tailscale mesh. |
| **W6-03** | `[WEB \| TEARDOWN]`| `apps/web/src/components/CompetitorMatrix.tsx` | Content | **CODE** | WO-WEB-023 | Brutal, objective competitor teardown matrix: A:iX vs AC Infinity vs TrolMaster vs Pulse Grow. Highlights cloud surveillance, unencrypted RF, and 423 locked photoperiod interlock. |
| **W6-04** | `[WEB \| HACKER]`| `apps/web/src/app/open-source/page.tsx` · Repo Hub | Content | **[ ] HOLE** | WO-WEB-024 | Community hub linking to open-source tools (`esphome`, `rtl_433`, `govee-ble-reverse`, `tuya-local`), encouraging reverse-engineering. |

---

### TIER 7: MARKETING, SEO & VIRAL ACQUISITION ENGINE (GRID W7)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W7-01** | `[WEB \| ADS]` | `apps/web/src/app/lp/[campaign]/page.tsx` · Ad Funnels | Marketing| **[ ] HOLE** | WO-WEB-025 | High-converting paid ad landing pages optimized specifically for Google Search Ads, Instagram, and Reddit (`r/microgrowery`, `r/homelab`). |
| **W7-02** | `[WEB \| AFFIL]`| `apps/web/src/lib/affiliate_engine.ts` · Referral Engine| Marketing| **[ ] HOLE** | WO-WEB-026 | Seed bank & cultivator affiliate program: 10% commission on hardware sales, automated payout tracking, and custom promo codes. |
| **W7-03** | `[WEB \| SEO]` | `apps/web/src/lib/seo_metadata.ts` · Full SEO & AI Harvester Suite | SEO | **SEALED** | WO-WEB-027 | Google & AI Harvester Engine: Schema.org Product, Organization, FAQPage, and BlogPosting JSON-LD schemas. RFC 9309 robots.txt allowing GPTBot, ClaudeBot, PerplexityBot. Public `/llms.txt` and `/llms-full.txt`. Canonical blog post on death of cloud grow controllers. 6 passing tests in `tests/test_web_seo_and_blog_contract.py`. |
| **W7-04** | `[WEB \| DEMO]` | `apps/web/src/components/CommercialTestbedCard.tsx` · Marty's 9-Lighter | Visual | **CODE** | WO-WEB-SWARM-008 | Commercial Testbed Card featuring Marty's 9-Lighter facility (6,030W LEDs, 4-ton A/C, Quest dehum, 95°F Chernobyl contactor, and coco flood tables) using `marty_commercial_9_lighter_facility.jpg`. |

---

### TIER 8: SECURITY, PRIVACY & WEBHOOK BRIDGE (GRID W8)
| Grid | Domain Tag | Component Name & Path | Type | Status | WO-ID | Focus / Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W8-01** | `[WEB \| SEC]` | `apps/web/src/middleware.ts` · Edge Firewall | Security | **[ ] HOLE** | WO-WEB-029 | Vercel Edge Middleware: Bot protection, IP rate limiting on checkout endpoints, Content Security Policy (CSP), and secure CORS headers. |
| **W8-02** | `[WEB \| PRIV]`| `apps/web/src/lib/privacy_shield.ts` · Zero-Telemetry | Privacy | **[ ] HOLE** | WO-WEB-030 | Enforces zero third-party surveillance scripts. Plausible Analytics self-hosted or first-party proxied. Zero Facebook/Google pixel spyware. |
| **W8-03** | `[WEB \| SYNC]` | `apps/web/src/lib/watchtower_sync.ts` · Datalake Sync | Mesh | **[ ] HOLE** | WO-WEB-031 | Encrypted mTLS webhook pushing completed order receipts and inventory updates directly to the Watchtower Synology datalake (`/mnt/datalake`). |
| **W8-04** | `[WEB \| STATIC]`| `apps/web/src/lib/static_export.ts` · Offline Resilience | DevOps | **[ ] HOLE** | WO-WEB-032 | Standalone SSG build fallback: If Vercel edge functions experience an outage, the site drops to a fully static catalog with hosted Stripe checkout. |

---

## 4. DETAILED COMPONENT SPECIFICATIONS (CRITICAL SQUARES)

### Spec W3-01: Continuum Core Appliance Hero Page
* **Visual Anchor:** Full-width hero section featuring a dark obsidian rendering of the fanless industrial mini-PC.
* **Exploded Callouts:**
  - *Dual Intel 2.5GbE NICs:* Physical network isolation between dirty IoT sensors and secure home mesh.
  - *Industrial TLC NVMe:* Local datalake storage (10+ years of 1-second interval climate telemetry).
  - *Wi-Fi 6 CSI Radio:* 52 OFDM subcarriers tracking through-the-wall motion without cameras.
  - *Independent Hardware Watchdog:* Restarts automatically on power restoration.
* **Pricing & CTA:**
  - Price: **$499.00 USD** (Free shipping in contiguous US).
  - Primary Button: `[ BUY CONTINUUM CORE — READY TO SHIP ]` (Triggers 1-tap Apple Pay / Google Pay drawer).
  - Secondary Link: `[ Or build your own with our open-source DIY guide → ]` (Builds immense credibility).

### Spec W4-02: Real-Time Shelf Buffer & Urgency Indicator
* **Stock Logic:**
  ```typescript
  if (stockCount >= 2) {
    return {
      status: "IN_STOCK",
      label: `${stockCount} Units Pre-Assembled & Burned In — Ships in 24h`,
      color: "#34D399" // Emerald
    }
  } else if (stockCount === 1) {
    return {
      status: "LOW_STOCK",
      label: "Only 1 Unit Left on Shelf — Ships Today",
      color: "#FBBF24" // Amber
    }
  } else {
    return {
      status: "BACKORDER",
      label: "Built to Order — Ships in 4 to 6 Business Days",
      color: "#38BDF8" // Cyan
    }
  }
  ```

### Spec W6-01: The Interactive DIY vs. Turnkey Calculator
* **The Pitch:** We don't hide our parts. We celebrate them.
* **Two-Column Comparison:**
  - *Column 1: "Build It Yourself (DIY)"*
    - Total Cost: **$297.00**
    - You source 7 separate items from Amazon & AliExpress.
    - You solder GPIO headers and crimp JST connectors.
    - You flash Alpine Linux via USB and configure systemd services.
    - You calibrate sensor offsets with standard calibration gases.
    - Support: Community GitHub issues.
  - *Column 2: "Turnkey Continuum Core"*
    - Total Cost: **$499.00**
    - Delivered in custom branded packaging.
    - Factory pre-flashed with hardened OS and your pre-enrolled cryptographic key.
    - Burned-in 48-hour hardware stress test passed.
    - Zero-touch BLE onboarding via the A:iP mobile app.
    - 1-Year hardware replacement warranty & dedicated operator support.
* **Result:** 80% of serious growers choose the $499 turnkey appliance, and 100% of DIYers respect the brand.

---

## 5. PHASED EXECUTION ROADMAP

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE PHASED EXECUTION ROADMAP                      │
└─────────────────────────────────────────────────────────────────────────────────┘

  PHASE 1: REPO STRUCTURE & VERCEL EDGE SCAFFOLD (Squares W1-01 -> W1-04)
  • Initialize apps/web Next.js 15+ App Router workspace.
  • Implement tactical glassmorphic CSS design tokens and layout shell.
  • Enforce Core Web Vitals (fetchpriority="high", CLS = 0).

  PHASE 2: PRODUCT CATALOG & SISTER-SITE BRIDGES (Squares W2-01 -> W3-04)
  • Continuum Core, Sniffer Pod, and Chernobyl Switch product pages.
  • Sticky sister-site cross-link banner to jdieselny.com.
  • Interactive 3D exploded hardware visualizer canvas.

  PHASE 3: FRICTIONLESS COMMERCE & BUFFER PIPELINE (Squares W4-01 -> W5-04)
  • Stripe Elements 1-tap checkout (Apple Pay / Google Pay / CashApp).
  • Real-time stock buffer pill (2-unit threshold).
  • Automated assembly workorder dispatch webhook.
  • Self-service Stripe Customer Portal & machine JWT minter.

  PHASE 4: DIY CALCULATOR, COMPETITOR MATRIX & ADS (Squares W6-01 -> W7-04)
  • Interactive DIY BOM vs. Turnkey calculator.
  • TrolMaster / AC Infinity competitor teardown page.
  • Dedicated Google/IG paid landing pages (lp/grow-controller, lp/homestead-iot).
```

---

## 6. SISTER-SITE DOMAIN & BRANDING ALIGNMENT

| Domain | Primary Purpose | Sister-Site Link Strategy |
| :--- | :--- | :--- |
| **`jdieselny.com`** | Medical-Grade Cannabis Seeds, Genetics, Cultivation Authority | Header Banner: *"Need an autonomous controller? Check out our sister hardware platform: A:iX Continuum Core."* |
| **`aix.so` / `continuum.farm`** | Sovereign Edge Hardware, Environmental IoT, A:iP Mobile Engine | Header Banner: *"Cultivating elite crops? Pair your controller with verified genetics from J Diesel NY."* |
