import React from "react"
import { notFound } from "next/navigation.js"
import { DocsBrochureView } from "../../../components/docs/DocsBrochureView.js"
import { DocsDatasheetView } from "../../../components/docs/DocsDatasheetView.js"
import { DocsFastStartView } from "../../../components/docs/DocsFastStartView.js"
import { DocsIsrProgramView } from "../../../components/docs/DocsIsrProgramView.js"
import { DOC_SECTIONS, DocsLayout } from "../../../components/docs/DocsLayout.js"
import { DocsManPagesView } from "../../../components/docs/DocsManPagesView.js"
import { DocsReleaseNotesView } from "../../../components/docs/DocsReleaseNotesView.js"
import { DocsUserGuideView } from "../../../components/docs/DocsUserGuideView.js"

export async function generateStaticParams() {
  return DOC_SECTIONS.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const found = DOC_SECTIONS.find((d) => d.slug === slug)
  if (!found) return { title: "Documentation — A:iX Core" }
  return {
    title: `${found.title} — A:iX Core Documentation`,
    description: found.summary,
  }
}

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const found = DOC_SECTIONS.find((d) => d.slug === slug)
  if (!found) {
    notFound()
  }

  let content: React.ReactNode = null
  switch (slug) {
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

  return <DocsLayout activeSlug={slug}>{content}</DocsLayout>
}
