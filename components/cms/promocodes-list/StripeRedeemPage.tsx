import StripeRedeemList from './StripeRedeemList'
import { PromocodeRedeemListProvider } from './useCodeRedeemList'

const StripeRedeemPage = () => {
  return (
    <PromocodeRedeemListProvider>
      <StripeRedeemList />
    </PromocodeRedeemListProvider>
  )
}
export default StripeRedeemPage
