import React, { useState } from 'react'
import { Drawer } from '@mui/material'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { eventsColumnOptions } from './eventsColumnOptions'
import { useEventsAccessList } from './useEventsAccessList'
import { ColumnFilter } from 'graphql/types'
const EventsFilterDrawer = () => {
  const {
    filters,
    setFilters,
    setPage,
    filterDrawerOpen,
    setFilterDrawerOpen
  } = useEventsAccessList()

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
    setPage(1)
    setFilterDrawerOpen(!filterDrawerOpen)
  }
  return (
    <Drawer
      anchor={'right'}
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
    >
      <FilterDrawer
        columnOptions={eventsColumnOptions}
        filters={filters}
        onSubmit={onSubmitFilter}
      />
    </Drawer>
  )
}

export default EventsFilterDrawer
