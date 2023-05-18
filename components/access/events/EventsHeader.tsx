import { FilterList } from '@mui/icons-material'
import {
  Typography,
  Grid,
  Box,
  Tooltip,
  Badge,
  IconButton
} from '@mui/material'

import React, { useMemo } from 'react'
import SearchInput from '../SearchInput'
import { useEventsAccessList } from './useEventsAccessList'

const EventsHeader = () => {
  const {
    setFilterDrawerOpen,
    filterDrawerOpen,
    setSearchTerm,
    searchTerm,
    filters
  } = useEventsAccessList()

  const toggleDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen)
  }

  return (
    <>
      <Typography variant="h4">Events</Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        Search for an access event
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SearchInput
              onSubmit={setSearchTerm}
              placeholder="Search by user id"
              value={searchTerm}
            />
            <Tooltip
              title={`Filter list.  ${filters?.length || 0} filters set`}
            >
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
                <IconButton onClick={toggleDrawer}>
                  <FilterList />
                </IconButton>
              </Badge>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default EventsHeader
