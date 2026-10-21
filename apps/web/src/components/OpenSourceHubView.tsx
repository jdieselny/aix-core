import React from "react"

export interface OpenSourceProject {
  id: string
  title: string
  summary: string
}

export const OPEN_SOURCE_PROJECTS: readonly OpenSourceProject[] = [
  {
    id: "aig-esp32-par-pod",
    title: "aig-esp32-par-pod",
    summary:
      "ESP32-WROOM Wi-Fi Mars Hydro dimmer and 18650 flood-table PAR meter. Local firmware, local dimming curve.",
  },
  {
    id: "govee-ble-reverse",
    title: "govee-ble-reverse",
    summary: "Zero-cloud BLE H5075 advertisement parser. Temperature and humidity stay on the LAN.",
  },
  {
    id: "cisco-tzsp-radar",
    title: "cisco-tzsp-radar",
    summary:
      "Aironet 2802 monitor/sniffer plus ESP32 52-subcarrier CSI presence fusion. Right-to-repair radio, no cloud console.",
  },
  {
    id: "ep-receipt-jcs",
    title: "ep-receipt-jcs",
    summary: "RFC 8785 canonical JSON and Ed25519 physical actuation receipts. JCS bytes are the signature preimage.",
  },
  {
    id: "esphome",
    title: "esphome",
    summary: "Local-first ESPHome device trees for sensors that must keep working when the WAN drops.",
  },
  {
    id: "rtl_433",
    title: "rtl_433",
    summary: "rtl_433 decodes commodity 433 MHz sensors on a homestead SDR. No vendor account.",
  },
  {
    id: "tuya-local",
    title: "tuya-local",
    summary: "tuya-local keeps formerly cloud-locked plugs on the LAN after the right-to-repair key extract.",
  },
]

export function OpenSourceHubView() {
  return (
    <section data-hub="open-source" style={{ display: "grid", gap: "1rem" }}>
      <p style={{ color: "#34D399", fontWeight: 700, margin: 0 }}>
        Right-to-repair. Local-first. The open $297 DIY BOM sits next to every protocol below.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
        {OPEN_SOURCE_PROJECTS.map((project) => (
          <li key={project.id} id={project.id} style={{ border: "1px solid #243044", padding: "0.85rem 1rem" }}>
            <h2 style={{ color: "#34D399", fontSize: "1.05rem", margin: "0 0 0.35rem" }}>{project.title}</h2>
            <p style={{ margin: 0 }}>{project.summary}</p>
          </li>
        ))}
      </ul>
      <p style={{ margin: 0 }}>
        Published DIY column: $297. Parts, labor notes, and the Turnkey A:iG Appliance comparison live in the BOM calculator.
      </p>
    </section>
  )
}
