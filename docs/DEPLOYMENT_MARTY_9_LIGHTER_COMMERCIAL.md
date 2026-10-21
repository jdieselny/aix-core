# Field Deployment Specification: Marty's Commercial Facility (9-Lighter)

**Document ID:** `DEPLOY-MARTY-001`  
**Site Authority:** Justin D. Kintzele (Physical Operator) & Marty (Commercial Facility Operator)  
**Engineering Body:** Sovereign Hardware Architecture / A:iX Field Engineering  
**Status:** `LOCKED-IN FIELD PILOT 001 (ACTIVE COMMERCIAL TESTBED)`  
**Target Appliance:** Turnkey A:iG Appliance ($499) + Sensirion Sniffer Pods + Chernobyl Contactor + Wireless Dryback Pods  
**Date:** 2026-10-21  

---

## 1. Facility Profile & Physical Iron

| Subsystem | Staged Iron | Operational Parameters | A:iX Interface & Protocol |
| :--- | :--- | :--- | :--- |
| **Canopy Lighting** | **9x Iluminar 670W LEDs** (converted from 1000W HPS) | Total Load: **6,030 Watts** (~25.1A @ 240V). Deep red / full spectrum. | 0–10V / RJ12 Daisy-Chain Dimming + 40A Lighting Contactor. |
| **Cooling & HVAC** | **4-Ton Split A/C Unit** | **48,000 BTU/hr** cooling capacity. Dedicated compressor. | 24VAC Thermostat Relay (`Y1`/`Y2` cooling call) or dry-contact control. |
| **Dehumidification** | **Quest Commercial Dehumidifier** (Overhead) | Continuous condensate extraction; high-efficiency latent heat removal. | 24VAC Dehum Relay (Dehum call based on live VPD / RH target). |
| **Atmospheric CO2** | **CO2 Injection (Solenoid / Regulator)** | Target: **1,000 – 1,400 ppm** during photoperiod. Exhaust purge interlock. | 120V Solenoid Relay. **Hard Interlock:** Armed *only* when lights are active and exhaust fans are idle. |
| **Irrigation / Root Zone** | **Commercial Flood Tables** | Coco Coir inert substrate (high-porosity cation medium, high-frequency fertigation). | Submersible pump relay (scheduled automated feed pulses) + runoff monitoring. |
| **Root Moisture Sensing** | **Autonomous Dryback Pods** | 3x Wireless 21700/18650 Battery Pods (ESP32-C3) in substrate blocks. | ESP-NOW telemetry to A:iG gateway; live VWC % & dryback tracking. |
| **Fertigation Line** | Switched off Advanced Nutrients | Clean salt-based mineral line (Athena / GH Flora / Jacks). | Electrical Conductivity (EC) & pH tracking log in A:iP mobile cockpit. |
| **Life-Safety Failsafe** | Staged for Deployment | **Chernobyl 95°F Thermal Trip Switch** | In-line bimetallic contactor cut: drops lighting contactor if 4-ton A/C fails. |

---

## 2. Root-Zone Safeguard: The 8-Plant Loss Post-Mortem

### 2.1 The Failure Mode
During Marty's previous production cycle, an unexpected irrigation timing fault resulted in complete substrate desiccation, causing the irreversible loss of **8 mature plants** during peak vegetative development:
* In inert coco coir, water holding capacity drops rapidly once Volumetric Water Content (VWC) breaches the Permanent Wilting Point ($<25\%$).
* Without real-time telemetry, root die-back occurs within 8–12 hours, killing the plants before the operator can intervene.

### 2.2 The A:iX Desiccation Prevention Protocol
1. **Physical Placement:** Three battery-operated wireless capacitive dryback pods are embedded directly into coco slabs across Table 1, Table 2, and the center row.
2. **Autonomous Desiccation Interlock:**
   * If any dryback pod detects VWC falling below **32%** during the photoperiod:
     1. A:iG immediately overrides all idle timers and commands an emergency **45-second fertigation pulse** to the flood table.
     2. Dispatches an audible emergency notification to Marty's A:iP Mobile Cockpit:
        `[CRITICAL ROOT ZONE ALERT] Table 1 VWC at 29.4% -> Emergency pulse executed (45s). Crop preserved.`
   * This safeguard alone delivers an ROI exceeding the entire cost of the A:iG appliance package on its first intervention.

---

## 3. Kinetic & Electrical Safety Interlocks

### 3.1 The "Never Fry a Crop" Thermal Cut (Chernobyl Contactor)
With 6,030 Watts of LED photon power in an insulated commercial space, an A/C compressor failure spikes ambient temperatures past 100°F in under 20 minutes:
* An analog, bimetallic 95°F normally closed (NC) snap-action thermostat is wired in series with the 24VAC low-voltage coil of the 40A lighting contactor.
* If room ambient reaches 95°F, the switch mechanically snaps open, dropping the contactor and extinguishing all 9 Iluminar fixtures **completely independent of software, Wi-Fi, or operating systems**.
* An optoisolated digital state tap off the coil line alerts A:iG, which logs `CHERNOBYL_THERMAL_TRIP`, locks lighting channels into `DISABLED_OVERTEMP`, and ramps exhaust ventilation to 100% CFM.

