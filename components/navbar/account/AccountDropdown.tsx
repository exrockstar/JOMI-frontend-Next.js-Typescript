import { memo, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  Popper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import MenuList from '@mui/material/MenuList'

import {
  ExitToAppOutlined,
  ExpandLess,
  ExpandMore,
  FeedbackOutlined,
  SettingsOutlined,
  SubscriptionsOutlined
} from '@mui/icons-material'

import UserAccessStatus from './UserAccessStatus'

import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { analytics } from 'apis/analytics'
import { NavButton } from '../NavMenu'
import { CTAMenuItem } from 'components/common/CTAButton'
import { UserRoles } from 'graphql/types'
import { useAppState } from 'components/_appstate/useAppState'

function AccountDropdown() {
  const { data: session } = useSession()
  const { setShowFeedbackDialog } = useAppState()
  const { data, refetch, loading, client } = useUserProfileQuery({
    skip: !session?.user
  })
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = (e) => {
    if (e) {
      analytics.trackClick(e)
    }
    setAnchorEl(null)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setAnchorEl(null)
    }
  }

  useEffect(() => {
    if (session?.user?.email !== data?.user?.email) {
      refetch()
    }
  }, [session?.user, refetch, data?.user])

  function getDisplayName(user: (typeof data)['user']) {
    if (!user) return 'N/A'

    if (user.display_name) return user.display_name

    const fullName = `${user.name.first} ${user.name.last}`.trim()
    if (fullName) return fullName

    return 'N/A'
  }

  const user = data?.user
  const geoLocation = data?.geolocation
  const fullName = getDisplayName(user)
  const showSubscriptionLink =
    geoLocation?.countryCode !== 'IN' &&
    !user?.subActive &&
    user?.role !== UserRoles.Admin

  const MenuItems = (
    <MenuList
      autoFocusItem={open}
      id="account-menu"
      aria-labelledby="account-button"
      onKeyDown={handleListKeyDown}
    >
      <MenuItem sx={{ pointerEvents: 'none' }} divider>
        <Stack alignItems="flex-start" pr={5} pb={0.5}>
          <Typography>{fullName}</Typography>
          <Typography variant="caption" fontWeight={500}>
            {user?.email || 'Email not found'}
          </Typography>
        </Stack>
      </MenuItem>

      {showSubscriptionLink && (
        <Link href="/account/subscription" passHref legacyBehavior>
          <CTAMenuItem
            onClick={handleClose}
            title="Purchase subscription"
            data-event="Account Dropdown - View Subscriptions"
          >
            <ListItemIcon data-event="Account Dropdown - View Subscriptions">
              <SubscriptionsOutlined fontSize="small" />
            </ListItemIcon>
            <Typography
              variant="body1"
              data-event="Account Dropdown - View Subscriptions"
            >
              Purchase Subscription
            </Typography>
          </CTAMenuItem>
        </Link>
      )}
      <UserAccessStatus
        subType={user?.subscription?.subType}
        userType={user?.user_type}
        role={user?.role}
      />

      <Link href="/account/profile" passHref legacyBehavior>
        <MenuItem
          onClick={handleClose}
          title="Click to view account"
          data-event="Account Dropdown - Account"
        >
          <ListItemIcon>
            <SettingsOutlined
              fontSize="small"
              data-event="Account Dropdown - Account"
            />
          </ListItemIcon>
          <Typography
            variant="body1"
            fontSize={15}
            data-event="Account Dropdown - Account"
          >
            Account
          </Typography>
        </MenuItem>
      </Link>

      <SignOutMenuItem
        onClick={(e) => {
          signOut()
          handleClose(e)
          client.clearStore()
        }}
        divider
        title="Click to sign out"
        data-event="Account Dropdown - Sign out"
      >
        <ListItemIcon>
          <ExitToAppOutlined
            fontSize="small"
            data-event="Account Dropdown - Sign out"
          />
        </ListItemIcon>
        <Typography
          variant="body1"
          fontSize={15}
          data-event="Account Dropdown - Sign out"
        >
          Sign Out
        </Typography>
      </SignOutMenuItem>

      <FeedBackMenuItem
        onClick={(e) => {
          setShowFeedbackDialog('click-leave-feedback')
        }}
        title="Click to give feedback"
        data-event="Account Dropdown - Feedback"
      >
        <ListItemIcon data-event="Account Dropdown - Feedback">
          <FeedbackOutlined fontSize="small" />
        </ListItemIcon>
        <Typography
          variant="body1"
          fontSize={15}
          data-event="Account Dropdown - Feedback"
        >
          Send Feedback
        </Typography>
      </FeedBackMenuItem>
    </MenuList>
  )

  return (
    <div>
      <NavButton
        id="account-button"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={!open ? <ExpandMore /> : <ExpandLess />}
        sx={{
          color: open ? 'grey.50' : undefined,
          transform: 'translate3D(11px,0,0)'
        }}
        size="large"
      >
        {loading ? 'Loading...' : fullName}
      </NavButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        style={{ zIndex: 4000 }}
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top'
            }}
          >
            <Paper
              sx={{
                py: 1,
                borderRadius: 2,
                borderTopRightRadius: 0
              }}
              elevation={8}
            >
              <ClickAwayListener onClickAway={handleClose}>
                {MenuItems}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default memo(AccountDropdown)

const SignOutMenuItem = styled(MenuItem)({
  ':hover': {
    backgroundColor: 'red',
    color: 'white',
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  }
})

const FeedBackMenuItem = styled(MenuItem)({
  ':hover': {
    backgroundColor: '#1bf38a',
    color: 'white',
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  }
})
