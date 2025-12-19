import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type CardItem = {
  title: string
  link: { text: string; href: string }
  items: {
    name: string
    items?: string[]
    image: string
    href: string
  }[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4'>
      {cards.map((card) => (
        <Card key={card.title} className=' rounded-lg flex flex-col'>
          <CardContent className='p-4 flex-1'>
            <h3 className='text-xl font-bold mb-4'>{card.title}</h3>

            <div className='grid grid-cols-2 gap-4'>
              {card.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='group flex flex-col items-center'
                >
                  {/* IMAGE WRAPPER */}
                  <div className='relative  w-28 h-28 overflow-visible'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={120}
                      width={120}
                      className='
                        transition-all 
                        duration-500 
                        ease-in-out 
                        group-hover:scale-125
                        group-hover:-translate-y-1
                        object-contain
                        mx-auto
                      '
                    />
                  </div>

                  {/* NAME */}
                  <p className='text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis mt-1'>
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>

          {card.link && (
            <CardFooter>
              <Link href={card.link.href} className='mt-4 block'>
                {card.link.text}
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
