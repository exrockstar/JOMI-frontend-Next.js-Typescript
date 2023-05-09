import {
  TriageQueueListQuery,
  useTriageQueueListQuery
} from 'graphql/cms-queries/triage-queue-list.generated'
import { ColumnFilter, QueryOperation } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
type State = {
  page: number
  setPage(page: number): void
  setSort(sort_by: string, sort_order: number): void
  sortBy: string
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  triageQueueRequests: TriageQueueListQuery['triageQueueRequests']['triage_requests']
  count: number
  pageSize: number
  setPageSize(value: number): void
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
  loading: boolean
  error: string
  refetch(): void
  dbQueryString: string
}

const InstitutionListContext = createContext<State>({
  page: 0,
  setPage(page: number) {},
  sortBy: '',
  setSortBy(column: string) {},
  setSort(sort_by: string, sort_order: number) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  triageQueueRequests: [],
  count: 0,
  loading: false,
  pageSize: 10,
  setPageSize(value: number) {},
  setFilters(filters: ColumnFilter[]) {},
  error: "Couldn't load triage queue requests",
  refetch() {},
  dbQueryString: ''
})

const LOCAL_STORAGE_KEY = 'jomi.triage-list-status'
type InstListStatus = {
  filters: ColumnFilter[]
}
interface MyQuery extends ParsedUrlQuery {
  page?: string
  page_size?: string
  sort_by?: string
  sort_order?: string
  search?: string
}
export const TriageQueueListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()
  const query = router.query as MyQuery

  const page = parseInt(query.page ?? '1')
  const sortBy = query.sort_by ?? 'created'
  const sortOrder = parseInt(query.sort_order || '-1')
  const pageSize = parseInt(query.page_size ?? '10')

  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState<ColumnFilter[]>([])

  const setPage = (page: number) => {
    router.push({
      query: {
        ...query,
        page
      }
    })
  }
  const setSort = (sort_by: string, sort_order: number) => {
    router.push({
      query: {
        ...query,
        sort_by,
        sort_order
      }
    })
  }
  const setSortBy = (sort_by: string) => {
    router.push({
      query: {
        ...query,
        sort_by
      }
    })
  }

  const setSortOrder = (sort_order: number) => {
    router.push({
      query: {
        ...query,
        sort_order
      }
    })
  }

  const setPageSize = (page_size: number) => {
    router.push({
      query: {
        ...query,
        page_size,
        page: 1
      }
    })
  }
  const { data, loading, error, refetch } = useTriageQueueListQuery({
    skip: !session?.user,
    variables: {
      input: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort_by: sortBy,
        sort_order: sortOrder,
        filters: filters
      }
    }
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as InstListStatus

    if (parsed) {
      setFilters(parsed.filters ?? [])
    }
  }, [])

  useEffect(() => {
    const stringified = JSON.stringify({
      filters
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
  }, [filters, sortBy, sortOrder, page])

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.triageQueueRequests.count ?? 0)
    }
  }, [data?.triageQueueRequests.count, loading, error])

  return (
    <InstitutionListContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSortBy,
        setSort,
        sortOrder,
        setSortOrder,
        triageQueueRequests: data?.triageQueueRequests.triage_requests,
        count: count,
        loading,
        pageSize,
        setPageSize,
        error: error?.message,
        filters,
        setFilters,
        refetch,
        dbQueryString: data?.triageQueueRequests.dbQueryString ?? ''
      }}
    >
      {children}
    </InstitutionListContext.Provider>
  )
}

export const useTriageQueueList = () => {
  const context = useContext(InstitutionListContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
