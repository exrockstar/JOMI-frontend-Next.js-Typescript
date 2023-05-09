import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { Access } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { visuallyHidden } from '@mui/utils'
interface HeadCell {
  id: keyof Access
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'created',
    label: 'Date'
  },
  {
    id: 'activity',
    label: 'Activity Type'
  }
]

const UserActivityTableHead = () => {
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
        <TableCell> Article / IP Address</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default UserActivityTableHead
