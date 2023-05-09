import { Drawer, DrawerProps } from '@mui/material'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {
  DateOperations,
  NumericOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import {
  ColumnFilter,
  QueryOperation,
  TriageMarket,
  TriagePriority,
  TriageQueueStatus
} from 'graphql/types'
import React, { useState } from 'react'
import { useTriageQueueList } from './useTriageQueueList'
const columnOptions: ColumnOption[] = [
  {
    columnName: 'user',
    label: 'User',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'user.countryCode',
    label: 'Country',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'user.regionName',
    label: 'Region',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'user.institution_name',
    label: 'Stated Institution',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'institution.name',
    label: 'Matched Institution',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'institution.stats.userCount',
    label: 'User count',
    type: 'number',
    operations: NumericOperations
  },
  {
    columnName: 'institution.stats.totalArticleCount',
    label: 'Article views',
    type: 'number',
    operations: NumericOperations
  },
  {
    columnName: 'institution.stats.loginCount',
    label: 'Login count',
    type: 'number',
    operations: NumericOperations
  },
  {
    columnName: 'user.user_type',
    label: 'User Type',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'user.specialty',
    label: 'Specialty',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'user.isSubscribed', //user.subActive doesn't exist in the db
    label: 'Subscribed',
    type: 'boolean',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    columnName: 'created',
    label: 'Created Date',
    type: 'date',
    operations: DateOperations
  },
  {
    columnName: 'type',
    label: 'Type',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(TriageQueueStatus)
  },
  {
    columnName: 'priority',
    label: 'Priority',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(TriagePriority)
  },
  {
    columnName: 'market',
    label: 'Market',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(TriageMarket)
  },
  {
    columnName: 'notes',
    label: 'Notes',
    type: 'text',
    operations: StringOperations
  }
]

const TriageQueueFilter = (props: DrawerProps) => {
  const { filters, setPage, setFilters } = useTriageQueueList()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
    setPage(1)
    props.onClose && props.onClose({}, 'backdropClick')
  }

  return (
    <Drawer anchor={'right'} {...props}>
      <FilterDrawer
        columnOptions={columnOptions}
        filters={filters}
        onSubmit={onSubmitFilter}
      />
    </Drawer>
  )
}

export default TriageQueueFilter
