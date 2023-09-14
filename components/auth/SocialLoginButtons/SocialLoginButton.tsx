import {
  Facebook,
  FacebookOutlined,
  Google,
  LinkedIn,
  Apple
} from '@mui/icons-material'
import { Button, ButtonProps } from '@mui/material'
import { analytics } from 'apis/analytics'
import { BASE_URL } from 'common/constants'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

const MAIN_PAGE = BASE_URL

type Provider = {
  provider: 'google' | 'facebook' | 'linkedin' | 'apple'
}

const SocialLoginButton: React.FC<ButtonProps & Provider> = ({
  children,
  sx,
  provider,
  ...props
}) => {
  const router = useRouter()
  const getCallbackUrl = () => {
    const fromUrl =
      decodeURIComponent(router.query?.from as string) || MAIN_PAGE

    if (router.pathname.startsWith('/signup')) {
      return fromUrl
    }

    if (router.pathname !== '/login') {
      return router.asPath
    }

    return fromUrl
  }

  const from = getCallbackUrl()
  return (
    <Button
      onClick={(e) => {
        analytics.trackClick(e)
        signIn(provider, { callbackUrl: from })
      }}
      sx={{
        border: 'none',
        borderRadius: 1,
        textTransform: 'none',
        fontSize: 15,
        py: 0.5,
        pl: 3,
        justifyContent: { xs: 'center', md: 'flex-start' },
        ...sx
      }}
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  )
}

export default SocialLoginButton

export const GoogleAuthButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SocialLoginButton
      startIcon={<Google />}
      color="google"
      provider="google"
      fullWidth
      data-event="Login Form - Login via Google Button"
    >
      {children}
    </SocialLoginButton>
  )
}

export const FacebookAuthButton: React.FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <SocialLoginButton
      startIcon={<FacebookOutlined />}
      color="facebook"
      provider="facebook"
      fullWidth
      data-event="Login Form - Login via Facebook Button"
    >
      {children}
    </SocialLoginButton>
  )
}

export const LinkedInAuthButton: React.FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <SocialLoginButton
      startIcon={<LinkedIn />}
      color="linkedin"
      fullWidth
      provider="linkedin"
      data-event="Login Form - Login via Linkedin Button"
    >
      {children}
    </SocialLoginButton>
  )
}

export const AppleAuthButton: React.FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <SocialLoginButton
      startIcon={<Apple />}
      color="apple"
      fullWidth
      provider="apple"
      data-event="Login Form - Login via Apple Button"
    >
      {children}
    </SocialLoginButton>
  )
}