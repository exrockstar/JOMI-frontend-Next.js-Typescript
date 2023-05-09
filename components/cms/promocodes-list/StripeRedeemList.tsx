import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableCell,
  Typography,
  Box,
  Tooltip,
  Chip,
  Button,
  Link
} from '@mui/material'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { PromoCodeDuration } from 'graphql/types'
import StripePromoCodeListTableHeader from './StripePromoCodeListTableHead'
import NextLink from 'next/link'
import { useCodeRedeemList } from './useCodeRedeemList'
import StripeRedeemListTableHead from './StripeRedeemListTableHead'

const StripeRedeemList: React.FC<{}> = () => {
  const { page, setPage, pageSize, setPageSize, totalCount, orders } =
    useCodeRedeemList()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const getFormattedDate = (date?: string) => {
    console.log(date)
    return date ? dayjs(date).format('MM/DD/YYYY HH:mm A') : 'N/A'
  }
  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Box position="sticky" left={0}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Box>
        <Table size="small">
          <StripeRedeemListTableHead />
          <TableBody>
            {orders?.map((order, i) => {
              const stickyTableCellColor = i % 2 !== 0 ? 'white' : '#fafafa'

              return (
                <StyledTableRow key={order._id}>
                  <StickyTableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      ':hover': { cursor: 'pointer' }
                    }}
                    backgroundColor={stickyTableCellColor}
                  >
                    <Link href={`/cms/user/${order.user_id}`}>
                      {order.user?.email}
                    </Link>
                  </StickyTableCell>

                  <TableCell>{order.description ?? 'No description'}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/cms/orders/${order._id}`}
                      component={NextLink}
                    >
                      {order._id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {dayjs(order.created).format('MM/DD/YYYY HH:mm:ss A')}
                  </TableCell>
                </StyledTableRow>
              )
            })}
            {!orders?.length && (
              <StyledTableRow>
                <TableCell colSpan={5}>
                  No Redemptions for this promo code
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <Box position="sticky" left={0}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Box>
      </TableContainer>
    </Card>
  )
}

export default StripeRedeemList
