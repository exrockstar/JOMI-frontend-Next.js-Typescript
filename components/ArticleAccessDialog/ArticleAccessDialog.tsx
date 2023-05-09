import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import FormDivider from 'components/common/FormDivider'
import NextLink from 'next/link'
import { AccessTypeEnum } from 'graphql/types'
import { ArticleAccessLanguageData } from './language'
import { analytics } from 'apis/analytics'
import {
  UserProfileDocument,
  useUserProfileQuery
} from 'graphql/queries/user-profile.generated'
import { CustomDialogTitle } from './common.styles'
import EmailVerificationNotice from './EmailVerificationNotice'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { object, string, TypeOf } from 'yup'
import { useSnackbar } from 'notistack'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import { UserProfilePageDocument } from 'graphql/queries/user-profile-page.generated'
import { LoadingButton } from '@mui/lab'
import { useUpdateInstEmailMutation } from 'graphql/mutations/update-inst-email.generated'
import { useArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import { Close } from '@mui/icons-material'

type ArticleAccessDialogProps = {
  open: boolean
  handleState(state: boolean): void
  publication_id: string
}

const schema = object({
  inst_email: string().email('Please enter a valid email')
})

function ArticleAccessDialog({
  open,

  handleState,
  publication_id
}: ArticleAccessDialogProps) {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { data: session, status } = useSession()
  const isLoggedIn = Boolean(session?.user)
  const fromUrl = encodeURIComponent(router?.asPath)
  const { enqueueSnackbar } = useSnackbar()
  const handleClose = (e: React.SyntheticEvent, reason?: string) => {
    handleState(false)
  }

  const { data } = useUserProfileQuery({
    skip: !session
  })

  const [updateInstEmail, { loading: updatingProfile }] =
    useUpdateInstEmailMutation({
      refetchQueries: [
        { query: UserProfilePageDocument },
        { query: UserProfileDocument },
        { query: UserPricesDocument }
      ],
      onCompleted: (data) => {
        enqueueSnackbar('Success. We matched you to your institution.', {
          variant: 'success'
        })
      },
      onError(e) {
        enqueueSnackbar(e.message, { variant: 'error' })
      }
    })

  const { data: accessData } = useArticleAccessQuery({
    skip: status === 'loading',
    variables: {
      publication_id: publication_id
    }
  })
  const articleAccess = accessData?.article?.articleAccessType
  const accessType = articleAccess?.accessType ?? AccessTypeEnum.LimitedAccess
  const handleSubmit = async (values: TypeOf<typeof schema>) => {
    console.log('submitting', values)
    updateInstEmail({
      variables: {
        email: values.inst_email
      }
    })
  }

  const content = React.useMemo(() => {
    let content = ArticleAccessLanguageData[articleAccess?.accessType]
    const expiredSub =
      articleAccess?.subscriptionExpiresAt &&
      dayjs(articleAccess?.subscriptionExpiresAt).isBefore(dayjs())

    if (expiredSub) {
      content = ArticleAccessLanguageData['SubscriptionExpired']
    }

    if (articleAccess?.requireLogin) {
      content = ArticleAccessLanguageData.RequireLogin
    }

    return content
  }, [
    articleAccess?.accessType,
    articleAccess?.requireLogin,
    articleAccess?.subscriptionExpiresAt
  ])

  const userAccess = data?.userAccessType

  //show shouldRequestInstVerification if subscription is active and user has not verified his email.
  if (userAccess?.accessType === AccessTypeEnum.AwaitingEmailConfirmation) {
    return (
      <EmailVerificationNotice
        open={open}
        email={userAccess.shouldRequestInstVerification}
        institutionName={userAccess.institution_name}
        onClose={handleClose}
      />
    )
  }

  if (!content) return null
  return (
    <Box>
      <Dialog
        keepMounted
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          marginTop: 10
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            backgroundColor: 'rgb(217, 242, 217)',
            marginBottom: 2,
            minWidth: 300,
            position: 'relative'
          }}
        >
          <Stack>
            <CustomDialogTitle variant="h6" sx={{ color: 'success.main' }}>
              {content?.title}
            </CustomDialogTitle>
          </Stack>
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            alignItems="center"
            justifyContent="center"
            p={{ xs: 0, md: 2 }}
          >
            {content.message}
            <NextLink
              href={`${content.action1.url}?from=${fromUrl}`}
              passHref
              legacyBehavior
            >
              <Tooltip title={content.action1.tooltip} sx={{ fontSize: 16 }}>
                <Button
                  variant="outlined"
                  component="a"
                  fullWidth
                  sx={{ fontSize: { xs: 13, md: 14 }, borderRadius: 1 }}
                  data-event={content.action1.event}
                  onClick={analytics.trackClick}
                >
                  {content.action1.text}
                </Button>
              </Tooltip>
            </NextLink>
            <FormDivider
              my={3}
              color="text.secondary"
              fontSize={14}
              sx={{ width: '100%' }}
              component="div"
            >
              or
            </FormDivider>
            <NextLink
              href={`${content.action2.url}?from=${fromUrl}`}
              passHref
              legacyBehavior
            >
              <Tooltip title={content.action2.tooltip} sx={{ fontSize: 16 }}>
                <Button
                  variant="outlined"
                  component="a"
                  fullWidth
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    borderRadius: 1,
                    textAlign: 'center'
                  }}
                  data-event={content.action2.event}
                  onClick={analytics.trackClick}
                >
                  {content.action2.text}
                </Button>
              </Tooltip>
            </NextLink>
            {content.action3 && (
              <Tooltip title={content.action3.tooltip}>
                <Button
                  variant="contained"
                  component="a"
                  fullWidth
                  sx={{ fontSize: { xs: 13, md: 14 }, borderRadius: 1, mt: 3 }}
                  onClick={(e) => {
                    analytics.trackClick(e)
                    handleState(false)
                  }}
                  data-event={content.action3.event}
                >
                  {content.action3.text}
                </Button>
              </Tooltip>
            )}
          </Stack>

          {!isLoggedIn &&
            accessType === AccessTypeEnum.RequireSubscription &&
            !articleAccess?.requireLogin && (
              <Stack py={2} px={isMobile ? 0 : 2}>
                <Box>
                  <Typography variant="h5">Already Subscribed?</Typography>
                  <Typography my={2} variant="body2">
                    If you already have an active individual subscription or an
                    active subscription through your institution, please:
                  </Typography>
                  <NextLink
                    href={`${content.action1.url}?from=${fromUrl}`}
                    passHref
                    legacyBehavior
                  >
                    <Button
                      variant="outlined"
                      component="a"
                      fullWidth
                      sx={{ fontSize: { xs: 13, md: 14 }, borderRadius: 1 }}
                      data-event={'ArticleAccessDialog - Login Button'}
                      onClick={analytics.trackClick}
                    >
                      Login to your account
                    </Button>
                  </NextLink>
                </Box>
              </Stack>
            )}
          {isLoggedIn &&
            (accessType === AccessTypeEnum.RequireSubscription ||
              accessType === AccessTypeEnum.Evaluation) && (
              <Formik
                onSubmit={handleSubmit}
                initialValues={{ inst_email: '' }}
                validationSchema={schema}
              >
                <Form>
                  <Stack py={2} px={isMobile ? 0 : 2}>
                    <Box>
                      <Typography variant="h5">
                        Add Institution Email
                      </Typography>
                      <Typography my={2} variant="body2">
                        If you are at an institution that has an institutional
                        subscription please add a valid institutional email.
                      </Typography>
                      <FormikTextField
                        name="inst_email"
                        fullWidth
                        size="small"
                        placeholder="johndoe@jomi.edu"
                      />
                      <LoadingButton
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{
                          fontSize: { xs: 13, md: 14 },
                          borderRadius: 1,
                          my: 2
                        }}
                        loading={updatingProfile}
                      >
                        Submit
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Form>
              </Formik>
            )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default React.memo(ArticleAccessDialog)
