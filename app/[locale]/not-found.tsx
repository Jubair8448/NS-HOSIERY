'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileX2, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white px-4'>
      <div className='p-8 rounded-lg shadow-md max-w-md w-full text-center border border-gray-200 bg-gray-50'>
        <div className='flex justify-center mb-4 text-red-600'>
          <FileX2 className='w-10 h-10' />
        </div>
        <h1 className='text-3xl font-bold mb-2 text-gray-800'>Page Not Found write now</h1>
        <p className='text-sm text-gray-600 mb-6'>
          Sorry, we couldn’t find the page you’re looking for but update will be as soon as Page .
        </p>
        <Button
          variant='outline'
          className='flex items-center gap-2 justify-center mx-auto'
          onClick={() => (window.location.href = '/')}
        >
          <Home className='w-4 h-4' />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