### 3.2 The Photoperiod Dark-Lock Law (HTTP 423)
* During the 12/12 flowering dark period, A:iG enforces strict **HTTP 423 Locked** gating on all lighting channels.
* Accidental mobile manual overrides are rejected to prevent hermaphroditic light-poisoning stress on the crop.

---

## 4. Advanced Automation Roadmap (Marty Field Pilot Additions)

### 4.1 Project "Photon-Shear": Autonomous Laser Defoliation Gantry
* **The Problem:** Hand-defoliating 9 commercial light footprints requires 20–40 hours of agonizing labor per cycle with workers staring upward into blinding 6 kW LED canopies.
* **The Architecture:**
  - **Mechanical System:** Unistrut-mounted X/Y/Z linear rail gantry suspended above the flood tables.
  - **Computer Vision:** Dual stereo-triangulation cameras with edge inference trained specifically on petiole stem recognition (the leaf stalk connecting water leaves to the node).
  - **Laser Actuation:** 450nm 5W–10W focused pulsed blue laser targeting the petiole base. A 200ms burst cleanly vaporizes water-rich stem tissue, dropping the fan leaf to the table surface without touching floral calyxes or sugar leaves.
  - **Viroid Immunity:** Non-contact cutting eliminates pathogen vectoring (e.g., Hop Latent Viroid / HLVd) caused by contaminated pruning shears.

### 4.2 Optical Canopy Sensing & Spider Mite Remediation Protocol
* **Early Detection:** High-sensitivity canopy nodes hung above individual plants monitor micro-fine webbing and near-infrared reflectance (NDVI drops indicating chlorophyll cell rupture by *Tetranychus urticae*).
* **The Non-Toxic Phototherapy Protocol:**
  - Avoids toxic chemical miticides (abamectin/bifenthrin) that fail state compliance lab tests.
  - A:iG schedules targeted narrow-band **UV-A / UV-B phototherapy pulses** (280–315 nm) for 15 minutes twice daily during vegetative cycles.
  - UV irradiation causes lethal DNA dimerization in spider mite eggs and sterilizes adult females, breaking the reproductive cycle within 72–96 hours without chemical residues on the crop.

### 4.3 Voice-Automated Sovereign Cockpit with Cryptographic 2FA
* **Hands-Free Resin-Glove Interface:**
  - Room microphone running local whisper/wake-word edge processing on A:iG.
  - *"A:iG, status report."* $\rightarrow$ Reads canopy temperature, VPD, CO2 ppm, and dryback percentages.
  - *"A:iG, set bloom night target to 66°F."* $\rightarrow$ Dispatches a 1-tap cryptographic 2FA confirmation prompt to the A:iP Mobile Cockpit on Marty's phone.
  - *"A:iG, remind me in 30 minutes to check batch tank."* $\rightarrow$ Sets persistent hardware timer on A:iG and buzzes phone/watch.
* **Reservoir Liquid Level:** Dual ultrasonic and stainless float switches installed in the nutrient mixing reservoir to prevent submersible pump burnouts and tank overflows.

### 4.4 The YouTube & Educational Content Engine
* **Strategy:** Document the real-world deployment on Marty's commercial testbed from unboxing to harvest.
* **Episode Arc:**
  1. *EP01: The $499 Sovereign Grow Controller vs. 6,030W Commercial Iron* (Unboxing, mounting, contactor wiring).
  2. *EP02: How We Stop Crop Losses: Building $15 Wireless Coco Dryback Sensors* (Soldering, calibration, emergency watering demo).
  3. *EP03: Killing the Cloud: The 423 Dark-Cycle Lock Law* (Local security, preventing hermaphroditic crop damage).
  4. *EP04: DLI Tuning on 9 Iluminar Fixtures* (Real-time quantum sensing and closed-loop daily photon accumulation).

---

## 5. Deployment BOM & Staging Checklist

1. [x] **1x Turnkey A:iG Appliance ($499):** Pre-flashed with hardened sovereign OS, local NVMe telemetry datalake, and Marty's Secure Enclave key.
2. [x] **2x Sensirion Sniffer Pods ($89/ea):** Canopy NDIR CO2, precision temp, relative humidity, and live VPD calculation.
3. [x] **1x 95°F Chernobyl Thermal Safety Contactor ($49):** Series coil interlock + optoisolated digital state tap.
4. [x] **3x Battery-Powered Wireless Dryback Pods:** ESP32-C3 with double 18650 packs (7,000 mAh) and capacitive moisture blades.
5. [x] **1x 4-Channel Industrial 24V Relay Board:** Dry-contact interface for A/C, Quest dehum, CO2 solenoid, and irrigation pump.
6. [x] **A:iP Mobile Cockpit:** Provisioned on Marty's smartphone for P2P mTLS telemetry and 1-tap override authorizations.
