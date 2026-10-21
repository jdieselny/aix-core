import type { CSSProperties } from "react"

const card: CSSProperties = {
  background: "rgba(18, 20, 28, 0.72)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(231, 236, 243, 0.12)",
  borderRadius: 16,
  padding: "clamp(1rem, 0.8rem + 1vw, 1.5rem)",
  display: "grid",
  gap: 10,
  color: "#E7ECF3",
  fontFamily: '"DM Sans", "Inter", "Segoe UI", sans-serif',
}

const price: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(1.4rem, 1.1rem + 1vw, 2rem)",
  color: "#38BDF8",
}

const spec: CSSProperties = {
  margin: 0,
  fontFamily: '"JetBrains Mono", "Cascadia Mono", ui-monospace, monospace',
  fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.9rem)",
  lineHeight: 1.45,
}

const FEATURES = [
  "CO2 Precision: Sensirion SCD41 photoacoustic sensor (400–5,000 ppm, ±40 ppm accuracy)",
  "Temp & Humidity: Sensirion SHT45 (±1.0% RH, ±0.1°C accuracy)",
  "Light & Spectrum: Calibrated quantum PAR photodiode module (0–2,000 µmol/m²/s)",
  "Eliminates the Govee Dance: Pure I2C bus over ESP-NOW/BLE. No proprietary cloud apps.",
  "Enclosure: CNC anodized aluminum enclosure with dust-filtered airflow port",
] as const

const POD_PHOTO =
  '<img src="/hardware/sniffer_pod_product.jpg" alt="A:iX Sniffer Pod with Sensirion SCD41 and SHT45 sensors" width="1024" height="1024" loading="lazy" decoding="async" sizes="(min-width: 960px) 33vw, 100vw" style="display:block;width:100%;height:auto"/>'

export function SnifferPodCard() {
  return (
    <article data-product="sniffer-pod" style={card}>
      <h2 style={{ margin: 0 }}>ESP32 "Sniffer" Environmental Pod</h2>
      <p data-price="89" style={price}>
        $89.00 USD
      </p>
      <div
        data-photo="sniffer"
        style={{ aspectRatio: "1 / 1", background: "#0A0B0F", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: POD_PHOTO }}
      />
      <ul>
        {FEATURES.map((line) => (
          <li key={line} style={spec}>
            {line}
          </li>
        ))}
      </ul>
    </article>
  )
}
