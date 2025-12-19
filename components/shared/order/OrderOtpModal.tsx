'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OrderOtpModal({
  orderId,
  onVerified,
}: {
  orderId: string
  onVerified: (orderId: string) => void
}) {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const verifyOtp = async () => {
    setLoading(true)
    const res = await fetch('/api/order/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, otp }),
    })
    const data = await res.json()
    setLoading(false)

    if (data.success) {
      alert('OTP verified! ✅')
      onVerified(orderId)
    } else {
      alert(data.message)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white p-6 rounded-md w-full max-w-sm'>
        <h3 className='font-bold mb-2'>Verify Order OTP</h3>
        <Input
          placeholder='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          onClick={verifyOtp}
          disabled={loading}
          className='mt-3 w-full'
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </div>
    </div>
  )
}
