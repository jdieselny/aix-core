import React from "react"
import { DocsHomeView } from "../../components/docs/DocsHomeView.js"
import { DocsLayout } from "../../components/docs/DocsLayout.js"

export const metadata = {
  title: "Documentation Center & Engineering Manuals — A:iX Core",
  description:
    "Official specifications, wiring schematics, CLI man pages, and deployment guides for the Turnkey A:iG Appliance ($499) and Open DIY BOM ($297).",
}

export default function DocsIndexPage() {
  return (
    <DocsLayout>
      <DocsHomeView />
    </DocsLayout>
  )
}
