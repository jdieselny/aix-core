# Hardware Integration Specification: Mars Hydro TS-1000 Dimming, Thermal Dry Contact Interlock, and Battery-Powered Wireless Dryback Pods

**Document ID:** `SPEC-HW-004`  
**Ecosystem:** A:iX Core / A:iG Appliance / A:iP Mobile Cockpit  
**Target Hardware:** Mars Hydro TS-1000, Bimetallic Thermal Dry Contact Coils, Sensirion SCD41 CO2, Wireless Coco Dryback Nodes  
**Status:** `FIELD STAGING & ENGINEERING ARCHITECTURE`  
**Author:** Sovereign Hardware Architecture / A:iX Field Engineering  
**Date:** 2026-10-21  

---

## 1. Executive Summary & Physical Topologies

This specification details the engineering integration for three immediate edge hardware subsystems:
1. **Chernobyl Thermal Cutoff (Analog Bimetal Dry Contact Switch):** Physical non-programmable thermal fail-safe that cuts lighting contactor coil power on high temperature, paired with an optoisolated digital state sense line into the A:iG controller.
2. **Mars Hydro TS-1000 Dimming Interface & DLI Engine:** Interfacing the RJ11 dimming port on Mars Hydro LED fixtures with an ESP32 DAC/PWM optoisolated driver to achieve automated **Daily Light Integral (DLI)** closed-loop regulation.
3. **Autonomous Flood Table Wireless Dryback Nodes:** Fat-battery (18650 / 21700 / LiFePO4) powered ultra-low-power ESP32 nodes tracking coco substrate Volumetric Water Content (VWC %) and crop steering drybacks over ESP-NOW / BLE mesh.
4. **Photoacoustic NDIR CO2 Sensor Integration:** ESP32-driven Sensirion SCD41 / Senseair S8 monitoring and solenoid valve interlock.

---

## 2. Thermal Dry Contact Sensor (Chernobyl Analog Coil)

### 2.1 The Physics & Fail-Safe Architecture
The sensor is a bimetallic snap-disc / thermostat coil. It requires zero electricity to function. Under thermal expansion, the calibrated bimetallic curvature snaps at a specific temperature threshold ($T_{\text{trip}}$), physically opening electrical contacts.

```
                    +24VAC / +12VDC Pilot Supply
                                 |
                                 v
                 [ Bimetallic Thermal Snap Switch (NC) ]
                 (Trips mechanically at 95°F / 35°C)
                                 |
         +-----------------------+-----------------------+
         |                                               |
         v                                               v
[ Contactor Coil (A1) ]                    [ Optocoupler / GPIO In ]
(Main 40A Lighting Relay)                  (A:iG Sentinel Sense Pin)
         |                                               |
         v                                               v
        GND / 24VAC Return                          A:iG ESP32 State:
(Contactor drops instantly                        HIGH = Circuit Armed
  extinguishing all lights)                       LOW  = CHERNOBYL TRIP!
```

### 2.2 Dual-Loop Protection
* **Loop 1 (Primary Kinetic Cut):** Wired in series with the 24VAC/12VDC contactor coil. If room temperature reaches the bimetal snap point (e.g. 95°F / 35°C), the coil circuit breaks mechanically. All lighting loads drop within 15 milliseconds regardless of operating system state, network status, or software lockups.
* **Loop 2 (Digital State Sense):** The contactor coil side is monitored via a reverse-diode-protected optocoupler into an A:iG GPIO pin. When the thermal switch opens, the optocoupler de-energizes, pulling the sense GPIO LOW. A:iG initiates:
  - Immediate `CRITICAL_CHERNOBYL_THERMAL_TRIP` alert broadcast to the A:iP Mobile Cockpit.
  - Software latching of the lighting channel into state `DISABLED_OVERTEMP`.
  - Disabling CO2 solenoid valves to avoid wasting gas during emergency venting.
  - Max CFM exhaust fan override to flush heat from the facility.

---

## 3. Mars Hydro TS-1000 Dimming & Closed-Loop DLI Engine

### 3.1 Mars Hydro RJ11 Com Port Physical Pinout
Mars Hydro drivers (such as those on the TS-1000, TSL-2000, and FC series) employ an RJ11 (6P4C or 4P4C) daisy-chain dimming bus:
* Standard 0–10V / 10V PWM / Resistance (100k) sink topology.
* Typical 4-pin RJ11 configuration:
  * **Pin 1:** Reserved / NC
  * **Pin 2:** `DIM+` (Positive 0–10V analog / PWM signal)
  * **Pin 3:** `DIM-` (Signal Ground / Common)
  * **Pin 4:** Reserved / Daisy-chain pass-through

*When `DIM+` is floating or at 10V, the fixture runs at 100% output. When `DIM+` is pulled to 0V (or shorted to `DIM-`), the fixture dims to minimum threshold (~10% or complete driver cutoff).*

