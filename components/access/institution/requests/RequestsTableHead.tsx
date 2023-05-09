import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { TriageRequestByUser } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { visuallyHidden } from '@mui/utils'
interface HeadCell {
  id: keyof TriageRequestByUser
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'requestCount',
    label: 'Requests'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'display_name',
    label: 'Display Name'
  },
  {
    id: 'user_type',
    label: 'User type'
  },
  {
    id: 'specialty',
    label: 'Specialty'
  },
  {
    id: 'last_request_date',
    label: 'Last request date'
  },
  {
    id: 'last_visited',
    label: 'Last visited'
  },
  {
    id: 'registered',
    label: 'Registered'
  },
  {
    id: 'loginCount',
    label: 'Login Count'
  },
  {
    id: 'articleCount',
    label: 'Uses'
  }
]

const RequestsTableHead = () => {
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'last_request_date'
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
        <TableCell></TableCell>
        {headCells.map((headCell) => {
          const order = sort_order >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
              key={headCell.id}
              sortDirection={sort_by === headCell.id ? order : false}
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
        })}
      </TableRow>
    </TableHead>
  )
}

export default RequestsTableHead
