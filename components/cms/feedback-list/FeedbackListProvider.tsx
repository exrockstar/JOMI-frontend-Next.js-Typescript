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
  GetFeedbackListQuery,
  useGetFeedbackListQuery
} from 'graphql/cms-queries/feedback-list.generated'

type State = {
  loading: boolean
  error: string
  refetch(): void
} & UseListInputState &
  GetFeedbackListQuery['output']

const FeedbackListContext = createContext<State | null>(null)

export const FeedbackListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
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

  const { data, loading, error, refetch } = useGetFeedbackListQuery({
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
    <FeedbackListContext.Provider
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
    </FeedbackListContext.Provider>
  )
}

export const useFeedbackList = () => {
  const context = useContext(FeedbackListContext)
  if (!context) {
    throw new Error('No FeedbackListProvider in parent!')
  }

  return context
}
