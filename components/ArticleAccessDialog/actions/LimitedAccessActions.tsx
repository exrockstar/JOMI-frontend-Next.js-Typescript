import { Stack } from '@mui/material'
import { analytics } from 'apis/analytics'
import CTAButton from 'components/common/CTAButton'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const LimitedAccessActions = () => {
  const router = useRouter()
  const fromUrl = encodeURIComponent(router?.asPath)
  return (
    <Stack gap={2}>
      <CTAButtonOutlined
        LinkComponent={NextLink}
        data-event={'Request Institutional Subscription'}
        onClick={analytics.trackClick}
        fullWidth
        href={`/login?from=${fromUrl}`}
      >
        Sign In
      </CTAButtonOutlined>
      <CTAButton
        LinkComponent={NextLink}
        onClick={analytics.trackClick}
        fullWidth
        href={`/signup?from=${fromUrl}`}
      >
        Sign Up
      </CTAButton>
    </Stack>
  )
}

export default LimitedAccessActions
