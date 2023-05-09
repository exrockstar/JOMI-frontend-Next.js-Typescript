import { Close, Send } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { analytics } from 'apis/analytics'
import SubmitButton from 'components/account/SubmitButton'
import { BlueLink } from 'components/common/BlueLink'
import { useSendInstitutionEmailConfirmationMutation } from 'graphql/mutations/inst-email-confirm.generated'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { CustomDialogTitle } from './common.styles'

type Props = {
  institutionName: string
  email: string
} & DialogProps

const EmailVerificationNotice = ({
  institutionName,
  email,
  ...props
}: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  const [sendConfirmEmail, { loading: resendLoading }] =
    useSendInstitutionEmailConfirmationMutation({
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  return (
    <Dialog {...props}>
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          backgroundColor: 'rgb(217, 242, 217)',
          marginBottom: 1,
          position: 'relative'
        }}
      >
        <CustomDialogTitle sx={{ color: 'success.main' }}>
          Email Confirmation required
        </CustomDialogTitle>
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={(e) => {
            props.onClose(e, 'backdropClick')
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 480 }}>
        <Typography my={2} align="center">
          Your institution <strong>{institutionName}</strong> is currently
          subscribed.
        </Typography>
        <Typography my={2} align="center" variant="body2">
          To continue watching this article, please confirm your email by
          checking your inbox at{' '}
          <Typography variant="body2" fontWeight={700} component="span">
            {email}
          </Typography>{' '}
          and clicking <strong>Confirm Email</strong>
        </Typography>
        <Stack alignItems="center" px={0.5} pt={2} spacing={1}>
          <Typography
            color="textSecondary"
            variant="caption"
          >{`Didn't receive any email?`}</Typography>
          <SubmitButton
            data-event="Matched Institution Modal - Resend Verification"
            onClick={(e) => {
              analytics.trackClick(e)
              sendConfirmEmail({
                variables: { email: email },
                onCompleted() {
                  enqueueSnackbar(
                    `Email sent. Please check your institution email.`,
                    {
                      variant: 'success'
                    }
                  )
                }
              })
            }}
            loading={resendLoading}
            endIcon={<Send />}
          >
            Resend Email
          </SubmitButton>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default EmailVerificationNotice
