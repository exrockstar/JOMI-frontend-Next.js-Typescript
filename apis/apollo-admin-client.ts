import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import { IS_SERVER } from 'common/constants'
import Cookies from 'cookies'
import { UserRoles } from 'graphql/types'
import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

let apolloAdminClient: ApolloClient<NormalizedCacheObject> | undefined
// const url = `${process.env.NEXTAUTH_URL}/graphql`

/**
 * Should only be called on on the backend. DO NOT call in react
 * @returns new ApolloClient instance with admin user authorization
 */
export function getApolloAdminClient(reset?: boolean) {
  if (!IS_SERVER) {
    throw new Error(
      'Dont use this client on the Browser. Use custom hooks generated in graphql.tsx instead'
    )
  }

  if (apolloAdminClient && !reset) return apolloAdminClient
  const url = process.env.API_URL
  const httpLink = new HttpLink({
    uri: url,
    credentials: 'include'
  })

  const authLink = setContext((request, { headers }) => {
    //generate a short lived token
    const secret = process.env.SECRET
    const token = jwt.sign(
      { role: UserRoles.Superadmin, _id: 'NEXTJS_APP' },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '5m'
      }
    )

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        'x-country': 'US' //add default header
      }
    }
  })

  const _adminClient = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache({})
  })
  apolloAdminClient = _adminClient
  return _adminClient
}

/**
 *
 * @returns Returns a Client with user information if the request is coming from server like
 * getServerSideProps, /api/auth/session, etc
 */
export function getApolloUserClient(
  _headers: NextApiRequest['headers'],
  cookies: Cookies
) {
  const url = process.env.API_URL
  const httpLink = new HttpLink({
    uri: url
  })
  const headerLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const testIp = cookies.get('test_ip')
      //properly setup the country if there's a test_ip cookie
      let val = {
        ip: _headers['x-real-ip'] as string,
        country: _headers['x-vercel-ip-country'] as string,
        region: _headers['x-vercel-ip-country-region'] as string,
        city: _headers['x-vercel-ip-city'] as string
      }
      try {
        val = JSON.parse(decodeURIComponent(testIp)) as typeof val
      } catch (e) {
        console.log(e.message)
      }

      const newHeaders = {
        headers: {
          ...headers,
          'sec-fetch-site': _headers['sec-fetch-site'],
          'sec-fetch-mode': _headers['sec-fetch-mode'],
          'sec-fetch-dest': _headers['sec-fetch-dest'],
          referer: _headers['referer'],
          cookie: _headers['cookie'],
          'user-agent': _headers['user-agent'],
          'x-forwarded-host': _headers['x-forwarded-host'],
          'x-forwarded-proto': _headers['x-forwarded-proto'],
          'x-forwarded-for': _headers['x-forwarded-for'],
          'x-vercel-forwarded-for': _headers['x-vercel-forwarded-for'],
          'x-client-ip': val.ip,
          'x-country': val.country,
          'x-region': val.region,
          'x-city': val.city
        }
      }
      console.log('_headers', newHeaders)
      return newHeaders
    })

    return forward(operation)
  })
  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([headerLink, httpLink]),
    cache: new InMemoryCache()
  })
}

/**
 *
 * @returns Returns a new apollo client every time. Doesn't have user information through the headers.
 *
 * Used by getStaticProps
 */
export function getApolloClient() {
  const url = process.env.API_URL
  const httpLink = new HttpLink({
    uri: url,
    headers: {
      'x-country': 'US' //add default header for country.
    }
  })

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache()
  })
}
