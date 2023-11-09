import { Stack } from '@mui/material'
import PurchaseSubscriptionCard from './PurchaseSubscriptionCard'
import RequestSubscriptionCard from './RequestSubscriptionCard'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
type Props = {
  data: ArticleAccessQuery
}
const GetSubscriptionSection = ({ data }: Props) => {
  return (
    <Stack gap={2} p={2}>
      <PurchaseSubscriptionCard data={data} />
      {
        data.getIsRequestInstSubButtonPaperOn && 
          <RequestSubscriptionCard />
      }
    </Stack>
  )
}
export default GetSubscriptionSection
