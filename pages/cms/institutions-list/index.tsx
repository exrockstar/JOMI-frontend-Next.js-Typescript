import { Add, FilterList, Refresh, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Badge,
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
    dbQueryString
  } = useInstitutionList()

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
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">Institution List</Typography>

          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
          >
            Add Institution
          </LoadingButton>
          <Tooltip title="Runs a job to update all cached institutiton stats. userCount, and articleViews. Completes in about 5 minutes.">
            <LoadingButton
              startIcon={<Refresh />}
              loading={updating}
              onClick={() => {
                updateInstStats()
              }}
            >
              Refresh Inst Stats
            </LoadingButton>
          </Tooltip>
          <Tooltip title="Display the MongoDB aggregate operation used to filter the data">
            <Button
              color="primary"
              onClick={() => setShowQuery(true)}
              startIcon={<Visibility />}
            >
              Show DB Query Parameters
            </Button>
          </Tooltip>
        </Stack>
        <DbQueryDialog
          open={showQuery}
          onClose={() => setShowQuery(false)}
          queryStr={dbQueryString}
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
            <IconButton onClick={toggleDrawer}>
              <FilterList />
            </IconButton>
          </Badge>
        </Tooltip>
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
