import { Institution, Order, User } from 'graphql/types'
import { useOrdersList } from './useOrdersList'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { StickyTableCell } from 'components/common/StickyTableCell'

interface HeadCell {
  id: keyof Order | `user.${keyof User}` | `_institution.${keyof Institution}`
  sticky?: boolean
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user.display_name',
    sticky: true,
    label: 'Orderer'
  },
  {
    id: 'status',
    label: 'Order Status'
  },
  {
    id: 'type',
    label: 'Order Type'
  },
  {
    id: 'amount',
    label: 'Amount'
  },
  {
    id: 'created',
    label: 'Created Date'
  },
  {
    id: 'start',
    label: 'Start Date'
  },
  {
    id: 'end',
    label: 'End Date'
  },
  {
    id: 'renewals',
    label: 'Renewals'
  },
  {
    id: '_institution.name',
    label: 'Institution'
  },
  {
    id: 'customInstitutionName',
    label: 'Custom Institution Name'
  },
  {
    id: 'user.email',
    label: 'User Email'
  },
  {
    id: 'user.user_type',
    label: 'User Type'
  },
  {
    id: 'user.specialty',
    label: 'User Specialty'
  },
  {
    id: 'promoCode',
    label: 'Promo Code'
  },
  {
    id: 'description',
    label: 'Description'
  },
  {
    id: 'notes',
    label: 'Internal notes'
  },
  {
    id: 'require_login',
    label: 'Require Login'
  },
  {
    id: 'payment_status',
    label: 'Payment Status'
  }
]

const OrdersListTableHead = () => {
  const { sortBy, sortOrder, setSort } = useOrdersList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      setSort(property, -sortOrder)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          const content = (
            <TableCell
              sortDirection={sortBy === headCell.id ? order : false}
              component={headCell.sticky ? 'div' : 'th'}
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

          return headCell.sticky ? (
            <StickyTableCell
              component="th"
              sx={{ p: 0, maxWidth: 200 }}
              backgroundColor={'#efefef'}
            >
              {content}
            </StickyTableCell>
          ) : (
            content
          )
        })}
      </TableRow>
    </TableHead>
  )
}
export default OrdersListTableHead
