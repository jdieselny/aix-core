import type { CSSProperties } from "react"

export interface HeroMediaProps {
  src?: string
  alt?: string
  width?: number
  height?: number
}

const frame: CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  background: "#0A0B0F",
  overflow: "hidden",
  scrollbarGutter: "stable",
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

function localSource(value: string, fallback: string): string {
  if (value.startsWith("/") && !value.includes(" ") && !value.includes('"')) {
    return value
  }
  return fallback
}

export function HeroMedia({
  src = "/hardware/aig_appliance_hero.jpg",
  alt = "A:iG Autonomous Edge Cultivation Appliance",
  width = 1376,
  height = 768,
}: HeroMediaProps) {
  const imageSrc = localSource(src, "/hardware/aig_appliance_hero.jpg")
  const safeAlt = escapeAttr(alt)
  const markup = `<img src="${imageSrc}" alt="${safeAlt}" width="${width}" height="${height}" fetchpriority="high" decoding="async" sizes="(min-width: 960px) 1200px, 100vw" style="display:block;width:100%;height:auto"/>`
  return (
    <div
      data-hero="lcp"
      style={{ ...frame, aspectRatio: `${width} / ${height}` }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
