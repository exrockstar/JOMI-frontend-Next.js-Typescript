import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider
} from '@mui/material'
import React from 'react'

type Props = {
  onComplete(): void
  onCancel(): void
  dialogTitle: string
  loading?: boolean
} & DialogProps

const ConfirmationDialog: React.FC<Props> = ({
  onComplete,
  onCancel,
  dialogTitle = 'Confirm Action',
  children,
  loading,
  ...props
}) => {
  return (
    <Dialog {...props} maxWidth="sm">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onCancel}
          color="error"
          variant="outlined"
          disabled={loading}
        >
          No
        </Button>
        <LoadingButton
          onClick={onComplete}
          color="success"
          variant="contained"
          loading={loading}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
