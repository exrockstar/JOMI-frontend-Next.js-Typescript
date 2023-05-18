import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  TableCellProps,
  SxProps
} from '@mui/material'
import { Access, Institution, User } from 'graphql/types'
import React from 'react'
import { visuallyHidden } from '@mui/utils'
import { useEventsAccessList } from './useEventsAccessList'

type Columns = keyof Access
interface HeadCell {
  id: string
  label: string
  not_sortable?: boolean
  sx?: SxProps<any>
}

const headCells: readonly HeadCell[] = [
  {
    id: 'activity',
    label: 'Activity'
  },
  {
    id: 'user',
    label: 'User ID'
  },
  {
    id: 'ip_address_str',
    label: 'IP Address'
  },
  {
    id: 'user.display_name',
    label: 'Display name',
    not_sortable: true
  },
  {
    id: 'article_publication_id',
    label: 'Publication Id'
  },
  {
    id: 'article_title',
    label: 'Article Title',
    sx: {
      maxWidth: 200
    }
  },
  {
    id: 'institution_name',
    label: 'Institution name',
    not_sortable: true
  },
  {
    id: 'country_code',
    label: 'Country Code',
    not_sortable: true
  },
  {
    id: 'created',
    label: 'Date Created'
  },
  {
    id: 'referredFrom',
    label: 'Referrer'
  },
  {
    id: 'referrerPath',
    label: 'Referrer Path'
  }
]

const EventListTableHead = () => {
  const { sortBy, sortOrder, setSort } = useEventsAccessList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          const sortable = !headCell.not_sortable
          return (
            <TableCell
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? order : false}
              sx={headCell.sx}
            >
              <TableSortLabel
                active={sortBy === headCell.id}
                direction={sortBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{
                  pointerEvents: sortable ? 'auto' : 'none'
                }}
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

export default EventListTableHead
