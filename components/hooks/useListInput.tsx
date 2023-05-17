import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useQueryFilters } from './useQueryFilters'
export interface MyListInputQuery extends ParsedUrlQuery {
  page?: string
  page_size?: string
  sort_by?: string
  sort_order?: string
  search?: string
}

export type InitialInputState = Partial<{
  page: number
  page_size: number
  sort_by: string
  sort_order: 1 | -1
  search: string
}>
/**
 * uses NextJS Router to store list/table inputs such as page, page_size, sort_by, sort_order, filters, search, etc.
 * @param initial initial values
 * @returns
 */
export const useListInput = (initial: InitialInputState) => {
  const router = useRouter()
  let query = router.query as MyListInputQuery

  const page = query.page ? parseInt(query.page) : initial.page
  const sortBy = query.sort_by ?? initial.sort_by
  const sortOrder = query.sort_order
    ? parseInt(query.sort_order)
    : initial.sort_order
  const pageSize = query.page_size
    ? parseInt(query.page_size)
    : initial.page_size
  const { filters, setFilters } = useQueryFilters()
  const searchTerm = query.search as string

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

  const setSearchTerm = (search_term: string) => {
    query = {
      ...query,
      page: '1',
      search: search_term
    }
    if (!search_term) {
      delete query.search
    }

    router.push({ query })
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    setSort,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchTerm: searchTerm,
    setSearchTerm,
    filters,
    setFilters
  }
}

export type UseListInputState = ReturnType<typeof useListInput>
