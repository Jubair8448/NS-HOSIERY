import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import VerifyForm from './VerifyForm'

export default function VerifyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <VerifyForm />
      </main>
      <Footer />
    </div>
  )
}
