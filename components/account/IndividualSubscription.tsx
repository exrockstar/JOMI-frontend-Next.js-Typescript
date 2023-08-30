import { useEffect, useState } from 'react'
import { Box, Typography, Link, CircularProgress, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import ActiveOrder from './IndividualSubscription/ActiveOrder'
import { useSession } from 'next-auth/react'
import { useUserPricesQuery } from 'graphql/queries/user-prices.generated'
import { analytics } from 'apis/analytics'
import PromoCode from './IndividualSubscription/PromoCode'
import PriceButton, {
  PriceButtonContainer
} from './IndividualSubscription/PriceButton'
import { fbPixelTrackViewContent } from 'apis/fbpixel'
import { OrderInterval, OrderType } from 'graphql/types'
import UpgradeSubscriptionDialog from './IndividualSubscription/UpgradeSubscriptionDialog'
import CTAButton from 'components/common/CTAButton'
import TrialButton from './IndividualSubscription/TrialButton'
import dayjs from 'dayjs'

export default function IndividualSubscription() {
  const { data: session } = useSession()
  const [promocode, setStripeCode] = useState('')
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const { data, loading, error, refetch } = useUserPricesQuery({
    skip: !session.user
  })

  useEffect(() => {
    fbPixelTrackViewContent('Account', 'Subscription Info Page')
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      refetch()
    }

    if (query.get('canceled')) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const user = data?.user

  if (loading || error || !user)
    return (
      <Wrapper display={'flex'} py={20}>
        <CircularProgress />
      </Wrapper>
    )

  const prices = user.stripeData?.prices
  const stripeId = user.stripeData?.stripeId
  const order = user.activeOrder
  const trialsAllowed = user.trialsAllowed
  const trialsEnabled = user.isTrialsFeatureEnabled
  const trialDuration = user.trialDuration
  const showTrialsForUser = trialsAllowed && trialsEnabled
  const hasCompletedRegistration = !!user.user_type
  const isTrialOrder = order?.type === OrderType.Trial
  const canUpgrade =
    !isTrialOrder && order?.plan_interval !== OrderInterval.Year
  const yearUpgrade = prices.find((p) => p.interval === OrderInterval.Year)
  const getDescription = (nickname, unit_amount, interval) => {
    // transforms "Medical Professional $250/year" to "Medical Professional"
    const baseNickname = nickname.replace(/\$.*/g, '').trim() || user.user_type

    return (
      <Typography fontFamily="Manrope">
        {baseNickname}
        {' - '}
        <b>
          ${unit_amount} per {interval}
        </b>
      </Typography>
    )
  }
  return (
    <Wrapper p={2} pt={0}>
      <SubscriptionHeaderText px={{ md: 1 }} pt={1}>
        Individual Subscription
      </SubscriptionHeaderText>

      {order && (
        <div>
          {!isTrialOrder && (
            <ActiveOrder order={order} onUpdateSubscription={refetch} />
          )}
          {canUpgrade && (
            <div>
              <PriceButtonContainer>
                {getDescription(
                  yearUpgrade.nickname,
                  (yearUpgrade.unit_amount / 100).toFixed(0),
                  yearUpgrade.interval.toLowerCase()
                )}
                <CTAButton onClick={() => setUpgradeDialogOpen(true)}>
                  Upgrade Subscription
                </CTAButton>
              </PriceButtonContainer>
              <UpgradeSubscriptionDialog
                priceId={yearUpgrade?.id}
                priceNickname={yearUpgrade.nickname}
                open={upgradeDialogOpen}
                onClose={() => setUpgradeDialogOpen(false)}
              />
            </div>
          )}
          {order.error_code === 'payment_failed' && (
            <Alert severity="warning" sx={{ my: 2 }} onClose={() => {}}>
              Payment to renew or upgrade your subscription has failed.
            </Alert>
          )}
        </div>
      )}

      <Box>
        {!order && !hasCompletedRegistration && (
          <Box>
            {' '}
            <Alert severity="info">
              Please complete user registration to purchase a subscription.
            </Alert>
          </Box>
        )}
        {(!order || isTrialOrder) && hasCompletedRegistration && (
          <Box padding={{ xs: '2px', md: '8px' }}>
            <Typography mt={1} mb={2} fontFamily={'Manrope'}>
              Get instant access to over 200 articles spanning a wide range of
              surgical subspecialties. Scrub into the OR from anywhere.{' '}
            </Typography>
            {isTrialOrder && (
              <Alert sx={{ my: 2 }}>
                Your {order.description} will expire on{' '}
                {dayjs(order.end).format('MM/DD/YYYY HH:mm:ss A')}.
              </Alert>
            )}
            {prices?.map((price) => {
              const description = getDescription(
                price.nickname,
                (price.unit_amount / 100).toFixed(0),
                price.interval.toLowerCase()
              )
              return (
                <PriceButton
                  key={price.id}
                  priceId={price.id}
                  nickname={price.nickname}
                  stripeId={stripeId}
                  mode={'subscription'}
                  promocode={promocode}
                  interval={price.interval}
                  productId={price.product}
                >
                  {description}
                </PriceButton>
              )
            })}
            {showTrialsForUser && <TrialButton trialDuration={trialDuration} />}
          </Box>
        )}
        {(!order || isTrialOrder) && (
          <PromoCode
            stripeId={stripeId}
            onStripeCodeChange={(code) => setStripeCode(code)}
          />
        )}
        <Box display={'flex'} padding={1}>
          <MoreInfoMainText>
            For information on individual or institutional subscriptions, please
            contact us at
            <Link
              underline="hover"
              href="mailto:subscribe@jomi.com"
              sx={{ color: 'linkblue.main', fonSize: 14 }}
              data-event={`Individual Subscription - Email Button`}
              onClick={analytics.trackOutboundClick}
            >
              {' '}
              subscribe@jomi.com.
            </Link>
          </MoreInfoMainText>
        </Box>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  backgroundColor: 'white',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1
})
const MoreInfoMainText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '14px'
}))

const SubscriptionHeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  fontWeight: '200px',
  fontFamily: 'Manrope, Arial, san-serif'
}))
