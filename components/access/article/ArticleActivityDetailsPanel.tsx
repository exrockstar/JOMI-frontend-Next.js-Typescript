import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import {
  useAccessEventsQuery,
  useInstArticleEventLogsQuery
} from 'graphql/queries/access.generated'
import {
  ColumnFilter,
  AccessFilterInput,
  QueryOperation,
  AccessTypeEnum,
  ActivityType
} from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import dayjs from 'dayjs'
import ArticleActivityTableHead from './ArticleActivityTableHead'
import { useInstitutionByIdQuery } from 'graphql/cms-queries/institutions-list.generated'
import SearchInput from '../SearchInput'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
const ArticleActivityDetailsPanel = () => {
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const search = router.query.search as string
  const institution = router.query.id as string
  const articleId = router.query.articleId as string
  const page = parseInt((router.query.page as string) ?? '1')
  const activity = (router.query.activity as string) ?? 'All'
  const perPage = 20
  const skip = (page - 1) * perPage
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const { filters } = useQueryFilters()

  const id = router.query.id as string
  const { data: institutionData } = useInstitutionByIdQuery({
    variables: {
      id
    }
  })
  const input: AccessFilterInput = {
    sort_by,
    sort_order,
    limit: perPage,
    skip,
    filters: [
      {
        columnName: 'institution',
        operation: QueryOperation.Equal,
        value: institution
      },
      {
        columnName: 'article_id',
        operation: QueryOperation.Equal,
        value: articleId
      },
      ...filters
    ]
  }
  if (activity !== 'All') {
    input.filters.push({
      columnName: 'activity',
      value: activity,
      operation: QueryOperation.Equal
    })
  }
  if (search) {
    input.search = search
  }

  const { data, loading, error } = useInstArticleEventLogsQuery({
    variables: { input },
    skip: !institution || !articleId
  })

  const events = data?.output?.events || []
  const count = data?.output?.count || 0
  const pageCount = Math.ceil(count / perPage)

  const handlePageChange = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page
      }
    })
  }
  const handleSearch = (search: string) => {
    router.push({
      query: {
        ...router.query,
        search
      }
    })
  }
  const handleActivityChange = (event: SelectChangeEvent) => {
    const activity = event.target.value as string
    router.push({
      query: {
        ...router.query,
        activity
      }
    })
  }
  const TablePagination = (
    <Box
      p={1}
      display="flex"
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Box display="flex" alignItems="center">
        <Pagination
          count={pageCount}
          shape="rounded"
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
        {!!count && (
          <Typography color="text.secondary">
            {skip + 1} to {Math.min(skip + perPage, count)} of {count} items
          </Typography>
        )}
      </Box>
      <FormControl sx={{ width: 140 }}>
        <InputLabel id="select-label">Filter by Activity</InputLabel>
        <Select
          value={activity}
          label="Filter by Activity"
          labelId="select-label"
          id="simple-select"
          size="small"
          onChange={handleActivityChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'article'}>Article View</MenuItem>
          <MenuItem value={'video-play'}>Video Play</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )

  const articleTitle = events && events[0]?.article_title
  return (
    <Box p={2} minHeight="100vh">
      <Box py={2}>
        <Typography variant="h3" component="h1">
          <Link
            href={`/access/${institution}/articles`}
            passHref
            legacyBehavior
          >
            <IconButton color="primary">
              <ArrowBack />
            </IconButton>
          </Link>
          {institutionData?.institution?.name}
        </Typography>
        <Typography variant="h5">Access logs for {articleTitle}</Typography>
      </Box>
      <Box>
        <SearchInput
          onSubmit={handleSearch}
          placeholder="Filter by user "
          value={search}
        />
      </Box>
      <Card>
        <TableContainer>
          {TablePagination}
          <Table sx={{ minWidth: 1050 }}>
            <ArticleActivityTableHead />
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Stack py={10} alignItems="center">
                      <CircularProgress />
                      <Typography>Loading</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <Stack py={10} alignItems="center" spacing={1}>
                  <Alert severity="error">{error.message}</Alert>
                </Stack>
              )}
              {!!events?.length &&
                events?.map((item, index) => {
                  const user = item.user
                  return (
                    <StyledTableRow key={index}>
                      <TableCell>
                        {dayjs(item.created).format('MM/DD/YYYY hh:mm A')}
                      </TableCell>
                      <TableCell>{item.activity}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.display_name}</TableCell>
                      <TableCell>{item.ip_address_str}</TableCell>
                    </StyledTableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default ArticleActivityDetailsPanel
