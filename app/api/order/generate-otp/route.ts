import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Otp from '@/lib/db/models/otp.model'
import { sendSMS } from '@/lib/sms'

export async function POST(req: Request) {
  await connectToDatabase()

  const { phone } = await req.json()

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  await Otp.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  })

  await sendSMS(phone, `Your OTP is ${otp}`)

  return NextResponse.json({ success: true })
}
