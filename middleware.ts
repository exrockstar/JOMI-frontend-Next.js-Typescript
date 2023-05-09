import { stackMiddlewares } from 'middleware/stackMiddlewares'
import { withAuthorization } from 'middleware/withAuthorization'
import { withRedirect } from 'middleware/withRedirect'
import { withRedirectToHomePage } from 'middleware/withRedirectToHomePage'
import { withSecurityHeaders } from 'middleware/withSecurityHeaders'
import { withGraphqlHeader } from 'middleware/withGraphqlHeader'
import { withIpCookie } from 'middleware/withIpCookie'
import { withPasswordProtection } from 'middleware/withPasswordProtection'

let middlewares = [
  withRedirect,
  withRedirectToHomePage,
  withSecurityHeaders,
  withGraphqlHeader,
  withIpCookie,
  withAuthorization
]

if (process.env.APP_ENV !== 'production') {
  middlewares.unshift(withPasswordProtection)
}

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)'
  ]
}
