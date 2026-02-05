'use client'
import { useState, useEffect } from 'react'

export default function AdsterraAd() {
  const [showAd, setShowAd] = useState(true)

  useEffect(() => {
    if (!showAd) return

    const script = document.createElement('script')
    script.async = true
    script.src =
      'https://pl28596407.effectivegatecpm.com/d2706c3a9c20ac2f5b7ef69e2daa0dff/invoke.js'
    document.body.appendChild(script)

    return () => {
      // script remove nahi karna (policy safe)
    }
  }, [showAd])

  if (!showAd) return null

  return (
    <div className="relative w-full max-w-7xl mx-auto my-4 border rounded-md bg-white">
      
      {/* Close Button */}
      <button
        onClick={() => setShowAd(false)}
        className="absolute top-1 right-1 z-50 bg-black text-white text-xs px-2 py-1 rounded"
      >
        ✖
      </button>

      {/* Ad Container */}
      <div id="container-d2706c3a9c20ac2f5b7ef69e2daa0dff" />
    </div>
  )
}
