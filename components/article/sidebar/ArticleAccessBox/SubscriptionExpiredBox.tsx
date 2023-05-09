import { Box, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import React from 'react'
import { ArticleAccessBoxContainer, BoxHeading } from './common'
import RequestOrPurchaseBox from './RequestOrPurchaseBox'

type Props = {
  access: ArticleAccessQuery['article']['articleAccessType']
}

/**
 * Box shown when an institutions subscription has expired
 *
 * @returns
 */
const SubscriptionExpiredBox: React.FC<Props> = ({ access }) => {
  const heading = 'Subscription Expired'
  const expiryDate = access.subscriptionExpiresAt
    ? dayjs(access.subscriptionExpiresAt).format('MM/DD/YYYY')
    : ''
  const institutionName = `${access.institution_name}'s`
  return (
    <ArticleAccessBoxContainer>
      <BoxHeading>{heading}</BoxHeading>
      <Stack px={2} pt={2} alignItems="flex-start" alignSelf="flex-start">
        <Typography variant="body2">
          The subscription from <b>{institutionName}</b> expired on{' '}
          <b>{expiryDate}</b>
        </Typography>
      </Stack>
      <Box p={2}>
        <RequestOrPurchaseBox />
      </Box>
    </ArticleAccessBoxContainer>
  )
}

export default SubscriptionExpiredBox
