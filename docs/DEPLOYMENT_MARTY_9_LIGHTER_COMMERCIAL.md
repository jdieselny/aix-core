# Field Deployment Specification: Marty's Commercial Facility (9-Lighter)
**Document ID:** `DEPLOY-MARTY-001`  
**Site Authority:** Justin D. Kintzele (Physical Operator) & Marty (Facility Operator)  
**Engineering Body:** Agent Smith / Continuum Commercial Fleet  
**Status:** `FIELD STAGING & DISCOVERY`  
**Target Appliance:** Turnkey A:iG Appliance ($499) + Sensirion Sniffer Pods + Chernobyl Contactor  
**Date:** 2026-10-21  

---

## 1. Facility Profile & Physical Iron

| Subsystem | Existing Staged Iron | Operational Parameters | Continuum Interface & Protocol |
| :--- | :--- | :--- | :--- |
| **Canopy Lighting** | **9x Iluminar 670W LEDs** (converted from 1000W HPS) | Total Load: **6,030 Watts** (~25.1A @ 240V). Deep red / full spectrum. | 0–10V / RJ12 Daisy-Chain Dimming + High-Inrush Lighting Contactor Relay. |
| **Cooling & HVAC** | **4-Ton Split A/C Unit** | **48,000 BTU/hr** cooling capacity. Dedicated compressor. | 24VAC Thermostat Relay (Y1/Y2 cooling call) or dry-contact control. |
| **Dehumidification** | **Quest Commercial Dehumidifier** (Overhead) | Continuous condensate extraction; high-efficiency latent heat removal. | 24VAC Dehum Relay (Dehum call based on live VPD / RH target). |
| **Atmospheric CO2** | **CO2 Injection (Solenoid / Regulator)** | Target: **1,000 – 1,400 ppm** during photoperiod. Exhaust purge interlock. | 120V Solenoid Relay. **Hard Interlock:** Armed *only* when lights are active and exhaust fans are idle. |
| **Irrigation / Root Zone** | **Commercial Flood Tables** | Coco Coir inert substrate (high-porosity cation medium, high-frequency fertigation). | Submersible pump relay (scheduled automated feed pulses) + runoff monitoring. |
| **Fertigation Regimen** | Switched off Advanced Nutrients | Clean salt-based liquid/mineral line (e.g., Athena / GH Flora / Jacks). | Electrical Conductivity (EC) & pH tracking log in A:iP mobile cockpit. |
| **Life-Safety Failsafe** | Staged for Deployment | **Chernobyl 95°F Thermal Trip Switch** | In-line bimetallic contactor cut: drops lighting contactor if 4-ton A/C fails. |

---

## 2. Electrical & Kinetic Interlocks

### 2.1 The "Never Fry a Crop" Thermal Cut (Chernobyl Contactor)
With 6 kW of LED photon power in an insulated room, an A/C failure causes room temperatures to spike past 100°F within 20 minutes:
* An analog, bimetallic 95°F snap-action thermostat is wired in series with the low-voltage coil of the lighting contactor.
* If room ambient hits 95°F, the circuit mechanically opens, de-energizing the 9 Iluminar fixtures **completely independent of software, Wi-Fi, or operating systems**.

### 2.2 The Photoperiod Dark-Lock Law (HTTP 423)
* During the 12/12 flowering dark period, Continuum enforces strict **HTTP 423 Locked** gating on all lighting channels.
* Accidental mobile manual overrides are rejected to prevent hermaphroditic light-poisoning stress on the crop.

---

## 3. Data Intake Checklist for Operator Intake

- [ ] **Lighting Controller Port:** Verify whether the Iluminar 670s use 0–10V analog voltage, RJ11/RJ12 daisy-chain (Iluminar Hash / Master controller protocol), or standard wall contactors.
- [ ] **Thermostat Wiring:** Map 24VAC wiring terminals on the 4-ton A/C unit (`R`, `C`, `Y1`, `G`).
- [ ] **Quest Terminal Block:** Identify low-voltage 24V screw terminals on the Quest overhead dehum unit (`24V`, `DEHUM`).
- [ ] **CO2 Delivery Method:** Bottled compressed liquid CO2 with 120V electric solenoid valve vs. natural gas/propane CO2 generator.
- [ ] **Water / Fertigation Batching:** Hand-mixed reservoir with automated submersible pump pulse timer vs. batch-tank fertigation skid.
- [ ] **Network Connectivity:** Ethernet run from house/router to the grow room, or 2.4/5GHz Wi-Fi link for the A:iG Appliance.

---

## 4. Hardware Kit Staging (BOM for Marty's Deployment)

1. **1x Turnkey A:iG Appliance ($499):** Pre-flashed with hardened OS, Watchtower Sentinel, local NVMe telemetry datalake, and Marty's Secure Enclave key.
2. **2x Sensirion Sniffer Pods ($89/ea):** Placed at canopy height (one at room center, one at perimeter). Measures NDIR CO2, precision temperature, relative humidity, and calculates live leaf-to-air VPD.
3. **1x 95°F Chernobyl Thermal Safety Contactor ($49):** Wired to the 9-light subpanel contactor coil.
4. **1x 4-Channel Industrial 24V Relay Board:** Dry-contact interface for A/C, Quest dehum, CO2 solenoid, and irrigation pump.
5. **A:iP Mobile Cockpit:** Provisioned on Marty's phone for real-time glance telemetry, VPD alarms, and remote camera checks.
