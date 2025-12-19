'use client'

import { useEffect, useState } from 'react'

export default function DealTimer({ endTime }: { endTime: string }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const end = new Date(endTime).getTime()
    const i = setInterval(() => {
      const diff = end - Date.now()
      setTime(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(i)
  }, [endTime])

  if (time <= 0) return null

  const d = Math.floor(time / (1000 * 60 * 60 * 24))
  const h = Math.floor((time / (1000 * 60 * 60)) % 24)
  const m = Math.floor((time / (1000 * 60)) % 60)
  const s = Math.floor((time / 1000) % 60)

  return (
    <div className="relative mt-8 rounded-3xl p-[2px] animate-glow">
      {/* neon border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 blur-lg opacity-60" />

      <div className="relative overflow-hidden rounded-3xl bg-yellow-900 backdrop-blur-xl px-6 py-5 text-center">
        {/* light sweep */}
        <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-yellow-00 to-transparent" />

        {/* floating dots */}
        <div className="absolute inset-0 pointer-events-none animate-particles opacity-30" />

        <p className="text-xs font-bold tracking-[0.3em] text-black">
          ⚡ FLASH DEAL ⚡
        </p>

        <div className="mt-4 flex justify-center gap-5">
          {d > 0 && <Box value={d} label="DAYS" />}
          <Box value={h} label="HOURS" />
          <Box value={m} label="MIN" />
          <Box value={s} label="SEC" danger />
        </div>

        <p className="mt-4 text-xs text-white animate-blink">
          ⏳ Hurry! Offer disappearing soon
        </p>
      </div>
    </div>
  )
}

function Box({
  value,
  label,
  danger,
}: {
  value: number
  label: string
  danger?: boolean
}) {
  return (
    <div className="group relative flex flex-col items-center">
      <div
        className={`relative h-16 w-16 rounded-xl flex items-center justify-center 
        text-2xl font-black text-white
        ${
          danger
            ? 'bg-red-600 animate-shake shadow-red-500/60'
            : 'bg-green-500'
        }
        shadow-xl backdrop-blur-md animate-3dflip`}
      >
        {value}
      </div>

      <span className="mt-1 text-[10px] tracking-widest text-gray-300">
        {label}
      </span>

      {/* glow on hover */}
      <div className="absolute -inset-2 rounded-xl bg-red-500 opacity-0 blur-lg transition group-hover:opacity-40" />
    </div>
  )
}
