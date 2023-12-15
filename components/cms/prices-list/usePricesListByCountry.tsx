import { PriceFilterInput, QueryOperation, UserInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import { useRouter } from 'next/router'
import {
  PricesByCountryQuery,
  usePricesByCountryQuery
} from 'graphql/cms-queries/prices-list.generated'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  StringOperations,
  NumericOperations
} from 'components/common/FilterDrawer/operations'
import { countries } from './countryList'
import { uniq } from 'lodash'

type State = {
  countries: PricesByCountryQuery['pricesByCountry']['countries']
  count: PricesByCountryQuery['pricesByCountry']['count']
  defaultPrices: PricesByCountryQuery['pricesByCountry']['defaultPrices']
  allProductIds: PricesByCountryQuery['pricesByCountry']['allProductIds']
  loading: boolean
  error: string
  refetch(): void
  input?: PriceFilterInput
  columnOptions: ColumnOption[]
} & UseListInputState

const PricesByCountryContext = createContext<State | null>(null)

export const PricesByCountryListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const router = useRouter()
  const state = useListInput({
    page: 1,
    sort_by: 'code',
    sort_order: 1,
    page_size: 50
  })

  const input: UserInput = {
    skip: (state.page - 1) * state.pageSize,
    limit: state.pageSize,
    sort_by: state.sortBy,
    sort_order: state.sortOrder,
    filters: state.filters
  }

  if (state.searchTerm) {
    input.search = state.searchTerm
  }

  const { data, loading, error, refetch } = usePricesByCountryQuery({
    skip: !session?.user,
    variables: {
      input: input
    }
  })
  const defaultPrices = data?.pricesByCountry.defaultPrices

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.pricesByCountry.count ?? 0)
    }
  }, [data?.pricesByCountry.count, loading, error])

  const allProductIds = data?.pricesByCountry.allProductIds ?? []
  const columnOptions: ColumnOption[] = [
    {
      columnName: 'code',
      label: 'Country Code',
      type: 'select',
      values: [...countries.map((c) => c.code)],
      labels: [...countries.map((c) => c.label)],
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      columnName: 'prices.product',
      label: 'Product',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: allProductIds,
      labels: allProductIds
    },

    {
      columnName: 'prices.interval',
      label: 'Interval',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: ['month', 'year']
    }
  ]
  return (
    <PricesByCountryContext.Provider
      value={{
        ...state,
        count: count,
        countries: data?.pricesByCountry.countries,
        defaultPrices: defaultPrices,
        error: error?.message,
        input,
        loading,
        refetch,
        allProductIds,
        columnOptions
      }}
    >
      {children}
    </PricesByCountryContext.Provider>
  )
}

export const usePricesListByCountry = () => {
  const context = useContext(PricesByCountryContext)
  if (!context) {
    throw new Error('No UserAccessProvider in parent!')
  }

  return context
}
