import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Otp from '@/lib/db/models/otp.model'

export async function POST(req: Request) {
  await connectToDatabase()

  const { phone, otp } = await req.json()

  const record = await Otp.findOne({ phone, otp })

  if (!record) {
    return NextResponse.json({ success: false, message: 'Invalid OTP' })
  }

  if (record.expiresAt < new Date()) {
    return NextResponse.json({ success: false, message: 'OTP expired' })
  }

  await Otp.deleteMany({ phone }) // cleanup

  return NextResponse.json({ success: true })
}
