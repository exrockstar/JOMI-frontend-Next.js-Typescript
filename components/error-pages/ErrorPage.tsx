import { ArrowBack } from '@mui/icons-material'
import { Container, Stack, Typography, Button, Divider } from '@mui/material'
import { analytics } from 'apis/analytics'
import Logo from 'components/common/Logo'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
  code: number | string
  message: string
}

const ErrorPage = ({ code, message }: Props) => {
  return (
    <Container maxWidth="sm">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack
        height="100vh"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Logo type="dark" height={180} />
        <Stack direction="row" alignItems="center">
          <Typography variant="h5">{code}</Typography>
          <Divider orientation="vertical" sx={{ mx: 2 }} />
          <Typography component="h1">{message}</Typography>
        </Stack>
        <Link href="/" passHref legacyBehavior>
          <Button
            startIcon={<ArrowBack />}
            color="success"
            variant="contained"
            sx={{ borderRadius: 1 }}
            data-event="ErrorPage - Back to Home"
            onClick={analytics.trackClick}
          >
            {' '}
            Back to home
          </Button>
        </Link>
      </Stack>
    </Container>
  )
}

export default ErrorPage
