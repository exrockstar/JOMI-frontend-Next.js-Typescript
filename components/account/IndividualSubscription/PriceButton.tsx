import { Box, BoxProps, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { analytics } from 'apis/analytics'
import { fbPixelTrackInitiateCheckout } from 'apis/fbpixel'
import CTAButton from 'components/common/CTAButton'
import { useAppState } from 'components/_appstate/useAppState'
import { useTrackInitiateCheckoutMutation } from 'graphql/mutations/track-article.generated'
import { OrderInterval } from 'graphql/types'
import { useSession } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { amplitudeTrackInitiateCheckout } from 'apis/amplitude'

type Props = {
  priceId?: string
  stripeId: string
  nickname: string
  mode: 'subscription' | 'payment'
  amount?: number

  promocode?: string
  interval?: OrderInterval
  productId?: string
} & PropsWithChildren
const PriceButton = ({
  priceId,
  stripeId,
  nickname,
  mode,
  amount,
  promocode,
  interval,
  productId,
  children
}: Props) => {
  const { data: session } = useSession()
  const { referredFrom, referrerPath } = useGoogleAnalyticsHelpers()
  const [trackInitiateCheckoutMutation, { data, loading, error }] =
    useTrackInitiateCheckoutMutation({
      variables: {
        input: {
          referredFrom,
          referrerPath
        }
      }
    })

  return (
    <Box mb={1}>
      <form action="/api/checkout_sessions" method="POST">
        <input type="hidden" name="priceId" value={priceId} />
        <input type="hidden" name="stripeId" value={stripeId} />
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="description" value={nickname} />
        <input type="hidden" name="amount" value={amount} />
        {productId && (
          <input type="hidden" name="productId" value={productId} />
        )}
        {interval && (
          <input type="hidden" name="interval" value={interval.toLowerCase()} />
        )}
        <input type="hidden" name="promocode" value={promocode} />
        <PriceButtonContainer>
          {children}
          <CTAButton
            type="submit"
            role="link"
            data-event={`Subscription Button - ${nickname}`}
            onClick={(e) => {
              analytics.trackCheckout(e)
              amplitudeTrackInitiateCheckout({
                label: 'Individual Subscription',
                priceId,
                value: amount,
                userId: session && session.user ? session.user._id : 'anon',
                description: nickname,
                promocode: promocode ? promocode : 'none'
              })
              trackInitiateCheckoutMutation()
              fbPixelTrackInitiateCheckout(
                'SubscriptionInitiate',
                [priceId],
                'USD',
                amount,
                session.user.id
              )
            }}
            sx={{ px: 2.5, py: 1.875, lineHeight: 1.0 }}
          >
            Subscribe Now
          </CTAButton>
        </PriceButtonContainer>
      </form>
    </Box>
  )
}

export default PriceButton

export const PriceButtonContainer = (props: BoxProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        borderWidth: 1,
        borderColor: 'grey.300',
        borderRadius: 2,
        borderStyle: 'solid',
        p: 1,
        pl: 2,
        display: 'flex',
        gap: { xs: 1, md: 2 },
        justifyContent: 'space-between',
        width: { xs: '100%', md: 500 },
        alignItems: { xs: 'stretch', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' }
      }}
      {...props}
    />
  )
}
