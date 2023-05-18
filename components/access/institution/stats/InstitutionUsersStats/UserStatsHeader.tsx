import {
  Grid,
  Stack,
  Pagination,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Badge
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import page from 'components/account/newsletter/page'
import { ColumnFilter } from 'graphql/types'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import UserStatsFilter from './UserStatsFilter'
import { FilterList } from '@mui/icons-material'
import { useQueryFilters } from '../../../../hooks/useQueryFilters'
type Props = {
  pageCount: number
  count: number
}

const UserStatsHeader = ({ pageCount }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { filters } = useQueryFilters()
  const query = router.query
  const search = (query.search as string) ?? ''
  const page = parseInt((query.page as string) ?? '1')
  const handleSearch = (val: string) => {
    const newQuery = {
      ...query,
      page: 1,
      search: val
    }

    if (!val) {
      delete newQuery.search
    }
    router.push({
      query: newQuery
    })
  }

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <SearchInput
          onSubmit={handleSearch}
          placeholder="Search "
          value={search}
        />
        <Tooltip title={`Filter list.  ${filters?.length || 0} filters set`}>
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
            <IconButton onClick={() => setOpen(true)}>
              <FilterList />
            </IconButton>
          </Badge>
        </Tooltip>
      </Box>

      <UserStatsFilter open={open} setOpen={setOpen} />
    </div>
  )
}

export default UserStatsHeader
