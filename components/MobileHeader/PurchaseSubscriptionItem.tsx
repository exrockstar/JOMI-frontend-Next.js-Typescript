import { SubscriptionsOutlined } from '@mui/icons-material'
import { ListItemIcon, Typography } from '@mui/material'
import { analytics } from 'apis/analytics'
import { CTAMenuItem } from 'components/common/CTAButton'
import Link from 'next/link'

type Props = {
  noIcon?: boolean
}
const PurchaseSubscriptionItem = ({ noIcon }: Props) => {
  return (
    <Link href="/account/subscription" passHref legacyBehavior>
      <CTAMenuItem
        title="View Individual Pricing"
        data-event={`Mobile Menu - Individual Subscriptions`}
        onClick={analytics.trackClick}
      >
        {!noIcon && (
          <ListItemIcon data-event={`Mobile Menu - Individual Subscriptions`}>
            <SubscriptionsOutlined />
          </ListItemIcon>
        )}
        <Typography
          fontSize={15}
          data-event={`Mobile Menu - Individual Subscriptions`}
        >
          Purchase Subscription
        </Typography>
      </CTAMenuItem>
    </Link>
  )
}
export default PurchaseSubscriptionItem
