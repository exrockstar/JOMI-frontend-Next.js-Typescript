import { Box, Typography } from '@mui/material'
import { UserPricesQuery } from 'graphql/queries/user-prices.generated'
import { OrderInterval, PromoCodeDuration } from 'graphql/types'
import { useMemo } from 'react'

type Props = {
  discount: UserPricesQuery['user']['activeOrder']['discount']
  interval: OrderInterval
}
const DiscountInfo = ({ discount, interval }: Props) => {
  const _discount = discount.amount_off
    ? `$${(discount.amount_off / 100).toFixed()} OFF`
    : `${discount.percent_off}% OFF`

  const duration = useMemo(() => {
    switch (discount.duration) {
      case PromoCodeDuration.Once:
        return 'once'
      case PromoCodeDuration.Forever:
        return 'forever'
      case PromoCodeDuration.Repeating: {
        if (interval === OrderInterval.Year) {
          const rounded = Math.ceil(discount.duration_in_months / 12)
          return `for ${rounded} year${rounded > 1 ? 's' : ''}`
        }
        return `for ${discount.duration_in_months} months`
      }
    }
  }, [discount.duration, discount.duration_in_months, interval])
  return (
    <Box mt={1}>
      <Typography variant="body2">
        <b>Code:</b> {discount.code} - applied {_discount} {duration}
      </Typography>
    </Box>
  )
}
export default DiscountInfo
