import {
  TriageQueueListQuery,
  useTriageQueueListQuery
} from 'graphql/cms-queries/triage-queue-list.generated'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import { TriageQueueInput } from 'graphql/types'
type State = {
  triageQueueRequests: TriageQueueListQuery['triageQueueRequests']['triage_requests']
  count: number
  input: TriageQueueInput
  loading: boolean
  error: string
  refetch(): void
  dbQueryString: string
} & UseListInputState

const InstitutionListContext = createContext<State>(null)

export const TriageQueueListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 10
  })
  const { page, pageSize, sortBy, sortOrder, filters } = state
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

  const input: TriageQueueInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    filters: filters
  }
  const { data, loading, error, refetch } = useTriageQueueListQuery({
    skip: !session?.user,
    variables: {
      input: input
    }
  })

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.triageQueueRequests.count ?? 0)
    }
  }, [data?.triageQueueRequests.count, loading, error])

  return (
    <InstitutionListContext.Provider
      value={{
        ...state,
        input,
        triageQueueRequests: data?.triageQueueRequests.triage_requests,
        count: count,
        loading,
        error: error?.message,
        refetch,
        dbQueryString: data?.triageQueueRequests.dbQueryString ?? ''
      }}
    >
      {children}
    </InstitutionListContext.Provider>
  )
}

export const useTriageQueueList = () => {
  const context = useContext(InstitutionListContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
