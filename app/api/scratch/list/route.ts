// app/api/scratch/list/route.ts
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db/index'
import ScratchCode from '@/lib/db/models/ScratchCode'

export async function GET() {
  await connectToDatabase()

  const codes = await ScratchCode.find({}, {
  code: 1,
  isUsed: 1,
  createdAt: 1,
  usedAt: 1,
  verificationCount: 1, // ✅ must include this
  _id: 0
})
.sort({ createdAt: -1 }).lean()

  return NextResponse.json(codes)
}
