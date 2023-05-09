import React from 'react'
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Layout from 'components/layout'
import AccountLayout from 'components/account/AccountLayout'

import ProfilePage from 'components/account/profilePage/profile'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'

export default function Account() {
  const isSmallDevice = useMediaQuery('(max-width:600px)')

  return (
    <Layout noContainer={isSmallDevice}>
      <Head>
        <title>Profile | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AccountLayout>
        <Box
          display="flex"
          flex={1}
          bgcolor="white"
          height={'100%'}
          alignItems="center"
          justifyContent="center"
        >
          <ProfilePage />
        </Box>
      </AccountLayout>
    </Layout>
  )
}
