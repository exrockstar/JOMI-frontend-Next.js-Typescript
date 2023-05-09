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
import { useRouter } from 'next/router'

type Columns = keyof Access
interface HeadCell {
  id: string
  label: string
  not_sortable?: boolean
  sx?: SxProps<any>
}

const headCells: readonly HeadCell[] = [
  {
    id: 'created',
    label: 'Date'
  },
  {
    id: 'activity',
    label: 'Activity type'
  },
  {
    id: 'user.email',
    label: 'email'
  },
  {
    id: 'user.display_name',
    label: 'Display name'
  },
  {
    id: 'ip_address',
    label: 'IP Address'
  }
]

const ArticleActivityTableHead = () => {
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
    <>
      <colgroup>
        {headCells.map((i) => (
          <col key={i.id} style={{ width: '20%' }}></col>
        ))}
      </colgroup>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            const order = sort_order >= 1 ? 'asc' : 'desc'
            const sortable = !headCell.not_sortable
            return (
              <TableCell
                key={headCell.id}
                sortDirection={sort_by === headCell.id ? order : false}
                sx={headCell.sx}
              >
                <TableSortLabel
                  active={sort_by === headCell.id}
                  direction={sort_by === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  style={{
                    pointerEvents: sortable ? 'auto' : 'none'
                  }}
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
    </>
  )
}

export default ArticleActivityTableHead
