import { Box, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import React, { useMemo } from 'react'
import { ArticleAccessBoxContainer, BoxHeading } from './common'
import RequestOrPurchaseBox from './RequestOrPurchaseBox'

type Props = {
  access: ArticleAccessQuery['article']['articleAccessType']
}

/**
 * Box shown when a user is subscribed through an institution.
 * The subscription/order status could be active, trial
 * @returns
 */
const InstitutionalAccessBox: React.FC<Props> = ({ access }) => {
  const isTrial = access.isTrial
  const containerBg = '#FFFFFF'
  const headingBg = isTrial ? '#EAB308' : '#059669'
  const heading = isTrial ? 'Trial Access' : 'Institutional Access'
  const expiry = access.subscriptionExpiresAt
    ? dayjs(access.subscriptionExpiresAt).format('MM/DD/YYYY')
    : ''
  const daysLeft = dayjs(access.subscriptionExpiresAt).diff(dayjs(), 'days')

  return (
    <ArticleAccessBoxContainer sx={{ backgroundColor: containerBg }}>
      <BoxHeading sx={{ backgroundColor: headingBg }}>{heading}</BoxHeading>
      <Stack px={2} py={2} alignItems="flex-start" alignSelf="flex-start">
        <Typography variant="body1" fontWeight={600} fontFamily="Manrope">
          Provided by:
        </Typography>
        <Typography variant="body2" fontWeight={400} fontFamily="Manrope">
          {access.institution_name}
        </Typography>
        {access.viaTemporaryIp && access.expiry && (
          <Typography variant="body2" color="textSecondary" fontFamily="Manrope">
            Off-site access until:{' '}
            {dayjs(access.expiry).format('MMMM DD, YYYY')}
          </Typography>
        )}
      </Stack>
      {isTrial && (
        <>
          <Stack px={2} pb={1} alignItems="flex-start" alignSelf="flex-start">
            <Typography variant="body2" fontWeight={400} fontFamily="Manrope">
              Trial access will expire on: <Typography fontFamily="Manrope" variant="body1" component="span" fontWeight={700}>{expiry}</Typography>
            </Typography>
          </Stack>
          <Box p={2} bgcolor={'#FFFFFF'}>
            <RequestOrPurchaseBox />
          </Box>
        </>
      )}
    </ArticleAccessBoxContainer>
  )
}

export default InstitutionalAccessBox
