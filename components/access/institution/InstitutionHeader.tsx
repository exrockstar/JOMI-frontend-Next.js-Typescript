import {
  Typography,
  Stack,
  MenuItem,
  Select,
  Pagination,
  Grid
} from '@mui/material'

import React, { useMemo } from 'react'
import SearchInput from '../SearchInput'
import { useInstitutionAccessList } from './useInstitutionAccessList'

const InstitutionHeader = () => {
  const {
    page,
    setPage,
    count,
    pageSize,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setSearchTerm
  } = useInstitutionAccessList()
  const pageCount = Math.ceil(count / pageSize)
  console.log('count ', count, pageCount)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPage(1)
  }

  const paginationSummary = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = page * pageSize
    if (count > 0) {
      return `${start} to ${end} out of ${count} results.`
    }
    return 'No results to display'
  }, [count, page, pageSize])

  return (
    <>
      <Typography variant="h4">Institutions</Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        Select an insitution below
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <SearchInput
            onSubmit={handleSearch}
            placeholder="Search institution name..."
          />
        </Grid>
        <Grid item sm={12}>
          <Stack
            mb={2}
            alignItems="center"
            direction="row"
            flexWrap={'wrap'}
            justifyContent="flex-start"
          >
            <Pagination
              count={pageCount}
              shape="rounded"
              page={page}
              onChange={(event, newPage) => {
                setPage(newPage)
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {paginationSummary}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default InstitutionHeader
