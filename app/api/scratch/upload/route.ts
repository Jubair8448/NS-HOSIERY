import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db/index'
import ScratchCode from '@/lib/db/models/ScratchCode'

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { codes } = await req.json()

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ message: 'No codes provided' }, { status: 400 })
    }

    const insertData = codes.map((code: string) => ({
      code: code.trim(),
      isUsed: false,
    }))

    await ScratchCode.insertMany(insertData)

    return NextResponse.json({ message: 'Scratch codes uploaded successfully' })
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
