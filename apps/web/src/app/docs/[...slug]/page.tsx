import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation.js"
import { DocsBrochureView } from "../../../components/docs/DocsBrochureView.js"
import { DocsDatasheetView } from "../../../components/docs/DocsDatasheetView.js"
import { DocsFastStartView } from "../../../components/docs/DocsFastStartView.js"
import { DocsIsrProgramView } from "../../../components/docs/DocsIsrProgramView.js"
import { DOC_SECTIONS, DocsLayout } from "../../../components/docs/DocsLayout.js"
import { DocsManPagesView } from "../../../components/docs/DocsManPagesView.js"
import { DocsReleaseNotesView } from "../../../components/docs/DocsReleaseNotesView.js"
import { DocsUserGuideView } from "../../../components/docs/DocsUserGuideView.js"

const FIELD_GUIDE_SLUGS = [
  "esp32-flashing",
  "contactor-wiring",
  "vertiv-snmp",
  "tailscale-mesh",
] as const

const KNOWN_SLUGS = new Set<string>([
  ...DOC_SECTIONS.map((doc) => doc.slug),
  ...FIELD_GUIDE_SLUGS,
])

export function generateStaticParams() {
  return [
    ...DOC_SECTIONS.map((doc) => ({ slug: [doc.slug] })),
    ...FIELD_GUIDE_SLUGS.map((slug) => ({ slug: [slug] })),
  ]
}

/** Known manuals and field guides render even when nested under a longer path. */
function resolveDocSlug(parts: string[]): string | null {
  const matches = parts.filter((part) => KNOWN_SLUGS.has(part))
  if (matches.length === 0) return null
  return matches[matches.length - 1] ?? null
}

function shell(title: string, children: React.ReactNode) {
  return (
    <article style={{ display: "grid", gap: "1.25rem", maxWidth: 860 }}>
      <h1 style={{ color: "#34D399", margin: 0 }}>{title}</h1>
      {children}
    </article>
  )
}

function SafetyCallout({ children }: { children: React.ReactNode }) {
  return (
    <aside
      style={{
        border: "1px solid #FF334B",
        borderLeft: "4px solid #FF334B",
        background: "#0A0B0F",
        color: "#F4F7FB",
        padding: "0.85rem 1rem",
      }}
    >
      <strong style={{ color: "#FF334B" }}>SAFETY CALLOUT. </strong>
      {children}
    </aside>
  )
}

function PinoutTable() {
  return (
    <table>
      <caption>Mars Hydro backpack pinout. RJ12 Pin 1 12V_AUX to the $0.80 MP1584EN, then 5V. GPIO25 DAC to the 2N2222, then 0-10V_DIM.</caption>
      <thead>
        <tr>
          <th>From</th>
          <th>Part</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>RJ12 Pin 1 12V_AUX</td>
          <td>$0.80 MP1584EN buck</td>
          <td>5V</td>
        </tr>
        <tr>
          <td>GPIO25 DAC</td>
          <td>2N2222</td>
          <td>0-10V_DIM</td>
        </tr>
      </tbody>
    </table>
  )
}

