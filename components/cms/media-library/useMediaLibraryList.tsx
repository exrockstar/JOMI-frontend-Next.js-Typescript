import {
  MediaLibraryQuery,
  useMediaLibraryQuery
} from 'graphql/cms-queries/media-library.generated'

import { ColumnFilter, QueryOperation } from 'graphql/types'
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
  searchMediaName(searchTerm: string): void
  medias: MediaLibraryQuery['files']['files']
  count: MediaLibraryQuery['files']['count']
  pageSize: number
  setPageSize(value: number): void
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
  loading: boolean
  error: string
  refetch(): void
}

const MediaLibraryListContext = createContext<State>({
  page: 0,
  setPage(page: number) {},
  searchMediaName(value: string) {},
  medias: [],
  sortBy: '',
  setSortBy(column: string) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  count: 0,
  loading: false,
  pageSize: 10,
  setPageSize(value: number) {},
  setFilters(filters: ColumnFilter[]) {},
  error: "Couldn't load institutions",
  refetch() {}
})

const LOCAL_STORAGE_KEY = 'jomi.media-library-status'
type MediaListStatus = {
  page: number
  sortBy: string
  sortOrder: 1 | -1
  filters: ColumnFilter[]
}
export const MediaLibraryListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('filename')
  const [sortOrder, setSortOrder] = useState(1)

  const [pageSize, setPageSize] = useState(10)
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [filters, setFilters] = useState<ColumnFilter[]>([])

  const { data, loading, error, refetch } = useMediaLibraryQuery({
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
    const parsed = JSON.parse(saved) as MediaListStatus

    if (parsed) {
      setPage(parsed.page ?? 1)
      setFilters(parsed.filters ?? [])
      setSortBy(parsed.sortBy ?? 'filename')
      setSortOrder(parsed.sortOrder ?? 1)
    }
  }, [])

  useEffect(() => {
    const stringified = JSON.stringify({
      page,
      filters,
      sortBy,
      sortOrder
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, stringified)
  }, [filters, sortBy, sortOrder, page])

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.files.count ?? 0)
    }
  }, [data?.files.count, loading, error])

  const searchMediaName = (searchTerm: string) => {
    const nameFilter = filters.find(
      (filter) => filter.columnName === 'filename'
    )
    if (nameFilter) {
      setFilters(
        filters.map((filter) => {
          if (filter === nameFilter) {
            return {
              ...filter,
              value: searchTerm
            }
          }
          return filter
        })
      )
    } else {
      setFilters([
        {
          columnName: 'filename',
          operation: QueryOperation.Contains,
          value: searchTerm
        },
        ...filters
      ])
    }
  }
  return (
    <MediaLibraryListContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        searchMediaName,
        medias: data?.files.files,
        count: count,
        loading,
        pageSize,
        setPageSize,
        error: error?.message,
        filters,
        setFilters,
        refetch
      }}
    >
      {children}
    </MediaLibraryListContext.Provider>
  )
}

export const useMediaLibraryList = () => {
  const context = useContext(MediaLibraryListContext)
  if (!context) {
    throw new Error('No MediaLibraryList in parent!')
  }

  return context
}
