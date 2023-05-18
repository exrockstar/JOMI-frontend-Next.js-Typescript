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
import {
  GetStripePromoCodesQuery,
  useGetStripePromoCodesQuery
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'

type State = {
  promocodes: GetStripePromoCodesQuery['getStripePromoCodes']['items']
  totalCount: number
  loading: boolean
  error: string
  setSelectedItems(id: string[]): void
  selectedItems: string[]
  refetch(): void
} & UseListInputState

const StripePromoCodesListContext = createContext<State | null>(null)

export const StripePromoCodesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { data: session } = useSession()
  const [totalCount, setTotalCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 50
  })

  const { sortBy, sortOrder, pageSize, page, searchTerm, filters } = state
  const { data, loading, error, refetch } = useGetStripePromoCodesQuery({
    skip: !session?.user,
    variables: {
      input: {
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search: searchTerm,
        filters: filters
      }
    },
    nextFetchPolicy: 'network-only'
  })

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setTotalCount(data?.getStripePromoCodes.totalCount ?? 0)
    }
  }, [data?.getStripePromoCodes.totalCount, loading, error])

  return (
    <StripePromoCodesListContext.Provider
      value={{
        ...state,
        error: error?.message,
        loading,
        promocodes: data?.getStripePromoCodes.items,
        refetch,
        selectedItems,
        setSelectedItems,
        totalCount: totalCount
      }}
    >
      {children}
    </StripePromoCodesListContext.Provider>
  )
}

export const useStripePromoCodesList = () => {
  const context = useContext(StripePromoCodesListContext)
  if (!context) {
    throw new Error('No ArticlesAccessProvider in parent!')
  }

  return context
}
