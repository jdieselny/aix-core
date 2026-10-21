# Cisco 3504 WLC & Dual Aironet 2802 AP: Sovereign RF Radar & Intruder Fingerprinting Architecture
**Document ID:** `SPEC-CISCO-RF-RADAR-001`  
**Site:** Homestead & Facility Perimeter  
**Hardware Iron:** Cisco 3504 Wireless LAN Controller + 2x Cisco Aironet 2802 APs (Front & Back)  
**Integration:** Watchtower Synology (`192.168.1.193`) + ESP32 CSI Microwave Mesh (`:5006`)  
**Status:** `STAGING ARCHITECTURE & PROVISIONING GUIDE`  

---

## 1. Executive Concept: Zero-Camera Biometric RF Radar

Cameras can be blinded by darkness, fog, foliage, infrared glare, or power cuts. RF signals penetrate walls, foliage, and darkness. 

By repurposing enterprise-grade Cisco Aironet 2802 APs into dedicated **Monitor / Sniffer** sensors paired with the Cisco 3504 controller, we establish a continuous 24/7 RF perimeter that tracks:
1. **Device-Level Signatures:** 802.11 Probe Requests, MAC addresses, Information Elements (IE tags), and transmission bursts.
2. **Spatial Localization:** Differential RSSI triangulation between AP-Front and AP-Back ($RSSI_{front} - RSSI_{back}$).
3. **Cross-Sensor Multi-Modal Fusion:** Correlating Cisco RF signatures with the ESP32 CSI (Channel State Information) subcarrier microwave mesh to detect **intruders attempting electronic silence** (movement detected via ESP32 multipath disruption with zero phone RF emission).

```
                      ┌────────────────────────────────────────┐
                      │    CISCO 3504 WLC (AireOS 8.5+)        │
                      │           192.168.1.50                 │
                      └──────────────┬─────────────────────────┘
                                     │ CAPWAP / L3
                      ┌──────────────┴──────────────┐
                      ▼                             ▼
         [AP-FRONT: AIR-AP2802]        [AP-BACK: AIR-AP2802]
         Location: Front Porch/Garage  Location: Back Yard/Garden
         Mode: Sniffer / Monitor       Mode: Sniffer / Monitor
         Antenna: 4x4 MU-MIMO Wave 2   Antenna: 4x4 MU-MIMO Wave 2
                      │                             │
                      │ Raw TZSP / CMX Streams      │ Raw TZSP / CMX Streams
                      │ (UDP 37008 to Watchtower)   │ (UDP 37008 to Watchtower)
                      ▼                             ▼
         ┌─────────────────────────────────────────────────────────────┐
         │             WATCHTOWER RF RADAR & TELEMETRY ENGINE          │
         │                (scripts/cisco_rf_profiler.py)               │
         ├─────────────────────────────────────────────────────────────┤
         │ • Decapsulates TZSP packets & extracts 802.11 probe frames  │
         │ • Triangulates position: RSSI_delta = RSSI_front - RSSI_back│
         │ • Profiles resident baselines (Justin, family, fleet nodes) │
         │ • Correlates with ESP32 CSI spatial microwave mesh (:5006)   │
         └──────────────────────────────┬──────────────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
              [RESIDENT VERIFIED]             [INTRUDER / ANOMALY]
              • Silent logging                • Unknown MAC / Probe
              • Curfew tracking               • Electronic stealth (CSI motion
              • Trend analytics over time       with ZERO RF emission) -> RED
```

---

## 2. Cisco 3504 WLC Network Configuration

### 2.1 Management & AP Subnet Mapping
* **Management IP:** `192.168.1.50 /24` (Gateway: `192.168.1.1`)
* **AP-Front IP:** `192.168.1.51 /24` (Static or DHCP reserved via Watchtower Pi-hole/Kea)
* **AP-Back IP:** `192.168.1.52 /24`
* **Destination Collector (Watchtower):** `192.168.1.193` (Port UDP `37008`)

