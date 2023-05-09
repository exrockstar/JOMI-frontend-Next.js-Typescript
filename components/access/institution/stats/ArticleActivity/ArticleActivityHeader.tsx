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
import { FilterList } from '@mui/icons-material'
import UserStatsFilter from '../InstitutionUsersStats/UserStatsFilter'
import ArticleActivityFilter from './ArticleActivityFilter'

const ArticleActivityHeader = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const query = router.query
  const search = (query.search as string) ?? ''
  const handleSearch = (val: string) => {
    const newQuery = {
      ...query,
      search: val
    }

    if (!val) {
      delete newQuery.search
    }
    router.push({
      query: newQuery
    })
  }

  const storage_key = ArticleActivityFilter.STORAGE_KEY
  const filters = useReadLocalStorage<ColumnFilter[]>(storage_key)
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

      <ArticleActivityFilter open={open} setOpen={setOpen} />
    </div>
  )
}

export default ArticleActivityHeader
