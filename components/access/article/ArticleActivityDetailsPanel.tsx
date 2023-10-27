import {
  Alert,
  Badge,
  Box,
  Card,
  CircularProgress,
  Divider,
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
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useInstArticleEventLogsQuery } from 'graphql/queries/access.generated'
import { AccessFilterInput, QueryOperation } from 'graphql/types'
import { useRouter } from 'next/router'
import dayjs, { Dayjs } from 'dayjs'
import ArticleActivityTableHead from './ArticleActivityTableHead'
import { useInstitutionByIdQuery } from 'graphql/cms-queries/institutions-list.generated'
import SearchInput from '../SearchInput'
import { ArrowBack, FilterList } from '@mui/icons-material'
import Link from 'next/link'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { end } from 'cheerio/lib/api/traversing'
import CustomDatePicker from 'components/common/CustomDatePicker'
import { cleanObj } from 'common/utils'
import { useState } from 'react'
import GlobalFilterDrawer from '../institution/GlobalFilterDrawer'
import FilterButton from 'components/common/FilterButton'

const ArticleActivityDetailsPanel = () => {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { filters: globalFilters } = useQueryFilters('global')

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
  const start = router.query.start as string | null
  const end = router.query.end as string | null
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
    institution_id: institution,
    startDate: start,
    endDate: end,
    filters: [
      {
        columnName: 'article_id',
        operation: QueryOperation.Equal,
        value: articleId
      },
      ...filters
    ],
    globalFilters
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
  const handleDateChange = (newVal: Dayjs, prop: 'end' | 'start') => {
    const query = router.query
    if (!newVal) {
      delete query[prop]
      router.push({ query })
      return
    }
    if (newVal.isValid()) {
      const formatted = newVal?.format('YYYY-MM-DD')
      router.push({
        query: {
          ...query,
          [prop]: formatted
        }
      })
    }
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
      <Box display={'flex'} gap={4}>
        <Stack direction="row" gap={2} alignItems="center" mb={2}>
          <Typography fontWeight={600}>Period</Typography>
          <CustomDatePicker
            defaultLabel="Start date"
            value={start}
            onChange={(val?: Dayjs) => {
              handleDateChange(val, 'start')
            }}
          />
          <CustomDatePicker
            defaultLabel="End date"
            value={end}
            onChange={(val?: Dayjs) => {
              handleDateChange(val, 'end')
            }}
          />
        </Stack>

        <FilterButton
          description="Global Filter - across access pages"
          filterOpenKey="gf_open"
          filterKey="global"
        />
      </Box>
    </Box>
  )

  const articleTitle = events && events[0]?.article_title
  return (
    <>
      <GlobalFilterDrawer />

      <Box p={2} minHeight="100vh">
        <Box py={2}>
          <Typography variant="h3" component="h1">
            <Link
              href={{
                pathname: `/access/${institution}/articles`,
                query: cleanObj({
                  start,
                  end,
                  global: router.query.global
                })
              }}
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
                        <TableCell>{user?.email ?? 'anonymous'}</TableCell>
                        <TableCell>
                          {user?.display_name ?? 'anonymous'}
                        </TableCell>
                        <TableCell>{item.ip_address_str}</TableCell>
                      </StyledTableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  )
}

export default ArticleActivityDetailsPanel
