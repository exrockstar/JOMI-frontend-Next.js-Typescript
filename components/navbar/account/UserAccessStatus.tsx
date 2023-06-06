import { InfoOutlined } from '@mui/icons-material'
import { MenuItem, ListItemIcon, ListItem } from '@mui/material'
import React, { useMemo } from 'react'

import Link from 'next/link'
import { SubType, UserRoles } from 'graphql/types'

type Props = {
  subType: SubType
  userType: string
  role: UserRoles
}
const UserAccessStatus: React.FC<Props> = ({ subType, userType, role }) => {
  const subActive = [SubType.Individual, SubType.Institution].includes(subType)
  const linkEnabled =
    role === UserRoles.Admin || role === UserRoles.Librarian || subActive

  const text = useMemo(() => {
    if (role === UserRoles.Admin) return 'Admin'
    if (role === UserRoles.Librarian) return 'Librarian'
    if (subActive) {
      return 'Subscribed'
    }
    if (subType === SubType.Trial) {
      return 'Trial'
    }
    if (userType === 'Patient') return 'Patient'

    return 'Evaluation'
  }, [role, subActive, subType, userType])

  const backgroundColor = useMemo(() => {
    switch (text) {
      case 'Admin':
      case 'Librarian':
      case 'Trial':
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
  const item = (
    <MenuItem
      component={linkEnabled ? 'a' : ListItem}
      sx={{
        backgroundColor,
        ':hover': { backgroundColor },
        pointerEvents: !linkEnabled ? 'none' : 'all'
      }}
      divider
    >
      <ListItemIcon>
        <InfoOutlined />
      </ListItemIcon>
      {text}
    </MenuItem>
  )

  return url ? (
    <Link href={url} passHref legacyBehavior>
      {item}
    </Link>
  ) : (
    item
  )
}

export default UserAccessStatus
