import { createHmac } from "node:crypto"

/** Signed order envelope for the Watchtower datalake. HMAC only. No appliance secret file. */

export const WATCHTOWER_ORDER_SINK = "/mnt/datalake/commerce/orders.jsonl"
export const WATCHTOWER_ORDERS_DIR = "/mnt/datalake/orders/"

export interface WatchtowerOrder {
  orderId: string
  items: unknown[]
  totalUsd: number
  remainingShelfBuffer: number
}

export interface WatchtowerOrderEnvelope {
  alg: "HMAC-SHA256"
  sink: typeof WATCHTOWER_ORDER_SINK
  datalakeOrders: typeof WATCHTOWER_ORDERS_DIR
  payload: string
  signature: string
}

function canonicalOrder(order: WatchtowerOrder): string {
  return JSON.stringify({
    orderId: order.orderId,
    items: order.items,
    totalUsd: order.totalUsd,
    remainingShelfBuffer: order.remainingShelfBuffer,
    sink: WATCHTOWER_ORDER_SINK,
  })
}

export function buildWatchtowerOrderEnvelope(
  order: WatchtowerOrder,
  secretKey?: string,
): WatchtowerOrderEnvelope {
  const payload = canonicalOrder(order)
  const signature = createHmac("sha256", secretKey ?? "").update(payload).digest("hex")
  return {
    alg: "HMAC-SHA256",
    sink: WATCHTOWER_ORDER_SINK,
    datalakeOrders: WATCHTOWER_ORDERS_DIR,
    payload,
    signature,
  }
}
