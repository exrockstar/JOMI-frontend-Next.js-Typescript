import { Drawer } from '@mui/material'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { ColumnFilter, QueryOperation } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
type Props = {
  open: boolean
  setOpen(open: boolean): void
}

const ArticleActivityFilter = ({ open, setOpen }: Props) => {
  const router = useRouter()
  const [filters, setFilters] = useLocalStorage<ColumnFilter[]>(
    ArticleActivityFilter.STORAGE_KEY,
    []
  )

  const onSubmitFilter = (newFilters: ColumnFilter[]) => {
    if (!newFilters.length) {
      router.reload()
    }
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

ArticleActivityFilter.STORAGE_KEY = 'jomi.article-activity-filter'
