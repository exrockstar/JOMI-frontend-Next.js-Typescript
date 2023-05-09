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
}

const ArticlesListContext = createContext<State>({
  articles: [],
  totalCount: 0,
  loading: false,
  error: "Couldn't load articles list",
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
  setFilters(filters: ColumnFilter[]) {},
  setSelectedItems(id: string[]) {},
  selectedItems: [],
  refetch() {}
})

const LOCAL_STORAGE_KEY = 'jomi.articles-list-status'
interface MyQuery extends ParsedUrlQuery {
  page?: string
  page_size?: string
  sort_by?: string
  sort_order?: string
  search?: string
}

type ArticlesListStatus = {
  sortBy: string
  sortOrder: 1 | -1
  page: number
  filters: ColumnFilter[]
}

export const ArticlesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()
  const query = router.query as MyQuery

  const page = parseInt(query.page ?? '1')
  const sortBy = query.sort_by ?? 'title'
  const sortOrder = parseInt(query.sort_order || '-1')
  const pageSize = parseInt(query.page_size ?? '50')

  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [filters, setFilters] = useState<ColumnFilter[]>([])
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
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search_term: searchTerm,
        filters: filters
      }
    },
    nextFetchPolicy: 'network-only'
  })

  const refetch = () => {
    _reftech({
      input: {
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search_term: searchTerm,
        filters: filters
      }
    })
  }
  const setPage = (page: number) => {
    router.push({
      query: {
        ...query,
        page
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

  //Grab data from the cache (if there is any) and set input options accordingly
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    const parsed = JSON.parse(saved) as ArticlesListStatus

    if (parsed) {
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
      setTotalCount(data?.fetchArticles.totalCount ?? 0)
    }
  }, [data?.fetchArticles.totalCount, loading, error])

  return (
    <ArticlesListContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        articles: data?.fetchArticles.articles,
        totalCount: totalCount,
        loading,
        error: error?.message,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        selectedItems,
        setSelectedItems,
        refetch
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
