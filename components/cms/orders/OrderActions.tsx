import { Delete, Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography, Button, Tooltip } from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { useFormikContext } from 'formik'
import { useDeleteOrderMutation } from 'graphql/cms-queries/order-management.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

type Props = {
  _id: string
  user_id: string
}
const OrderActions = ({ _id, user_id }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { resetForm } = useFormikContext()
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [deleteOrder, { loading: deleting }] = useDeleteOrderMutation({
    variables: {
      id: _id
    },
    async onCompleted() {
      enqueueSnackbar(`Successfully deleted order ${_id}`, {
        variant: 'success'
      })
      await router.push(`/cms/user/${user_id}/orders`)
      router.reload()
    },
    onError(error) {
      enqueueSnackbar(`Failed to delete order: ${error.message}`, {
        variant: 'error'
      })
    }
  })

  return (
    <Stack spacing={2}>
      <ConfirmationDialog
        key={'confirm-delete-order' + _id}
        open={confirmDialogOpen}
        dialogTitle={'Delete Order Confirmation'}
        onClose={() => setConfirmDialogOpen(false)}
        onComplete={() => deleteOrder()}
        onCancel={() => setConfirmDialogOpen(false)}
        loading={deleting}
      >
        <Typography mb={2}>
          This action is Irreversible. Are you sure you want to delete this
          order?
        </Typography>
      </ConfirmationDialog>
      <Typography variant="h4">Actions</Typography>
      <Tooltip title="Permanently deletes the order from the database and cancels the order on STRIPE if applicable">
        <LoadingButton
          startIcon={<Delete />}
          color="error"
          variant="contained"
          onClick={() => setConfirmDialogOpen(true)}
        >
          Permanently Delete Order
        </LoadingButton>
      </Tooltip>
      <Tooltip title="Resets the form to its initial values">
        <Button
          startIcon={<Refresh />}
          color="secondary"
          variant="outlined"
          onClick={() => resetForm()}
        >
          Reset Form
        </Button>
      </Tooltip>
    </Stack>
  )
}

export default OrderActions
