/** Static catalog used when edge functions are unreachable. */

export interface StaticCatalogItem {
  productId: string
  name: string
  priceUsd: number
  availability: "static-fallback"
}

export const STATIC_FALLBACK_CATALOG: readonly StaticCatalogItem[] = [
  { productId: "aig-appliance", name: "Turnkey A:iG Appliance", priceUsd: 499, availability: "static-fallback" },
  { productId: "sniffer-pod", name: "Sniffer Pod", priceUsd: 89, availability: "static-fallback" },
  { productId: "chernobyl-switch", name: "Chernobyl Switch", priceUsd: 49, availability: "static-fallback" },
  { productId: "diy-bom", name: "Open DIY BOM", priceUsd: 297, availability: "static-fallback" },
]

export function getStaticFallbackCatalog(): StaticCatalogItem[] {
  return STATIC_FALLBACK_CATALOG.map((item) => ({ ...item }))
}

export function buildStaticCheckoutFallbackUrl(productId: string): string {
  const id = encodeURIComponent(productId)
  return `https://aix-core.com/checkout/static?product=${id}`
}
