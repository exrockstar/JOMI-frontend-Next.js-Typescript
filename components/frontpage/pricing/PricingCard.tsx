import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import Logo from 'public/img/jomi-logo-white.svg'
import LogoRed from 'public/img/jomi-logo-red.svg'
import NextLink from 'next/link'
import CTAButtonOutlined from '../CTAButtonOutlined'
import { StripePrice } from 'graphql/types'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useAddTrialOrderForUserMutation } from 'graphql/cms-queries/trials.generated'
import { amplitudeTrackTrial } from 'apis/amplitude'
import { analytics } from 'apis/analytics'
import router from 'next/router'
import { useSnackbar } from 'notistack'
export type PricingCardProps = {
  id: string
  selected?: boolean
  ctaText: string
  onSelect?(id: string): void | Promise<void>
} & StripePrice
const PricingCard = (props: PricingCardProps) => {
  const amount = (props.unit_amount / 100).toFixed(0)
  const selected = props.selected
  const textColor = selected ? 'white' : 'text.secondary'
  const { data: session } = useSession()
  const customerId = session?.user?._id
  const { enqueueSnackbar } = useSnackbar()
  const [addTrialOrder, { loading }] = useAddTrialOrderForUserMutation({
    onCompleted() {
      analytics.trackTrial({})
      router.reload()
      enqueueSnackbar('Successfully Subscribed to Trial.', {
        variant: 'success'
      })
    }
  })
  const isTrial = props.unit_amount > 0
  console.log(props.productName)
  return (
    <Stack
      p={4}
      height="100%"
      sx={{
        borderColor: selected ? 'transparent' : 'grey.700',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        ':hover': {
          cursor: 'pointer'
        },
        background: selected
          ? `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`
          : 'unset'
      }}
      gap={5}
      onClick={() => {
        props.onSelect(props.id)
      }}
    >
      {selected ? <LogoRed /> : <Logo />}
      <Stack gap={3.25}>
        <Stack gap={2}>
          <Typography
            fontSize={'1.5rem'}
            fontWeight={600}
            lineHeight={1}
            minHeight={48}
          >
            {props.productName}
          </Typography>
          <Typography fontSize={'3rem'} fontWeight={600} lineHeight={1}>
            ${amount}
          </Typography>
          <Typography
            fontSize={'.875rem'}
            fontWeight={400}
            color={textColor}
            lineHeight={'20px'}
            visibility={isTrial ? 'visible' : 'hidden'}
          >
            per {props.interval?.toLowerCase()}
          </Typography>
        </Stack>
        <Typography fontSize={'1.125rem'} fontWeight={600} lineHeight={'28px'}>
          {props.nickname}
        </Typography>{' '}
      </Stack>
      {/* Modify link to go to /account/subscription page for subscriptions */}
      {props.unit_amount > 0 ? (
        <CTAButtonOutlined
          LinkComponent={NextLink}
          href="/account/subscription"
          sx={{
            backgroundColor: selected ? 'white' : 'unset',
            color: selected ? 'primary.main' : 'white',
            py: 1
          }}
        >
          {props.ctaText}
        </CTAButtonOutlined>
      ) : (
        <CTAButtonOutlined
          onClick={() => addTrialOrder()}
          loading={loading}
          sx={{
            backgroundColor: selected ? 'white' : 'unset',
            color: selected ? 'primary.main' : 'white',
            py: 1
          }}
        >
          {props.ctaText}
        </CTAButtonOutlined>
      )}
      {/* {!customerId ? (
        <CTAButtonOutlined
          LinkComponent={NextLink}
          href="/account/subscription"
          sx={{
            backgroundColor: selected ? 'white' : 'unset',
            color: selected ? 'primary.main' : 'white',
            py: 1
          }}
        >
          {props.ctaText}
        </CTAButtonOutlined>
      ) : props.unit_amount > 0 ? (
        <form method="POST" action="/api/checkout_sessions">
          <input type="hidden" name="priceId" value={props.priceId} />
          <input type="hidden" name="stripeId" value={customerId} />
          <input type="hidden" name="mode" value={'subscription'} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="productId" value={props.product} />
          <input
            type="hidden"
            name="interval"
            value={props.interval?.toLowerCase()}
          />
          <CTAButtonOutlined
            type="submit"
            fullWidth
            sx={{
              backgroundColor: selected ? 'white' : 'unset',
              color: selected ? 'primary.main' : 'white',
              py: 1
            }}
          >
            {props.ctaText}
          </CTAButtonOutlined>
        </form>
      ) : (
        <CTAButtonOutlined
          onClick={() => addTrialOrder()}
          loading={loading}
          sx={{
            backgroundColor: selected ? 'white' : 'unset',
            color: selected ? 'primary.main' : 'white',
            py: 1
          }}
        >
          {props.ctaText}
        </CTAButtonOutlined>
      )} */}
    </Stack>
  )
}

export default PricingCard
