import {
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableSortLabel
} from '@mui/material'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { Order } from 'graphql/types'

import { visuallyHidden } from '@mui/utils'
import { useCodeRedeemList } from './useCodeRedeemList'
interface HeadCell {
  id: keyof Order
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user_id',
    label: 'User Email',
    sticky: true
  },
  {
    id: 'description',
    label: 'Description'
  },
  {
    id: 'amount',
    label: 'Amount'
  },
  {
    id: '_id',
    label: 'Order ID'
  },
  {
    id: 'created',
    label: 'Created'
  }
]

const StripeRedeemListTableHead = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useCodeRedeemList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      setSortBy(property)
      setSortOrder(-sortOrder)
    }

  const stickyCells = headCells.filter((h) => !!h.sticky)
  const regularCells = headCells.filter((h) => !h.sticky)

  return (
    <TableHead>
      <TableRow>
        <StickyTableCell backgroundColor="#efefef" sx={{ p: 0 }}>
          <Box>
            {stickyCells.map((headCell) => {
              const order = sortOrder >= 1 ? 'asc' : 'desc'
              return (
                <TableCell
                  key={headCell.id}
                  sortDirection={sortBy === headCell.id ? order : false}
                  component="div"
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
          </Box>
        </StickyTableCell>
        {regularCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? order : false}
              sx={{ whiteSpace: 'nowrap' }}
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
export default StripeRedeemListTableHead
