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
  sortBy: string
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  page: number
  setPage(page: number): void
  pageSize: number
  setPageSize(value: number): void
  searchTerm: string
  setSearchTerm(searchTerm: string): void
}

const RedirectsListContext = createContext<State>({
  redirects: [],
  count: 0,
  loading: false,
  error: "Couldn't load redirects list",
  sortBy: '',
  setSortBy(column: string) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  page: 0,
  setPage(page: number) {},
  pageSize: 10,
  setPageSize(value: number) {},
  searchTerm: '',
  setSearchTerm(searchTerm: string) {}
})

const LOCAL_STORAGE_KEY = 'jomi.redir-list-status'
type RedirListStatus = {
  sortBy: string
  sortOrder: 1 | -1
  page: number
}

export const RedirectsListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [sortBy, setSortBy] = useState('from')
  const [sortOrder, setSortOrder] = useState(1)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState(null)

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

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as RedirListStatus

    if (parsed) {
      setSortBy(parsed.sortBy ?? 'from')
      setSortOrder(parsed.sortOrder ?? 1)
      setPage(parsed.page ?? 1)
    }
  }, [])

  useEffect(() => {
    const stringified = JSON.stringify({
      sortBy,
      sortOrder,
      page
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
  }, [sortBy, sortOrder, page])

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.fetchRedirects.count ?? 0)
    }
  }, [data?.fetchRedirects.count, loading, error])

  return (
    <RedirectsListContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        redirects: data?.fetchRedirects.redirects,
        count: count,
        loading,
        error: error?.message,
        searchTerm,
        setSearchTerm
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
