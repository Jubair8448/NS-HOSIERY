'use client'

import React, { useState } from 'react'

export default function VerifyForm() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [usedAt, setUsedAt] = useState<string | null>(null)
  // ❌ Don't show to user
  // const [verifyCount, setVerifyCount] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setUsedAt(null)
    // setVerifyCount(null)

    const res = await fetch('/api/scratch/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setStatus('success')
      setMessage(data.message)
      setUsedAt(data.usedAt)
      // setVerifyCount(data.verificationCount || 1) // 👈 comment out
    } else {
      setStatus('error')
      setMessage(data.message || '❌ Invalid or already used scratch code.')
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Verify Your Product</h1>
      <p className="text-gray-600 mb-8 text-center">
        Enter your product scratch code below to verify its authenticity.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="scratchCode" className="block text-sm font-medium text-gray-700 mb-1">
            Scratch Code
          </label>
          <input
            type="text"
            id="scratchCode"
            name="scratchCode"
            placeholder="e.g., ABC123XYZ"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {message && (
          <div
            className={`text-center font-semibold ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}

        {/* ✅ Show verification time only (optional) */}
        {usedAt && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Verified on: {new Date(usedAt).toLocaleString()}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Verifying...' : 'Verify Now'}
          </button>
        </div>
      </form>
    </div>
  )
}
