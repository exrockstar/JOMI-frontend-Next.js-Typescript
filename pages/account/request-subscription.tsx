import Layout from 'components/layout'

import RequestSubscription from 'components/requestSubscription'

import Head from 'next/head'
import { SITE_NAME } from 'common/constants'

export default function RequestSubscriptionPage() {
  return (
    <Layout>
      <Head>
        <title>Request Subscription | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <RequestSubscription />
    </Layout>
  )
}
