import { connectToDatabase } from '@/lib/db/index'
import ScratchCode from '@/lib/db/models/ScratchCode'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    await connectToDatabase()
    await ScratchCode.deleteMany({})
    return NextResponse.json({ message: 'All scratch codes deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting all codes:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
