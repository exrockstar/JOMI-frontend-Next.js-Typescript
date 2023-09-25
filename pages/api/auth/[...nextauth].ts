import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import AppleProvider from 'next-auth/providers/apple'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAuthInput } from 'backend/utils/auth-utils'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

import { getApolloUserClient } from 'apis/apollo-admin-client'
import { ApolloError } from '@apollo/client'
import { JWT } from 'next-auth/jwt'
import { logger } from 'logger/logger'
import { isProduction } from 'common/constants'
import Cookies from 'cookies'
import {
  SignInMutation,
  SignInMutationVariables,
  SignInDocument,
  SignInViaTokenMutation,
  SignInViaTokenMutationVariables,
  SignInViaTokenDocument,
  SignInViaOldTokenMutation,
  SignInViaOldTokenMutationVariables,
  SignInViaOldTokenDocument
} from 'graphql/mutations/signin.generated'
import {
  UpsertSocialUserMutation,
  UpsertSocialUserMutationVariables,
  UpsertSocialUserDocument
} from 'graphql/mutations/upsert-social-user.generated'
import { User } from 'graphql/types'
import { ClientInfo } from 'middleware/types'
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = new Cookies(req, res)

  const client = getApolloUserClient(req.headers, cookie)

  return await NextAuth(req, res, {
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET
      }),
      AppleProvider({
        clientId: process.env.APPLE_CLIENT_ID,
        clientSecret: process.env.APPLE_CLIENT_SECRET
      }),
      //TODO: Create signIn mutation
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          try {
            const { data } = await client.mutate<
              SignInMutation,
              SignInMutationVariables
            >({
              mutation: SignInDocument,
              variables: {
                input: {
                  email: credentials.email,
                  password: credentials.password
                }
              }
            })
            const user = data?.signIn

            logger.info('[NextAuth] Credentials SignIn Succeeded', {
              userId: user._id
            })
            return {
              ...user,
              name: displayAuthenticatedUser(user as User)
            } as any
          } catch (e) {
            logger.info(`[NextAuth] Credentials SignIn Failed`)
            if (e instanceof ApolloError) {
              if (e.networkError) {
                console.log(e.message)
                throw new Error('Network error')
              }
              throw new Error(e.message)
            }

            throw new Error(`signIn ${e}`)
          }
        }
      }),
      //TODO: Modify Credentials provider to use token instead of ID
      CredentialsProvider({
        id: 'token',
        credentials: {
          token: { type: 'text' }
        },
        async authorize({ token }) {
          try {
            const { data } = await client.mutate<
              SignInViaTokenMutation,
              SignInViaTokenMutationVariables
            >({
              mutation: SignInViaTokenDocument,
              variables: {
                token
              }
            })
            const user = data?.tokenSignIn

            logger.info('[NextAuth] Token SignIn Succeeded', {
              userId: user._id
            })
            return {
              ...user,
              name: displayAuthenticatedUser(user as User)
            } as any
          } catch (e) {
            logger.error(`[NextAuth] Token SignIn Failed. ${e.message}`)
            throw new Error(e.message)
          }
        }
      }),
      //Sign in using SignInTokenModel from db, doesn't use jwt
      CredentialsProvider({
        id: 'tokenid',
        credentials: {
          tokenId: { type: 'text' }
        },
        async authorize({ tokenId }) {
          try {
            const { data } = await client.mutate<
              SignInViaOldTokenMutation,
              SignInViaOldTokenMutationVariables
            >({
              mutation: SignInViaOldTokenDocument,
              variables: { tokenId }
            })
            const user = data?.user

            logger.info('[NextAuth] TokenID SignIn Succeeded', {
              userId: user._id
            })
            return {
              ...user,
              name: displayAuthenticatedUser(user as User)
            } as any
          } catch (e) {
            logger.error(`[NextAuth] TokenID SignIn Failed. ${e.message}`)
            throw new Error(e.message)
          }
        }
      })
    ],

    secret: process.env.SECRET,
    session: {
      strategy: 'jwt'
    },

    jwt: {
      secret: process.env.SECRET
    },

    pages: {
      signIn: '/login'
    },

    callbacks: {
      session: async ({ session, token, user }) => {
        if (session.user) {
          const secret = process.env.SECRET
          const access_token = jwt.sign(
            { email: token.email, _id: token._id },
            secret,
            {
              algorithm: 'HS256'
            }
          )

          session.user.name = token.name
          session.user.role = token.role
          session.user._id = token._id
          session.user.signInType = token.signInType
          session.user.isPasswordSet = token.isPasswordSet
          session.user.token = token.token ?? access_token
        }

        return session
      },

      async jwt({ token, user, account, profile }) {
        const signedIn = Boolean(user)
        const secret = process.env.SECRET
        const obj = { email: token.email, _id: token._id }
        const access_token = jwt.sign(obj, secret, {
          algorithm: 'HS256'
        })
        if (signedIn) {
          token.fullName = `${user.name}`
          token._id = user._id
          token.signInType = account.provider as JWT['signInType']
          token.isPasswordSet = user.isPasswordSet
          token.role = user.role
          token.token = access_token
        }

        if (signedIn && account.type === 'oauth') {
          try {
            const input = getAuthInput(account, profile, user)

            const { data } = await client.mutate<
              UpsertSocialUserMutation,
              UpsertSocialUserMutationVariables
            >({
              mutation: UpsertSocialUserDocument,
              variables: { input }
            })

            token.name = displayAuthenticatedUser(data.upsertSocialUser as User)
            token.role = data.upsertSocialUser?.role
            token._id = user._id
            token.signInType === account.provider
            token.isPasswordSet = data.upsertSocialUser?.isPasswordSet
            token.token = access_token
            logger.info('[NextAuthJS] UpsertSocialUserMutation', {
              userId: user._id,
              provider: account.provider
            })
          } catch (e) {
            logger.error(`[NextAuthJS] UpsertSocialUserMutation ${e.message}`)
          }
        }

        return token
      }
    },
    events: {
      async signOut() {
        logger.debug('Signout')
      }
    },
    debug: !isProduction
  })
}

function displayAuthenticatedUser(user: User) {
  let name
  if (user?.name.first && user?.name.last) {
    const first = user.name.first.charAt(0).toUpperCase()
    const last = user.name.last.charAt(0).toUpperCase()
    name = `${first} ${last}`
  } else {
    name = user?.name.first ?? user?.name.last
  }
  return name
}
