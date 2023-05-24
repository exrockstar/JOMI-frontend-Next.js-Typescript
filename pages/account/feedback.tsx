import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Layout from 'components/layout'
import AccountLayout from 'components/account/AccountLayout'
import { BlueLink } from 'components/common/BlueLink'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'

export default function Account() {
  return (
    <Layout>
      <Head>
        <title>Feedback | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AccountLayout>
        <Box bgcolor="white" height="100%" alignItems="center" justifyContent="center" flex={1} p={2} pt={0}>
          <FeedbackHeaderText>Feedback</FeedbackHeaderText>
          <Box display={'flex'} padding={'8px'}>
            <MoreInfoMainText>
              Please share your feedback by sending us an email at
              <MoreInfoLinkText underline="hover"> contact@jomi.com.</MoreInfoLinkText>
            </MoreInfoMainText>
          </Box>
        </Box>
      </AccountLayout>
    </Layout>
  )
}

const FeedbackHeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  padding: '8px',
  fontWeight: '200px'
}))

const MoreInfoMainText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '14px'
}))

const MoreInfoLinkText = styled(BlueLink)({
  fontSize: '14px'
})
