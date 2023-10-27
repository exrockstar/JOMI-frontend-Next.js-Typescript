import { FilterList } from '@mui/icons-material'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import React from 'react'

type Props = {
  description?: string
  filterOpenKey?: string
  filterKey?: string
}

const FilterButton = (props: Props) => {
  const desc = props.description ?? 'Filter list'
  const { filters, filterOpen, setFilterOpen } = useQueryFilters(
    props.filterKey,
    props.filterOpenKey
  )

  return (
    <>
      <Tooltip title={desc}>
        <Badge
          badgeContent={filters?.length}
          color="secondary"
          invisible={!filters?.length}
          sx={{
            '& .MuiBadge-badge': {
              right: 8,
              top: 12
            }
          }}
        >
          <IconButton
            onClick={() => {
              setFilterOpen(!filterOpen)
            }}
          >
            <FilterList />
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  )
}

export default FilterButton
