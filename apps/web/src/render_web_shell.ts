import { readFileSync } from "node:fs"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { BlogIndexView } from "./components/BlogIndexView.js"
import { BlogPostView } from "./components/BlogPostView.js"
import { ChernobylSwitchCard } from "./components/ChernobylSwitchCard.js"
import { CheckoutDrawer } from "./components/CheckoutDrawer.js"
import { CompetitorMatrix } from "./components/CompetitorMatrix.js"
import { ContinuumCoreCard } from "./components/ContinuumCoreCard.js"
import { CustomerPortalButton } from "./components/CustomerPortalButton.js"
import { DiyBomCalculator } from "./components/DiyBomCalculator.js"
import { HeroMedia } from "./components/HeroMedia.js"
import { InteractiveHardwareInspector } from "./components/InteractiveHardwareInspector.js"
import { SisterSiteReferralBanner } from "./components/SisterSiteReferralBanner.js"
import { Op2026BundleCard } from "./components/Op2026BundleCard.js"
import { SiteFooter } from "./components/SiteFooter.js"
import { SiteHeader } from "./components/SiteHeader.js"
import { SnifferPodCard } from "./components/SnifferPodCard.js"
import { parseReferralSearch } from "./lib/referral_tracker.js"
import { productJsonLd, socialMetadata } from "./lib/seo_metadata.js"
import { StorefrontHomeView } from "./views/StorefrontHomeView.js"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function renderWave1Shell(stock: number): string {
  return renderToStaticMarkup(
    createElement(
      "div",
      { "data-shell": "wave1", className: "aix-shell" },
      createElement(SiteHeader, { stock }),
      createElement(HeroMedia, {}),
    ),
  )
}

export function renderContinuumCore(): string {
  return renderToStaticMarkup(createElement(ContinuumCoreCard))
}

export function renderSnifferPod(): string {
  return renderToStaticMarkup(createElement(SnifferPodCard))
}

export function renderChernobylSwitch(): string {
  return renderToStaticMarkup(createElement(ChernobylSwitchCard))
}

export function renderOp2026Bundle(): string {
  return renderToStaticMarkup(createElement(Op2026BundleCard))
}

export function renderSiteFooter(): string {
  return renderToStaticMarkup(createElement(SiteFooter))
}

export function renderCheckoutDrawer(confirmPurchase = false): string {
  return renderToStaticMarkup(createElement(CheckoutDrawer, { confirmPurchase }))
}

export function renderCustomerPortal(): string {
  return renderToStaticMarkup(createElement(CustomerPortalButton))
}

export function renderDiyBom(omit: readonly string[] = []): string {
  return renderToStaticMarkup(createElement(DiyBomCalculator, { omit }))
}

export function renderCompetitorMatrix(): string {
  return renderToStaticMarkup(createElement(CompetitorMatrix))
}

export function renderBlogIndex(): string {
  return renderToStaticMarkup(createElement(BlogIndexView))
}

export function renderBlogPost(): string {
  return renderToStaticMarkup(createElement(BlogPostView))
}

export function renderInspector(): string {
  return renderToStaticMarkup(createElement(InteractiveHardwareInspector))
}

export function renderReferralBanner(search: string, dismissed = false): string {
  const referral = dismissed ? null : parseReferralSearch(search, 1)
  return renderToStaticMarkup(createElement(SisterSiteReferralBanner, { referral }))
}

export function renderStorefrontHome(stock = 2): string {
  return renderToStaticMarkup(createElement(StorefrontHomeView, { stock }))
}

export function renderSeoMetadata(): string {
  const social = socialMetadata()
  const jsonLd = JSON.stringify(productJsonLd()).replace(/</g, "\\u003c")
  return renderToStaticMarkup(
    createElement(
      "div",
      { "data-seo": "engine" },
      createElement("link", { rel: "canonical", href: social.canonical }),
      createElement("meta", { property: "og:title", content: social.title }),
      createElement("meta", { property: "og:description", content: social.description }),
      createElement("meta", { property: "og:type", content: social.ogType }),
      createElement("meta", { property: "og:url", content: social.canonical }),
      createElement("meta", { property: "og:site_name", content: "A:iX Core" }),
      createElement("meta", { name: "twitter:card", content: social.twitterCard }),
      createElement("meta", { name: "twitter:title", content: social.title }),
      createElement("meta", { name: "twitter:description", content: social.description }),
      createElement("meta", { name: "keywords", content: social.keywords.join(", ") }),
      createElement("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: jsonLd },
      }),
    ),
  )
}

const RENDERERS: Record<string, (stock: number) => string> = {
  shell: renderWave1Shell,
  core: () => renderContinuumCore(),
  sniffer: () => renderSnifferPod(),
  chernobyl: () => renderChernobylSwitch(),
  bundle: () => renderOp2026Bundle(),
  footer: () => renderSiteFooter(),
}

const raw: unknown = JSON.parse(readFileSync(0, "utf8"))
const request = isRecord(raw) ? raw : {}
const stock = typeof request.stock === "number" ? request.stock : 0
const view = typeof request.view === "string" ? request.view : "shell"
const omit = Array.isArray(request.omit) ? request.omit.filter((item): item is string => typeof item === "string") : []
if (view === "checkout") {
  process.stdout.write(renderCheckoutDrawer(request.confirm_purchase === true))
} else if (view === "portal") {
  process.stdout.write(renderCustomerPortal())
} else if (view === "bom") {
  process.stdout.write(renderDiyBom(omit))
} else if (view === "compare") {
  process.stdout.write(renderCompetitorMatrix())
} else if (view === "seo") {
  process.stdout.write(renderSeoMetadata())
} else if (view === "home") {
  process.stdout.write(renderStorefrontHome(stock))
} else if (view === "inspector") {
  process.stdout.write(renderInspector())
} else if (view === "referral") {
  const search = typeof request.search === "string" ? request.search : ""
  process.stdout.write(renderReferralBanner(search, request.dismissed === true))
} else if (view === "blog") {
  process.stdout.write(renderBlogIndex())
} else if (view === "article") {
  process.stdout.write(renderBlogPost())
} else {
  const render = RENDERERS[view] ?? renderWave1Shell
  process.stdout.write(render(stock))
}
