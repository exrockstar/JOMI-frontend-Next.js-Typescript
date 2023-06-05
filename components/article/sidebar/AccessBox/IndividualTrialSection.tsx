import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import React from 'react'
type Props = {
  data: ArticleAccessQuery
}
const IndividualTrialSection = ({ data }: Props) => {
  const trialExpiryDate = data.article?.articleAccessType?.subscriptionExpiresAt
  return (
    <Box p={2}>
      <Typography variant="body2" color="grey.600">
        Your free trial will expire on: {dayjs(trialExpiryDate).format('MM/DD/YYYY HH:mm A')}
      </Typography>
    </Box>
  )
}

export default IndividualTrialSection
