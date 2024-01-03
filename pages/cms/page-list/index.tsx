import {
  Alert,
  Badge,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { StringOperations } from 'components/common/FilterDrawer/operations'
import { ColumnFilter } from 'graphql/types'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { useState } from 'react'
import { Add, FilterList } from '@mui/icons-material'
import {
  PagesListProvider,
  usePagesList
} from 'components/cms/pages-list/usePagesList'
import PagesList from 'components/cms/pages-list/PagesList'
import { LoadingButton } from '@mui/lab'
import PageCreateModal from 'components/cms/pages-list/PageCreateModal'
import { usePagesListLazyQuery } from 'graphql/cms-queries/pages-list.generated'
import useCsvDownload from 'components/cms/useCsvDownload'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const columnOptions: ColumnOption[] = [
  {
    columnName: 'title',
    type: 'text',
    label: 'Title',
    operations: StringOperations
  },
  {
    columnName: 'status',
    type: 'select',
    label: 'Status',
    operations: StringOperations,
    values: ['draft', 'publish']
  },
  {
    columnName: 'slug',
    type: 'text',
    label: 'Slug',
    operations: StringOperations
  }
]
const PagesListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const {
    pages,
    loading,
    error,
    totalCount,
    setSearchTerm,
    setPage,
    setFilters,
    filters,
    searchTerm,
    sortBy,
    sortOrder
  } = usePagesList()

  const [fetchFunc] = usePagesListLazyQuery({ fetchPolicy: 'no-cache' })

  const getMainData = (data) => {
    return data?.fetchPages.pages ?? []
  }

  const convertFunc = (page) => {
    return {
      TITLE: page.title || 'N/A',
      STATUS: page.status || 'N/A',
      SLUG: page.slug || 'N/A',
      AUTHOR: page.author
        ? page.author.name.first + ' ' + page.author.name.last
        : 'N/A'
    }
  }

  const {
    downloadCsv,
    loading: csvLoading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    totalCount,
    collection: 'page-list',
    search_term: searchTerm,
    filters,
    sort_by: sortBy,
    sort_order: sortOrder
  })

  const [addPageModalOpen, setAddPageModalOpen] = useState(false)

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
    setDrawerOpen(!drawerOpen)
  }
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <CmsLayout>
      <PageCreateModal
        open={addPageModalOpen}
        onClose={() => setAddPageModalOpen(false)}
      />
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
        <FilterDrawer
          columnOptions={columnOptions}
          filters={filters}
          onSubmit={onSubmitFilter}
        />
      </Drawer>
      <Typography variant="h4" p={2} pt={5}>
        Pages
      </Typography>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        px={2}
        pt={0}
        alignItems="center"
      >
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="secondary"
            onClick={() => setAddPageModalOpen(true)}
          >
            Create a Page
          </LoadingButton>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
          <Typography fontWeight={'bold'} marginTop={1}>
            <Typography>Table Filters&nbsp;</Typography>
            {filters.length == 0
              ? 'None'
              : `${filters.length} total:` +
                filters.map(
                  (filter, i) =>
                    ` ${filter.columnName} ${filter.operation} ${filter.value}`
                )}
          </Typography>
        </Stack>
        <SearchInput
          onSubmit={(str) => {
            setSearchTerm(str)
            setPage(1)
          }}
          placeholder="Search by one of the column headers"
        />
        <Tooltip
          title={`Filter list.  ${filters?.length || 0} filters set`}
          placement="left"
          arrow
        >
          <Badge
            badgeContent={filters?.length}
            color="secondary"
            invisible={!filters?.length}
            sx={{
              '& .MuiBadge-badge': {
                right: 8,
                top: 30
              }
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <FilterList />
            </IconButton>
          </Badge>
        </Tooltip>
      </Stack>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          <CircularProgress />
        </Stack>
      ) : error ? (
        <Stack p={2}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Stack>
      ) : (
        <Stack p={2}>
          <PagesList pages={pages} totalCount={totalCount} />
        </Stack>
      )}
    </CmsLayout>
  )
}
const PagesListWrapper = () => {
  return (
    <PagesListProvider>
      <PagesListPage />
    </PagesListProvider>
  )
}
export default PagesListWrapper
