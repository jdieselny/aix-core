/** Two-box shelf buffer. A completed order decrements stock. Below 2, assemble the gap. */

export interface OrderEvent {
  orderId: string
  sku: string
  quantity: number
  customerEmail: string
}

export interface AssemblyTicket {
  ticketId: string
  sku: string
  unitsToAssemble: number
  urgency: "HIGH" | "STANDARD"
  reason: string
}

export interface BufferDecision {
  previousStock: number
  newStock: number
  triggerAssembly: boolean
  status: "SHELF_OK" | "ASSEMBLY_WORKORDER_REQUIRED" | "ORDER_REJECTED"
  workorderTicket?: AssemblyTicket
}

export const BUFFER_REASON = "SHELF_BUFFER_DEPLETED: Maintain 2-box pre-flashed reserve"

const ORDER_ID = /^[a-z0-9][a-z0-9-]{2,63}$/
const SKU = /^[a-z0-9][a-z0-9-]{1,40}$/
const EMAIL = /^[^\s@]+@[^\s@]+$/

function rejected(previousStock: number): BufferDecision {
  const stock = Number.isSafeInteger(previousStock) && previousStock >= 0 ? previousStock : 0
  return {
    previousStock: stock,
    newStock: stock,
    triggerAssembly: false,
    status: "ORDER_REJECTED",
  }
}

export function applyShelfBuffer(previousStock: number, event: OrderEvent): BufferDecision {
  if (!Number.isSafeInteger(previousStock) || previousStock < 0) {
    return rejected(0)
  }
  if (!ORDER_ID.test(event.orderId) || !SKU.test(event.sku)) {
    return rejected(previousStock)
  }
  if (!Number.isSafeInteger(event.quantity) || event.quantity < 1) {
    return rejected(previousStock)
  }
  if (!EMAIL.test(event.customerEmail)) {
    return rejected(previousStock)
  }
  if (event.quantity > previousStock) {
    return rejected(previousStock)
  }
  const newStock = previousStock - event.quantity
  if (newStock >= 2) {
    return {
      previousStock,
      newStock,
      triggerAssembly: false,
      status: "SHELF_OK",
    }
  }
  return {
    previousStock,
    newStock,
    triggerAssembly: true,
    status: "ASSEMBLY_WORKORDER_REQUIRED",
    workorderTicket: {
      ticketId: `asm-${event.orderId}`,
      sku: event.sku,
      unitsToAssemble: 2 - newStock,
      urgency: newStock === 0 ? "HIGH" : "STANDARD",
      reason: BUFFER_REASON,
    },
  }
}
