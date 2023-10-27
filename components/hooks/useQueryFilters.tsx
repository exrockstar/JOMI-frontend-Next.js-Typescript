import dayjs from 'dayjs'
import { ColumnFilter } from 'graphql/types'
import { useRouter } from 'next/router'

export const useQueryFilters = (
  filterKey: string = 'filters',
  filterOpenKey: string = 'filterOpen'
) => {
  console.log(filterKey, filterOpenKey)
  const router = useRouter()
  const filterOpen = router.query[filterOpenKey] === '1'

  const getFilters = (): ColumnFilter[] => {
    const queryFilters = router.query[filterKey] as string
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

  const setFilters = (filters: ColumnFilter[], filterOpen?: boolean) => {
    if (filters.length) {
      const encoded = filters
        .map((filter) => {
          const { columnName, operation, value } = filter

          const encoded = `${columnName}--${operation}--${value}`
          return encoded
        })
        .join(',')

      router.push(
        {
          query: {
            ...router.query,
            page: 1,
            [filterKey]: encoded,
            [filterOpenKey]: filterOpen ? 1 : 0
          }
        },
        null,
        { shallow: true }
      )
    } else {
      let query = { ...router.query }
      delete query[filterKey]
      delete query[filterOpenKey]
      router.push({ query }, null, { shallow: true })
    }
  }

  const setFilterOpen = function (value: boolean) {
    console.log(filterOpenKey, value)
    router.push(
      {
        query: {
          ...router.query,
          [filterOpenKey]: value ? 1 : 0
        }
      },
      null,
      { shallow: true }
    )
  }

  const filters = getFilters()
  return { filters, setFilters, setFilterOpen, filterOpen }
}
