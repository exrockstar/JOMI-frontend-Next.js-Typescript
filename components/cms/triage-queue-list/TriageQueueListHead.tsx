import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { Institution, InstitutionStats, TriageQueue, User } from 'graphql/types'
import { visuallyHidden } from '@mui/utils'
import React from 'react'
import { useTriageQueueList } from './useTriageQueueList'

interface HeadCell {
  id:
    | keyof TriageQueue
    | `user.${keyof User}`
    | `institution.${keyof Institution}`
    | `institution.stats.${keyof InstitutionStats}`

  label: string
  width?: number
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user',
    label: 'User',
    width: 250
  },
  {
    id: 'user.countryCode',
    label: 'Country'
  },
  {
    id: 'user.regionName',
    label: 'Region'
  },
  {
    id: 'user.institution_name',
    label: 'Stated'
  },
  {
    id: 'institution.name',
    label: 'Matched'
  },
  {
    id: 'institution.category',
    label: '(Inst) Category'
  },
  {
    id: 'institution.stats.userCount',
    label: '(Inst) User count'
  },
  {
    id: 'institution.stats.totalArticleCount',
    label: '(Inst) Article views'
  },
  {
    id: 'institution.stats.loginCount',
    label: '(Inst) Login count'
  },
  {
    id: 'user.user_type',
    label: 'User Type'
  },
  {
    id: 'user.specialty',
    label: 'Specialty'
  },
  {
    id: 'user.subActive',
    label: 'Subscribed'
  },
  {
    id: 'created',
    label: 'Created'
  },
  {
    id: 'sentEmailAt',
    label: 'Sent Email Date'
  },
  {
    id: 'type',
    label: 'Type'
  },
  {
    id: 'priority',
    label: 'Priority'
  },
  {
    id: 'market',
    label: 'Market'
  },
  {
    id: 'notes',
    label: 'Notes'
  }
]
const TriageQueueListHead = () => {
  const { sortBy, sortOrder, setSort } = useTriageQueueList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      setSort(property, -sortOrder)
    }
  return (
    <TableHead>
      <TableRow>
        <TableCell>Actions</TableCell>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? order : false}
              sx={{ width: headCell.width }}
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

export default TriageQueueListHead
