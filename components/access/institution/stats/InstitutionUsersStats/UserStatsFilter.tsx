import { Drawer } from '@mui/material'
import { eventsColumnOptions } from 'components/access/events/eventsColumnOptions'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { StringOperations } from 'components/common/FilterDrawer/operations'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { ColumnFilter, QueryOperation, UserRoles } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
type Props = {
  open: boolean
  setOpen(open: boolean): void
}

export enum _MatchedBy {
  InstitutionalEmail = 'institutional_email',
  InstituionalName = 'institution_name',
  Email = 'email',
  IP = 'ip',
  Admin = 'admin',
  NotMatched = 'not_matched'
}
const UserStatsFilter = ({ open, setOpen }: Props) => {
  const router = useRouter()
  const [filters, setFilters] = useLocalStorage<ColumnFilter[]>(
    UserStatsFilter.STORAGE_KEY,
    []
  )
  const { data } = useUserTypesAndSpecialtiesQuery({
    fetchPolicy: 'cache-first'
  })

  const onSubmitFilter = (newFilters: ColumnFilter[]) => {
    setFilters(newFilters)
    setOpen(false)
    router.push({
      query: {
        ...router.query,
        page: 1
      }
    })
  }

  const columnOptions: ColumnOption[] = [
    {
      columnName: 'email',
      label: 'Email',
      type: 'text',
      operations: StringOperations
    },
    {
      columnName: 'inst_email',
      label: 'Institutional Email',
      type: 'text',
      operations: StringOperations
    },

    {
      columnName: 'specialty',
      label: 'Specialty',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: data?.specialties.map((i) => i.name)
    },
    {
      columnName: 'matchedBy',
      label: 'Matched By',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: Object.values(_MatchedBy)
    },
    {
      columnName: 'role',
      label: 'Role',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: [UserRoles.User, UserRoles.Author, UserRoles.Librarian]
    },
    {
      columnName: 'specialty',
      label: 'Specialty',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: data?.specialties.map((i) => i.name)
    },
    {
      columnName: 'user_type',
      label: 'User Type',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: data?.userTypes.map((i) => i.type)
    },
    {
      columnName: 'created',
      label: 'Registered',
      type: 'date',
      operations: [QueryOperation.Before, QueryOperation.After]
    },
    {
      columnName: 'last_visited',
      label: 'Last Visited',
      type: 'date',
      operations: [QueryOperation.Before, QueryOperation.After]
    },
    {
      columnName: 'subscription.lastSubType',
      label: 'Access',
      type: 'text',
      operations: StringOperations
    }
  ]
  return (
    <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
      <FilterDrawer
        columnOptions={columnOptions}
        filters={filters}
        onSubmit={onSubmitFilter}
      />
    </Drawer>
  )
}
export default UserStatsFilter

UserStatsFilter.STORAGE_KEY = 'jomi.user-stats-filter'
