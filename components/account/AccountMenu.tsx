import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { analytics } from 'apis/analytics'

export default function AccountMenu() {
  return (
    <Stack bgcolor="white">
      <Box>
        <SettingsText>Settings</SettingsText>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/profile" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar  - Profile"
            onClick={analytics.trackClick}
          >
            Profile
          </ListButton>
        </Link>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/general" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar - Account"
            onClick={analytics.trackClick}
          >
            Account
          </ListButton>
        </Link>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/newsletter" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar - Email Updates"
            onClick={analytics.trackClick}
          >
            Email Updates
          </ListButton>
        </Link>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/subscription" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar - Subscription"
            onClick={analytics.trackClick}
          >
            Subscription
          </ListButton>
        </Link>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/request-subscription" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar - Request Subscription"
            onClick={analytics.trackClick}
          >
            Request Subscription
          </ListButton>
        </Link>
      </Box>
      <ListDivider />
      <Box>
        <Link href="/account/feedback" passHref legacyBehavior>
          <ListButton
            variant="text"
            fullWidth
            data-event="Account Menu Sidebar - Feedback"
            onClick={analytics.trackClick}
          >
            Feedback
          </ListButton>
        </Link>
      </Box>
    </Stack>
  )
}

const ListDivider = styled(Divider)(({ theme }) => ({
  color: theme.palette.grey[200]
}))

const SettingsText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  padding: '8px',
  fontWeight: '200px'
}))

const ListButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  textTransform: 'capitalize',
  fontSize: '15px',
  color: theme.palette.linkblue.main,
  paddingLeft: '16px',
  borderRadius: 0
}))
