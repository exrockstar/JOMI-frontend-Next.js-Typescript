import { PromoCodeListInput } from 'graphql/types'
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
  GetAllPromoCodesQuery,
  useGetAllPromoCodesQuery
} from 'graphql/cms-queries/promocode-list.generated'

type State = {
  loading: boolean
  error: string
  refetch(): void
  input: PromoCodeListInput
  isSubscription: boolean
  setIsSubScription(val: boolean): void

} & UseListInputState &
  GetAllPromoCodesQuery['getAllPromoCodes']

const PromoCodesListContext = createContext<State | null>(null)

export const PromoCodesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 10,
  })
  const { page, pageSize, sortBy, sortOrder, searchTerm, filters } = state
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const [isSubscription, setStateSubscription] = useState(true)

  const input: PromoCodeListInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters: filters,
    search: searchTerm,
    isSubscription: isSubscription
  }

  const { data, loading, error, refetch } = useGetAllPromoCodesQuery({
    skip: !session?.user,
    variables: {
      input
    },
    fetchPolicy: 'network-only'
  })

  function setIsSubScription(val) {
    setStateSubscription(val);
  }

  // perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.getAllPromoCodes.count ?? 0)
    }
  }, [data?.getAllPromoCodes.promocodes, loading, error])

  return (
    <PromoCodesListContext.Provider
      value={{
        ...state,
        input: input,
        count: count,
        dbQueryString: data?.getAllPromoCodes?.dbQueryString,
        error: error?.message,
        loading,
        promocodes: data?.getAllPromoCodes.promocodes,
        refetch,
        isSubscription,
        setIsSubScription
      }}
    >
      {children}
    </PromoCodesListContext.Provider>
  )
}

export const usePromoCodesList = () => {
  const context = useContext(PromoCodesListContext)
  if (!context) {
    throw new Error('No PromoCodesListProvider in parent!')
  }

  return context
}
