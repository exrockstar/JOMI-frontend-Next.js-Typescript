import React from 'react'
import Layout from 'components/layout'
import AccountLayout from 'components/account/AccountLayout'
import Newsletter from 'components/account/newsletter'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'

export default function Account() {
  return (
    <Layout>
      <Head>
        <title>Newsletter | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AccountLayout>
        <Newsletter />
      </AccountLayout>
    </Layout>
  )
}
