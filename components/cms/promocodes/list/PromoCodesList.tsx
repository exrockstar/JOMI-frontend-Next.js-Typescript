import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Link,
  Chip
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { usePromoCodesList } from './usePromoCodesList'
import PromoCodesListPagination from './PromoCodesListPagination'
import PromoCodesListTableHead from './PromoCodesListTableHead'
const PromoCodesList = () => {
  const { promocodes } = usePromoCodesList()
  const dateFormat = 'YYYY-MM-DD'

  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <PromoCodesListPagination />
        <Table>
          <PromoCodesListTableHead />
          <TableBody>
            {promocodes?.map((promocode, index) => {
              const isEven = index % 2 === 0
              const totalCodesLength =
                promocode.bulkUsedCodes.length +
                promocode.bulkUnusedCodes.length
              return (
                <StyledTableRow key={promocode._id}>
                  <StickyTableCell
                    sx={{
                      backgroundColor: isEven ? '#fafafa' : 'white'
                    }}
                  >
                    <Link
                      href={
                        promocode.isSubscription
                          ? `/cms/promocodes-list/subscription/${promocode._id}`
                          : `/cms/promocodes-list/timed/${promocode._id}`
                      }
                      component={NextLink}
                    >
                      {promocode._id}
                    </Link>
                  </StickyTableCell>
                  <TableCell>
                    {promocode.bulkUsedCodes.length + '/' + totalCodesLength}
                  </TableCell>
                  <TableCell>{promocode.title}</TableCell>
                  <TableCell>{promocode.price || 'N/A'}</TableCell>
                  <TableCell>
                    {promocode.days
                      ? promocode.days + ' days'
                      : promocode.interval}
                  </TableCell>
                  <TableCell>{promocode.type}</TableCell>
                  <TableCell>
                    {dayjs(promocode.created).format(dateFormat)}
                  </TableCell>
                  <TableCell>
                    {dayjs(promocode.expiration).format(dateFormat)}
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <PromoCodesListPagination />
      </TableContainer>
    </Card>
  )
}
export default PromoCodesList
