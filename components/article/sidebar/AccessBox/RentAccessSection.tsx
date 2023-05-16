import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  data: ArticleAccessQuery
}

const RentAccessSection = ({ data }: Props) => {
  const access = data?.article?.articleAccessType
  const expiryDate = access?.subscriptionExpiresAt
    ? dayjs(access.subscriptionExpiresAt).format('MM/DD/YYYY hh:mm:ss A')
    : ''
  return (
    <Box p={2}>
      <Typography color="grey.600" variant="body2">
        Your rent access will expire on {expiryDate}.
      </Typography>
    </Box>
  )
}
export default RentAccessSection
