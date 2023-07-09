import { Send } from '@mui/icons-material'
import { DialogContent, Divider, Paper, Stack, Typography } from '@mui/material'
import { analytics } from 'apis/analytics'
import { useSendInstitutionEmailConfirmationMutation } from 'graphql/mutations/inst-email-confirm.generated'
import { useSnackbar } from 'notistack'
import CTAButton from 'components/common/CTAButton'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import DialogTitleWithCloseButton from '../common/DialogTitleWithCloseButton'

type Props = {
  accessData: ArticleAccessQuery
  onClose(e: any): void
}

const EmailConfirmationExpiredPaper = ({ accessData, onClose }: Props) => {
  const articleAccess = accessData?.article?.articleAccessType
  const email = articleAccess?.shouldRequestInstVerification
  const institutionName = articleAccess?.institution_name

  const { enqueueSnackbar } = useSnackbar()
  const [sentDate, setSentDate] = useLocalStorage(
    'email-verification-sent-at',
    null
  )
  const [sendConfirmEmail, { loading: resendLoading }] =
    useSendInstitutionEmailConfirmationMutation({
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  useEffect(() => {
    // send confirmation email if not yet sent or it has been more than 365 days since an email has been sent.
    const shouldSend =
      !sentDate || dayjs(sentDate).add(365, 'days').isBefore(new Date())

    if (shouldSend) {
      sendConfirmEmail({
        variables: { email },
        onCompleted() {
          console.log('re-verification email sent')
          setSentDate(new Date())
        }
      })
    }
  }, [email, sendConfirmEmail, sentDate, setSentDate])

  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Email Re-Verification Required"
        onClose={() => onClose({})}
      />
      <Divider />
      <DialogContent>
        <Typography my={2} variant="body2">
          You are currently attempting to access an institutional subscription
          using an email <b>({email})</b>. This address needs to be verified.
          (We require re-verification of emails affiliated with institutions).
        </Typography>
        <Typography my={2} variant="body2">
          We have sent a verification email to your email address. Once
          verification is complete, you will have access through a subscription
          maintained by <b>{institutionName}</b>.
        </Typography>
      </DialogContent>
      <Divider />
      <Stack alignItems="center" p={3} spacing={1}>
        <Typography
          color="textSecondary"
          variant="caption"
        >{`Didn't receive any email?`}</Typography>
        <CTAButton
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
          sx={{ px: 4 }}
          loading={resendLoading}
          endIcon={<Send />}
        >
          Resend Email
        </CTAButton>
      </Stack>
    </Paper>
  )
}

export default EmailConfirmationExpiredPaper
