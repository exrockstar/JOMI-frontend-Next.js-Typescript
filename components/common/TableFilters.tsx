import { Typography } from '@mui/material'
import { ColumnFilter } from 'graphql/types'

type Props = {
  filters: ColumnFilter[]
}

function formatTableFilters(filters: ColumnFilter[]) {
  return filters
    .map((filter) => {
      return `${filter.columnName} ${filter.operation} ${filter.value}`
    })
    .join('and ')
}

const TableFilters = ({ filters }: Props) => {
  const noFilters = !filters.length
  const total = noFilters ? '' : `(${filters.length} total)`
  const formatted = formatTableFilters(filters)
  return (
    <Typography variant="caption">
      Table Filters{total}: {noFilters ? 'None' : formatted}
    </Typography>
  )
}
export default TableFilters
