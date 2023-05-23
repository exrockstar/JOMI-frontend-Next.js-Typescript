import { Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import {
  AccessBoxButton,
  PurchaseNowAccessBoxButton,
  RequestSubscriptionButton
} from './common'
import { analytics } from 'apis/analytics'

type Props = {
  message?: ReactNode
  userId: string
  purchaseDescription: string
  articleId: string
  purchasePrice: number
  rentPrice: number
}
const RequestOrPurchaseBox = ({
  message,
  userId,
  purchaseDescription,
  articleId,
  rentPrice,
  purchasePrice
}: Props) => {
  const router = useRouter()
  return (
    <Stack>
      {message ? (
        message
      ) : (
        <>
          <Typography
            variant="body2"
            mb={1}
            fontWeight={700}
            fontFamily="Manrope"
          >
            {`To maintain access to JOMI's exclusive content:`}
          </Typography>
          <Typography
            variant="body2"
            fontSize={13}
            fontWeight={500}
            mb={2}
            fontFamily="Manrope"
          >
            {`Request your institution to purchase a JOMI subscription:`}
          </Typography>
        </>
      )}
      <Link href={`/account/request-subscription`} passHref legacyBehavior>
        <RequestSubscriptionButton
          fullWidth
          data-event="Evaluation Notice - Request Subscription"
          onClick={analytics.trackClick}
        />
      </Link>

      <Divider
        sx={{ my: 2.5, background: '#FFFFFF', fontSize: 12 }}
        component="div"
      >
        OR
      </Divider>

      <Typography
        variant="body2"
        fontSize={13}
        fontWeight={500}
        mb={2}
        fontFamily="Manrope"
      >{`To purchase an individual subscription, please purchase one here:`}</Typography>
      <Link
        href={{
          pathname: `/account/subscription`,
          query: {
            from: decodeURIComponent(router.asPath)
          }
        }}
        passHref
        legacyBehavior
      >
        <PurchaseNowAccessBoxButton
          fullWidth
          data-event="Evaluation Notice - Purchase Subscription"
          onClick={analytics.trackClick}
        />
      </Link>
    </Stack>
  )
}

export default RequestOrPurchaseBox
