/** Abandoned-cart note. The restore link carries a cart token and no tracker parameters. */

export const RECOVERY_SUBJECT = "Your A:iG Appliance reserve is held on the shelf"

const CART_ID = /^[a-z0-9][a-z0-9-]{7,63}$/
const SKU = /^[a-z0-9][a-z0-9-]{1,40}$/
const ORIGIN = "https://aix-core.com"

export interface CartSnapshot {
  cartId: string
  sku: string
  quantity: number
}

export interface RecoveryPayload {
  subject: typeof RECOVERY_SUBJECT
  restoreUrl: string
  text: string
}

export function formatCartRecovery(cart: CartSnapshot): RecoveryPayload | null {
  if (!CART_ID.test(cart.cartId) || !SKU.test(cart.sku)) {
    return null
  }
  if (!Number.isSafeInteger(cart.quantity) || cart.quantity < 1) {
    return null
  }
  const restoreUrl = `${ORIGIN}/cart/restore?cart=snap-${cart.cartId}`
  if (/[?&](utm_|fbclid|gclid|mc_cid|pixel)/i.test(restoreUrl)) {
    return null
  }
  return {
    subject: RECOVERY_SUBJECT,
    restoreUrl,
    text: `Your reserve is still on the shelf. Restore it: ${restoreUrl}`,
  }
}
