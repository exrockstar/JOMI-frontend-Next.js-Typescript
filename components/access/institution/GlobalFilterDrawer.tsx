import { Drawer, DrawerProps } from '@mui/material'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {
  SelectOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { useCategoriesQuery } from 'graphql/queries/categories.generated'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { ColumnFilter, QueryOperation, AccessTypeEnum } from 'graphql/types'
import React, { useState } from 'react'

const GlobalFilterDrawer = () => {
  const { filters, setFilters, filterOpen, setFilterOpen } = useQueryFilters(
    'global',
    'gf_open'
  )
  const { data: userTypesData } = useUserTypesAndSpecialtiesQuery()
  const { data: categoriesData } = useCategoriesQuery()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters?.length) {
      setFilters([])
    } else {
      setFilters(filters)
    }
  }

  const userTypes = userTypesData?.userTypes?.map((u) => u.type) ?? []
  const columnOptions: ColumnOption[] = [
    {
      label: 'User Type',
      columnName: 'user_type',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: ['anon', ...userTypes],
      labels: ['Anonymous', ...userTypes]
    },
    {
      label: 'Article Category',
      columnName: 'article_categories_flat',
      type: 'select',
      operations: [QueryOperation.Contains, QueryOperation.NotContains],
      values: categoriesData?.categories?.map((c) => c.name),
      labels: categoriesData?.categories?.map((c) => c.displayName)
    },
    {
      label: 'Access Type',
      columnName: 'accessType',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      labels: Object.values(AccessTypeEnum),
      values: [
        10000, 4002, 4003, 3002, 3003, 1001, 5000, 4000, 4001, 3005, 3004, 3000,
        3001, 1000, 2000
      ]
    },
    {
      label: 'Order ID',
      columnName: 'orderId',
      type: 'text',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    // {
    //   label: 'Location ID',
    //   columnName: 'locationId',
    //   type: 'text',
    //   operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    // },
    {
      label: 'Activity Type',
      columnName: 'activity',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: ['article', 'video-play', 'video-block'],
      labels: ['Article View', 'Video Play', 'Video Block']
    }
  ]

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={columnOptions}
          filters={filters}
        />
      </Drawer>
    </div>
  )
}

export default GlobalFilterDrawer
