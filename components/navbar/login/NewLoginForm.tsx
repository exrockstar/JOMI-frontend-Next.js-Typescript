import Link from 'next/link'
import { Typography, Stack, Link as MuiLink, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
import { Form, Formik, FormikValues } from 'formik'
import LoginTextField from './LoginTextField'
import CTAButton from 'components/common/CTAButton'
import FormDivider from './Divider'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import {
  FacebookAuthButton,
  GoogleAuthButton,
  LinkedInAuthButton
} from './SocialLoginButton'
import { sleep } from 'common/utils'
import { signIn } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import PasswordTextField from './PasswordTextField'
const MAIN_PAGE = process.env.NEXTAUTH_URL + '/'

type Props = {
  onComplete?(): void
}

export function NewLoginForm({ onComplete }: Props) {
  const router = useRouter()

  const fromUrl = encodeURIComponent(router?.asPath)
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const getCallbackUrl = () => {
    if (router.pathname !== '/login') {
      return router.asPath
    }
    const from = router.query?.from as string
    return from ? from : MAIN_PAGE
  }

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true)
    const callbackUrl = getCallbackUrl()
    const res = await signIn('credentials', {
      redirect: false,
      callbackUrl: callbackUrl,
      email: values.email.toLowerCase(),
      password: values.password
    })
    if (!res.error) {
      enqueueSnackbar('You are now logged in.', { variant: 'success' })
      onComplete && onComplete()
      router.push(res.url)
    }
    await sleep(600) //use a bit of delay to display loading status
    setLoading(false)
    if (res.error) {
      setErrorText(res.error)
      analytics.trackFailedLogin(res.error)
    }
  }
  return (
    <Stack py={3} px={2.5}>
      <Formik
        initialValues={{
          email: '',
          name: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack alignItems={'stretch'} justifyContent="flex-start">
            <Typography variant="body2" lineHeight={1}>
              Email
            </Typography>
            <LoginTextField
              name="email"
              size="small"
              margin="normal"
              placeholder="Enter email here"
              autoFocus
              sx={{ mt: 1, mb: 2 }}
            />
            <Typography variant="body2">Password</Typography>
            <PasswordTextField />
            <MuiLink
              data-event="Login Form - Forgot Password"
              onClick={analytics.trackClick}
              component={Link}
              href="/account/forgot-password"
              variant="caption"
              underline="none"
              sx={{ alignSelf: 'flex-start' }}
            >
              Forgot password?
            </MuiLink>
            <Box sx={{ mb: 4, mt: 3 }}>
              {errorText && (
                <Typography
                  color="error.light"
                  variant="body2"
                  align="center"
                  mb={1}
                >
                  Error: {errorText}
                </Typography>
              )}
              <CTAButton
                type="submit"
                data-event="Login Form - Sign in"
                onClick={analytics.trackClick}
                loading={loading}
                fullWidth
              >
                Sign In
              </CTAButton>
            </Box>
            <FormDivider>or login via</FormDivider>
            <Box mt={1} mb={2} display="flex" justifyContent={'space-between'}>
              <GoogleAuthButton />
              <FacebookAuthButton />
              <LinkedInAuthButton />
            </Box>
            <FormDivider>{`Don't have an account?`}</FormDivider>
            <Link
              href={{ pathname: '/signup', query: { from: fromUrl } }}
              passHref
              prefetch={false}
              legacyBehavior
            >
              <CTAButtonOutlined
                sx={{ mt: 1, fontSize: '.875rem', borderColor: 'grey.700' }}
                variant="outlined"
                color="secondary"
                data-event="Login Form - Sign Up Button"
                onClick={analytics.trackClick}
              >
                Create Account
              </CTAButtonOutlined>
            </Link>
          </Stack>
        </Form>
      </Formik>
    </Stack>
  )
}

export default NewLoginForm
