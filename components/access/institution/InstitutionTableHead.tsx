import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { Institution } from 'graphql/types'
import { visuallyHidden } from '@mui/utils'
import React from 'react'
import { useInstitutionAccessList } from './useInstitutionAccessList'

interface HeadCell {
  id:
    | keyof Institution
    | `stats.${keyof Institution['stats']}`
    | `subscription.${keyof Institution['subscription']}`
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'stats.userCount',
    label: 'Users'
  },
  {
    id: 'stats.totalArticleCount',
    label: 'Accesses'
  },

  {
    id: 'pending_requests',
    label: 'Pending Requests'
  },
  {
    id: 'sent_requests',
    label: 'Sent Requests'
  },
  {
    id: 'created',
    label: 'Date Created'
  },
  {
    id: 'subscription.status',
    label: 'Order Status'
  }
]

const InstitutionTableHead = () => {
  const { sortBy, sortOrder, setSort } = useInstitutionAccessList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
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
        <TableCell>Traffic Over Time (Past 2 Years)</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default InstitutionTableHead
