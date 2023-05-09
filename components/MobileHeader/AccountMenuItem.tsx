import {
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography
} from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

import MobileMenuItem, { MobileMenuItemProps } from './MobileMenuItem'
import Link from 'next/link'
import {
  ExitToAppOutlined,
  FeedbackOutlined,
  SettingsOutlined,
  SubscriptionsOutlined
} from '@mui/icons-material'
import MobileAccessStatus from './AccessStatus'
import { useApolloClient } from '@apollo/client'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { analytics } from 'apis/analytics'
import { UserRoles } from 'graphql/types'
import { CTAMenuItem } from 'components/common/CTAButton'
import PurchaseSubscriptionItem from './PurchaseSubscriptionItem'

const AccountMenuItem = (props: MobileMenuItemProps) => {
  const { data: session } = useSession()
  const client = useApolloClient()

  const { data, refetch } = useUserProfileQuery({
    skip: !session?.user
  })

  useEffect(() => {
    if (session?.user?.email !== data?.user?.email) {
      refetch()
    }
  }, [session?.user, refetch, data?.user])

  function getDisplayName(user: typeof data['user']) {
    if (!user) return 'N/A'

    if (user.display_name) return user.display_name

    const fullName = `${user.name.first} ${user.name.last}`.trim()
    if (fullName) return fullName

    return 'N/A'
  }

  const user = data?.user
  const name = getDisplayName(user)
  const geoLocation = data?.geolocation
  const showSubscriptionLink =
    geoLocation?.countryCode !== 'IN' &&
    !user?.subActive &&
    user?.role !== UserRoles.Admin

  return (
    <MobileMenuItem {...props} label={'Account'}>
      <List disablePadding>
        <ListItemButton sx={{ pointerEvents: 'none', pl: 2 }} divider>
          <Stack alignItems="flex-start" pr={5} pb={0.5}>
            <Typography>{name}</Typography>
            <Typography variant="body2" fontWeight={500}>
              {user?.email || 'Email not found'}
            </Typography>
          </Stack>
        </ListItemButton>

        {showSubscriptionLink && <PurchaseSubscriptionItem />}

        <MobileAccessStatus
          subActive={user?.subActive}
          userType={user?.user_type}
          role={user?.role}
        />

        <Link href="/account/profile" passHref legacyBehavior>
          <ListItemButton
            title="Click to view account"
            data-event={`Mobile Menu - Account`}
            onClick={analytics.trackClick}
          >
            <ListItemIcon data-event={`Mobile Menu - Account`}>
              <SettingsOutlined />
            </ListItemIcon>
            <Typography data-event={`Mobile Menu - Account`}>
              Account
            </Typography>
          </ListItemButton>
        </Link>

        <ListItemButton
          onClick={async (e) => {
            analytics.trackClick(e)
            await signOut()
            await client.resetStore()
          }}
          title="Click to sign out"
          data-event={`Mobile Menu - Sign out`}
        >
          <ListItemIcon data-event={`Mobile Menu - Sign out`}>
            <ExitToAppOutlined />
          </ListItemIcon>
          <Typography data-event={`Mobile Menu - Sign out`}>
            Sign Out
          </Typography>
        </ListItemButton>

        <Link href="/account/feedback" passHref legacyBehavior>
          <ListItemButton
            title="Click to give feedback"
            divider
            data-event={`Mobile Menu - Feedback`}
            onClick={analytics.trackClick}
          >
            <ListItemIcon data-event={`Mobile Menu - Feedback`}>
              <FeedbackOutlined />
            </ListItemIcon>
            <Typography
              variant="body1"
              fontSize={15}
              data-event={`Mobile Menu - Feedback`}
            >
              Send Feedback
            </Typography>
          </ListItemButton>
        </Link>
      </List>
    </MobileMenuItem>
  )
}

export default AccountMenuItem
