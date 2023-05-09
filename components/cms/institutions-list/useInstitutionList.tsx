import {
  InstitutionsListQuery,
  useInstitutionsListQuery
} from 'graphql/cms-queries/institutions-list.generated'
import { ParsedUrlQuery } from 'querystring'
import { ColumnFilter, InstitutionInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

type State = {
  page: number
  setPage(page: number): void
  sortBy: string
  setSort(sort_by: string, sort_order: number): void
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  searchInstitutionName(searchTerm: string): void
  institutions: InstitutionsListQuery['institutions']['institutions']
  count: InstitutionsListQuery['institutions']['count']
  pageSize: number
  setPageSize(value: number): void
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
  loading: boolean
  error: string
  refetch(): void
  search?: string
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
  searchInstitutionName(value: string) {},
  institutions: [],
  count: 0,
  loading: false,
  pageSize: 10,
  setPageSize(value: number) {},
  setFilters(filters: ColumnFilter[]) {},
  error: "Couldn't load institutions",
  refetch() {},
  dbQueryString: ''
})

const LOCAL_STORAGE_KEY = 'jomi.inst-list-status'
type InstListStatus = {
  filters: ColumnFilter[]
}

interface MyQuery extends ParsedUrlQuery {
  page: string
  page_size: string
  sort_by: string
  sort_order: string
}

export const InstitutionListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()
  const query = router.query as MyQuery

  const page = parseInt(query.page ?? '1')
  const sortBy = query.sort_by ?? 'name'
  const sortOrder = parseInt(query.sort_order || '1')
  const pageSize = parseInt(query.page_size ?? '10')

  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState<ColumnFilter[]>([])
  const input: InstitutionInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters: filters
  }

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

  const search = router.query.search as string
  if (search) {
    input.search = search
  }

  const { data, loading, error, refetch } = useInstitutionsListQuery({
    skip: !session?.user,
    variables: {
      input
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
      setCount(data?.institutions.count ?? 0)
    }
  }, [data?.institutions.count, loading, error])

  const searchInstitutionName = (searchTerm: string) => {
    if (searchTerm) {
      router.push({
        query: {
          ...router.query,
          search: searchTerm,
          page: 1
        }
      })
    } else {
      let query = router.query
      delete query.search
      router.push({
        query: query
      })
    }
  }
  return (
    <InstitutionListContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSort,
        setSortBy,
        sortOrder,
        setSortOrder,
        searchInstitutionName,
        institutions: data?.institutions.institutions,
        count: count,
        loading,
        pageSize,
        setPageSize,
        error: error?.message,
        filters,
        setFilters,
        refetch,
        search,
        dbQueryString: data?.institutions?.dbQueryString
      }}
    >
      {children}
    </InstitutionListContext.Provider>
  )
}

export const useInstitutionList = () => {
  const context = useContext(InstitutionListContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
