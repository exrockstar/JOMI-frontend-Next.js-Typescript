import React, { useEffect } from 'react'
import Layout from 'components/layout'
import AccountLayout from 'components/account/AccountLayout'
import SubscribePage from 'components/account/IndividualSubscription'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

export default function Subscribe() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  // shown when creating checkout session results in an error
  useEffect(() => {
    const error = router.query.error
    if (error) {
      enqueueSnackbar(error, { variant: 'error', autoHideDuration: 10000 })
      router.push(
        {
          query: {}
        },
        null,
        { shallow: true }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])
  return (
    <Layout>
      <Head>
        <title>Subscription | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AccountLayout>
        <SubscribePage />
      </AccountLayout>
    </Layout>
  )
}
