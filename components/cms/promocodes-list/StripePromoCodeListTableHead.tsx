import {
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableSortLabel
} from '@mui/material'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { StripePromoCode } from 'graphql/types'
import { useStripePromoCodesList } from './useStripePromoCodesList'
import { visuallyHidden } from '@mui/utils'
interface HeadCell {
  id: keyof StripePromoCode
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'code',
    label: 'Code',
    sticky: true
  },
  {
    id: 'valid',
    label: 'Valid'
  },
  {
    id: 'active',
    label: 'Active'
  },
  {
    id: 'created',
    label: 'Created At'
  },
  {
    id: 'amount_off',
    label: 'Amount OFF'
  },
  {
    id: 'percent_off',
    label: 'Percent OFF'
  },
  {
    id: 'applies_to',
    label: 'Products Applied To'
  },
  {
    id: 'times_redeemed',
    label: 'Times Redeemed'
  },
  {
    id: 'max_redemptions',
    label: 'Max Redemptions'
  },
  {
    id: 'redeem_by',
    label: 'Redeem By'
  },
  {
    id: 'duration',
    label: 'Duration'
  }
]

const StripePromoCodeListTableHeader = () => {
  const { sortBy, sortOrder, setSort } = useStripePromoCodesList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
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
export default StripePromoCodeListTableHeader
