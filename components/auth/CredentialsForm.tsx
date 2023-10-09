import { LoadingButton } from '@mui/lab'
import { Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { object, string, TypeOf } from 'yup'
import NextLink from 'next/link'
import { cleanObj, sleep } from 'common/utils'
import { BlueLink } from 'components/common/BlueLink'
import { useSnackbar } from 'notistack'
import { analytics } from 'apis/analytics'

const MAIN_PAGE = process.env.NEXTAUTH_URL + '/'

const schema = object({
  email: string().required('Email is required'),
  password: string().required('Password is required')
})

type FormValues = TypeOf<typeof schema>
const CredentialsForm: React.FC<{ onComplete?(): void }> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    const callbackUrl = getCallbackUrl()
    const params = cleanObj({
      redirect: false,
      callbackUrl: callbackUrl,
      email: values.email.toLowerCase(),
      password: values.password
    })
    const res = await signIn('credentials', params)
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

  const getCallbackUrl = () => {
    if (router.pathname !== '/login') {
      return router.asPath
    }
    const from = router.query?.from as string
    return from ? from : MAIN_PAGE
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack alignItems="stretch">
          {errorText && (
            <Typography color="error" align="center">
              {errorText}
            </Typography>
          )}
          <FormikTextField
            label="Email"
            name="email"
            size="small"
            margin="normal"
          />
          <FormikTextField
            label="Password"
            size="small"
            type="password"
            name="password"
          />
          <Typography align="right" fontSize={14} mb={2}>
            <NextLink href="/account/forgot-password" passHref legacyBehavior>
              <BlueLink
                data-event="Login Form - Forgot Password"
                onClick={analytics.trackClick}
              >
                Forgot password?
              </BlueLink>
            </NextLink>
          </Typography>
          <SignInButton
            variant="contained"
            type="submit"
            fullWidth
            loading={loading}
            data-event="Login Form - Sign in"
            onClick={analytics.trackClick}
          >
            Sign in
          </SignInButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default CredentialsForm

const SignInButton = styled(LoadingButton)({
  backgroundColor: '#EC2426',
  '&:hover': {
    backgroundColor: '#F26A6C'
  },
  textTransform: 'none',
  fontSize: 14,
  border: 'none',
  borderRadius: 4
})
