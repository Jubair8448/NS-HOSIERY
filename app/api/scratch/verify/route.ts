import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db/index'
import ScratchCode from '@/lib/db/models/ScratchCode'

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ message: 'Scratch code is required.' }, { status: 400 })
    }

    const trimmedCode = code.trim()
    const scratch = await ScratchCode.findOne({ code: trimmedCode })

    if (!scratch) {
      return NextResponse.json({ message: 'Invalid Code ❌' }, { status: 404 })
    }

    // ✅ Mark as used only the first time
    if (!scratch.isUsed) {
      scratch.isUsed = true
      scratch.usedAt = new Date()
    }

    // ✅ Always increment verification count and update latest verification timestamp
    scratch.verificationCount = (scratch.verificationCount || 0) + 1
    scratch.lastVerifiedAt = new Date() // ✅ new field

    await scratch.save()

    return NextResponse.json(
      {
        message:
          '✅ Verified: You are holding an original NEWSTYLE-HOSIERY product — crafted for performance, trusted for purity.',
        usedAt: scratch.lastVerifiedAt, // ✅ always return latest time
        verificationCount: scratch.verificationCount,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[VERIFY_SCRATCH_CODE_ERROR]', err)
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 })
  }
}
