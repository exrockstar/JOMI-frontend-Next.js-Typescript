import {
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableSortLabel
} from '@mui/material'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { Payment } from 'graphql/types'

import { visuallyHidden } from '@mui/utils'
import { useCodeRedeemList } from './useCodeRedeemList'
interface HeadCell {
  id: keyof Payment
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'userId',
    label: 'User Email',
    sticky: true
  },
  {
    id: '_id',
    label: 'Description'
  },
  {
    id: 'amount',
    label: 'Amount'
  },
  {
    id: 'orderId',
    label: 'Order ID'
  },
  {
    id: 'invoiceId',
    label: 'Invoice ID'
  },
  {
    id: 'created',
    label: 'Created'
  }
]

const StripeRedeemListTableHead = () => {
  const { sortBy, sortOrder, setSort } = useCodeRedeemList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
  }

  const stickyCells = headCells.filter((h) => !!h.sticky)
  const regularCells = headCells.filter((h) => !h.sticky)

  return (
    <TableHead>
      <TableRow>
        <StickyTableCell sx={{ p: 0 }}>
          <Box bgcolor={'#efefef'}>
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
