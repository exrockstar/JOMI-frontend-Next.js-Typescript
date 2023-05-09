import {
  Facebook,
  FacebookOutlined,
  Google,
  LinkedIn
} from '@mui/icons-material'
import { Button, ButtonProps, IconButton, IconButtonProps } from '@mui/material'
import { analytics } from 'apis/analytics'
import { BASE_URL } from 'common/constants'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

const MAIN_PAGE = BASE_URL

type Provider = {
  provider: 'google' | 'facebook' | 'linkedin'
}

const SocialLoginButton: React.FC<IconButtonProps & Provider> = ({
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
    <IconButton
      onClick={(e) => {
        analytics.trackClick(e)
        signIn(provider, { from })
      }}
      sx={{
        border: 'none',
        borderRadius: 1,
        px: 3.6625,
        py: 1.25,
        backgroundColor: 'grey.700',
        color: '#F8FAFC'
      }}
      {...props}
    >
      {children}
    </IconButton>
  )
}

export const GoogleAuthButton = () => {
  return (
    <SocialLoginButton
      provider="google"
      data-event="Login Form - Login via Google Button"
      title="Log in via Google"
    >
      <Google color="inherit" />
    </SocialLoginButton>
  )
}

export const FacebookAuthButton = () => {
  return (
    <SocialLoginButton
      provider="facebook"
      data-event="Login Form - Login via Facebook Button"
      title="Log in via Faceboook"
    >
      <Facebook />
    </SocialLoginButton>
  )
}

export const LinkedInAuthButton = () => {
  return (
    <SocialLoginButton
      provider="linkedin"
      data-event="Login Form - Login via Linkedin Button"
      title="Log in via LinkedIn"
    >
      <LinkedIn />
    </SocialLoginButton>
  )
}
