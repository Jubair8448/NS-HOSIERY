'use client'

import Link from "next/link"
import Image from "next/image"

interface Props {
  categories: {
    name: string
    image: string
    href: string
  }[]
}

export default function CategoryIcons({ categories }: Props) {
  return (
    <div className="flex gap-6 overflow-x-auto px-4 py-3 scrollbar-none 
                    bg-gradient-to-r from-yellow-900 via-red-700 to-yellow-900
                    shadow-inner rounded-lg">
      {categories.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="flex flex-col items-center min-w-[75px] select-none"
        >
          <div
            className="w-16 h-16 rounded-full border border-purple-300 
                       shadow-md bg-white overflow-hidden flex items-center justify-center
                       transition-all duration-300 ease-out
                       hover:scale-110 hover:shadow-green-400 hover:shadow-lg"
          >
            <Image
              src={item.image || "/placeholder-image.png"}
              width={64}
              height={64}
              alt={item.name}
              className="rounded-full object-cover w-full h-full"
            />
          </div>

          <span
            className="text-xs font-semibold mt-2 text-white 
                       hover:text-purple-800 transition-all duration-200 
                       tracking-wide text-center"
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
