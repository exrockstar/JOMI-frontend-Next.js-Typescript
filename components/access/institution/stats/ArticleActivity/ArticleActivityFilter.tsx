import { Drawer } from '@mui/material'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { ColumnFilter, QueryOperation } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
type Props = {
  open: boolean
  setOpen(open: boolean): void
}

const ArticleActivityFilter = ({ open, setOpen }: Props) => {
  const { filters, setFilters } = useQueryFilters()

  const onSubmitFilter = (newFilters: ColumnFilter[]) => {
    setFilters(newFilters)
    setOpen(false)
  }

  const columnOptions: ColumnOption[] = [
    {
      columnName: 'article.status',
      label: 'Article Status',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: ['preprint', 'publish']
    },
    {
      columnName: 'created',
      label: 'Activity Date',
      type: 'date',
      operations: [QueryOperation.Before, QueryOperation.After]
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
export default ArticleActivityFilter