### 3.2 ESP32 Dimming Driver Circuit
The ESP32 outputs 3.3V logic. To safely drive the Mars Hydro 0–10V dimming input with galvanic isolation:
* **Circuit:** ESP32 PWM (e.g., 1 kHz, 10-bit resolution on GPIO 18) $\rightarrow$ PC817 or EL817 Optocoupler $\rightarrow$ Open-collector NPN transistor pulling the Mars Hydro `DIM+` line through a 10V reference or utilizing the driver’s internal pull-up.
* **Resolution:** 1024 discrete dimming steps (0.1% intensity granularity).

```
  ESP32 GPIO 18 (PWM) ----[ 330Ω ]----+----> [ Optocoupler Pin 1 (Anode) ]
                                      |
  ESP32 GND --------------------------+----> [ Optocoupler Pin 2 (Cathode) ]

  Mars Hydro DIM+ (10V) --------------> [ Optocoupler Pin 4 (Collector) ]
  Mars Hydro DIM- (GND) --------------> [ Optocoupler Pin 3 (Emitter) ]
```

### 3.3 The Daily Light Integral (DLI) Engine
**Daily Light Integral (DLI)** measures the cumulative number of photons delivered to the canopy in moles per square meter per day ($\text{mol} \cdot \text{m}^{-2} \cdot \text{d}^{-1}$):

$$\text{DLI} = \int_{0}^{T_{\text{photo}}} \text{PPFD}(t) \cdot dt \times 10^{-6} \quad [\text{mol} / \text{m}^2 / \text{day}]$$

Where:
* $\text{PPFD}(t)$ is Photosynthetic Photon Flux Density in $\mu\text{mol} \cdot \text{m}^{-2} \cdot \text{s}^{-1}$.
* For an instantaneous PPFD sampling rate of $\Delta t = 1 \text{ second}$:
  $$\Delta \text{DLI} = \text{PPFD} \times 0.000001 \quad \text{moles}$$

#### Integrated Closed-Loop Light Algorithm
```python
class DliEngine:
    def __init__(self, target_dli_mol: float, photoperiod_hours: float):
        self.target_dli = target_dli_mol
        self.photoperiod_seconds = photoperiod_hours * 3600
        self.accumulated_moles = 0.0
        self.seconds_elapsed = 0

    def step(self, current_ppfd: float) -> float:
        """Called every second during photoperiod. Returns dimming percentage [0.0 - 1.0]."""
        self.accumulated_moles += current_ppfd * 1e-6
        self.seconds_elapsed += 1

        remaining_seconds = max(1, self.photoperiod_seconds - self.seconds_elapsed)
        remaining_moles = max(0.0, self.target_dli - self.accumulated_moles)

        # Target PPFD needed for remainder of light cycle
        required_ppfd = (remaining_moles * 1e6) / remaining_seconds

        # Map required PPFD to Mars Hydro dimming percentage curve
        dim_fraction = self.map_ppfd_to_dim(required_ppfd)
        return min(1.0, max(0.10, dim_fraction))
```

*Benefits:* In early veg, target 20–25 mol/m²/d; in flower, target 40–50 mol/m²/d with CO2. If ambient sunlight or high voltage spikes photon output early in the day, the engine automatically throttles back in late afternoon, preventing photo-inhibition and saving kilowatt-hours.

---

## 4. Wireless Substrate Dryback Pods (Flood Tables)

### 4.1 The Crop Steering Objective
Commercial fertigation management in inert coco coir requires continuous measurement of Volumetric Water Content (VWC %):
* **P1 (Morning Ramp):** Progressive small irrigation shots from lights-on until the substrate reaches container field capacity (60%–70% VWC).
* **P2 (Maintenance):** Micro-shots maintaining root zone hydration during peak transpiration.
* **P3 (Nightly Dryback):** Stopping irrigation 2 hours before lights-out. Monitoring dryback through the dark period:
  * **Vegetative Dryback:** 10% – 15% drop.
  * **Generative / Flowering Dryback:** 20% – 30% drop (signals root system to direct osmotic pressure toward cannabinoid, terpene, and flower density production).

### 4.2 Autonomous Fat-Battery Hardware Node
Running 120V AC wiring or USB cables across wet flood tables creates trip and short-circuit hazards. Nodes must be completely autonomous, sealed, and battery-operated.

#### Power & Component Architecture
* **Energy Reservoir:** Single 18650 (3.7V, 3,500 mAh) or 21700 (3.7V, 5,000 mAh) Lithium-Ion cell, or 32650 / 26650 LiFePO4 (3.2V, 3,200 mAh).
  * *LiFePO4 Advantage:* Working voltage (3.2V) matches ESP32 operating voltage (3.0V–3.6V) directly without an LDO regulator, eliminating quiescent regulator loss!
