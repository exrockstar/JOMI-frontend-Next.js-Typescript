import { RotateLeftOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { UserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { useForgotPasswordMutation } from 'graphql/mutations/forgot-password.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

type Props = {
  email: string
}
const ResetPassword = ({ email }: Props) => {
  const [showConfirmPasswordDialog, setShowConfirmPasswordDialog] =
    useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [sendForgotPassword, { loading: sendingResetPassword }] =
    useForgotPasswordMutation({
      onCompleted(result) {
        enqueueSnackbar(`Successfully sent reset password to ${email}`, {
          variant: 'success'
        })
        setShowConfirmPasswordDialog(false)
      },
      onError(error) {
        enqueueSnackbar(`Failed to send email:${error.message}`, {
          variant: 'error'
        })
        setShowConfirmPasswordDialog(false)
      }
    })

  return (
    <div>
      <ConfirmationDialog
        onComplete={() => {
          sendForgotPassword({
            variables: { email }
          })
        }}
        onCancel={() => {
          setShowConfirmPasswordDialog(false)
        }}
        dialogTitle={'Confirmation'}
        open={showConfirmPasswordDialog}
        loading={sendingResetPassword}
      >
        <Typography>{`Are you sure you'd like to send this?`}</Typography>
      </ConfirmationDialog>
      <Button
        startIcon={<RotateLeftOutlined />}
        size="large"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          setShowConfirmPasswordDialog(true)
        }}
      >
        Send Password Reset
      </Button>
    </div>
  )
}

export default ResetPassword
