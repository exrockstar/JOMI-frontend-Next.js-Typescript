import React from 'react'
import Link from 'next/link'
import { Typography, Stack } from '@mui/material'
import {
  FacebookAuthButton,
  GoogleAuthButton,
  LinkedInAuthButton,
  AppleAuthButton
} from './SocialLoginButtons/SocialLoginButton'
import CredentialsForm from './CredentialsForm'
import { SignupButton } from './SignupButton'
import FormDivider from 'components/common/FormDivider'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'

type Props = {
  hideHeading?: boolean
  onComplete?(): void
}

export function LoginForm(props: Props) {
  const router = useRouter()

  const fromUrl = encodeURIComponent(router?.asPath)

  return (
    <Stack px={2} pb={2}>
      {!props.hideHeading && (
        <Typography
          color="text.primary"
          align="center"
          gutterBottom
          variant="h4"
        >
          Sign In
        </Typography>
      )}
      <CredentialsForm onComplete={props.onComplete} />
      <FormDivider my={3} color="text.secondary" fontSize={14} component="div">
        or
      </FormDivider>
      <Stack spacing={1}>
        <GoogleAuthButton>Sign in with Google</GoogleAuthButton>
        <FacebookAuthButton>Sign in with Facebook</FacebookAuthButton>
        <LinkedInAuthButton>Sign in with LinkedIn</LinkedInAuthButton>
        {/* <AppleAuthButton>Sign in with Apple</AppleAuthButton> */}
      </Stack>

      <FormDivider my={4} color="text.secondary" component="div">
        <Typography
          fontSize={14}
          sx={{ whiteSpace: 'nowrap' }}
        >{`Don't have an account?`}</Typography>
      </FormDivider>

      <Link
        href={{ pathname: '/signup', query: { from: fromUrl } }}
        passHref
        prefetch={false}
        legacyBehavior
      >
        <SignupButton
          data-event="Login Form - Sign Up Button"
          onClick={analytics.trackClick}
        >
          Create an Account
        </SignupButton>
      </Link>
    </Stack>
  )
}

export default LoginForm
