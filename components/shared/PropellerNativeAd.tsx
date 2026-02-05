'use client'
import { useEffect } from 'react'

export default function AdsterraBanner() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://pl28596407.effectivegatecpm.com/d2706c3a9c20ac2f5b7ef69e2daa0dff/invoke.js'
    script.async = true
    script.setAttribute('data-cfasync', 'false')

    document.getElementById(
      'container-d2706c3a9c20ac2f5b7ef69e2daa0dff'
    )?.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div className="w-full flex justify-center my-4">
      <div
        id="container-d2706c3a9c20ac2f5b7ef69e2daa0dff"
        className="w-full max-w-7xl min-h-[60px]"
      />
    </div>
  )
}
