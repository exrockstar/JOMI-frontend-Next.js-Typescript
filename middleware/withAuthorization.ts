import { UserRoles } from 'graphql/types'
import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { MiddlewareFactory } from './types'

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname
    const accountPages = [
      '/account',
      '/account/profile',
      '/account/subscription',
      '/account/feedback',
      '/account/newsletter'
    ]

    if (accountPages.some((path) => pathname === path)) {
      const token = await getToken({
        req: request,
        secret: process.env.SECRET
      })
      if (!token) {
        const url = new URL(`/signup`, request.url)
        console.log(request.url)
        //using callbackUrl or redirectUrl parameter doesn't work if sign up via social.
        url.searchParams.set('from', encodeURI(request.url))
        return NextResponse.redirect(url)
      }
    }

    const isCMS = pathname.startsWith('/cms')
    const isAccess = pathname === '/access'
    if (isCMS || isAccess) {
      const token = await getToken({
        req: request,
        secret: process.env.SECRET
      })

      if (!token) {
        const url = new URL(`/api/auth/signin`, request.url)
        url.searchParams.set('from', encodeURI(request.url))
        return NextResponse.redirect(url)
      }

      //authorization for cms
      if (token.role !== UserRoles.Admin && isCMS) {
        const url = new URL(`/403`, request.url)
        return NextResponse.rewrite(url)
      }

      //authorization for access
      if (
        token.role !== UserRoles.Admin &&
        token.role !== UserRoles.Librarian &&
        isAccess
      ) {
        const url = new URL(`/403`, request.url)
        return NextResponse.rewrite(url)
      }
    }
    return next(request, _next)
  }
}
