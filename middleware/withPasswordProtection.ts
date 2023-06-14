import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'
import { MiddlewareFactory } from './types'

const PUBLIC_FILE = /\.(.*)$/
/**
 * For non-production environments, Redirect to password-protect page if `jomi-pw-protect` cookie is not set.
 *
 */
const excludeOrigins = ['localhost', 'vercel']
export const withPasswordProtection: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return function (req: NextRequest, _next: NextFetchEvent) {
    const { pathname, search, origin } = req.nextUrl

    const isProduction = process.env.APP_ENV === 'production'
    const isExclutedOrigins = excludeOrigins.some((excluded) =>
      origin.includes(excluded)
    )
    const isAlreadyLoggedIn = !!req.cookies.get('jomi-pw-protect')?.value
    const isExclutedPath =
      pathname === '/password-protect' ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/graphql') ||
      PUBLIC_FILE.test(pathname)

    if (
      isProduction ||
      isExclutedOrigins ||
      isAlreadyLoggedIn ||
      isExclutedPath
    ) {
      return next(req, _next)
    }

    return NextResponse.redirect(
      `${origin}/password-protect?redirectUrl=${encodeURIComponent(
        pathname + search
      )}`
    )
  }
}
