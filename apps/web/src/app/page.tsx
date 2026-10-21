import { CANONICAL_URL, SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE } from "../lib/seo_metadata.js"
import { StorefrontHomeView } from "../views/StorefrontHomeView.js"

export const metadata = {
  metadataBase: CANONICAL_URL,
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "A:iX Core",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
}

export default function HomePage() {
  return <StorefrontHomeView />
}
