import NextAuth, { DefaultSession, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { UserRoles } from 'graphql/types'

declare module 'next-auth' {
  interface MyJWT extends JWT {}
  interface User extends DefaultSession.User {
    _id: string
    token: string
    fullName: string
    signInType?:
      | 'credentials'
      | 'google'
      | 'facebook'
      | 'linkedin'
      | 'token'
      | 'tokenid'
      | 'apple'
    isPasswordSet: boolean
    role: UserRoles
  }
  interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    email: string
    _id: string
    signInType?:
      | 'credentials'
      | 'google'
      | 'facebook'
      | 'linkedin'
      | 'token'
      | 'tokenid'
      | 'apple'
    isPasswordSet: boolean
    role: UserRoles
    token?: string
  }
}
