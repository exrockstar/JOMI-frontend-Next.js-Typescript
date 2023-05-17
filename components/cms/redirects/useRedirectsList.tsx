import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import {
  RedirectsListQuery,
  useRedirectsListQuery
} from 'graphql/cms-queries/redirects-list.generated'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type State = {
  redirects: RedirectsListQuery['fetchRedirects']['redirects']
  count: RedirectsListQuery['fetchRedirects']['count']
  loading: boolean
  error: string
} & UseListInputState

const RedirectsListContext = createContext<State>(null)

export const RedirectsListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [count, setCount] = useState(0)
  const state = useListInput({
    page: 1,
    sort_order: 1,
    sort_by: 'from',
    page_size: 10
  })
  const { sortBy, sortOrder, page, pageSize, searchTerm } = state
  const { data: session } = useSession()
  const { data, loading, error } = useRedirectsListQuery({
    skip: !session?.user,
    variables: {
      input: {
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search_term: searchTerm
      }
    }
  })

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.fetchRedirects.count ?? 0)
    }
  }, [data?.fetchRedirects.count, loading, error])

  return (
    <RedirectsListContext.Provider
      value={{
        ...state,
        redirects: data?.fetchRedirects.redirects,
        count: count,
        loading,
        error: error?.message
      }}
    >
      {children}
    </RedirectsListContext.Provider>
  )
}

export const useRedirectsList = () => {
  const context = useContext(RedirectsListContext)
  if (!context) {
    throw new Error('No RedirectsAccessProvider in parent!')
  }

  return context
}
