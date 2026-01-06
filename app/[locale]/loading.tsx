import { getTranslations } from 'next-intl/server'

export default async function LoadingPage() {
  const t = await getTranslations('Loading')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <div className="p-6 rounded-lg shadow-md w-full max-w-sm border border-gray-200 bg-white space-y-4">

        {/* Rotating Bra & Panty */}
        <div className="text-4xl text-red-500 animate-spin-fast">
  <span role="img" aria-label="Bra">👙</span>
</div>


        {/* Loading Text */}
        <h2 className="text-lg font-semibold text-gray-700">
          {t('Loading')}
        </h2>

        {/* Brand Message */}
        <p className="text-sm text-gray-500">
          Please wait while we prepare your <span className="font-bold">NEWSTYLE-HOSIERY</span> experience...
        </p>
      </div>
    </div>
  )
}
