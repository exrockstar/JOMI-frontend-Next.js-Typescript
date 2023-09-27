import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { signIn, useSession } from 'next-auth/react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import {
  initialValues,
  hasPasswordSetSchema,
  noPasswordSetSchema
} from 'components/account/accountGeneralPage/schema'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { styled } from '@mui/material/styles'
import SubmitButton from '../SubmitButton'
import { Facebook, Google, LinkedIn, Apple } from '@mui/icons-material'
import { Button } from '@mui/material'
import { User } from 'next-auth'
import { useUpdatePasswordMutation } from 'graphql/mutations/update-password.generated'
import { analytics } from 'apis/analytics'

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const email = session?.user?.email
  const signInType = session?.user?.signInType
  const hasSetPassword = session?.user?.isPasswordSet
  const isOAuthSignIn =
    signInType === 'google' ||
    signInType === 'facebook' ||
    signInType === 'linkedin' 
    // signInType === 'apple'

  const [updateProfile] = useUpdatePasswordMutation({
    onError: (error) => {
      const message = `Password change error: ${error.message}`
      enqueueSnackbar(message, {
        variant: 'error'
      })
    },
    onCompleted: (data) => {
      const message = hasSetPassword
        ? 'Your password has been changed.'
        : 'Your password is now set.'
      enqueueSnackbar(message, { variant: 'success' })
    }
  })

  const handleSubmit = async (values, actions) => {
    var res = await updateProfile({
      variables: {
        input: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        }
      }
    })

    if (res.errors) return
    if (isOAuthSignIn) {
      signIn(signInType, { callbackUrl: router.asPath })
    } else {
      signIn('credentials', {
        email,
        password: values.newPassword,
        callbackUrl: router.asPath
      })
    }
  }

  const OAuthIcon = useMemo(() => {
    switch (signInType) {
      case 'google':
        return <Google />
      case 'linkedin':
        return <LinkedIn />
      case 'facebook':
        return <Facebook />
      // case 'apple':
      //   return <Apple />
      default:
        return null
    }
  }, [signInType])

  return (
    <Box
      bgcolor="white"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flex={1}
      p={2}
      pt={0}
    >
      <AccountHeaderText>Account</AccountHeaderText>
      <Box padding={'8px'}>
        <Typography fontSize={'16px'} fontWeight={'bold'}>
          Email address
        </Typography>
        <Typography fontSize={'16px'}>{email}</Typography>
        <Typography fontSize={'12px'}>
          Email addresses cannot be changed at this time.
        </Typography>
      </Box>

      {isOAuthSignIn && (
        <Box padding={'8px'}>
          <Typography fontSize={'16px'} fontWeight={'bold'}>
            You are connected via
          </Typography>
          <RectangleButton
            color={signInType}
            startIcon={OAuthIcon}
            variant="contained"
            disableElevation
          >
            {signInType}
          </RectangleButton>
        </Box>
      )}

      <Box mt={1} mb={1} pl={'8px'} pr={'8px'}>
        <Typography fontSize={'16px'} fontWeight={'bold'}>
          {hasSetPassword ? 'Change password' : 'Set password'}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={
            hasSetPassword ? hasPasswordSetSchema : noPasswordSetSchema
          }
          onSubmit={handleSubmit}
        >
          <Box mt={1}>
            <Form>
              {hasSetPassword && (
                <Box>
                  <Field
                    component={TextField}
                    type="password"
                    variant="standard"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Old Password"
                    fullWidth
                  />
                </Box>
              )}
              <Box pt={'8px'}>
                <Field
                  component={TextField}
                  type="password"
                  variant="standard"
                  id="newPassword"
                  name="newPassword"
                  placeholder={hasSetPassword ? 'New Password' : 'Password'}
                  fullWidth
                />
              </Box>
              <Box pt={'8px'}>
                <Field
                  component={TextField}
                  type="password"
                  variant="standard"
                  id="newPassword2"
                  name="newPassword2"
                  placeholder={
                    hasSetPassword ? 'Repeat New Password' : 'Repeat Password'
                  }
                  fullWidth
                />
                <Box mt={2}>
                  <SubmitButton
                    variant="text"
                    type="submit"
                    onClick={analytics.trackClick}
                    data-event="Account - Update password button"
                  >
                    Update Password
                  </SubmitButton>
                </Box>
              </Box>
            </Form>
          </Box>
        </Formik>
      </Box>
    </Box>
  )
}

const AccountHeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  padding: '8px',
  fontWeight: '200px'
}))

const RectangleButton = styled(Button)({
  borderRadius: 4,
  textTransform: 'capitalize',
  paddingLeft: 24,
  paddingRight: 24,
  pointerEvents: 'none'
})
