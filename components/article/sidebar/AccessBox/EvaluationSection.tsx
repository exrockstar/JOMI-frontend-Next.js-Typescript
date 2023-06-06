import { Box, Stack, Typography } from '@mui/material'
import PurchaseSubscriptionCard from './PurchaseSubscriptionCard'
import RequestSubscriptionCard from './RequestSubscriptionCard'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  data: ArticleAccessQuery
}
const EvaluationSection = ({ data }: Props) => {
  return (
    <>
      <Box p={2}>
        <Typography fontWeight={700}>Tired of the annoying blocks?</Typography>
        <Typography variant="body2" color={'grey.600'}>
          Please request a subscription or consider purchasing an individual
          subscription.
        </Typography>
        <Stack gap={2} mt={2}>
          <PurchaseSubscriptionCard data={data} />
          <RequestSubscriptionCard />
        </Stack>
      </Box>
    </>
  )
}
export default EvaluationSection
