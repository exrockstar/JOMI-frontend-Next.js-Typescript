import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { Institution } from 'graphql/types'
import React from 'react'
import { useInstitutionList } from './useInstitutionList'
import { visuallyHidden } from '@mui/utils'

interface HeadCell {
  id:
    | keyof Institution
    | `subscription.${keyof Institution['subscription']}`
    | `stats.${keyof Institution['stats']}`
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'category',
    label: 'Category'
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
    id: 'total_requests',
    label: 'Total Requesting Users'
  },
  {
    id: 'created',
    label: 'Date Created'
  },
  {
    id: 'subscription.status',
    label: 'Order Status'
  },
  {
    id: 'expiry_date_cached',
    label: 'Expiry'
  }
]

const InstitutionTableHead = () => {
  const { sortBy, sortOrder, setSort } = useInstitutionList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      // setSortBy(property)
      // setSortOrder(-sortOrder)
      setSort(property, -sortOrder)
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
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default InstitutionTableHead
