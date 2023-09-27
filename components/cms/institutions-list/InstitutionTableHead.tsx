import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Tooltip
} from '@mui/material'
import { Institution } from 'graphql/types'
import React from 'react'
import { useInstitutionList } from './useInstitutionList'
import { visuallyHidden } from '@mui/utils'
import { InfoOutlined } from '@mui/icons-material'
import StickyTableHeadCell from 'components/common/TableHeader/StickyTableHeadCell'

interface HeadCell {
  id:
    | keyof Institution
    | `subscription.${keyof Institution['subscription']}`
    | `stats.${keyof Institution['stats']}`
  label: string
  title?: string // description,
  sticky?: boolean
  minWidth?: number
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Institution Name',
    sticky: true,
    minWidth: 200
  },
  {
    id: 'category',
    label: 'Category'
  },
  {
    id: 'stats.userCount',
    label: 'Users',
    title: 'Number of registered users'
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
    id: 'stats.videoBlocks',
    label: 'Video Blocks',
    title: 'Total video block events for this institution'
  },
  {
    id: 'stats.uniqueVideoBlocks',
    label: 'Unique Video Blocks',
    title: 'Number of users that experienced a video block at least once'
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

  const stickyHeaders = headCells.filter((x) => !!x.sticky)
  const nonStickyHeaders = headCells.filter((x) => !x.sticky)
  return (
    <TableHead>
      <TableRow>
        {stickyHeaders.map(({ id, ...restProps }) => {
          const _id = id as string
          return (
            <StickyTableHeadCell
              {...restProps}
              key={_id}
              id={id}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onClick={createSortHandler(id)}
            />
          )
        })}
        {nonStickyHeaders.map((headCell) => {
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
                {headCell.title && (
                  <Tooltip title={headCell.title} sx={{ mr: 2 }}>
                    <InfoOutlined color="info" />
                  </Tooltip>
                )}
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
