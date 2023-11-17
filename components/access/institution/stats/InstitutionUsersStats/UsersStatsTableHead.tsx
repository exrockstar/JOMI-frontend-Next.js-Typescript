import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { User } from 'graphql/types'
import { visuallyHidden } from '@mui/utils'
import React from 'react'
import { useRouter } from 'next/router'
import { StickyTableCell } from 'components/common/StickyTableCell'

interface HeadCell {
  id: keyof User | `subscription.${keyof User['subscription']}` | 'details'
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    label: 'Name\n & Email(s)',
    sticky: true
  },
  {
    id: 'details',
    label: 'Details'
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
    id: 'articleCount',
    label: 'Uses'
  },
  {
    id: 'loginCount',
    label: 'Logins'
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
    id: 'institution_name',
    label: 'Stated Institution'
  },
  {
    id: 'matched_institution_name',
    label: 'Matched Institution'
  },
  {
    id: 'matchedBy',
    label: 'Matched By'
  },
  {
    id: 'subscription.lastSubType',
    label: 'Access'
  }
]

const UserStatsTableHead = () => {
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? '-1'
  const sort_order = parseInt(sort_order_str)
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      router.push({
        query: {
          ...router.query,
          sort_by: property,
          sort_order: -sort_order
        }
      })
    }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const order = sort_order >= 1 ? 'asc' : 'desc'

          const content = (
            <TableCell
              key={headCell.id}
              sortDirection={sort_by === headCell.id ? order : false}
              component={headCell.sticky ? 'div' : 'th'}
            >
              <TableSortLabel
                active={sort_by === headCell.id}
                direction={sort_by === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sort_by === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )

          return headCell.sticky ? (
            <StickyTableCell
              key={headCell.id}
              component="th"
              sx={{ p: 0, maxWidth: 150 }}
              backgroundColor={'#efefef'}
            >
              {content}
            </StickyTableCell>
          ) : (
            content
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default UserStatsTableHead
