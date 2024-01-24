import { Stack, Alert, Typography, Container } from '@mui/material'
import { APOLLO_STATE_PROP_NAME, initializeApollo } from 'apis/apollo-client'
import { SITE_NAME } from 'common/constants'
import { BlueLink } from 'components/common/BlueLink'
import Logo from 'components/common/Logo'
import {
  UserPricesDocument,
  useUserPricesQuery
} from 'graphql/queries/user-prices.generated'
import { GetServerSideProps } from 'next'
import { getSession, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { analytics } from 'apis/analytics'
import { fbPixelTrackSubscribe } from 'apis/fbpixel'
import { useTrackSubscribeMutation } from 'graphql/mutations/track-article.generated'
import { useAppState } from 'components/_appstate/useAppState'
import { getApolloUserClient } from 'apis/apollo-admin-client'
import Cookies from 'cookies'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { OrderType } from 'graphql/types'
import { amplitudeTrackPurchase, amplitudeTrackPurchaseArticle, amplitudeTrackRentArticle } from 'apis/amplitude'
const CheckoutSuccessPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [logged, setLogged] = useState(false)
  const { data } = useUserPricesQuery({
    skip: !session?.user
  })

  const order = data?.user?.activeOrder

  const [trackSubscribeMutation] = useTrackSubscribeMutation()
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
  const from = router.query.from
  const redirectUrl = decodeURIComponent(from as string)
  useEffect(() => {
    const isClient = typeof window !== 'undefined'
    if (!order?._id) return
    if (logged) return
    trackSubscribeMutation({
      variables: {
        input: {
          orderAmount: order.amount
        }
      }
    })
    const interval = order.description.includes('month') ? 'Monthly' :
        order.description.includes('year') ? 'Yearly' :
        'N/A'

    const promoCode = order.promoCode || "None"

    if(order.type === OrderType.Individual) {
      analytics.trackPurchase({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: order.type,
        description: order.description,
        promoCode: promoCode,
        interval: interval,
        items: [
          {
            item_id: order._id,
            item_name: order.description,
            price: order.amount,
            quantity: 1
          }
        ]
      })

      amplitudeTrackPurchase({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: OrderType.Individual,
        description: order.description,
        promoCode: promoCode,
        interval: interval,
      })
    } else if(order.type === OrderType.PurchaseArticle){
      analytics.trackPurchaseArticle({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: order.type,
        description: order.description,
        promoCode: "N/A",
        interval: "ppa",
        items: [
          {
            item_id: order._id,
            item_name: order.description,
            price: order.amount,
            quantity: 1
          }
        ]
      })
      amplitudeTrackPurchaseArticle({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: OrderType.Individual,
        description: order.description,
        promoCode: promoCode,
        interval: interval,
      })
    } else if (order.type === OrderType.RentArticle) {
      analytics.trackRentArticle({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: order.type,
        description: order.description,
        promoCode: "N/A",
        interval: "ppa",
        items: [
          {
            item_id: order._id,
            item_name: order.description,
            price: order.amount,
            quantity: 1
          }
        ]
      })
      amplitudeTrackRentArticle({
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        type: OrderType.Individual,
        description: order.description,
        promoCode: promoCode,
        interval: interval,
      })
    }
    
    //Track FB Pixel Subscribe event
    fbPixelTrackSubscribe(order.currency, order.amount, session.user.id)
    setLogged(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, logged])

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Subscription Successful | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack spacing={1} alignItems="center">
        <Stack alignItems="center" mt={20}>
          <Logo type="dark" />
        </Stack>
        <Alert>
          Order Successful!
        </Alert>
        {order?.type === OrderType.Individual ?
          <Link href={`/account/subscription`} passHref legacyBehavior>
            <BlueLink ml={2}>Go Back</BlueLink>
          </Link>
          : 
          <Link href={redirectUrl} passHref legacyBehavior>
            <BlueLink ml={2}>Go Back</BlueLink>
          </Link>
        }
      </Stack>
    </Container>
  )
}

export default CheckoutSuccessPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session.user?.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
        statusCode: 302
      }
    }
  }
  const cookie = new Cookies(req, res)
  const client = getApolloUserClient(req.headers, cookie)
  const { data } = await client.query({
    query: UserPricesDocument
  })

  return {
    props: {
      session,
      [APOLLO_STATE_PROP_NAME]: client.cache.extract()
    }
  }
}
