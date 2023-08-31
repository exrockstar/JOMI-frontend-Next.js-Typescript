import { Alert, CircularProgress } from '@mui/material'
import { useGetPaymentStatusQuery } from 'graphql/queries/user-prices.generated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSessionStorage } from 'usehooks-ts'

/**
 * Displays the user's payment status after checkout
 * @returns
 */
const PaymentStatus = () => {
  const { data } = useGetPaymentStatusQuery({
    fetchPolicy: 'network-only'
  })
  const paymentStatus = data?.paymentStatus
  const paymentStatusText = () => {
    switch (paymentStatus) {
      case 'processing':
        return `Payment Status: We're still processing your payment. Try refreshing the page after a few minutes.`
      default:
        return ''
    }
  }

  if (!paymentStatusText()) return null

  return (
    <Alert severity="info" sx={{ mb: 2 }}>
      <CircularProgress size={16} color="inherit" /> {paymentStatusText()}
    </Alert>
  )
}
export default PaymentStatus
