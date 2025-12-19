// app/api/scratch/delete/route.ts
import { connectToDatabase } from '@/lib/db'
import ScratchCode from '@/lib/db/models/ScratchCode'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ message: 'Code required' }, { status: 400 })
  }

  await connectToDatabase()
  await ScratchCode.deleteOne({ code })
  return NextResponse.json({ message: 'Deleted' }, { status: 200 })
}
