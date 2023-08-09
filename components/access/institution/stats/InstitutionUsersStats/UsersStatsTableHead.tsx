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
  id: keyof User | `subscription.${keyof User['subscription']}`
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    label: 'Email & Name',
    sticky: true
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
    id: 'inst_email',
    label: 'Institutional Email'
  },
  {
    id: 'matchedBy',
    label: 'Matched By'
  },
  {
    id: 'subscription.lastSubType',
    label: 'Access'
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
    id: 'last_visited',
    label: 'Last Visited'
  },
  {
    id: 'created',
    label: 'Registered'
  },
  {
    id: 'loginCount',
    label: 'Logins'
  },
  {
    id: 'articleCount',
    label: 'Uses'
  }
]

const UserStatsTableHead = () => {
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      const order = sort_order >= 1 ? 'desc' : 'asc'
      router.push({
        query: {
          ...router.query,
          sort_by: property,
          sort_order: order
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
        <TableCell key={'details'}>Details</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default UserStatsTableHead
