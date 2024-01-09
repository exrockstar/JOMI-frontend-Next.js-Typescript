import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Link,
  Box,
  TablePagination,
  Typography,
  Stack
} from '@mui/material'
import OrdersListTableHead from './OrdersListTableHead'
import { useOrdersList } from './useOrdersList'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import OrdersListPagination from './OrdersListPagination'
import { StickyTableCell } from 'components/common/StickyTableCell'

const OrdersList = () => {
  const { orders } = useOrdersList()
  const dateFormat = 'MM/DD/YYYY HH:mm A'

  const NotApplicable = (
    <Typography color="text.secondary" variant="body2">
      N/A
    </Typography>
  )
  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <OrdersListPagination />
        <Table>
          <OrdersListTableHead />
          <TableBody>
            {orders?.map((order, index) => {
              const isEven = index % 2 === 0
              const orderer = order.institutionObject?.name || order.user?.display_name
              return (
                <StyledTableRow key={order._id}>
                  <StickyTableCell
                    sx={{
                      p: 0,

                      backgroundColor: isEven ? '#fafafa' : 'white'
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRightColor: 'grey.100',
                        borderRightWidth: 2,
                        borderRightStyle: 'solid',
                        width: 250,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={order._id}
                    >
                      <Link
                        href={`/cms/orders/${order._id}`}
                        component={NextLink}
                      >
                        {orderer}
                      </Link>
                    </Box>
                  </StickyTableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell sx={{ minWidth: 180, color: 'text.secondary' }}>
                    {dayjs(order.created).format(dateFormat)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 180, color: 'text.secondary' }}>
                    {order.start
                      ? dayjs(order.start).format(dateFormat)
                      : NotApplicable}
                  </TableCell>
                  <TableCell sx={{ minWidth: 180, color: 'text.secondary' }}>
                    {order.end
                      ? dayjs(order.end).format(dateFormat)
                      : NotApplicable}
                  </TableCell>
                  <TableCell>{order.renewals}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={order?.institutionObject?.name}
                  >
                    {order.institutionObject ? (
                      <Link
                        href={`/cms/institutions-list/${order.institutionObject._id}`}
                        component={NextLink}
                      >
                        {order?.institutionObject?.name}
                      </Link>
                    ) : order.institution ? (
                      <Typography variant="body2" color="text.secondary">
                        {order.institution}
                      </Typography>
                    ) : (
                      NotApplicable
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      minWidth: 200
                    }}
                    title={order.customInstitutionName}
                  >
                    {order.customInstitutionName}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      minWidth: 200
                    }}
                    title={order.user?.email}
                  >
                    {order.user ? (
                      <Link
                        href={`/cms/user/${order.user?._id}`}
                        component={NextLink}
                      >
                        {order.user?.email}
                      </Link>
                    ) : (
                      NotApplicable
                    )}
                  </TableCell>
                  <TableCell title={order.user?.user_type}>
                    {order.user?.user_type ?? ''}
                  </TableCell>
                  <TableCell title={order.user?.specialty}>
                    {order.user?.specialty ?? ''}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      maxWidth: 200
                    }}
                  >
                    {order.promoCode ?? NotApplicable}
                  </TableCell>

                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={order.description}
                  >
                    {order.description ?? NotApplicable}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={order.notes}
                  >
                    {order.notes ?? NotApplicable}
                  </TableCell>
                  <TableCell>{order.require_login}</TableCell>
                  <TableCell>{order.payment_status}</TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <OrdersListPagination />
      </TableContainer>
    </Card>
  )
}
export default OrdersList
