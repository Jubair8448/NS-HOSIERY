import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/lib/db/models/order.model'

export async function POST(req: Request) {
  await connectToDatabase()

  const data = await req.json()

  const order = await Order.create({
    ...data,
    orderOtpVerified: true,
  })

  return NextResponse.json({ success: true, orderId: order._id })
}
