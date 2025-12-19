export default function TrackOrder({ trackingUrl }: { trackingUrl?: string }) {
  if (!trackingUrl) return null

  return (
    <a
      href={trackingUrl}
      target="_blank"
      className="text-blue-600 underline"
    >
      Track Your Order 🚚
    </a>
  )
}
