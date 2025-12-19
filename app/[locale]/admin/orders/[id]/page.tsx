import { notFound } from 'next/navigation'
import React from 'react'

import { auth } from '@/auth'
import { getOrderById, updateOrderToPaid,deliverOrder} from '@/lib/actions/order.actions'
import OrderDetailsForm from '@/components/shared/order/order-details-form'
import Link from 'next/link'
import ActionButton from '@/components/shared/action-button'

export const metadata = {
  title: 'Admin Order Details',
}

const AdminOrderDetailsPage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {

  const params = await props.params
  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  const isAdmin = session?.user?.role === 'Admin'
  const isPaid = order.isPaid
  const isDelivered = order.isDelivered

  return (
    <main className='max-w-6xl mx-auto p-4'>
      <div className='flex mb-4'>
        <Link href='/admin/orders'>Orders</Link> <span className='mx-1'>›</span>
        <Link href={`/admin/orders/${order._id}`}>{order._id}</Link>
      </div>

      <OrderDetailsForm
        order={order}
        isAdmin={isAdmin}
      />

      <div className='flex gap-3 mt-6'>

        {!isPaid && order.paymentMethod === 'Cash On Delivery' && (
          <ActionButton
            caption='Mark Paid'
            action={async () => {
              'use server'
              await updateOrderToPaid(order._id)
              return { success: true, message: 'Order marked as paid' }
            }}
          />
        )}

        {isAdmin && isPaid && !isDelivered && (
          <ActionButton
            caption='Mark Delivered'
            action={async () => {
              'use server'
              await deliverOrder(order._id)
              return { success: true, message: 'Order marked as delivered' }
            }}
          />
        )}
      </div>
    </main>
  )
}

export default AdminOrderDetailsPage
