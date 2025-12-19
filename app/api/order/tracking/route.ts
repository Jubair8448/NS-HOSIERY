import { NextResponse } from 'next/server'
import Order from '@/lib/db/models/order.model'
import { connectToDatabase } from '@/lib/db'

export async function POST(req: Request) {
  await connectToDatabase()
  const { orderId, trackingUrl } = await req.json()

  await Order.findByIdAndUpdate(orderId, { trackingUrl })

  return NextResponse.json({ success: true })
}
