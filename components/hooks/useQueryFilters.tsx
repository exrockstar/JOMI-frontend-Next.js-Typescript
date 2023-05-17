import dayjs from 'dayjs'
import { ColumnFilter } from 'graphql/types'
import { useRouter } from 'next/router'

export const useQueryFilters = () => {
  const router = useRouter()

  const getFilters = (): ColumnFilter[] => {
    const queryFilters = router.query.filters as string
    const input = queryFilters?.split(',') ?? []

    if (!input) return []
    return input.map((filter) => {
      // template "{columnName}-{operation}-{value}"
      const [columnName, operation, value] = filter.split('--')
      return {
        columnName,
        operation,
        value
      } as ColumnFilter
    })
  }

  const setFilters = (filters: ColumnFilter[]) => {
    if (filters.length) {
      const encoded = filters
        .map((filter) => {
          const { columnName, operation, value } = filter

          const encoded = `${columnName}--${operation}--${value}`
          return encoded
        })
        .join(',')

      router.push({
        query: {
          ...router.query,
          page: 1,
          filters: encoded
        }
      })
    } else {
      let query = { ...router.query }
      delete query.filters
      router.push({ query })
    }
  }

  const filters = getFilters()
  return { filters, setFilters }
}
