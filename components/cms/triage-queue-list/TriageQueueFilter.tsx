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
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { countries } from '../prices-list/countryList'

const TriageQueueFilter = (props: DrawerProps) => {
  const { filters, setFilters } = useTriageQueueList()
  const { data: userTypesData } = useUserTypesAndSpecialtiesQuery()
  const userTypes = userTypesData?.userTypes?.map((u) => u.type) ?? []
  const specialties = userTypesData?.specialties?.map((s) => s.name) ?? []

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
      type: 'select',
      values: countries.map((c) => c.code),
      labels: countries.map((c) => c.label),
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
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
      columnName: 'institution.category',
      label: 'Institution Category',
      type: 'select',
      operations: StringOperations,
      values: [
        null,
        'Hospital',
        'Residency',
        'Medical School',
        'PA Program',
        'SurgTech',
        'Other'
      ],
      labels: [
        'None',
        'Hospital',
        'Residency',
        'Medical School',
        'PA Program',
        'SurgTech',
        'Other'
      ]
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
      type: 'select',
      values: userTypes,
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      columnName: 'user.specialty',
      label: 'Specialty',
      type: 'select',
      values: specialties,
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
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

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
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
