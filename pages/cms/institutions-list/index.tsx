import { Add, FilterList, Refresh, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Badge,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import AddInstitutionDialog from 'components/cms/institutions-list/AddInstitutionDialog'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import InstitutionsList from 'components/cms/institutions-list/InstitutionsList'
import {
  InstitutionListProvider,
  useInstitutionList
} from 'components/cms/institutions-list/useInstitutionList'

import { useState } from 'react'
import {
  StringOperations,
  NumericOperations,
  DateOperations
} from 'components/common/FilterDrawer/operations'
import { ColumnFilter, QueryOperation, StatusType } from 'graphql/types'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { useUpdateAllInstStatsMutation } from 'graphql/mutations/update-inst-stats.generated'
import DbQueryDialog from 'components/common/DbQueryDialog'
import RefreshInstStatsButton from 'components/institutions/RefreshInstStatsButton'
import TransferDuplicateDomainDialog from 'components/cms/institutions-list/TransferDuplicateDomainsDialog'
import DownloadIcon from '@mui/icons-material/Download'

import useCsvDownload from 'components/cms/useCsvDownload'
import { useInstitutionsListLazyQuery } from 'graphql/cms-queries/institutions-list.generated'
import dayjs from 'dayjs'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const columnOptions: ColumnOption[] = [
  {
    columnName: 'name',
    type: 'text',
    label: 'Name',
    operations: StringOperations
  },
  {
    columnName: 'category',
    type: 'text',
    label: 'Category',
    operations: StringOperations
  },
  {
    columnName: 'stats.userCount',
    type: 'number',
    label: 'User count',
    operations: NumericOperations
  },
  {
    columnName: 'stats.totalArticleCount',
    type: 'number',
    label: 'Article count',
    operations: NumericOperations
  },
  {
    columnName: 'stats.videoBlocks',
    type: 'number',
    label: 'Video Blocks',
    operations: NumericOperations
  },
  {
    columnName: 'stats.uniqueVideoBlocks',
    type: 'number',
    label: 'Unique Video Blocks',
    operations: NumericOperations
  },
  {
    columnName: 'subscription.status',
    type: 'select',
    label: 'Subscription status',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(StatusType)
  },
  {
    columnName: 'created',
    type: 'date',
    label: 'Date Created',
    operations: DateOperations
  },
  {
    columnName: 'expiry_date_cached',
    type: 'date',
    label: 'Expiry Date',
    operations: DateOperations
  },
  {
    columnName: 'domains',
    type: 'text',
    label: 'Domains',
    operations: StringOperations
  },
  {
    columnName: 'show_on_subscribers_page',
    type: 'boolean',
    label: 'Show on subscribers page',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    columnName: 'image.filename',
    type: 'text',
    label: 'Image Filename',
    operations: StringOperations
  },
  {
    columnName: 'urlLink',
    type: 'text',
    label: 'Url Link',
    operations: StringOperations
  },
  {
    columnName: 'subscription.expiredOrderStatus',
    type: 'text',
    label: 'Expired Order Status',
    operations: StringOperations
  },
  {
    columnName: 'triagequeue.created',
    type: 'date',
    label: 'Total Requests after date',
    operations: [QueryOperation.After]
  }
]

const InstitutionsListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addDialoglOpen, setAddDialogOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const {
    institutions,
    loading,
    error,
    count,
    filters,
    setSearchTerm,
    setFilters,
    searchTerm,
    dbQueryString,
    sortBy,
    sortOrder
  } = useInstitutionList()

  const [fetchFunc] = useInstitutionsListLazyQuery({ fetchPolicy: 'no-cache' })

  const getMainData = (data) => {
    return data?.institutions.institutions
  }

  const convertFunc = (inst) => {
    const created = dayjs(inst.created).format('MM/DD/YYYY')
    const expiry = inst.expiry_date_cached
      ? dayjs(inst.expiry_date_cached).format('MM/DD/YYYY')
      : 'N/A'

    return {
      'INSTITUTION NAME': inst.name,
      CATEGORY: inst.category ?? 'N/A',
      USERS: inst.user_count,
      ACCESS: inst.total_article_count,
      'PENDING REQUESTS': inst.pending_requests,
      'SENT REQUESTS': inst.sent_requests,
      'TOTAL REQUESTING USERS': inst.total_requests,
      'VIDEO BLOCKS': inst.stats?.videoBlocks ?? 0,
      'UNUNIQUE VIDEO BLOCKS': inst.stats?.uniqueVideoBlocks ?? 0,
      'DATE CREATED': created,
      'ORDER STATUS': inst.subscription.status?.toUpperCase(),
      EXPIRY: expiry
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
    collection: 'institution',
    search: searchTerm,
    filters,
    sort_by: sortBy,
    sort_order: sortOrder,
    totalCount: count
  })

  const [updateInstStats, { loading: updating }] =
    useUpdateAllInstStatsMutation()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
    setDrawerOpen(!drawerOpen)
  }
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <CmsLayout>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
        <FilterDrawer
          columnOptions={columnOptions}
          filters={filters}
          onSubmit={onSubmitFilter}
        />
      </Drawer>
      <AddInstitutionDialog
        open={addDialoglOpen}
        onClose={() => setAddDialogOpen(false)}
      />
      <TransferDuplicateDomainDialog
        open={transferDialogOpen}
        onClose={() => setTransferDialogOpen(false)}
      />
      <Typography variant="h4" p={2} pb={0}>
        Institution List
      </Typography>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        p={2}
        alignItems="flex-start"
      >
        <Stack
          px={2}
          spacing={{ xs: 1, sm: 1 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
          >
            Add Institution
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={() => setTransferDialogOpen(true)}
            title="Allows admins to transfer domain data such as access logs and users to a target institution."
          >
            Transfer Domain Data
          </LoadingButton>
          <Tooltip title="Runs a job to update all cached institutiton stats. userCount, and articleViews. Completes in about 5 minutes.">
            <RefreshInstStatsButton />
          </Tooltip>
          <Tooltip title="Display the MongoDB aggregate operation used to filter the data">
            <Button
              color="primary"
              onClick={() => setShowQuery(true)}
              startIcon={<Visibility />}
              variant="outlined"
            >
              Show DB Query Parameters
            </Button>
          </Tooltip>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
        </Stack>
        <DbQueryDialog
          onClose={() => setShowQuery(false)}
          open={showQuery}
          queryStr={dbQueryString}
        />
        <Box>
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
              <IconButton onClick={toggleDrawer}>
                <FilterList />
              </IconButton>
            </Badge>
          </Tooltip>
        </Box>
      </Stack>
      <Stack px={2}>
        <SearchInput
          onSubmit={setSearchTerm}
          placeholder="Search name, domain, aliases, id"
          value={searchTerm}
        />
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
          <InstitutionsList institutions={institutions} count={count} />
        </Stack>
      )}
    </CmsLayout>
  )
}

const InstitutionListWrapper = () => {
  return (
    <InstitutionListProvider>
      <InstitutionsListPage />
    </InstitutionListProvider>
  )
}
export default InstitutionListWrapper
