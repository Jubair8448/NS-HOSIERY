import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />

      {/* ✅ WhatsApp Floating Button */}
      <Link
  href="https://api.whatsapp.com/send?phone=919643860819&text=Hi%20there%2C%20I%20want%20to%20know%20more%20about%20Goldy%20Supplements"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-1 shadow-green-500 hover:bg-green-600 text-yellow-900 p-3 rounded-full shadow-lg z-50"
>
  <FaWhatsapp className="text-3xl" />
</Link>

    </div>
  )
}
