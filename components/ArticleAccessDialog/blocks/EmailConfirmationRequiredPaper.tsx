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

const EmailConfirmationRequiredPaper = ({ accessData, onClose }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const articleAccess = accessData?.article?.articleAccessType
  const email = articleAccess?.shouldRequestInstVerification
  const institutionName = articleAccess?.institution_name

  const [sentDate, setSentDate] = useLocalStorage(
    'email-confirmation-sent-at',
    null
  )
  const [sendConfirmEmail, { loading: resendLoading }] =
    useSendInstitutionEmailConfirmationMutation({
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  useEffect(() => {
    // send confirmation email if not yet sent or it has been more than 30 days since an email has been sent.
    const shouldSend =
      !sentDate || dayjs(sentDate).add(30, 'days').isBefore(new Date())
    if (shouldSend) {
      sendConfirmEmail({
        variables: { email },
        onCompleted() {
          console.log('confirmation email sent')
          setSentDate(new Date())
        }
      })
    }
  }, [email, sendConfirmEmail, sentDate, setSentDate])
  return (
    <Paper>
      <DialogTitleWithCloseButton
        title="Email Confirmation Required"
        onClose={() => onClose({})}
      />
      <Divider />
      <DialogContent>
        <Typography my={2}>
          Your institution <b>{institutionName}</b> is currently subscribed.
        </Typography>
        <Typography my={2} variant="body2">
          To continue watching this article, please confirm your email by
          checking your inbox at{' '}
          <Typography variant="body2" fontWeight={700} component="span">
            {email}
          </Typography>{' '}
          and clicking <b>Confirm Email</b>
        </Typography>
      </DialogContent>
      <Divider />
      <Stack alignItems="center" px={2} py={2} spacing={1}>
        <Typography
          color="textSecondary"
          variant="caption"
        >{`Didn't receive any email?`}</Typography>
        <CTAButton
          data-event="Email Confirmation Required Modal"
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
          sx={{ px: 3 }}
        >
          Resend Email
        </CTAButton>
      </Stack>
    </Paper>
  )
}

export default EmailConfirmationRequiredPaper
