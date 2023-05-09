import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Layout from 'components/layout'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Account() {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Box></Box>
    </Layout>
  )
}
