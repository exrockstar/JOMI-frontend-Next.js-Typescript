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

type State = {
  loading: boolean
  error: string
  input: InstitutionInput
  refetch(): void
} & UseListInputState &
  InstitutionsListQuery['institutions']

const InstitutionListContext = createContext<State | null>(null)

export const InstitutionListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const state = useListInput({
    page: 1,
    sort_by: 'name',
    sort_order: 1,
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

  const { data, loading, error, refetch } = useInstitutionsListQuery({
    skip: !session?.user,
    variables: {
      input
    }
  })

  // perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.institutions.count ?? 0)
    }
  }, [data?.institutions.count, loading, error])

  return (
    <InstitutionListContext.Provider
      value={{
        ...state,
        count: count,
        dbQueryString: data?.institutions?.dbQueryString,
        error: error?.message,
        institutions: data?.institutions.institutions,
        loading,
        input: input,
        refetch
      }}
    >
      {children}
    </InstitutionListContext.Provider>
  )
}

export const useInstitutionList = () => {
  const context = useContext(InstitutionListContext)
  if (!context) {
    throw new Error('No InstitutionAccessProvider in parent!')
  }

  return context
}
