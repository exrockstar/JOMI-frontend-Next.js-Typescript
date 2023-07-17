import {
  Alert,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  Link as MuiLink,
  Chip,
  Box
} from '@mui/material'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import { useOrderByIdQuery } from 'graphql/cms-queries/order-list.generated'

import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import OrderForm from './OrderForm'
import Link from 'next/link'
import { OrderPaymentStatus, OrderStatus } from 'graphql/types'
const OrderDetails = () => {
  const router = useRouter()
  const id = router.query.orderId as string
  const { data, loading, error } = useOrderByIdQuery({
    skip: !id,
    variables: {
      order_id: id
    },
    fetchPolicy: 'network-only'
  })

  if (loading || !data) {
    return (
      <Stack
        height="90vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error"> {error.message}</Alert>
  }

  const order = data?.orderById
  const cancelColor = order?.isCanceled ? 'error' : 'success'
  const cancelText = order?.isCanceled ? 'Yes' : 'No'
  const statusColor = () => {
    switch (order.status) {
      case OrderStatus.Active:
        return 'success'
      case OrderStatus.Incomplete:
        return 'warning'
      default:
        return 'error'
    }
  }

  const paymentStatusColor = () => {
    switch (order.payment_status) {
      case OrderPaymentStatus.Succeeded:
        return 'success'
      case OrderPaymentStatus.PaymentFailed:
        return 'error'
      case OrderPaymentStatus.AmountCapturableUpdated:
      case OrderPaymentStatus.Processing:
      case OrderPaymentStatus.Unpaid:
      default:
        return 'warning'
    }
  }
  return (
    <>
      <Typography variant="h4">Order Details </Typography>
      <div>
        <Typography variant="body2" color="text.secondary" component="span">
          Database ID: {id}
        </Typography>
      </div>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction="row"
        flexWrap={'wrap'}
        sx={{ '> div': { minWidth: 250, maxWidth: 400, flexGrow: 1 } }}
      >
        <Box>
          <Typography variant="overline" color="textSecondary">
            Created: {dayjs(order.created).format('MM/DD/YYYY')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="textSecondary">
            Updated: {dayjs(order.updated).format('MM/DD/YYYY')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="textSecondary">
            Created By:{' '}
            <MuiLink
              variant="body2"
              href={`/cms/user/${order.createdBy}`}
              component={Link}
            >
              {order.createdBy}
            </MuiLink>
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="textSecondary">
            Last edited By:{' '}
            <MuiLink
              variant="body2"
              href={`/cms/user/${order.lastEditedBy}`}
              component={Link}
              sx={{ typography: 'secondary' }}
            >
              {order.lastEditedBy}
            </MuiLink>
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        flexWrap={'wrap'}
        sx={{ '> div': { minWidth: 250, maxWidth: 400, flexGrow: 1 } }}
      >
        <Box>
          <Typography
            variant="overline"
            color="textSecondary"
            component="span"
            mr={1}
          >
            Order Status:{' '}
          </Typography>
          <MyChip
            label={order.status ?? 'Unknown'}
            color={statusColor()}
            size="small"
          />
        </Box>
        <Box>
          <Typography
            variant="overline"
            color="textSecondary"
            component="span"
            mr={1}
          >
            Order Type:{' '}
          </Typography>
          <MyChip label={order.type ?? 'Unknown'} size="small" />
        </Box>
        <Box>
          <Typography
            variant="overline"
            color="textSecondary"
            component="span"
            mr={1}
          >
            Payment Status:
          </Typography>
          <MyChip
            label={order.payment_status ?? 'Unknown'}
            color={paymentStatusColor()}
            size="small"
          />
        </Box>
        <Box>
          <Typography
            variant="overline"
            color="textSecondary"
            component="span"
            mr={1}
          >
            Will cancel:{' '}
          </Typography>
          <MyChip label={cancelText} color={cancelColor} size="small" />
        </Box>
      </Stack>
      <Divider sx={{ my: 1 }} />
      {order.deleted && (
        <Alert severity="error">
          Subscription been deleted/canceled on Stripe
        </Alert>
      )}
      <OrderForm order={order} />
    </>
  )
}

export default OrderDetails

const MyChip = styled(Chip)({
  borderRadius: 4,
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: 2
})
