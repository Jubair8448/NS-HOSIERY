'use client'
import { useEffect, useState } from 'react'

export default function PropellerNativeAd() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!show) return

    const script = document.createElement('script')
    script.src = 'https://upgulpinon.com/1?z=7f010cfa9109cfb7476ca87c08b2dd9b'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="w-full flex justify-center my-2">
      <div className="relative w-full max-w-7xl h-[40px] bg-white border rounded-md flex items-center justify-center text-xs text-gray-400">
        {/* Propeller Native Ad */}

        {/* ❌ Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-1 top-1 text-gray-500 hover:text-black text-sm font-bold"
          aria-label="Close Ad"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
