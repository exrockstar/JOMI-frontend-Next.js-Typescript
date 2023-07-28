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
  InstFeedbackListQuery,
  useInstFeedbackListQuery
} from 'graphql/queries/access.generated'
import { useRouter } from 'next/router'

type State = {
  loading: boolean
  error: string
  refetch(): void
} & UseListInputState &
  InstFeedbackListQuery['output']

const OrdersListContext = createContext<State | null>(null)

export const InstFeedbackListProvider: React.FC<
  PropsWithChildren & { institution_id: string }
> = ({ children, institution_id }) => {
  const state = useListInput({
    page: 1,
    sort_by: 'createdAt',
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

  const { data, loading, error, refetch } = useInstFeedbackListQuery({
    skip: !session?.user,
    variables: {
      institution_id,
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
        error: error?.message,
        items: data?.output.items,
        loading,
        refetch
      }}
    >
      {children}
    </OrdersListContext.Provider>
  )
}

export const useInstitutionFeedbackList = () => {
  const context = useContext(OrdersListContext)
  if (!context) {
    throw new Error('No OrdersListProvider in parent!')
  }

  return context
}
