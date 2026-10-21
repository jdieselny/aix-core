/** First-party Product JSON-LD and social cards. No analytics host. */

export const CANONICAL_URL = "https://aix-core.com"

export const PRODUCT_URL = "https://aix-core.com/hardware/core"

export const SEO_TITLE = "A:iX Core — Turnkey A:iG Appliance"

export const SEO_DESCRIPTION =
  "A:iX Core is the sovereign hardware umbrella. The retail iron is the Turnkey A:iG Appliance. A:iB is the air-gapped compute enclave. The handheld companion is the A:iP Mobile Cockpit, with CSI microwave radar and an open DIY grow controller."

export const SEO_KEYWORDS = [
  "aix-core",
  "autonomous grow room controller",
  "indoor garden IoT",
  "photoperiod interlock",
  "sovereign edge compute",
  "A:iX Core",
  "Sovereign Hardware",
  "Turnkey A:iG Appliance",
  "A:iB Compute Enclave",
  "A:iP Mobile Cockpit",
  "CSI Microwave Radar",
  "Open DIY Grow Controller",
  "AC Infinity alternative",
  "TrolMaster alternative",
  "Pulse Pro alternative",
  "commercial cultivation automation",
  "Chernobyl 95F thermal switch",
  "Sensirion SHT45 precision VPD",
  "NDIR CO2 pulse controller",
  "4-ton AC grow room interlock",
  "Iluminar 670W LED automation",
  "local-first farm OS",
  "zero-cloud edge hardware",
  "plant transpiration microwave radar",
  "jdieselny seed bank",
] as const

export interface ProductJsonLd {
  "@context": "https://schema.org"
  "@type": "Product"
  name: string
  description: string
  sku: string
  url: string
  brand: { "@type": "Brand"; name: string }
  manufacturer: { "@type": "Organization"; name: string }
  offers: {
    "@type": "Offer"
    price: "499.00"
    priceCurrency: "USD"
    availability: "https://schema.org/InStock"
    priceValidUntil: "2027-12-31"
    url: string
  }
}

export interface OrganizationJsonLd {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  legalName: string
  url: string
  logo: string
  sameAs: readonly string[]
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqJsonLd {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

export interface BlogPostingJsonLd {
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  author: { "@type": "Person"; name: string }
  publisher: { "@type": "Organization"; name: string; url: string }
  keywords: readonly string[]
  mainEntityOfPage: string
}

export interface SocialMetadata {
  title: typeof SEO_TITLE
  description: typeof SEO_DESCRIPTION
  canonical: typeof CANONICAL_URL
  keywords: readonly string[]
  ogType: "product"
  twitterCard: "summary_large_image"
}

export const CANONICAL_BLOG_SLUG = "death-of-cloud-grow-controllers-autonomous-sovereign-ai-hardware"
export const CANONICAL_BLOG_URL = `https://aix-core.com/blog/${CANONICAL_BLOG_SLUG}`

export const FAQS: readonly FaqItem[] = [
  {
    question: "Why choose an autonomous local-first grow controller over cloud platforms like AC Infinity or TrolMaster?",
    answer:
      "Cloud-based controllers rely on third-party servers and continuous internet connections. When AWS or proprietary clouds experience outages, automated scheduling, VPD control, and emergency cutoffs can fail, leaving crops exposed. A:iX Core runs 100% of automation logic locally on the edge device with zero telemetry harvesting, zero cloud subscription fees, and complete offline resilience.",
  },
  {
    question: "What is the Chernobyl 95°F thermal contactor switch?",
    answer:
      "The Chernobyl switch is an analog, bimetallic snap-action 95°F (35°C) thermal safety cut wired in series with the low-voltage coil of commercial lighting contactors. If HVAC or air conditioning fails in a sealed high-wattage LED room, the switch mechanically snaps open to kill lighting power before canopy temperatures reach lethal levels—independent of microprocessors, operating systems, or software.",
  },
  {
    question: "How does 52-subcarrier CSI microwave radar detect intrusion and plant transpiration without cameras?",
    answer:
      "CSI (Channel State Information) measures phase and amplitude distortion across 52 subcarriers of standard 802.11 Wi-Fi signals. Physical human tissue and high-moisture crop canopies cause characteristic multipath microwave scattering, enabling through-the-wall volumetric presence detection and transpiration tracking without the privacy and security vulnerabilities of optical cameras.",
  },
  {
    question: "Can I build the A:iG controller myself using open-source hardware?",
    answer:
      "Yes. A:iX publishes a complete open DIY Bill of Materials ($297 total) including off-the-shelf Intel N100 mini-PCs, Sensirion SHT45 sensors, optoisolated relay boards, and ESP32 coprocessors. We also offer the pre-assembled, burned-in Turnkey A:iG Appliance for $499 for commercial operators who prefer plug-and-play reliability.",
  },
  {
    question: "How does the photoperiod hardware interlock prevent hermaphroditic crop damage?",
    answer:
      "During scheduled 12/12 flowering photoperiod dark cycles, Continuum Core enforces an HTTP 423 Locked gating law. Lighting actuator circuits refuse software override commands, preventing accidental nocturnal light illumination that causes genetic stress, seed production, or crop herming.",
  },
] as const

export function organizationJsonLd(): OrganizationJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A:iX Core",
    legalName: "J Diesel NY, LLC",
    url: CANONICAL_URL,
    logo: `${CANONICAL_URL}/brand/aix_mark.svg`,
    sameAs: ["https://jdieselny.com"],
    description:
      "Sovereign local-first hardware and edge compute substrate for autonomous cultivation and private edge infrastructure.",
  }
}

export function faqJsonLd(): FaqJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function blogPostJsonLd(): BlogPostingJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "The Death of Cloud Grow Controllers: Why Autonomous Sovereign Edge Hardware is the Future of Commercial Cultivation",
    description:
      "An engineering breakdown of why centralized cloud platforms fail commercial cultivation facilities, the thermodynamics of high-density LED heat death, and how local-first edge compute protects living crops.",
    url: CANONICAL_BLOG_URL,
    datePublished: "2026-10-21T07:00:00Z",
    dateModified: "2026-10-21T07:00:00Z",
    author: {
      "@type": "Person",
      name: "Justin D. Kintzele & Agent Smith",
    },
    publisher: {
      "@type": "Organization",
      name: "J Diesel NY, LLC",
      url: CANONICAL_URL,
    },
    keywords: SEO_KEYWORDS,
    mainEntityOfPage: CANONICAL_BLOG_URL,
  }
}

export function productJsonLd(): ProductJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Turnkey A:iG Appliance",
    description:
      "Turnkey A:iG Appliance: industrial autonomous cultivation controller with photoperiod interlocks, dual 2.5GbE, and a local NVMe datalake. The handheld companion is the A:iP Mobile Cockpit.",
    brand: { "@type": "Brand", name: "A:iX" },
    manufacturer: { "@type": "Organization", name: "J Diesel NY, LLC" },
    sku: "AIG-CORE-01",
    url: PRODUCT_URL,
    offers: {
      "@type": "Offer",
      price: "499.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      url: PRODUCT_URL,
    },
  }
}

export function socialMetadata(): SocialMetadata {
  return {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    canonical: CANONICAL_URL,
    keywords: SEO_KEYWORDS,
    ogType: "product",
    twitterCard: "summary_large_image",
  }
}
