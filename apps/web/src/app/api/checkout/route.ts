import { createCheckout } from "../../../lib/checkout_engine.js"

export async function POST(request: Request): Promise<Response> {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ success: false, error: "invalid json" }, { status: 400 })
  }
  const result = await createCheckout(payload, { stripeKey: process.env.STRIPE_SECRET_KEY })
  return Response.json(result.body, { status: result.status })
}
