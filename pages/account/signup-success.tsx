import { Container, Typography, Stack, Alert } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import jwt from 'jsonwebtoken'
import Logo from 'components/common/Logo'
import { BlueLink } from 'components/common/BlueLink'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'
import { fbPixelTrackCompleteRegistration } from 'apis/fbpixel'

type Props = {
  email: string
}

const SignupSuccessPage: React.FC<Props> = ({ email }) => {
  const router = useRouter()
  const [count, setCount] = useState(5)
  const token = router.query.token as string

  const callbackUrl = decodeURIComponent(router.query.from as string) || '/'
  useEffect(() => {
    if (count <= 1) {
      signIn('token', { token, callbackUrl })

      return () => clearTimeout(handler)
    }

    const handler = setTimeout(() => setCount((prev) => prev - 1), 1000)
    return () => clearTimeout(handler)
  })
  useEffect(() => {
    fbPixelTrackCompleteRegistration("Created an Account")
  }, [])
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Account successfully created | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack spacing={1} alignItems="center">
        <Stack alignItems="center" mt={20}>
          <Logo type="dark" />
        </Stack>
        <Alert severity="success">Account successfully created.</Alert>
        <Typography color="textSecondary" align="center">
          Email has been sent to <strong>{email}</strong>. Please check your
          email. Redirecting in {count} seconds...
          <BlueLink
            ml={2}
            onClick={() => {
              signIn('token', { token, callbackUrl })
            }}
          >
            Redirect manually
          </BlueLink>
        </Typography>
      </Stack>
    </Container>
  )
}

export default SignupSuccessPage

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = context.query

  const token = jwt.decode(query.token as string) as any

  return {
    props: {
      email: token.email
    }
  }
}
