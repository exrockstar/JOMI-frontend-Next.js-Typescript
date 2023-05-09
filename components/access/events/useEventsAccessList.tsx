import {
  useInstitutionsAccessListQuery,
  InstitutionsAccessListQuery,
  AccessEventsQuery,
  useAccessEventsQuery
} from 'graphql/queries/access.generated'
import {
  AccessFilterInput,
  ActivityType,
  ColumnFilter,
  QueryOperation
} from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type State = {
  page: number
  setPage(page: number): void
  sortBy: string
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  search: string
  setSearch(value: string): void
  events: AccessEventsQuery['output']['events']
  count: AccessEventsQuery['output']['count']
  setPageSize(size: number): void
  pageSize: number
  loading: boolean
  filters?: ColumnFilter[]
  filterDrawerOpen: boolean
  setFilters(filters: ColumnFilter[]): void
  setFilterDrawerOpen(open: boolean): void
  error: string
  refetch(): void
}

const EventsAccessContext = createContext<State>({
  page: 0,
  setPage(page: number) {},
  sortBy: 'created',
  setSortBy(column: string) {},
  sortOrder: -1,
  setSortOrder(asc: number) {},
  search: '',
  setSearch(value: string) {},
  events: [],
  count: 0,
  loading: false,
  setPageSize(size: number) {},
  pageSize: 10,
  error: "Couldn't load events",
  setFilters(filters: ColumnFilter[]) {},
  filterDrawerOpen: false,
  setFilterDrawerOpen(value: boolean) {},
  refetch() {}
})

const LOCAL_STORAGE_KEY = 'jomi.access-events-list'
type TableState = {
  page: number
  sortBy: string
  sortOrder: 1 | -1
  filters: ColumnFilter[]
}
export const EventsAccessListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState(-1)
  const [sortBy, setSortBy] = useState('created')
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState<ColumnFilter[]>([])
  const input: AccessFilterInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_order: sortOrder,
    sort_by: sortBy,
    filters: filters
  }

  if (search) {
    input.search = search
  }
  console.log('input', input)
  const { data, loading, error, refetch } = useAccessEventsQuery({
    skip: !session,
    variables: {
      input: input
    }
  })

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as TableState

    if (parsed) {
      setFilters(parsed.filters ?? [])
      setSortBy(parsed.sortBy ?? 'created')
      setSortOrder(parsed.sortOrder ?? -1)
      setPage(parsed.page ?? 1)
    }
  }, [])

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.output.count ?? 0)
    }
  }, [data?.output.count, loading, error])

  return (
    <EventsAccessContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        sortOrder,
        setSortOrder,
        setSortBy,
        search,
        setSearch,
        events: data?.output.events,
        count: count,
        loading,
        setPageSize,
        pageSize,
        error: error?.message,
        filters,
        setFilters,
        refetch,
        filterDrawerOpen,
        setFilterDrawerOpen
      }}
    >
      {children}
    </EventsAccessContext.Provider>
  )
}

export const useEventsAccessList = () => {
  const context = useContext(EventsAccessContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
