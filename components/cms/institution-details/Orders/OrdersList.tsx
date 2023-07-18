import { Delete, Add, Edit } from '@mui/icons-material'
import {
  TableContainer,
  Table,
  TableBody,
  Card,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Stack,
  Chip,
  Tooltip
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { InstitutionByIdDocument } from 'graphql/cms-queries/institutions-list.generated'
import {
  LocationPartsFragment,
  LocationPartsFragmentDoc
} from 'graphql/cms-queries/LocationParts.generated'
import { useDeleteOrderMutation } from 'graphql/cms-queries/order-management.generated'
import { Order, OrderType, StatusType } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import OrderDialog from './OrderDialog'
import NextLink from 'next/link'
type Props = {
  orders: Order[]
  locationId: string
  institutionId: string
}

type Mode = 'add' | 'edit'

const OrdersList = ({ orders, locationId, institutionId }: Props) => {
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [mode, setMode] = useState<Mode>('add')
  const [selected, setSelected] = useState<Order>(null)
  const { enqueueSnackbar } = useSnackbar()
  const [deleteOrder, { client, loading: deletingOrder }] =
    useDeleteOrderMutation({
      async onCompleted(result) {
        const order = result.order
        enqueueSnackbar(
          `Successfully deleted order: ${order._id}. Updating subscrbers page...`,
          {
            variant: 'success'
          }
        )
        client.cache.updateFragment(
          {
            fragment: LocationPartsFragmentDoc,
            fragmentName: 'LocationParts',
            id: 'Location:' + locationId
          },
          (data: LocationPartsFragment) => {
            return {
              ...data,
              orders: data.orders.filter((o) => o._id !== order._id)
            }
          }
        )
        try {
          await fetch('/api/revalidate?path=/subscribers')
          enqueueSnackbar(`Successfully updated subscribers page.`, {
            variant: 'success'
          })
        } catch (e) {
          enqueueSnackbar(`Couldn't update subscribers page: ${e.message}`, {
            variant: 'error'
          })
        }

        setConfirmDialogOpen(false)
        setSelected(null)
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        setConfirmDialogOpen(false)
      },
      refetchQueries: [
        { query: InstitutionByIdDocument, variables: { id: institutionId } }
      ]
    })
  const startAddOrder = () => {
    setSelected(null)
    setShowOrderDialog(true)
    setMode('add')
    setDialogTitle('Add Order')
  }
  const startEditOrder = (order: Order) => {
    setSelected(order)
    setShowOrderDialog(true)
    setMode('edit')
    setDialogTitle('Edit Order')
  }

  const startDelete = (order: Order) => {
    setSelected(order)
    setConfirmDialogOpen(true)
  }

  const cancelDelete = () => {
    setConfirmDialogOpen(false)
  }

  const handleDelete = () => {
    deleteOrder({
      variables: {
        id: selected._id
      }
    })
  }

  const orderStatusColor = (order: Order) => {
    const type = order.type
    if (type) {
      switch (type) {
        case OrderType.Standard:
          return 'success'
        case OrderType.Trial:
          return 'warning'
        default:
          return 'default'
      }
    }
  }

  const expiryColor = (expiry_date: string) => {
    const now = dayjs()
    const one_week_later = dayjs().add(7, 'day')
    const expiryingSoon = dayjs(expiry_date).isBefore(one_week_later)
    const expired = dayjs(expiry_date).isBefore(now)

    if (expired) {
      return 'error.main'
    }

    if (expiryingSoon) {
      return 'warning.main'
    }

    return 'text.secondary'
  }

  return (
    <>
      <OrderDialog
        open={showOrderDialog}
        onClose={() => setShowOrderDialog(false)}
        dialogTitle={dialogTitle}
        mode={mode}
        order={selected}
        locationId={locationId}
        institutionId={institutionId}
        key={`order-dialog-${new Date().getTime()}`}
      />
      <ConfirmationDialog
        key={'confirm-order-dialog' + selected?._id}
        open={confirmDialogOpen}
        dialogTitle={'Confirm Delete Order'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={deletingOrder}
      >
        Are you sure you want to delete order:{' '}
        <strong> {selected?._id} </strong>?
      </ConfirmationDialog>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5" my={2}>
          Orders
        </Typography>
        <Button
          startIcon={<Add />}
          variant="outlined"
          size="small"
          onClick={startAddOrder}
        >
          Add Order
        </Button>
      </Stack>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Require Login</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last updated</TableCell>
                <TableCell>Internal Notes</TableCell>
                <TableCell>Restricted User Types</TableCell>
                <TableCell>Restricted Specialties</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => {
                return (
                  <StyledTableRow key={order._id}>
                    <TableCell sx={{ minWidth: 150 }}>{order._id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {order.amount} {order.currency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {order.require_login}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.type}
                        color={orderStatusColor(order)}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(order.start).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color={expiryColor(order.end)}
                        variant="body2"
                      >
                        {dayjs(order.end).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(order.created).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {dayjs(order.updated).format('MM/DD/YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 250 }}>
                      <Tooltip title={order.notes}>
                        <Typography variant="body2" color="text.secondary">
                          {order.notes}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>
                      <Stack spacing={1}>
                        {order.restricted_user_types?.map((item) => {
                          return (
                            <Tooltip title={item} key={item} arrow>
                              <Chip label={item} size="small" />
                            </Tooltip>
                          )
                        })}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>
                      <Stack spacing={1}>
                        {order.restricted_specialties?.map((item) => {
                          return (
                            <Tooltip title={item} key={item} arrow>
                              <Chip label={item} size="small" />
                            </Tooltip>
                          )
                        })}
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 200
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        variant="outlined"
                        href={`/cms/orders/${order._id}`}
                        LinkComponent={NextLink}
                      >
                        Edit Order
                      </Button>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => startDelete(order)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default OrdersList