* **Coprocessor:** ESP32-C3 (RISC-V single-core, integrated BLE 5 & ESP-NOW, ultra-low-power deep sleep at $5 \ \mu\text{A}$).
* **Sensor Probe:** Corrosion-resistant capacitive soil moisture / substrate probe with conformal coating and IP67 potted head.
* **Power-Gated Sensor Rail:** The sensor $V_{cc}$ is fed through a P-channel MOSFET switch (or GPIO high output). The sensor is powered on for **only 60 milliseconds** during sample acquisition, preventing galvanic oxidation of the probe blades.

```
       +--------------------------------------------------------+
       |   Autonomous Soil Dryback Pod                          |
       |                                                        |
       |   [ 21700 Li-Ion Cell (5000 mAh) ]                     |
       |                   |                                    |
       |                   v                                    |
       |       [ Low-Iq LDO / Direct Rail ]                     |
       |                   |                                    |
       |        +----------+----------+                         |
       |        |                     |                         |
       |        v                     v                         |
       |   [ ESP32-C3 ] -----> [ P-MOSFET Switch ]              |
       |   (Deep Sleep 5µA)           |                         |
       |        ^                     v                         |
       |        |             [ Capacitive Probe ]              |
       |        |             (Powered only for 60ms)           |
       |        +--- ADC In <---------+                         |
       |                                                        |
       |   [ RF Broadcast: ESP-NOW Packet (15ms) ] ------------> [ A:iG Controller ]
       +--------------------------------------------------------+
```

#### Battery Life Calculation (21700 5,000 mAh Cell)
* Sleep current: $8 \ \mu\text{A} = 0.008 \ \text{mA}$.
* Active cycle (every 10 minutes = 6 times per hour):
  * Duration: $80 \ \text{ms} = 0.08 \ \text{s}$.
  * Active current: $60 \ \text{mA}$.
  * Energy per cycle: $60 \ \text{mA} \times \frac{0.08}{3600} = 0.00133 \ \text{mAh}$.
* Total hourly consumption:
  $$(0.008 \ \text{mA} \times 1\text{h}) + (6 \times 0.00133 \ \text{mAh}) = 0.008 + 0.008 = 0.016 \ \text{mAh/hour}$$
* Lifetime on 5,000 mAh battery:
  $$\frac{5000 \ \text{mAh}}{0.016 \ \text{mAh/hour}} = 312,500 \ \text{hours} \approx 35 \ \text{years} \quad (\text{limited only by battery shelf-life self-discharge})$$
* **Real-world service life:** Even with high-frequency 1-minute sampling, the pod runs **6 to 12 months** on a single charge. Recharging is performed via a waterproof magnetic pogo-pin dock once or twice per grow cycle.

---

## 5. ESP32 Photoacoustic CO2 Sensor Pod (Sensirion SCD41)

### 5.1 Physical Sensing Principle
* Traditional NDIR sensors use large optical chambers with infrared lamps prone to drift.
* The **Sensirion SCD41** uses photoacoustic spectroscopy: an optical pulse excites CO2 molecules inside an ultra-compact acoustic resonance chamber, measured by an internal MEMS microphone.
* Measurement Range: 400 ppm to 5,000 ppm ($\pm 40 \text{ ppm} + 5\%$).
* Interface: Standard I2C (address `0x62`, 3.3V logic).

### 5.2 Controlled Injection Interlock Law
CO2 gas injection without strict photoperiod interlocks wastes bottled gas and endangers plants or personnel. The A:iG controller enforces:
1. **Light Gating:** If photoperiod is OFF, solenoid is held closed (plants respire CO2 in the dark; injection is strictly prohibited).
2. **Exhaust Gating:** If the exhaust fan is running above 20% CFM, the CO2 solenoid is locked out to prevent blowing gas directly outside.
3. **PPM Window:**
   * Inactive / Ambient Target: 400 – 600 ppm.
   * Veg Photoperiod: 800 – 1,000 ppm.
   * Bloom Photoperiod: 1,100 – 1,400 ppm.

---

## 6. Implementation Checklist & Immediate Actions

| Step | Task | Hardware Requisite | Status |
| :---: | :--- | :--- | :---: |
| **1** | Identify part number on analog metal coil thermal switches | User inspecting markings on hand | `AWAITING PART #` |
| **2** | Verify Mars Hydro TS-1000 driver port pinout | Standard RJ11 cable + multimeter continuity check | `STAGED` |
| **3** | Build 0–10V ESP32 optocoupler driver cable for TS-1000 | PC817 / EL817 optoisolator, 330Ω resistor, RJ11 plug | `READY TO ASSEMBLE` |
| **4** | Benchmark Sensirion SCD41 I2C driver on ESP32 | ESP32-WROOM / SCD41 module | `READY` |
| **5** | Fabricate battery-powered capacitive dryback prototype | ESP32-C3, 18650/21700 holder, capacitive probe | `DESIGNED` |
