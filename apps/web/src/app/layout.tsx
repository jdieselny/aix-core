import type { ReactNode } from "react"
import "../styles/tokens.css"
import { CANONICAL_URL, SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE } from "../lib/seo_metadata.js"

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        style={{
          margin: 0,
          background: "#0A0B0F",
          color: "#E7ECF3",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  )
}
