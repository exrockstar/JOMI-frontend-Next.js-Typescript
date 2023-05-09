import {
  HelpOutlineOutlined,
  ArrowBack,
  HomeOutlined,
  Refresh
} from '@mui/icons-material'
import { Button, Container, Stack, Typography } from '@mui/material'
import { analytics } from 'apis/analytics'
import { IS_SERVER } from 'common/constants'
import Logo from 'components/common/Logo'
import { getIpAddress } from 'components/utils/getIpAddress'
import { logtail } from 'logger/logtail'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FallbackProps } from 'react-error-boundary'

const AppErrorFallback = ({ error }: FallbackProps) => {
  const router = useRouter()

  useEffect(() => {
    logtail.error(`[AppError] ${error.message}`, {
      stack: error.stack,
      name: error.name,
      path: window.location.href,
      ip: getIpAddress(),
      user_agent: navigator.userAgent
    })
  }, [])

  return (
    <Container maxWidth="md">
      <Stack height="90vh" py={10}>
        <Logo type="dark" />
        <Stack px={2}>
          <Typography variant="h4" color="">
            Oh No! Something went wrong on our end
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >{`Don't worry, we're working on it`}</Typography>
          <Typography
            variant="body1"
            fontWeight={700}
            color="success.main"
            my={2}
          >{`TIP: Try refreshing the page to see if it helps. If it doesn't work, please contact us.`}</Typography>
        </Stack>
        <Stack px={2} my={4}>
          <Typography fontWeight={700}>Error Information</Typography>
          <Typography variant="body2" color="error.main">
            {error.message}
          </Typography>
        </Stack>
        <Stack direction="row" px={2} spacing={2}>
          <Button
            startIcon={<Refresh />}
            variant="contained"
            onClick={(e) => {
              router.reload()
            }}
          >
            Refresh Page
          </Button>
          <Button
            component="a"
            startIcon={<HelpOutlineOutlined />}
            href={
              !IS_SERVER
                ? `mailto:support@jomi.com?subject=Error on the website&body=${encodeURIComponent(
                    `Error: ${error.message}.
                  I received this error on the page: ${window.location.href}
                  user-agent: ${navigator.userAgent}                  
                  Please provide information on what happened. The more detailed, the better:`
                  )}`
                : ''
            }
            data-event="Error Page - Email"
            onClick={analytics.trackClick}
          >
            {' '}
            Email support
          </Button>
          <Button
            component="a"
            startIcon={<ArrowBack />}
            data-event="Error Page - Go Back"
            onClick={(e) => {
              analytics.trackClick(e)
              router.back()
            }}
          >
            {' '}
            Go back
          </Button>
          <Button
            component="a"
            startIcon={<HomeOutlined />}
            data-event="Error Page - Go Home"
            onClick={(e) => {
              analytics.trackClick(e)
              router.push('/')
            }}
          >
            Go to Home Page
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default AppErrorFallback
