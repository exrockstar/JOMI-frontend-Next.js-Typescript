import {
  ArticlesListQuery,
  useArticlesListQuery
} from 'graphql/cms-queries/articles-list.generated'
import { useSession } from 'next-auth/react'
import { ParsedUrlQuery } from 'querystring'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { ColumnFilter } from 'graphql/types'
import { useRouter } from 'next/router'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'

type State = {
  articles: ArticlesListQuery['fetchArticles']['articles']
  totalCount: ArticlesListQuery['fetchArticles']['totalCount']
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
  setSelectedItems(id: string[]): void
  selectedItems: string[]
  refetch(): void
  allArticleIds: string[]
  selectAllArticleIds: string[]
} & UseListInputState

const ArticlesListContext = createContext<State | null>(null)

interface MyQuery extends ParsedUrlQuery {
  page?: string
  page_size?: string
  sort_by?: string
  sort_order?: string
  search?: string
}

export const ArticlesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    page_size: 50,
    sort_order: -1,
    sort_by: 'title'
  })
  const [totalCount, setTotalCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const { data: session } = useSession()
  const {
    data,
    loading,
    error,
    refetch: _reftech
  } = useArticlesListQuery({
    skip: !session?.user,
    variables: {
      input: {
        sort_by: state.sortBy,
        sort_order: state.sortOrder,
        limit: state.pageSize,
        skip: (state.page - 1) * state.pageSize,
        search_term: state.searchTerm,
        filters: state.filters
      }
    },
    nextFetchPolicy: 'network-only'
  })
  const allArticleIds = data?.allArticleIds
  const selectAllArticleIds = data?.fetchArticles.selectAllArticleIds

  const refetch = () => {
    _reftech({
      input: {
        sort_by: state.sortBy,
        sort_order: state.sortOrder,
        limit: state.pageSize,
        skip: (state.page - 1) * state.pageSize,
        search_term: state.searchTerm,
        filters: state.filters
      }
    })
  }
  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setTotalCount(data?.fetchArticles.totalCount ?? 0)
    }
  }, [data?.fetchArticles.totalCount, loading, error])

  return (
    <ArticlesListContext.Provider
      value={{
        ...state,
        articles: data?.fetchArticles.articles,
        totalCount: totalCount,
        loading,
        error: error?.message,
        selectedItems,
        setSelectedItems,
        refetch,
        allArticleIds,
        selectAllArticleIds,
      }}
    >
      {children}
    </ArticlesListContext.Provider>
  )
}

export const useArticlesList = () => {
  const context = useContext(ArticlesListContext)
  if (!context) {
    throw new Error('No ArticlesAccessProvider in parent!')
  }

  return context
}
