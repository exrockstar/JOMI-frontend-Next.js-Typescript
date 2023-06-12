import { useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { onError } from '@apollo/client/link/error'
import { relayStylePagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { setContext } from '@apollo/client/link/context'
import { useSession } from 'next-auth/react'
import { logtail } from 'logger/logtail'
import { getIpAddress } from 'components/utils/getIpAddress'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
export const IS_SERVER = typeof window === 'undefined'
const url = IS_SERVER ? process.env.API_URL : '/graphql'
const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: Infinity,
    jitter: false
  },
  attempts: (count, operation, error) => {
    const retry = count < 5

    if (!retry) {
      const href = !IS_SERVER ? window.location.href : ''
      const _message = `[Network Error][${operation.operationName}]: ${error.message}. Retries: ${count}`
      logtail.error(_message, {
        href: href,
        ip: getIpAddress(),
        stack: error.stack,
        operation: operation.operationName,
        retries: count
      })
    }
    return retry
  }
})
const errorLink = onError(({ graphQLErrors, operation }) => {
  const href = !IS_SERVER ? window.location.href : ''
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      const _message = `[GraphQL error][${operation.operationName}]: ${message}`
      logtail.error(_message, {
        href: href,
        ip: getIpAddress(),
        operation: operation.operationName
      })
    })
  }
})

const httpLink = new HttpLink({
  // Server URL (must be absolute)
  uri: url,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'include'
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache({
      // typePolicies is not required to use Apollo with Next.js - only for doing pagination.
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination()
          }
        }
      }
    })
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  token?: string
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  const middlewareLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? 'Bearer ' + token : null
      }
    }
  })

  _apolloClient.setLink(
    ApolloLink.from([retryLink, errorLink, middlewareLink, httpLink])
  )

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const { data: session } = useSession()
  const token = session?.user?.token
  const store = useMemo(() => {
    const client = initializeApollo(state, token)
    return client
  }, [state, token])
  return store
}
