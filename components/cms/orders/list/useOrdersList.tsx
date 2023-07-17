import {
  InstitutionsListQuery,
  useInstitutionsListQuery
} from 'graphql/cms-queries/institutions-list.generated'
import { InstitutionInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import {
  OrderListQuery,
  useOrderListQuery
} from 'graphql/cms-queries/order-list.generated'

type State = {
  loading: boolean
  error: string
  refetch(): void
} & UseListInputState &
  OrderListQuery['output']

const OrdersListContext = createContext<State | null>(null)

export const OrdersListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 10
  })
  const { page, pageSize, sortBy, sortOrder, searchTerm, filters } = state
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

  const input: InstitutionInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters: filters,
    search: searchTerm
  }

  const { data, loading, error, refetch } = useOrderListQuery({
    skip: !session?.user,
    variables: {
      input
    },
    fetchPolicy: 'network-only'
  })

  // perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.output.count ?? 0)
    }
  }, [data?.output.count, loading, error])

  return (
    <OrdersListContext.Provider
      value={{
        ...state,
        count: count,
        dbQueryString: data?.output?.dbQueryString,
        error: error?.message,
        orders: data?.output.orders,
        loading,
        refetch
      }}
    >
      {children}
    </OrdersListContext.Provider>
  )
}

export const useOrdersList = () => {
  const context = useContext(OrdersListContext)
  if (!context) {
    throw new Error('No OrdersListProvider in parent!')
  }

  return context
}
