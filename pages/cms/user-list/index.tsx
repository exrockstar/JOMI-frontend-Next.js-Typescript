import { Add, Download, FilterList, Visibility } from '@mui/icons-material'
import { LoadingButton, LocalizationProvider } from '@mui/lab'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import { Alert, Badge, Button, CircularProgress, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import AddUserDialog from 'components/cms/user-list/AddUserDialog'
import UserManagementList from 'components/cms/user-list/UserManagementList'

import { useState } from 'react'
import { UserManagementListProvider, useUserManagementList } from 'components/cms/user-list/useUserManagementList'
import { saveJsonToFile } from 'common/saveJsonToFile'
import { useDownloadUserListLazyQuery } from 'graphql/cms-queries/user-list.generated'
import { StringOperations, DateOperations, NumericOperations } from 'components/common/FilterDrawer/operations'
import { UserRoles, QueryOperation, MatchStatus, MatchedBy, ColumnFilter, SubType } from 'graphql/types'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { Router, useRouter } from 'next/router'
import TagUsersToCRM from 'components/cms/user-list/TagUsersToCRM'
import DbQueryDialog from 'components/common/DbQueryDialog'

const columnOptions: ColumnOption[] = [
  {
    label: 'Name',
    columnName: 'name',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Email',
    columnName: 'email',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Role',
    columnName: 'role',
    type: 'select',
    operations: StringOperations,
    values: Object.values(UserRoles)
  },

  {
    label: 'User Type',
    columnName: 'user_type',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Specialty',
    columnName: 'specialty',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Institution name',
    columnName: 'institution_name',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Stated Institution',
    columnName: 'previouslyStatedInstitutions.name',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Registration date',
    columnName: 'created',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Promo code',
    columnName: 'promo_code',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Referrer',
    columnName: 'referer',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Interest',
    columnName: 'interests',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Subscription Type',
    columnName: 'subscription.subType',
    type: 'text',
    // operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    operations: StringOperations
    // values: Object.values(SubType)
  },
  {
    label: 'Is User Blocked',
    columnName: 'hasManualBlock',
    type: 'boolean',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  // {
  //   label: 'Social',
  //   columnName: 'social',
  //   type: 'text',
  //   operations: StringOperations
  // },
  {
    label: 'Match Status',
    columnName: 'matchStatus',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(MatchStatus).map((val) =>
      val
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase()
    )
  },
  {
    label: 'Matched By',
    columnName: 'matchedBy',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: ['admin', 'email', 'ip', 'institution_name', 'institutional_email', 'not_matched']
  },
  {
    label: 'Country Code',
    columnName: 'countryCode',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Region Name',
    columnName: 'regionName',
    type: 'text',
    operations: StringOperations
  },

  {
    label: 'Login Count',
    columnName: 'loginCount',
    type: 'text',
    operations: NumericOperations
  },
  {
    label: 'View Count',
    columnName: 'articleCount',
    type: 'text',
    operations: NumericOperations
  },
  {
    label: 'Last Visited',
    columnName: 'last_visited',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Referrer Path',
    columnName: 'referrerPath',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Has Requested Subscription',
    columnName: 'hasRequestedSubscription',
    type: 'boolean',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    label: 'Request Count',
    columnName: 'requestSubscriptionCount',
    type: 'number',
    operations: NumericOperations
  }
]
const UserManagementListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addDialoglOpen, setAddDialogOpen] = useState(false)
  const [addLibrarian, setAddLibrarian] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const router = useRouter()
  const { users, loading, error, sortBy, sortOrder, filters, setFilters, dbQueryString } = useUserManagementList()

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }

  const [download] = useDownloadUserListLazyQuery({
    fetchPolicy: 'no-cache'
  })

  return (
    <CmsLayout>
      <DbQueryDialog open={showQuery} onClose={() => setShowQuery(false)} queryStr={dbQueryString} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <FilterDrawer onSubmit={onSubmitFilter} columnOptions={columnOptions} filters={filters} />
        </Drawer>
        {addDialoglOpen && (
          <AddUserDialog
            open={addDialoglOpen}
            addLibrarian={addLibrarian}
            onClose={() => {
              setAddDialogOpen(false)
              setAddLibrarian(false)
            }}
          />
        )}

        <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
            <Typography variant="h4">User Management</Typography>
            <LoadingButton
              startIcon={<Add />}
              variant="contained"
              color="primary"
              onClick={() => setAddDialogOpen(true)}
            >
              Add User
            </LoadingButton>
            <LoadingButton
              startIcon={<Add />}
              variant="contained"
              color="primary"
              onClick={() => {
                setAddDialogOpen(true)
                setAddLibrarian(true)
              }}
            >
              Add Librarian
            </LoadingButton>
            <Tooltip title="Download results as JSON file. 1000 user limit" arrow>
              <LoadingButton
                startIcon={<Download />}
                variant="outlined"
                loading={downloading}
                onClick={async () => {
                  setDownloading(true)
                  const { data } = await download({
                    variables: {
                      input: {
                        sort_by: sortBy,
                        sort_order: sortOrder,
                        filters,
                        skip: 0,
                        limit: 1000
                      }
                    }
                  })
                  saveJsonToFile('users.json', data?.users?.users)
                  setDownloading(false)
                }}
              >
                Download
              </LoadingButton>
            </Tooltip>
            <Tooltip title="Display the MongoDB aggregate operation used to filter the data">
              <Button color="primary" onClick={() => setShowQuery(true)} startIcon={<Visibility />}>
                Show DB Query Parameters
              </Button>
            </Tooltip>
            <Typography>
              <Typography fontWeight={'bold'} component="span">
                Table Filters&nbsp;
              </Typography>
              {filters.length == 0
                ? 'None'
                : `${filters.length} total:` +
                  filters.map((filter, i) => ` ${filter.columnName} ${filter.operation} ${filter.value}`)}
            </Typography>
          </Stack>
          <Tooltip title="Filter list">
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
              <IconButton
                onClick={() => {
                  setDrawerOpen(!drawerOpen)
                }}
              >
                <FilterList />
              </IconButton>
            </Badge>
          </Tooltip>
        </Stack>
        <Stack px={2} display="flex" gap={2} direction="row">
          <SearchInput
            onSubmit={(search) => {
              if (!!search) {
                router.push({
                  query: {
                    ...router.query,
                    search,
                    page: 1
                  }
                })
              } else {
                const query = router.query
                delete query.search
                router.push({
                  query: {
                    ...query,
                    page: 1
                  }
                })
              }
            }}
            value={router.query.search as string}
            placeholder="Search user name, email, id..."
          />

          <TagUsersToCRM />
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
            <UserManagementList users={users} />
          </Stack>
        )}
      </LocalizationProvider>
    </CmsLayout>
  )
}

const InstitutionListWrapper = () => {
  return (
    <UserManagementListProvider>
      <UserManagementListPage />
    </UserManagementListProvider>
  )
}
export default InstitutionListWrapper
