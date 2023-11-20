import {
  UserManagementListQuery,
  useUserManagementListQuery
} from 'graphql/cms-queries/user-list.generated'
import { UserInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { UseListInputState, useListInput } from 'components/hooks/useListInput'
import { useRouter } from 'next/router'

type State = {
  users: UserManagementListQuery['users']['users']
  count: UserManagementListQuery['users']['count']
  loading: boolean
  error: string
  refetch(): void
  input?: UserInput
  dbQueryString: string
  showAuthorsOnly: boolean
  setShowAuthorsOnly(val: 1 | 0): void
} & UseListInputState

const UserManagementListContext = createContext<State | null>(null)

export const UserManagementListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { data: session } = useSession()
  const [count, setCount] = useState(0)
  const router = useRouter()
  const query = router.query
  const showAuthorsOnly = parseInt(query.showAuthorsOnly as string) === 1
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 50
  })

  const input: UserInput = {
    skip: (state.page - 1) * state.pageSize,
    limit: state.pageSize,
    sort_by: state.sortBy,
    sort_order: state.sortOrder,
    filters: state.filters,
    showAuthorsOnly: showAuthorsOnly
  }

  if (state.searchTerm) {
    input.search = state.searchTerm
  }

  const { data, loading, error, refetch } = useUserManagementListQuery({
    skip: !session?.user,
    variables: {
      input: input
    }
  })

  function setShowAuthorsOnly(val: 1 | 0) {
    router.push({
      query: {
        ...query,
        showAuthorsOnly: val,
        page: 1
      }
    })
  }
  //perserve previous count
  useEffect(() => {
    if (!loading && !error) {
      setCount(data?.users.count ?? 0)
    }
  }, [data?.users.count, loading, error])

  return (
    <UserManagementListContext.Provider
      value={{
        ...state,
        count: count,
        dbQueryString: data?.users.dbQueryString,
        error: error?.message,
        input,
        loading,
        refetch,
        users: data?.users.users,
        showAuthorsOnly,
        setShowAuthorsOnly
      }}
    >
      {children}
    </UserManagementListContext.Provider>
  )
}

export const useUserManagementList = () => {
  const context = useContext(UserManagementListContext)
  if (!context) {
    throw new Error('No UserAccessProvider in parent!')
  }

  return context
}
