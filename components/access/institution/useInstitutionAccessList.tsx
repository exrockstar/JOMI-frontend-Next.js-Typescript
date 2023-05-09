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
  page: number
  setPage(page: number): void
  sortBy: string
  setSortBy(column: string): void
  sortOrder: number
  setSortOrder(asc: number): void
  searchTerm: string
  setSearchTerm(value: string): void
  institutions: InstitutionsAccessListQuery['output']['institutions']
  count: InstitutionsAccessListQuery['output']['count']
  pageSize: number
  loading: boolean
  error: string
  refetch(): void
}

const InstitutionAccessContext = createContext<State>({
  page: 0,
  setPage(page: number) {},
  sortBy: '',
  setSortBy(column: string) {},
  sortOrder: 1,
  setSortOrder(asc: number) {},
  searchTerm: '',
  setSearchTerm(value: string) {},
  institutions: [],
  count: 0,
  loading: false,
  pageSize: 10,
  error: "Couldn't load institutions",
  refetch() {}
})

export const InstitutionAccessProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const filters = searchTerm
    ? [
        {
          columnName: 'name',
          operation: QueryOperation.Contains,
          value: searchTerm
        }
      ]
    : []

  const { data, loading, error, refetch } = useInstitutionsAccessListQuery({
    skip: !session,
    variables: {
      input: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort_by: sortBy,
        sort_order: sortOrder,
        filters: filters
      }
    }
  })

  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.output.count ?? 0)
    }
  }, [data?.output.count, loading, error])

  return (
    <InstitutionAccessContext.Provider
      value={{
        page,
        setPage,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
        institutions: data?.output.institutions,
        count: count,
        loading,
        pageSize,
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
