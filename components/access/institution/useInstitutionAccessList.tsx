import { useListInput } from 'components/hooks/useListInput'
import {
  useInstitutionsAccessListQuery,
  InstitutionsAccessListQuery
} from 'graphql/queries/access.generated'
import { QueryOperation } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type State = {
  institutions: InstitutionsAccessListQuery['output']['institutions']
  count: InstitutionsAccessListQuery['output']['count']
  pageSize: number
  loading: boolean
  error: string
  refetch(): void
} & ReturnType<typeof useListInput>

const InstitutionAccessContext = createContext<State | null>(null)

export const InstitutionAccessProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { data: session } = useSession()
  const [count, setCount] = useState(0)

  const state = useListInput({
    page: 1,
    sort_by: 'name',
    sort_order: 1,
    page_size: 10
  })

  const { data, loading, error, refetch } = useInstitutionsAccessListQuery({
    skip: !session,
    variables: {
      input: {
        skip: (state.page - 1) * state.pageSize,
        limit: state.pageSize,
        sort_by: state.sortBy,
        sort_order: state.sortOrder,
        filters: state.filters,
        search: state.searchTerm
      }
    },
    fetchPolicy: 'no-cache'
  })

  // perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.output.count ?? 0)
    }
  }, [data?.output.count, loading, error])

  return (
    <InstitutionAccessContext.Provider
      value={{
        ...state,
        institutions: data?.output.institutions,
        count: count,
        loading,
        error: error?.message,
        refetch
      }}
    >
      {children}
    </InstitutionAccessContext.Provider>
  )
}

export const useInstitutionAccessList = () => {
  const context = useContext(InstitutionAccessContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
