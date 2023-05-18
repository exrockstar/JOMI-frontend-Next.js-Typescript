import { Box, Tooltip, IconButton, Badge } from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FilterList } from '@mui/icons-material'
import ArticleActivityFilter from './ArticleActivityFilter'
import { useQueryFilters } from 'components/hooks/useQueryFilters'

const ArticleActivityHeader = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { filters } = useQueryFilters()
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
