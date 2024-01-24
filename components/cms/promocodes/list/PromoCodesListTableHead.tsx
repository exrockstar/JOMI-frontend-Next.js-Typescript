import { Institution, User, PromoCode } from 'graphql/types'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { usePromoCodesList } from './usePromoCodesList'

interface HeadCell {
  id:
    | keyof PromoCode
    | `user.${keyof User}`
    | `_institution.${keyof Institution}`
  sticky?: boolean
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: '_id',
    sticky: true,
    label: 'ID(Code)'
  },
  {
    id: 'numberUnused',
    label: 'Multi Codes'
  },
  {
    id: 'title',
    label: 'Title'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'interval',
    label: 'Interval'
  },
  {
    id: 'type',
    label: 'Type'
  },
  {
    id: 'created',
    label: 'Created'
  },
  {
    id: 'expiration',
    label: 'Expiration'
  }
]

const PromoCodesListTableHead = () => {
  const { sortBy, sortOrder, setSort } = usePromoCodesList()
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
              key={headCell.id}
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
export default PromoCodesListTableHead
