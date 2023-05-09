import { Container, Stack, Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { initializeApollo } from 'apis/apollo-client'

import Logo from 'components/common/Logo'
import jwt from 'jsonwebtoken'
import { logger } from 'logger/logger'
import { getSession, signIn } from 'next-auth/react'
import { ApolloError } from '@apollo/client'
import {
  ConfirmInstitutionEmailDocument,
  ConfirmInstitutionEmailMutation,
  ConfirmInstitutionEmailMutationVariables
} from 'graphql/mutations/inst-email-confirm.generated'
import Head from 'next/head'
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
  const isSuccess = result === 'success'

  useEffect(() => {
    if (result === 'success') {
      const timeout = setTimeout(() => {
        signIn('token', { token, callbackUrl: '/' })
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <Container maxWidth="sm">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack spacing={1} alignItems="center">
        <Stack alignItems="center" mt={20}>
          <Logo type="dark" />
        </Stack>
        {isSuccess ? (
          <Alert severity="success">
            Your institution email is confirmed. Automatically signing you in...
          </Alert>
        ) : (
          <>
            <Alert severity="error">
              Sorry, this token is either expired or invalid.
            </Alert>
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
    const response = await client.mutate<
      ConfirmInstitutionEmailMutation,
      ConfirmInstitutionEmailMutationVariables
    >({
      mutation: ConfirmInstitutionEmailDocument,
      variables: {
        token
      },
      context: {
        headers: {
          authorization: 'Bearer ' + session?.user?.token
        }
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
    if (e instanceof Error) {
      logger.error(`ConfirmInstitutionEmailDocument ${e.message}`, {
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
