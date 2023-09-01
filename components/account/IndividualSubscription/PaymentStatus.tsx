import { Alert, CircularProgress } from '@mui/material'
import { useGetPaymentStatusLazyQuery } from 'graphql/queries/user-prices.generated'

import { useEffect } from 'react'

type Props = {
  refetchPrices(): void
}

/**
 * Displays the user's payment status after checkout
 * @returns
 */
const PaymentStatus = ({ refetchPrices }: Props) => {
  const [fetchData, { data }] = useGetPaymentStatusLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted(result) {
      const status = result.paymentStatus
      console.log(status)
      if (status === 'processing') {
        setTimeout(() => fetchData(), 10000)
      }
      if (status === 'succeeded') {
        refetchPrices()
      }
    }
  })

  useEffect(() => {
    fetchData()
    //@ts-ignore
  }, [])

  const paymentStatus = data?.paymentStatus
  const paymentStatusText = () => {
    switch (paymentStatus) {
      case 'processing':
        return `Payment Status: We're still processing your payment...`
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
