import { Stack, Typography } from '@mui/material'
import PurchaseSubscriptionCard from './PurchaseSubscriptionCard'
import RequestSubscriptionCard from './RequestSubscriptionCard'

const GetSubscriptionSection = () => {
  return (
    <Stack gap={2} p={2}>
      {/* <Typography fontWeight={800} fontFamily={'Manrope'} color="grey.900">
        Subscribe
      </Typography> */}
      <PurchaseSubscriptionCard />
      <RequestSubscriptionCard />
    </Stack>
  )
}
export default GetSubscriptionSection
