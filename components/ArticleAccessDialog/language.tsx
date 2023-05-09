import { Stack, Box, Typography, List, ListItem } from '@mui/material'
import { BlueLink } from 'components/common/BlueLink'
import { ReactNode } from 'react'
import { AccessTypeEnum } from 'graphql/types'

export type ArticleAccessLanguage = {
  -readonly [key in string]: {
    title: string
    message: ReactNode
    action1: {
      text: string
      url: string
      event?: string //event label for analytics
      tooltip: string
    }
    action2: {
      text: string
      url: string
      event?: string
      tooltip: string
    }
    action3?: {
      text: string
      url: string
      event?: string
      tooltip: string
    }
  }
}

const ForEmergency = () => {
  const emergencyAccessMessage = `if you would like to request an exception, please create an account and send an email to contact@jomi.com stating 1) why you need urgent access and 2) why you are unable to purchase access at this time.`
  return (
    <Box my={2}>
      <Typography color="textSecondary" fontSize={14}>
        <Typography component="span" fontSize={14} sx={{ color: 'error.main' }}>
          Emergency Access{' '}
        </Typography>
        : {emergencyAccessMessage}
        <BlueLink href="mailto:contact@jomi.com">contact@jomi.com</BlueLink>.
        Please state:
      </Typography>
      <List>
        <ListItem color="text.secondary" disablePadding>
          <Typography color="textSecondary" fontSize={14}>
            i) institutional affiliation,
          </Typography>
        </ListItem>
        <ListItem color="text.secondary" disablePadding>
          <Typography color="textSecondary" fontSize={14}>
            ii) whom should we contact to negotiate an institutional
            subscription.
          </Typography>
        </ListItem>
      </List>
    </Box>
  )
}

export const ArticleAccessLanguageData: Partial<ArticleAccessLanguage> = {
  LimitedAccess: {
    title: 'To continue evaluation',
    message: (
      <Box my={2}>
        <Typography>
          You must login or create an account to continue evaluating this
          article. But you can review free articles{' '}
          <BlueLink href="/sample-cases">here</BlueLink> without needing to
          login.
        </Typography>
        <ForEmergency />
      </Box>
    ),
    action1: {
      text: 'Sign in',
      url: '/login',
      event: 'ArticleAccessDialog - Login Button',
      tooltip: 'Login to continue'
    },
    action2: {
      text: 'Sign up',
      url: '/signup',
      event: 'ArticleAccessDialog - Signup Button',
      tooltip: 'Sign up to continue'
    }
  },
  RequireSubscription: {
    title: 'Subscription required to continue',
    action1: {
      text: 'Request an Institutional Subscription',
      url: '/account/request-subscription',
      event:
        'ArticleAccessDialog - Request an Institutional Subscription Button',
      tooltip: 'Login to request an Institutional Subscription'
    },
    action2: {
      text: 'Purchase Individual Subscription',
      url: '/account/subscription',
      event: 'ArticleAccessDialog - Individual Subscription Button',
      tooltip: 'Login to purchase'
    },
    message: (
      <>
        <Box my={2}>
          <Typography>
            You must have a subscription to continue watching this article. But
            you can review free articles{' '}
            <BlueLink href="/sample-cases">here</BlueLink>.
          </Typography>
        </Box>
        <ForEmergency />
      </>
    )
  }
}

ArticleAccessLanguageData.Evaluation = {
  ...ArticleAccessLanguageData.RequireSubscription,
  title: 'Evaluation Access',
  message: (
    <>
      <Box my={2}>
        <Typography>
          If you find jomi helpful, please consider requesting a subscription
          from your institution or purchasing an individual subscription. You
          can also can review free articles{' '}
          <BlueLink href="/sample-cases">here</BlueLink>.
        </Typography>
      </Box>
      <ForEmergency />
    </>
  ),
  action3: {
    text: 'Continue Evaluation',
    event: 'ArticleAccessDialog - Continue Evaluation',
    url: null,
    tooltip:
      'Consider getting a subscription to get rid of these blocks (every 5 minutes)'
  }
}

ArticleAccessLanguageData.SubscriptionExpired = {
  ...ArticleAccessLanguageData.RequireSubscription,
  title: 'Subscription Expired',
  message: (
    <>
      <Box my={2}>
        <Typography>
          The subscription for your institution has expired. Please contact us
          to renew your subscription. You can also can review free articles{' '}
          <BlueLink href="/sample-cases">here</BlueLink>.
        </Typography>
      </Box>
      <ForEmergency />
    </>
  )
}

/**
 * Institution has subscription but users requires login to continue
 */
ArticleAccessLanguageData.RequireLogin = {
  ...ArticleAccessLanguageData.LimitedAccess,
  title: 'Thank you for using JOMI',
  message: (
    <>
      <Box mb={2}>
        <Typography>Your institution is currently subscribed.</Typography>
        <Typography variant="body2" color="text.secondary">
          Please sign in to access this video-article. If you do not have an
          account, please create an account and you will have full access.
        </Typography>
      </Box>
    </>
  )
}
