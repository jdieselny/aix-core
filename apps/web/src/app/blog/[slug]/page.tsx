import React from "react"
import { notFound } from "next/navigation.js"
import { BlogPostView } from "../../../components/BlogPostView.js"
import { CANONICAL_BLOG_SLUG } from "../../../lib/seo_metadata.js"

export const metadata = {
  title:
    "The Death of Cloud Grow Controllers: Why Autonomous Sovereign Edge Hardware is the Future of Commercial Cultivation — A:iX Core",
  description:
    "An engineering breakdown of why centralized cloud platforms fail commercial cultivation facilities, the thermodynamics of high-density LED heat death, and how local-first edge compute protects living crops.",
}

export async function generateStaticParams() {
  return [{ slug: CANONICAL_BLOG_SLUG }]
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (slug !== CANONICAL_BLOG_SLUG) {
    notFound()
  }
  return <BlogPostView />
}
