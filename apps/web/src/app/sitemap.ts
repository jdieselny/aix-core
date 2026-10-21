/** App Router sitemap module. Plain data so it compiles without the Next package. */

export interface SitemapEntry {
  url: string
  changeFrequency: "weekly"
  priority: number
}

const ENTRIES: readonly SitemapEntry[] = [
  { url: "https://aix-core.com", changeFrequency: "weekly", priority: 1 },
  { url: "https://aix-core.com/hardware/core", changeFrequency: "weekly", priority: 0.9 },
  { url: "https://aix-core.com/compare", changeFrequency: "weekly", priority: 0.8 },
  { url: "https://aix-core.com/diy", changeFrequency: "weekly", priority: 0.8 },
  { url: "https://aix-core.com/blog", changeFrequency: "weekly", priority: 0.8 },
  {
    url: "https://aix-core.com/blog/death-of-cloud-grow-controllers-autonomous-sovereign-ai-hardware",
    changeFrequency: "weekly",
    priority: 0.85,
  },
  { url: "https://aix-core.com/docs", changeFrequency: "weekly", priority: 0.85 },
  { url: "https://aix-core.com/docs/fast-start", changeFrequency: "weekly", priority: 0.85 },
  { url: "https://aix-core.com/docs/datasheet", changeFrequency: "weekly", priority: 0.8 },
  { url: "https://aix-core.com/docs/user-guide", changeFrequency: "weekly", priority: 0.8 },
  { url: "https://aix-core.com/docs/brochure", changeFrequency: "weekly", priority: 0.8 },
  { url: "https://aix-core.com/docs/man-pages", changeFrequency: "weekly", priority: 0.75 },
  { url: "https://aix-core.com/docs/release-notes", changeFrequency: "weekly", priority: 0.75 },
  { url: "https://aix-core.com/docs/isr-program", changeFrequency: "weekly", priority: 0.8 },
]

export default function sitemap(): SitemapEntry[] {
  return ENTRIES.map((entry) => ({ ...entry }))
}

export function sitemapXml(): string {
  const body = sitemap()
    .map((entry) => `<url><loc>${entry.url}</loc></url>`)
    .join("")
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`
}
