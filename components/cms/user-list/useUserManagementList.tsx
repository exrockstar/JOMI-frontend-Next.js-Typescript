import {
  UserManagementListQuery,
  useUserManagementListQuery
} from 'graphql/cms-queries/user-list.generated'
import { ParsedUrlQuery } from 'querystring'
import { QueryOperation, ColumnFilter, UserInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
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
  setSort(sort_by: string, sort_order: number): void
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  searchUserName(searchTerm: string): void
  users: UserManagementListQuery['users']['users']
  count: UserManagementListQuery['users']['count']
  pageSize: number
  setPageSize(value: number): void
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
  loading: boolean
  error: string
  refetch(): void
  input?: UserInput
  dbQueryString: string
}

const UserManagementListContext = createContext<State>({
  page: 0,
  setPage(page: number) {},
  sortBy: '',
  setSortBy(column: string) {},
  setSort(sort_by: string, sort_order: number) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  searchUserName(value: string) {},
  users: [],
  count: 0,
  loading: false,
  pageSize: 10,
  setPageSize(value: number) {},
  setFilters(filters: ColumnFilter[]) {},
  error: "Couldn't load Users",
  refetch() {},
  dbQueryString: ''
})
const LOCAL_STORAGE_KEY = 'jomi.user-list-status'

type ListStatus = {
  filters: ColumnFilter[]
}

interface MyQuery extends ParsedUrlQuery {
  page?: string
  page_size?: string
  sort_by?: string
  sort_order?: string
  search?: string
}

export const UserManagementListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()
  const query = router.query as MyQuery

  const page = parseInt(query.page ?? '1')
  const sortBy = query.sort_by ?? 'created'
  const sortOrder = parseInt(query.sort_order || '-1')
  const pageSize = parseInt(query.page_size ?? '50')
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState<ColumnFilter[]>([])
  const search = query.search

  const input: UserInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters: filters
  }

  if (search) {
    input.search = search
  }
  const { data, loading, error, refetch } = useUserManagementListQuery({
    skip: !session?.user,
    variables: {
      input: input
    }
  })
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

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as ListStatus

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
      setCount(data?.users.count ?? 0)
    }
  }, [data?.users.count, loading, error])

  const searchUserName = (searchTerm: string) => {
    const nameFilter = filters.find((filter) => filter.columnName === 'name')
    if (nameFilter) {
      setFilters(
        filters.map((filter) => {
          if (filter === nameFilter) {
            return {
              ...filter,
              value: searchTerm.trim()
            }
          }
          return filter
        })
      )
    } else {
      setFilters([
        {
          columnName: 'name',
          operation: QueryOperation.Contains,
          value: searchTerm
        },
        ...filters
      ])
    }
  }
  return (
    <UserManagementListContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSortBy,
        setSort,
        sortOrder,
        setSortOrder,
        searchUserName,
        users: data?.users.users,
        count: count,
        loading,
        pageSize,
        setPageSize,
        error: error?.message,
        filters,
        setFilters,
        refetch,
        input,
        dbQueryString: data?.users.dbQueryString
      }}
    >
      {children}
    </UserManagementListContext.Provider>
  )
}

export const useUserManagementList = () => {
  const context = useContext(UserManagementListContext)
  if (!context) {
    throw new Error('No UserAccessProvider in parent!')
  }

  return context
}
