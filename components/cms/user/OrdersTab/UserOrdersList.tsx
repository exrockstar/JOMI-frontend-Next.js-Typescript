import { Edit } from '@mui/icons-material'
import {
  Alert,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useOrdersByUserIdQuery } from 'graphql/cms-queries/order-list.generated'
import React from 'react'
import Link from 'next/link'

type Props = {
  userId: string
}

const UserOrdersList = ({ userId }: Props) => {
  const { data, loading, error } = useOrdersByUserIdQuery({
    variables: {
      user_id: userId
    }
  })

  const orders = data?.ordersByUserId
  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableCell>Edit </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Renewals</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Status</TableCell>
          </TableHead>
          <TableBody>
            {orders?.map((order) => {
              return (
                <StyledTableRow key={order._id}>
                  <TableCell sx={{ maxWidth: 32 }}>
                    <Link
                      href={`/cms/orders/${order._id}`}
                      passHref
                      prefetch={false}
                      legacyBehavior
                    >
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.currency}</TableCell>
                  <TableCell>{order.renewals}</TableCell>
                  <TableCell>
                    {dayjs(order.start).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>{dayjs(order.end).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.payment_status}</TableCell>
                </StyledTableRow>
              )
            })}
            {!orders?.length && (
              <StyledTableRow>
                <TableCell colSpan={10}>
                  User does not have any orders
                </TableCell>
              </StyledTableRow>
            )}

            {loading && (
              <StyledTableRow>
                <TableCell colSpan={10}>
                  <Stack alignItems="center" my={4}>
                    <CircularProgress /> Loading
                  </Stack>
                </TableCell>
              </StyledTableRow>
            )}
            {error && (
              <StyledTableRow>
                <TableCell colSpan={10}>
                  <Alert severity="error">{error.message}</Alert>
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default UserOrdersList
