import { useQueryFilters } from 'components/hooks/useQueryFilters'
import {
  MediaLibraryQuery,
  useMediaLibraryQuery
} from 'graphql/cms-queries/media-library.generated'
import { ParsedUrlQuery } from 'querystring'
import { ColumnFilter, QueryOperation } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'

type State = {
  searchMediaName(searchTerm: string): void
  medias: MediaLibraryQuery['files']['files']
  count: MediaLibraryQuery['files']['count']
  loading: boolean
  error: string
  refetch(): void
} & UseListInputState

const MediaLibraryListContext = createContext<State>(null)

export const MediaLibraryListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    sort_by: 'filename',
    sort_order: 1,
    page_size: 10
  })
  const { page, pageSize, sortBy, sortOrder, filters, setFilters } = state
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

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
        ...state,
        searchMediaName,
        medias: data?.files.files,
        count: count,
        loading,
        error: error?.message,
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
