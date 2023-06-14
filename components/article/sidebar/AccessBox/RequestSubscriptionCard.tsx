import { Typography } from '@mui/material'
import DefaultButton from './common/DefaultButton'
import CommonCard from './common/CommonCard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'

const RequestSubscriptionCard = () => {
  const router = useRouter()
  const description = `Is your institution subscribed?  Use your institutional credentials to gain access.`
  return (
    <CommonCard>
      <Typography
        fontWeight={800}
        fontFamily={'Manrope'}
        className="card-title"
        color="grey.900"
      >
        Institutional Access
      </Typography>
      <Typography variant="body2" fontFamily={'Manrope'} color={'grey.600'}>
        {description}
      </Typography>

      <DefaultButton
        sx={{ mt: 2, fontWeight: 600, color: 'grey.600' }}
        fullWidth
        data-event="article-access-box-request-subscription-link"
        onClick={analytics.trackClick}
        LinkComponent={Link}
        href={`/account/request-subscription?from=${encodeURIComponent(
          router.asPath
        )}`}
      >
        Request Access
      </DefaultButton>
    </CommonCard>
  )
}
export default RequestSubscriptionCard
