import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { ColumnFilter } from 'graphql/types'
import {
  PagesListQuery,
  usePagesListQuery
} from 'graphql/cms-queries/pages-list.generated'

type State = {
  pages: PagesListQuery['fetchPages']['pages']
  totalCount: PagesListQuery['fetchPages']['totalCount']
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
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
}

const PagesListContext = createContext<State>({
  pages: [],
  totalCount: 0,
  loading: false,
  error: "Couldn't load pages list",
  sortBy: '',
  setSortBy(column: string) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  page: 0,
  setPage(page: number) {},
  pageSize: 10,
  setPageSize(value: number) {},
  searchTerm: '',
  setSearchTerm(searchTerm: string) {},
  setFilters(filters: ColumnFilter[]) {}
})

const LOCAL_STORAGE_KEY = 'jomi.pages-list-status'
type PagesListStatus = {
  sortBy: string
  sortOrder: 1 | -1
  page: number
  filters: ColumnFilter[]
}

export const PagesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState(1)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState(null)
  const [filters, setFilters] = useState<ColumnFilter[]>([])
  const { data: session } = useSession()

  const { data, loading, error } = usePagesListQuery({
    skip: !session?.user,
    variables: {
      input: {
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search_term: searchTerm,
        filters: filters
      }
    }
  })

  //Grab data from the cache (if there is any) and set input options accordingly
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as PagesListStatus

    if (parsed) {
      setSortBy(parsed.sortBy ?? 'title')
      setSortOrder(parsed.sortOrder ?? 1)
      setPage(parsed.page ?? 1)
      setFilters(parsed.filters ?? [])
    }
  }, [])

  //Convert to JS object to store in the cache
  useEffect(() => {
    const stringified = JSON.stringify({
      sortBy,
      sortOrder,
      page,
      filters
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
  }, [sortBy, sortOrder, page, filters])

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setTotalCount(data?.fetchPages.totalCount ?? 0)
    }
  }, [data?.fetchPages.totalCount, loading, error])

  return (
    <PagesListContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        pages: data?.fetchPages.pages,
        totalCount: totalCount,
        loading,
        error: error?.message,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters
      }}
    >
      {children}
    </PagesListContext.Provider>
  )
}

export const usePagesList = () => {
  const context = useContext(PagesListContext)
  if (!context) {
    throw new Error('No PagesAccessProvider in parent!')
  }

  return context
}