### 2.2 AP Operating Modes in AireOS
1. **Sniffer Mode (Direct Packet Forwarding):**
   * The AP locks onto designated 2.4 GHz and 5 GHz channels and encapsulates every received 802.11 frame inside a **TZSP (TaZmen Sniffer Protocol)** UDP packet directed at `192.168.1.193:37008`.
   * Advantage: Zero loss of packet headers, precise microsecond timestamps, raw antenna signal levels.
   * Command on WLC CLI:
     ```
     config ap mode sniffer AP-Front
     config ap sniffer AP-Front 802.11b 1 192.168.1.193
     config ap sniffer AP-Front 802.11a 36 192.168.1.193
     ```
2. **Monitor Mode with CleanAir Spectrum Analysis:**
   * The AP cycles through all regulatory channels, tracking rogue APs, rogue clients, and CleanAir non-Wi-Fi interferers (microwave ovens, analog video transmitters, 2.4GHz jammers).
   * Streams telemetry via NMSP or SNMP traps to Watchtower.

---

## 3. Fingerprinting & Person Profiling Mechanics

Modern smartphones randomize their MAC addresses when scanning for Wi-Fi networks. However, privacy-preserving randomized MACs do **not** defeat multi-attribute RF profiling:

| Feature Dimension | Extraction Method | Persona Stability |
| :--- | :--- | :--- |
| **IE Parameter Set Order** | Information Elements in 802.11 Probe Requests are serialized in operating-system-specific order (iOS vs Android vs Linux). | Extremely High (Stable per OS build) |
| **HT / VHT / HE Capabilities** | Bitmask of supported modulation schemes, spatial streams, guard intervals, and channel widths. | Static per device chipset model |
| **Vendor IE Fingerprint** | Apple-specific (00:17:f2), Broadcom, or Google tags embedded in probe payloads. | Unique to device class |
| **Burst Timing & Inter-Arrival** | Exponential backoff probe intervals when walking/approaching. | Characteristic per device background state |
| **Spatial Attenuation Vector** | Ratio: $RSSI_{front} - RSSI_{back}$ mapped against speed of approach. | Identifies entry vector (driveway vs woods) |

---

## 4. Multi-Layer Intruder State Matrix (Cisco RF + ESP32 CSI)

| Cisco RF State | ESP32 CSI State | Threat Level | System Interpretation & Tactical Action |
| :--- | :--- | :--- | :--- |
| **Known Resident Device** | Spatial motion detected | **GREEN (Normal)** | Authorized resident moving through house/garden. Log timestamp; suppress alerts. |
| **Known Resident Device** | Static / No motion | **GREEN (Idle)** | Phone resting on charging dock or desk. |
| **Unregistered Device** | Driveway approaching | **AMBER (Visitor)** | Courier, delivery truck, or guest approaching. Log entry vector; ping A:iP mobile cockpit. |
| **ZERO Device (RF Silent)** | **Spatial motion detected** | **RED (Intruder)** | **CRITICAL:** Physical body moving inside secure perimeter with no RF signature or phone in airplane mode. Trigger high-alert event, strobe warning light, record high-resolution snapshot. |
| **RF Jammer / Noise Burst** | Fluctuating multipath | **RED (Countermeasure)** | CleanAir detects wideband 2.4GHz jammer. Hardwire failsafe lock engaged. |

---

## 5. Physical Deployment Steps

1. **Powering the APs:**
   * Cisco 2802 APs require 802.3at PoE+ (30W). Connect via PoE+ switch or dedicated 30W PoE injectors.
2. **Console / Initial Discovery:**
   * Connect console cable (RJ45 to USB, 9600 8-N-1) to Cisco 3504 WLC. Set management IP `192.168.1.50`.
   * Enable DHCP Option 43 or DNS entry `cisco-capwap-controller.home.local` pointing to `192.168.1.50` so AP-Front and AP-Back join automatically.
3. **Physical Placement:**
   * **AP-Front:** Mount under soffit of front porch or high inside garage facing driveway.
   * **AP-Back:** Mount on rear exterior wall or garden shed overlooking backyard and approach paths.
4. **Daemon Launch on Watchtower:**
   * Run `scripts/cisco_rf_profiler.py` as a systemd service `continuum-cisco-rf.service` on Watchtower (`192.168.1.193`).
