import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import { getApolloUserClient } from 'apis/apollo-admin-client'
import Cookies from 'cookies'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import { getSession, useSession } from 'next-auth/react'
import {
  GetPurchasedArticlesDocument,
  GetPurchasedArticlesQuery,
  GetPurchasedArticlesQueryVariables,
  useGetPurchasedArticlesQuery
} from 'graphql/mutations/purchase-article.generated'
import { Stack, Alert, Container } from '@mui/material'
import { SITE_NAME } from 'common/constants'
import { BlueLink } from 'components/common/BlueLink'
import Logo from 'components/common/Logo'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import dayjs from 'dayjs'
import { amplitudeTrackPurchase } from 'apis/amplitude'

/**
 * Page to track article purchase and rent events
 * @returns
 */
const PurchaseSuccessPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { data } = useGetPurchasedArticlesQuery({
    skip: !session?.user
  })
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
  const from = router.query.from
  const redirectUrl = decodeURIComponent(from as string)
  useEffect(() => {
    if (data) {
      const sortedOrders = [...data?.articles].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      )
      const order = sortedOrders[0]
      const interval = order.description.includes('month') ? 'Monthly' :
        order.description.includes('year') ? 'Yearly' :
        'N/A'
      gtag('event', 'purchase', {
        transaction_id: order._id,
        value: order.amount,
        currency: order.currency,
        referredFrom,
        referrerPath,
        anon_link_id,
        event_label: order.type,
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
        type: order.type,
        userId: session && session.user ? session.user._id : 'anon',
        items: [
          {
            item_id: order._id,
            item_name: order.description,
            price: order.amount,
            quantity: 1
          }
        ],
        interval: interval,
      })
      setTimeout(() => {
        router.replace(redirectUrl)
      }, 2000)
    }
  }, [data])
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
        <Alert severity="success">
          Your purchase is successful. Redirecting to article...
        </Alert>

        <Link href={redirectUrl} passHref legacyBehavior>
          <BlueLink ml={2}>Back to Article</BlueLink>
        </Link>
      </Stack>
    </Container>
  )
}

export default PurchaseSuccessPage
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
  const { data } = await client.query<
    GetPurchasedArticlesQuery,
    GetPurchasedArticlesQueryVariables
  >({
    query: GetPurchasedArticlesDocument,
    context: {
      headers: {
        Authorization: `Bearer ${session.user?.token}`
      }
    }
  })

  return {
    props: {
      session,
      [APOLLO_STATE_PROP_NAME]: client.cache.extract()
    }
  }
}