function FieldGuide({ slug }: { slug: string }) {
  if (slug === "esp32-flashing") {
    return shell(
      "ESP32-WROOM flashing. Mars Hydro backpack and 18650 flood-table PAR meter",
      <>
        <p>
          Flash the ESP32-WROOM Mars Hydro Wi-Fi backpack and the 18650 flood-table PAR meter on the bench. The backpack dims a Mars Hydro driver. The meter reads closed-loop PAR over the flood table. Both images are local. No cloud account is required.
        </p>
        <PinoutTable />
        <pre>{`python -m esptool --chip esp32 --port COM3 --baud 460800 write_flash 0x0 aig-esp32-par-pod.bin`}</pre>
        <SafetyCallout>
          Confirm RJ12 Pin 1 is 12V_AUX before the $0.80 MP1584EN. The buck must land on 5V, never on the ESP32 3V3 pin. GPIO25 is a DAC into the 2N2222, then 0-10V_DIM. Do not tie the dimmer return to mains neutral.
        </SafetyCallout>
      </>,
    )
  }
  if (slug === "contactor-wiring") {
    return shell(
      "120V/240V lighting contactors and the 95°F Chernobyl bimetallic cut",
      <>
        <p>
          High-inrush 120V and 240V lighting contactors sit on the line side of the ballasts. The 95°F Chernobyl bimetallic cut opens the coil with zero software dependency when the canopy air crosses 95°F.
        </p>
        <PinoutTable />
        <pre>{`# De-energize the branch, lock the breaker, then meter the coil.\n# 120V coil: L1 to contactor A1, neutral to A2, bimetal in series with A1.\n# 240V coil: L1 to A1, L2 to A2, 95°F Chernobyl cut in series with A1.`}</pre>
        <SafetyCallout>
          120V/240V contactors store a strike. Prove the line is dead before the screwdriver touches a lug. The 95°F Chernobyl cut is the hardware REPO. Do not bypass it with a jumper, and do not put that cut under a software relay.
        </SafetyCallout>
      </>,
    )
  }
  if (slug === "vertiv-snmp") {
    return shell(
      "Vertiv RDU101 SNMPv2c/v3 and the HTTP 423 LOCKED dark-cycle interlock",
      <>
        <p>
          The Vertiv RDU101 speaks SNMPv2c and SNMPv3 for telemetry only. Dark-cycle writes return HTTP 423 LOCKED. The photoperiod interlock refuses outlet SET while the Night Tent is in its biological night.
        </p>
        <pre>{`snmpwalk -v3 -l authPriv -u aig-ro <rdu101-host> 1.3.6.1.4.1.476\ncurl -s -o /dev/null -w "%{http_code}" http://<rdu101-host>/api/outlets/group2/set`}</pre>
        <p>A dark-cycle SET must print 423. That 423 LOCKED response is the interlock, not an error to retry.</p>
        <SafetyCallout>
          Do not store an SNMP auth secret in this page, in the phone, or in a client bundle. SNMPv2c and SNMPv3 credentials stay on the appliance. HTTP 423 LOCKED means the dark cycle is holding the contactors. Do not walk around it with a raw SET.
        </SafetyCallout>
      </>,
    )
  }
  return shell(
    "Zero-cloud WireGuard mesh. aig-01, Watchtower, and A:iP",
    <>
      <p>
        The tailscale-mesh guide enrolls a zero-cloud WireGuard fabric among aig-01, Watchtower, and A:iP. Peers exchange keys on the bench. There is no commercial control-plane login in this path.
      </p>
      <pre>{`wg genkey | tee aig-01.key | wg pubkey > aig-01.pub\nwg-quick up /etc/wireguard/wg-homestead.conf\nwg show wg-homestead`}</pre>
      <p>Watchtower is 100.67.204.106. aig-01 is 192.168.1.11 on the homestead LAN. A:iP joins as a third WireGuard peer and fails closed when the handshake is down.</p>
      <SafetyCallout>
        Private WireGuard keys never go in git, in the phone keystore notes, or in a web bundle. If aig-01, Watchtower, or A:iP misses a handshake, leave the tunnel down. Do not fall open to a public relay.
      </SafetyCallout>
    </>,
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const resolved = resolveDocSlug(slug ?? [])
  const found = DOC_SECTIONS.find((doc) => doc.slug === resolved)
  if (found) {
    return {
      title: `${found.title} — A:iX Core Documentation`,
      description: found.summary,
    }
  }
  if (resolved) {
    return {
      title: `${resolved} — A:iX Core Field Guide`,
      description: "Bench field guide for the A:iG homestead. Local-first. No surveillance tags.",
    }
  }
  return { title: "Documentation — A:iX Core" }
}

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const resolved = resolveDocSlug(slug ?? [])
  if (!resolved) notFound()

  if ((FIELD_GUIDE_SLUGS as readonly string[]).includes(resolved)) {
    return <DocsLayout activeSlug={resolved}>{FieldGuide({ slug: resolved })}</DocsLayout>
  }

  const found = DOC_SECTIONS.find((doc) => doc.slug === resolved)
  if (!found) notFound()

  let content: React.ReactNode = null
  switch (resolved) {
    case "fast-start":
      content = <DocsFastStartView />
      break
    case "datasheet":
      content = <DocsDatasheetView />
      break
    case "user-guide":
      content = <DocsUserGuideView />
      break
    case "brochure":
      content = <DocsBrochureView />
      break
    case "man-pages":
      content = <DocsManPagesView />
      break
    case "release-notes":
      content = <DocsReleaseNotesView />
      break
    case "isr-program":
      content = <DocsIsrProgramView />
      break
    default:
      notFound()
  }

  return <DocsLayout activeSlug={resolved}>{content}</DocsLayout>
}
