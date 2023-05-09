import { Container, Stack, Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { initializeApollo } from 'apis/apollo-client'

import { styled } from '@mui/material/styles'
import { getSession, signIn } from 'next-auth/react'
import Logo from 'components/common/Logo'
import jwt from 'jsonwebtoken'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { ArrowBack } from '@mui/icons-material'
import { ApolloError } from '@apollo/client'
import Head from 'next/head'
import { SITE_NAME } from 'common/constants'
import {
  useResendConfirmEmailMutation,
  ConfirmEmailMutation,
  ConfirmEmailDocument
} from 'graphql/mutations/confirm-email.generated'
import { logger } from 'logger/logger'
import { getApolloUserClient } from 'apis/apollo-admin-client'
import Cookies from 'cookies'
type ConfirmEmailPageProps = {
  result: 'success' | 'expired'
  token?: string
  email?: string
}
const ConfirmEmailPage: React.FC<ConfirmEmailPageProps> = ({
  result,
  token,
  email = ''
}) => {
  const [sendEmailConfirm, { data, loading }] = useResendConfirmEmailMutation({
    variables: {
      email: email
    }
  })

  useEffect(() => {
    if (result === 'success') {
      const timeout = setTimeout(() => {
        signIn('token', { token, callbackUrl: '/' })
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [])

  const handleClick = async () => {
    await sendEmailConfirm()
  }

  const isSuccess = result === 'success'
  const hasResentEmail = data?.sendEmailConfirmation && !loading
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Confirm email | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack spacing={1} alignItems="center">
        <Stack alignItems="center" mt={20}>
          <Logo type="dark" />
        </Stack>
        {isSuccess ? (
          <Alert severity="success">
            Email is confirmed. Automatically signing you in...
          </Alert>
        ) : hasResentEmail ? (
          <>
            <Alert severity="success">
              Resent email to <strong>{email}</strong>. Please check your email.
            </Alert>
            <Link href="/" passHref legacyBehavior>
              <GreenButton
                variant="contained"
                disableElevation
                href="/"
                startIcon={<ArrowBack />}
              >
                Back to home page
              </GreenButton>
            </Link>
          </>
        ) : (
          <>
            <Alert severity="error">
              Sorry, this token is either expired or invalid.
            </Alert>
            <GreenButton
              variant="contained"
              disableElevation
              onClick={handleClick}
              loading={loading}
            >
              Resend email confirmation
            </GreenButton>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default ConfirmEmailPage

export const getServerSideProps: GetServerSideProps<
  ConfirmEmailPageProps
> = async (context) => {
  const query = context.query
  const token = query.token as string
  const decoded = jwt.decode(token) as any
  const session = await getSession({ req: context.req })

  try {
    const cookie = new Cookies(context.req, context.res)
    const client = getApolloUserClient(context.req.headers, cookie)
    const response = await client.mutate<ConfirmEmailMutation>({
      mutation: ConfirmEmailDocument,
      variables: {
        token
      }
    })

    if (response.data?.token) {
      return {
        props: {
          result: 'success',
          token: response.data?.token,
          email: decoded.email
        }
      }
    }
  } catch (e) {
    if (e instanceof ApolloError) {
      logger.error(`ConfirmEmailDocument ${e.message}`, {
        stack: e.stack,
        user_agent: context.req['headers'].user_agent,
        userId: session?.user._id
      })
    }
  }

  return {
    props: {
      result: 'expired',
      email: decoded?.email || ''
    }
  }
}

const GreenButton = styled(LoadingButton)({
  backgroundColor: '#2cb673',
  '&:hover': {
    backgroundColor: '#58d799'
  },
  borderRadius: 4,
  height: 40,
  textTransform: 'none'
})
