import { Stack } from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import OrderDetails from 'components/cms/orders/OrderDetails'
import React from 'react'

const OrderDetailsPage = () => {
  return (
    <CmsLayout>
      <Stack p={2} minHeight="95vh">
        <OrderDetails />
      </Stack>
    </CmsLayout>
  )
}

export default OrderDetailsPage
