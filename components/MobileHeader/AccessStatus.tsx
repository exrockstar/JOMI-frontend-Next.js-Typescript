import { InfoOutlined } from '@mui/icons-material'
import { ListItemIcon, MenuItemProps, ListItemButton } from '@mui/material'
import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { UserRoles } from 'graphql/types'
import { analytics } from 'apis/analytics'

type Props = {
  subActive: boolean
  userType: string
  role: UserRoles
}
const MobileAccessStatus: React.FC<Props> = ({ subActive, userType, role }) => {
  const isAdminOrLibrarian =
    role === UserRoles.Admin || role === UserRoles.Librarian
  const text = useMemo(() => {
    if (role === UserRoles.Admin) return 'Admin'
    if (role === UserRoles.Librarian) return 'Librarian'
    if (subActive) return 'Subscribed'
    if (userType === 'Patient') return 'Patient'

    return 'Evaluation'
  }, [subActive, userType, role])

  const backgroundColor = useMemo(() => {
    switch (text) {
      case 'Admin':
      case 'Librarian':
        return '#fff7006b'
      case 'Subscribed':
        return '#85ff0066'
      case 'Patient':
        return '#ff00002b'
      default:
        return '#0000001f'
    }
  }, [text])

  const url = useMemo(() => {
    switch (text) {
      case 'Admin':
        return '/cms'
      case 'Librarian':
        return '/access'
      case 'Subscribed':
        return '/account/subscription'
      default:
        return null
    }
  }, [text])

  const MenuItem = (
    <StyledMenuItem
      component={url ? 'a' : undefined}
      bgColor={backgroundColor}
      disableLink={!isAdminOrLibrarian}
      divider
      onClick={analytics.trackClick}
      data-event={`Mobile Access Status - ${text}`}
    >
      <ListItemIcon>
        <InfoOutlined />
      </ListItemIcon>
      {text}
    </StyledMenuItem>
  )

  return url ? (
    <Link href={url} passHref legacyBehavior>
      {MenuItem}
    </Link>
  ) : (
    MenuItem
  )
}

export default MobileAccessStatus

const StyledMenuItem = styled(ListItemButton)<
  { bgColor: string; disableLink: boolean; component?: string } & MenuItemProps
>(({ bgColor, disableLink }) => ({
  backgroundColor: bgColor,
  ':hover': {
    backgroundColor: bgColor
  },
  pointerEvents: disableLink ? 'none' : 'all'
}))
