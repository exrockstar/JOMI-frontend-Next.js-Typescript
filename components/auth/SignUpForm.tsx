import React, { useState } from 'react'
import { Typography, Box, Divider, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import NextLink from 'next/link'
import { Form, Formik } from 'formik'
import { TypeOf } from 'yup'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { signupSchema } from './signup-schema'
import { LoadingButton } from '@mui/lab'

import { useRouter } from 'next/router'
import {
  FacebookAuthButton,
  GoogleAuthButton,
  LinkedInAuthButton
  // AppleAuthButton
} from './SocialLoginButtons/SocialLoginButton'
import { SignupButton } from './SignupButton'
import FormDivider from 'components/common/FormDivider'
import { cleanObj, sleep } from 'common/utils'
import { BlueLink } from 'components/common/BlueLink'
import { useSignUpMutation } from 'graphql/mutations/signup.generated'
import { signIn } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { logtail } from 'logger/logtail'
import { flattenObject } from 'components/utils/flattenObject'
import { useIpAddress } from 'components/utils/useIpAddress'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'

const initialValues: TypeOf<typeof signupSchema> = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
}

export function SignUpForm() {
  const router = useRouter()
  const [signUp, { error, data }] = useSignUpMutation()
  const { enqueueSnackbar } = useSnackbar()
  const {
    referredFrom: referer,
    referrerPath,
    anon_link_id
  } = useGoogleAnalyticsHelpers()
  //we need to create a loading state here since the loading
  //from mutation doesn't take into account router.push

  const [loading, setLoading] = useState(false)
  const handleSubmit = async ({
    confirmPassword,
    ...values
  }: TypeOf<typeof signupSchema>) => {
    setLoading(true)
    signUp({
      variables: {
        input: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          password: values.password,
          referredFrom: referer,
          referrerPath,
          anon_link_id
        }
      },
      onCompleted: async (data) => {
        // const token = data.signUp
        const from = router?.query?.from
        const callbackUrl = Array.isArray(from) ? '/' : from
        const params = cleanObj({
          email: values.email,
          password: values.password,
          callbackUrl: decodeURIComponent(callbackUrl)
        })
        await signIn('credentials', params)
        await sleep(600)
        const message = `Account Created. We sent you an email at ${values.email}`
        enqueueSnackbar(message, { variant: 'success' })
        setLoading(false)
      },
      onError: async (e) => {
        setLoading(false)
        enqueueSnackbar(e.message, { variant: 'error' })
      }
    })
  }

  return (
    <Stack>
      <Typography color="textPrimary" align="center" gutterBottom variant="h4">
        Create an Account
      </Typography>

      <Divider sx={{ my: 2 }} component="span" />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
        <GoogleAuthButton> with Google</GoogleAuthButton>
        <FacebookAuthButton>with Facebook</FacebookAuthButton>
        <LinkedInAuthButton>with LinkedIn</LinkedInAuthButton>
        {/* <AppleAuthButton>with Apple</AppleAuthButton> */}
      </Stack>

      <FormDivider my={3} color="text.secondary" fontSize={14} component="div">
        or
      </FormDivider>

      {error && (
        <div>
          <Typography color="error" align="center" variant="body1">
            Sorry we could not create an account.
          </Typography>
          <Typography color="error" align="center" gutterBottom variant="body1">
            {error.networkError?.message ? 'Network Error.' : error.message}
          </Typography>
        </div>
      )}

      <Formik
        validationSchema={signupSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack spacing={1}>
            <FormikTextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              name="email"
              helperText="Please use your personal email"
            />
            <FormikTextField
              fullWidth={true}
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              name="password"
              helperText="Passwords must be atleast 8 characters"
            />
            <FormikTextField
              fullWidth={true}
              label="Retype Password"
              variant="outlined"
              size="small"
              type="password"
              name="confirmPassword"
            />

            <Box my={2}>
              <Typography
                color="textSecondary"
                align="left"
                fontSize={12}
                pt={2}
              >
                If you think others at your institution would find JOMI useful
                email us at{' '}
                <BlueLink
                  sx={{ color: 'info' }}
                  href="mailto:subscribe@jomi.com"
                >
                  subscribe@jomi.com
                </BlueLink>{' '}
                and we can work to get you on board!
              </Typography>
              <Typography
                my={2}
                align="left"
                color="textSecondary"
                fontSize={12}
              >
                {`By clicking "Create Account", you agree to our `}
                <NextLink href="/terms-of-service" passHref legacyBehavior>
                  <BlueLink>Terms of Service</BlueLink>
                </NextLink>
              </Typography>
              <Typography
                fontWeight={700}
                my={2}
                align="left"
                color="textSecondary"
                fontSize={12}
              >
                Individual subscriptions can be purchased after you have created
                an account. Promo Codes can be used after you have created an
                account.
              </Typography>
            </Box>
            <Stack
              my={1}
              spacing={2}
              direction={{ md: 'row', xs: 'column' }}
              justifyContent={'flex-start'}
            >
              <SignupButton
                disabled={loading}
                loading={loading}
                variant="contained"
                type="submit"
                sx={{ width: { xs: '100%', md: 150 } }}
              >
                Sign up
              </SignupButton>
              <NextLink
                href={{ pathname: '/login', query: router.query }}
                passHref
                legacyBehavior
              >
                <SignInButton
                  variant="outlined"
                  sx={{ width: { xs: '100%', md: 250 } }}
                  color="linkblue"
                >
                  {' '}
                  Already have an account?
                </SignInButton>
              </NextLink>
            </Stack>
          </Stack>
        </Form>
      </Formik>
    </Stack>
  )
}

const SignInButton = styled(LoadingButton)({
  borderRadius: 4,
  height: 40,
  textTransform: 'none'
})
