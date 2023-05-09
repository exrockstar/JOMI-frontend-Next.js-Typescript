import { Close } from '@mui/icons-material'
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton
} from '@mui/material'
import { analytics } from 'apis/analytics'
import { useAppState } from 'components/_appstate/useAppState'
import { useSendInstitutionEmailConfirmationMutation } from 'graphql/mutations/inst-email-confirm.generated'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'

const MatchedInstitutionModal = () => {
  const { state, toggleMatchedInstModal } = useAppState()
  const { enqueueSnackbar } = useSnackbar()
  const { data: session } = useSession()
  const { data } = useUserProfileQuery({
    skip: !session?.user
  })

  const [sendConfirmEmail, { loading: resendLoading }] =
    useSendInstitutionEmailConfirmationMutation({
      onCompleted() {
        enqueueSnackbar(`Email sent. Please check your institution email.`, {
          variant: 'success'
        })
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  if (!data?.user) return null
  return (
    <Dialog
      open={state.matchedInstitutionModalShown}
      onClose={toggleMatchedInstModal}
      maxWidth="sm"
    >
      <DialogTitle>Congratulations!🎉</DialogTitle>
      <Divider />
      <DialogContent>
        <Alert color="success">
          {`We've`} connected you to the institution{' '}
          <strong>{data?.userAccessType?.institution_name}</strong> registered
          to our system
        </Alert>
      </DialogContent>
      <IconButton
        onClick={(e) => {
          toggleMatchedInstModal()
          analytics.trackClick(e)
        }}
        data-event="Matched Institution Modal - Close"
        sx={{
          position: 'absolute',
          right: 0,
          top: 0
        }}
      >
        <Close />
      </IconButton>
    </Dialog>
  )
}
export default MatchedInstitutionModal
