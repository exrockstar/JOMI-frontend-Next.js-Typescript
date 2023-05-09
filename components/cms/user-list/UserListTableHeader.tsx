import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { User } from 'graphql/types'
import React from 'react'
import { visuallyHidden } from '@mui/utils'
import { useUserManagementList } from './useUserManagementList'
import { StickyTableCell } from 'components/common/StickyTableCell'

interface HeadCell {
  id: keyof User
  label: string
  minWidth?: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    label: 'Email & Name'
  },
  {
    id: 'display_name',
    label: 'Display Name'
  },
  {
    id: 'role',
    label: 'Role'
  },
  {
    id: 'user_type',
    label: 'User Type'
  },
  {
    id: 'specialty',
    label: 'Specialty'
  },
  {
    id: 'institution_name',
    label: 'Institution Name'
  },
  {
    id: 'matchStatus',
    label: 'Match Status'
  },
  {
    id: 'last_visited',
    label: 'Last Visited'
  },
  {
    id: 'created',
    label: 'Registered'
  },
  {
    id: 'isSubscribed',
    label: 'Subscribed'
  },
  {
    id: 'promo_code',
    label: 'Promo-Code'
  },
  {
    id: 'loginCount',
    label: 'Logins'
  },
  {
    id: 'articleCount',
    label: 'Views'
  },
  {
    id: 'social',
    label: 'Social Logins'
  },
  {
    id: 'countryCode',
    label: 'Country'
  },
  {
    id: 'regionName',
    label: 'Region'
  },
  {
    id: 'referer',
    label: 'Referrer'
  },
  {
    id: 'referrerPath',
    label: 'Referrer Path'
  },
  {
    id: 'hasRequestedSubscription',
    label: 'Requested Subscription?'
  },
  {
    id: 'requestSubscriptionCount',
    label: 'Request Count'
  }
]

const UserListTableHeader = () => {
  const { sortBy, sortOrder, setSort } = useUserManagementList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      setSort(property, -sortOrder)
    }
  return (
    <TableHead>
      <TableRow>
        <StickyTableCell backgroundColor={'#efefef'}>
          <TableCell component="div" sx={{ pl: 0 }}>
            Actions
          </TableCell>
          {headCells.slice(0, 1).map((headCell) => {
            const order = sortOrder >= 1 ? 'asc' : 'desc'
            return (
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  minWidth: headCell.minWidth
                }}
                key={headCell.id}
                sortDirection={sortBy === headCell.id ? order : false}
                align="left"
                component="div"
              >
                <TableSortLabel
                  active={sortBy === headCell.id}
                  direction={sortBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {sortBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          })}
        </StickyTableCell>
        {headCells.slice(1, headCells.length).map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
              sx={{ whiteSpace: 'nowrap', minWidth: headCell.minWidth }}
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={sortBy === headCell.id}
                direction={sortBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sortBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default UserListTableHeader
