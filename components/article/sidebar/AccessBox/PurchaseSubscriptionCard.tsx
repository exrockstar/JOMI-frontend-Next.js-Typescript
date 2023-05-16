import { Box, Typography } from '@mui/material'
import { zinc } from 'tailwindcss/colors'
import DefaultButton from './common/DefaultButton'
import CommonCard from './common/CommonCard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
const PurchaseSubscriptionCard = () => {
  const router = useRouter()
  return (
    <CommonCard>
      <Typography
        fontWeight={800}
        fontFamily={'Manrope'}
        className="card-title"
        color="grey.900"
      >
        Individual Subscription
      </Typography>
      <Typography variant="body2" fontFamily={'Manrope'} color={'grey.600'}>
        Purchase monthly/annual access to the entire collection.
      </Typography>
      <Link
        href={{
          pathname: `/account/subscription`,
          query: { from: router.asPath }
        }}
        passHref
        legacyBehavior
      >
        <DefaultButton
          sx={{ mt: 2, fontWeight: 600, color: 'grey.600' }}
          fullWidth
          data-event="article-access-box-view-plans"
          onClick={analytics.trackClick}
        >
          View Plans
        </DefaultButton>
      </Link>
    </CommonCard>
  )
}
export default PurchaseSubscriptionCard
