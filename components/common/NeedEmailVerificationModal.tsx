import { Send } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Alert,
  Typography,
  Stack,
  DialogActions,
  Button
} from '@mui/material'
import { analytics } from 'apis/analytics'
import { IS_SERVER } from 'common/constants'
import SubmitButton from 'components/account/SubmitButton'
import { useAppState } from 'components/_appstate/useAppState'
import dayjs from 'dayjs'
import { useSendInstitutionEmailConfirmationMutation } from 'graphql/mutations/inst-email-confirm.generated'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { AccessTypeEnum } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { memo, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'jomi-sent-instemail'
const NeedEmailVerificationModal = () => {
  const { state, toggleVerifyEmailModal, showVerifyEmailModal } = useAppState()
  const { enqueueSnackbar } = useSnackbar()
  const { data: session } = useSession()
  const router = useRouter()
  const { data } = useUserProfileQuery({
    skip: !session?.user
  })

  const setSentEmail = (_id: string) => {
    const ids = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''
    const split_ids = ids.split(',')
    if (!ids.includes(_id)) {
      split_ids.push(_id)
      const stringified = split_ids.join(',')
      localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
    }
  }

  const [sendConfirmEmail, { loading: resendLoading }] =
    useSendInstitutionEmailConfirmationMutation({
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  useEffect(() => {
    if (IS_SERVER) return
    const hasSentEmail = () => {
      const ids = localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''

      const split_ids = ids.split(',')
      const userId = data?.user?._id
      if (userId) {
        return split_ids.includes(userId)
      }
      return false
    }

    const isAwaitingEmailConfirmation =
      data?.userAccessType.accessType ===
      AccessTypeEnum.AwaitingEmailConfirmation

    const email = data?.userAccessType.shouldRequestInstVerification
    if (isAwaitingEmailConfirmation) {
      showVerifyEmailModal()
      const sent = hasSentEmail()
      const isAfterV6 = dayjs(data?.user.created).isAfter('4/13/2022')

      if (!sent && !isAfterV6) {
        sendConfirmEmail({
          variables: { email: email },
          onCompleted() {
            setSentEmail(data.user?._id)
          }
        })
      }
    }
  }, [data?.userAccessType.shouldRequestInstVerification, data?.user?._id])

  const path = router.asPath
  const excludedUrls = [
    '/password-protect',
    '/login',
    '/signup',
    '/account/confirm-email',
    '/account/inst-confirm-email',
    '/account/reset-password',
    '/account/signup-success'
  ]

  const notExcludedPath = excludedUrls.every(
    (excluded) => !path.startsWith(excluded)
  )

  if (!data?.user) return null
  const recepientEmail = data.userAccessType.shouldRequestInstVerification
  const institution = data.userAccessType.institution_name
  return (
    <Dialog
      open={state.verifyEmailModal && notExcludedPath}
      onClose={toggleVerifyEmailModal}
      maxWidth="sm"
    >
      <DialogTitle>Hello🎉</DialogTitle>
      <Divider />
      <DialogContent>
        <Alert color="success">
          {`We've connected you to the institution `}
          <strong>{institution}</strong> registered to our system
        </Alert>
        <Typography p={0.5} my={2} variant="body2">
          Due to the recent update on our system, please confirm your
          affiliation to {institution} by confirming the email sent to
          <Typography component="span" variant="body2" fontWeight={700}>
            {' '}
            {recepientEmail}
          </Typography>{' '}
          to be able to get full institutional access.
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
                variables: { email: recepientEmail },
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
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button
          sx={{ borderRadius: 1, fontWeight: 700 }}
          color="neutral"
          onClick={(e) => {
            toggleVerifyEmailModal()
            analytics.trackClick(e)
          }}
          variant="text"
          data-event="Matched Institution Modal - Close"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(NeedEmailVerificationModal)
