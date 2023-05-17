import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import {
  AccessEventsQuery,
  useAccessEventsQuery
} from 'graphql/queries/access.generated'
import { AccessFilterInput, ColumnFilter } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type State = {
  events: AccessEventsQuery['output']['events']
  count: AccessEventsQuery['output']['count']
  loading: boolean
  filterDrawerOpen: boolean
  setFilterDrawerOpen(open: boolean): void
  error: string
  refetch(): void
} & UseListInputState

const EventsAccessContext = createContext<State>(null)

export const EventsAccessListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

  const state = useListInput({
    page: 1,
    sort_order: -1,
    sort_by: 'created',
    page_size: 10
  })

  const { page, sortOrder, sortBy, pageSize, filters, searchTerm } = state
  const input: AccessFilterInput = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    sort_order: sortOrder,
    sort_by: sortBy,
    filters: filters
  }

  if (searchTerm) {
    input.search = searchTerm
  }

  const { data, loading, error, refetch } = useAccessEventsQuery({
    skip: !session,
    variables: {
      input: input
    }
  })

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.output.count ?? 0)
    }
  }, [data?.output.count, loading, error])

  return (
    <EventsAccessContext.Provider
      value={{
        ...state,
        count,
        error: error?.message,
        events: data?.output.events,
        filterDrawerOpen,
        loading,

        refetch,
        setFilterDrawerOpen
      }}
    >
      {children}
    </EventsAccessContext.Provider>
  )
}

export const useEventsAccessList = () => {
  const context = useContext(EventsAccessContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
