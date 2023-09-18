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
  const institution_name =
    access?.customInstitutionName ?? access?.institution_name
  return (
    <Stack p={2} pb={0}>
      <Typography variant="body2" color="grey.600">
        The subscription from <b>{institution_name}</b> expired on{' '}
        <b>{expiryDate}</b>
      </Typography>
    </Stack>
  )
}
export default SubscriptionExpiredSection
