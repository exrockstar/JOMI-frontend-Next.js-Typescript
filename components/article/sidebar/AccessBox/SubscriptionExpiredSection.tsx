import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  data: ArticleAccessQuery
}

const SubscriptionExpiredSection = ({ data }: Props) => {
  const access = data?.article?.articleAccessType
  const expiryDate = access.subscriptionExpiresAt
    ? dayjs(access.subscriptionExpiresAt).format('MM/DD/YYYY')
    : ''
  const institutionName = `${access.institution_name}'s`
  return (
    <Stack p={2} pb={0}>
      <Typography variant="body2" color="grey.600">
        The subscription from <b>{institutionName}</b> expired on{' '}
        <b>{expiryDate}</b>
      </Typography>
    </Stack>
  )
}
export default SubscriptionExpiredSection
