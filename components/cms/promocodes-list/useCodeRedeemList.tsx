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
  PromoCodeRedeemListQuery,
  usePromoCodeRedeemListQuery
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import { useListInput, UseListInputState } from 'components/hooks/useListInput'

type State = {
  orders: PromoCodeRedeemListQuery['orders']['items']
  totalCount: number
  loading: boolean
  error: string
  setSelectedItems(id: string[]): void
  selectedItems: string[]
  refetch(): void
} & UseListInputState

const StripePromoCodesListContext = createContext<State>(null)

export const PromocodeRedeemListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()
  const id = router.query.id as string
  const [totalCount, setTotalCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const { data: session } = useSession()

  const state = useListInput({
    page: 1,
    sort_by: 'created',
    page_size: 50,
    sort_order: -1
  })
  const { sortBy, sortOrder, pageSize, page, searchTerm, filters } = state
  const { data, loading, error, refetch } = usePromoCodeRedeemListQuery({
    skip: !session?.user,
    variables: {
      id: id,
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
      setTotalCount(data?.orders.totalCount ?? 0)
    }
  }, [data?.orders.totalCount, loading, error])

  return (
    <StripePromoCodesListContext.Provider
      value={{
        ...state,
        orders: data?.orders.items,
        totalCount: totalCount,
        loading,
        error: error?.message,
        selectedItems,
        setSelectedItems,
        refetch
      }}
    >
      {children}
    </StripePromoCodesListContext.Provider>
  )
}

export const useCodeRedeemList = () => {
  const context = useContext(StripePromoCodesListContext)
  if (!context) {
    throw new Error('No ArticlesAccessProvider in parent!')
  }

  return context
}
