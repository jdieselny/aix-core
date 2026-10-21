import type { CSSProperties } from "react"
import { CheckoutDrawer } from "../components/CheckoutDrawer.js"
import { ChernobylSwitchCard } from "../components/ChernobylSwitchCard.js"
import { CommercialTestbedCard } from "../components/CommercialTestbedCard.js"
import { CompetitorMatrix } from "../components/CompetitorMatrix.js"
import { ContinuumCoreCard } from "../components/ContinuumCoreCard.js"
import { CustomerPortalButton } from "../components/CustomerPortalButton.js"
import { DiyBomCalculator } from "../components/DiyBomCalculator.js"
import { HeroMedia } from "../components/HeroMedia.js"
import { Op2026BundleCard } from "../components/Op2026BundleCard.js"
import { SiteFooter } from "../components/SiteFooter.js"
import { SiteHeader } from "../components/SiteHeader.js"
import { ReferralBannerGate } from "../components/SisterSiteReferralBanner.js"
import { SisterSiteBanner } from "../components/SisterSiteBanner.js"
import { SnifferPodCard } from "../components/SnifferPodCard.js"
import { TrifectaShowcase } from "../components/TrifectaShowcase.js"
import { productJsonLd, socialMetadata } from "../lib/seo_metadata.js"

const main: CSSProperties = {
  display: "grid",
  gap: "clamp(1rem, 0.6rem + 1.2vw, 2rem)",
  padding: "clamp(0.75rem, 0.5rem + 1vw, 1.5rem)",
}

const toggle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
}

export function StorefrontHomeView({ stock = 2 }: { stock?: number }) {
  const social = socialMetadata()
  const jsonLd = JSON.stringify(productJsonLd()).replace(/</g, "\\u003c")
  return (
    <div data-page="home" className="aix-storefront aix-shell">
      <input id="checkout-open" type="checkbox" aria-label="Open checkout" style={toggle} />
      <ReferralBannerGate />
      <SisterSiteBanner />
      <SiteHeader stock={stock} showBanner={false} />
      <main style={main}>
        <HeroMedia />
        <section id="trifecta">
          <TrifectaShowcase />
        </section>
        <section id="storefront" data-section="storefront" style={{ display: "grid", gap: 16 }}>
          <h2 style={{ margin: 0 }}>A:iG Garden Hardware</h2>
          <ContinuumCoreCard />
          <SnifferPodCard />
          <ChernobylSwitchCard />
          <Op2026BundleCard />
        </section>
        <section id="diy-calculator">
          <DiyBomCalculator />
        </section>
        <section id="compare">
          <CompetitorMatrix />
        </section>
        <CommercialTestbedCard />
        <CustomerPortalButton />
        <CheckoutDrawer />
      </main>
      <SiteFooter />
      <link rel="canonical" href={social.canonical} />
      <meta name="description" content={social.description} />
      <meta property="og:description" content={social.description} />
      <meta name="twitter:description" content={social.description} />
      <meta name="keywords" content={social.keywords.join(", ")} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </div>
  )
}
