import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  PagesListQuery,
  usePagesListQuery
} from 'graphql/cms-queries/pages-list.generated'
import { useListInput, UseListInputState } from 'components/hooks/useListInput'

type State = {
  pages: PagesListQuery['fetchPages']['pages']
  totalCount: PagesListQuery['fetchPages']['totalCount']
  loading: boolean
  error: string
} & UseListInputState

const PagesListContext = createContext<State>(null)

export const PagesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [totalCount, setTotalCount] = useState(0)
  const { data: session } = useSession()
  const state = useListInput({
    page: 1,
    page_size: 10,
    sort_by: 'title',
    sort_order: 1
  })

  const { page, sortBy, sortOrder, pageSize, filters, searchTerm } = state
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
  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setTotalCount(data?.fetchPages.totalCount ?? 0)
    }
  }, [data?.fetchPages.totalCount, loading, error])

  return (
    <PagesListContext.Provider
      value={{
        ...state,
        pages: data?.fetchPages.pages,
        totalCount: totalCount,
        loading,
        error: error?.message
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
