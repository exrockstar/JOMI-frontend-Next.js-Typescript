import { Typography } from '@mui/material'
import DefaultButton from './common/DefaultButton'
import CommonCard from './common/CommonCard'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { useAddTrialOrderForUserMutation } from 'graphql/cms-queries/trials.generated'
import { amplitudeTrackTrial } from 'apis/amplitude'
import { useSession } from 'next-auth/react'
type Props = {
  data: ArticleAccessQuery
}

const PurchaseSubscriptionCard = ({ data }: Props) => {
  const router = useRouter()
  const user = data?.user
  const {data: session } = useSession()
  const isShowTrialButton = user?.isTrialsFeatureEnabled && user?.trialsAllowed
  const trialDuration = user?.trialDuration

  const [addTrialOrder, { loading }] = useAddTrialOrderForUserMutation({
    onCompleted() {
      router.reload()
      analytics.trackTrial({})
      amplitudeTrackTrial({
        user_id: session.user ? session.user._id : 'none',
        duration: trialDuration
      })
    }
  })
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
      {isShowTrialButton && (
        <DefaultButton
          sx={{ mt: 2, fontWeight: 600, color: 'grey.600' }}
          fullWidth
          data-event="article-access-box-trial-button"
          onClick={(e) => {
            addTrialOrder()
          }}
          loading={loading}
        >
          {`Try free for ${trialDuration} days`}
        </DefaultButton>
      )}
    </CommonCard>
  )
}
export default PurchaseSubscriptionCard
