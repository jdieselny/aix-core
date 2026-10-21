# Engineering Specification: The B.A.D.-A.S.S. System
## Big Ass Display · Automated Selective Showcase

**Document ID:** `SPEC-BADASS-001`  
**Ecosystem:** A:iX Core / Turnkey A:iG Appliance / Commercial Facilities  
**Classification:** Advanced Facility Telemetry & Optical HUD Architecture  
**Date:** 2026-10-21  

---

## 1. System Vision & The Cultivator Problem

Commercial indoor cultivation spaces are hostile to consumer display hardware:
* **The Environment:** 60%–80% Relative Humidity, sulfur/foliar spray mist, splashing fertigation runoff, and 6,000+ Watts of blinding full-spectrum LED radiation.
* **The Operator Friction:** Traditional tablets, smartphones, and monitors require delicate handling, collect dust/moisture, and require operators to stop physical work, remove resin-coated gloves, and pull out screens.
* **The Solution — B.A.D.-A.S.S. (Big Ass Display · Automated Selective Showcase):**
  - An Ultra-Short-Throw (UST) laser projector throws a massive **120" to 200" tactical HUD** directly onto the facility's blank concrete, drywall, or poly wall.
  - Powered directly by the **dual 4K HDMI ports on the Turnkey A:iG Appliance** (Intel N100).
  - Hands-free, voice-commanded dynamic layout reconfigurations.
  - **Dynamic Optical Zone Attenuation:** Automatically dims the luminaire bank directly over the projection field to deliver deep contrast without blinding glare.

---

## 2. Dynamic Optical Zone Attenuation ("Dim Row 3")

When operating under 6 kW of photon flux (PPFD $> 1,000 \ \mu\text{mol}/\text{m}^2/\text{s}$), projected images risk being washed out.

```
       Operator Voice Command:
       "Agent Smith, throw up the BAD-ass system on the wall and dim Row 3."
                                 |
                                 v
                     [ Turnkey A:iG Controller ]
                                 |
         +-----------------------+-----------------------+
         |                                               |
         v                                               v
[ HDMI 4K Projection Out ]                      [ 0-10V Dimming Driver ]
(Renders high-contrast dark HUD                  (Drops Row 3 fixtures to 15%
   at 3840x2160 @ 60Hz)                            over a smooth 2.5s ramp)
         |                                               |
         +-----------------------+-----------------------+
                                 v
           [ Pristine 150" Obsidian HUD on Facility Wall ]
           (Deep black levels · High-contrast neon metrics)
```

When dismissed (*"Agent Smith, clear display, restore Row 3"*), lighting smoothly ramps back to the standard PPFD target over 10 seconds, ensuring zero plant stress while optimizing energy use.

---

## 3. Modular Voice-Driven Layout Architecture

The B.A.D.-A.S.S. display engine uses responsive CSS Grid / Flexbox tiles that rearrange instantaneously based on natural speech tokens:

### 3.1 Primary Showcase Layouts

| Voice Prompt | Layout State | Displayed Quadrants |
| :--- | :--- | :--- |
| *"Agent Smith, show the BAD-ass system"* | `LAYOUT_DEFAULT` | 4-Quadrant Cockpit: Live VPD/Climate, Radar, Soil Dryback, Photoperiod status. |
| *"Agent Smith, put the scheduler on the right, toss the wait timers up on screen"* | `LAYOUT_SPLIT_TIMERS_SCHEDULER` | **Left:** Real-time VPD gauges.<br>**Center:** Multi-reservoir dry-salt batch timers with live second countdowns.<br>**Right:** 12/12 photoperiod & irrigation pulse timeline. |
| *"Agent Smith, full-screen radar sweep"* | `LAYOUT_MAX_RADAR` | Microwave presence detection and spatial tracking map across the entire 150" projection. |
| *"Agent Smith, show drybacks"* | `LAYOUT_ROOT_ZONE` | Multi-table Volumetric Water Content (VWC %) curves with dryback steering targets. |

---

## 4. Hardware Implementation & Physical Interface

* **Compute Gateway:** Turnkey A:iG Industrial Fanless Appliance (Intel N100 quad-core, Intel UHD Graphics, dual HDMI 2.1 4K60 outputs).
* **Projector Specification:**
  - High-brightness Ultra-Short-Throw (UST) Laser (e.g. 3,500 to 5,000 ANSI lumens).
  - Throw Ratio: $0.23:1$ (projects a 120" display from only 12 inches away from the wall).
  - Sealed optical engine (IP5X dust resistance rating against dry-salt dust and sulfur vapor).
* **Network / Control Interface:**
  - Standard Chromium kiosk mode (`chromium --kiosk http://localhost:3000/badass`).
  - WebSockets / Server-Sent Events (SSE) push live state updates from the A:iG Sentinel in $< 50\text{ms}$.
