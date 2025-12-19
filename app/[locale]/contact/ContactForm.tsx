/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(() => {
        alert('✅ Your message has been sent successfully!')
        formRef.current?.reset()

        // Auto-refresh after 2 seconds (optional)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((error: any) => {
        console.error('EmailJS Error:', error)
        alert('❌ Failed to send the message. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contact&nbsp;Us</h1>
      <p className="text-gray-600 mb-8 text-center">
        We&apos;d love to hear from you! Please fill out the form below and we&apos;ll get back to you soon.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}
