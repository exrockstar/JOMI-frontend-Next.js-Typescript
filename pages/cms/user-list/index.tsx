import { Add, Download } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  CircularProgress,
  Drawer,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import AddUserDialog from 'components/cms/user-list/AddUserDialog'
import UserManagementList from 'components/cms/user-list/UserManagementList'

import { useState } from 'react'
import {
  UserManagementListProvider,
  useUserManagementList
} from 'components/cms/user-list/useUserManagementList'
import { saveJsonToFile } from 'common/saveJsonToFile'
import {
  useDownloadUserListLazyQuery,
  useUserManagementListLazyQuery
} from 'graphql/cms-queries/user-list.generated'
import { ColumnFilter } from 'graphql/types'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { useRouter } from 'next/router'
import TagUsersToCRM from 'components/cms/user-list/TagUsersToCRM'
import DbQueryDialog from 'components/common/DbQueryDialog'
import useUserListColumnOptions from 'components/cms/user-list/useUserListColumnOptions'
import FilterButton from 'components/common/FilterButton'
import TableFilters from 'components/common/TableFilters'

import dayjs from 'dayjs'
import useCsvDownload from 'components/cms/useCsvDownload'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const UserManagementListPage = () => {
  const [addDialoglOpen, setAddDialogOpen] = useState(false)
  const [addLibrarian, setAddLibrarian] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const columnOptions = useUserListColumnOptions()
  const router = useRouter()
  const {
    users,
    loading,
    error,
    sortBy,
    sortOrder,
    filters,
    setFilters,
    dbQueryString,
    filterOpen,
    searchTerm,
    showAuthorsOnly,
    count,
    setFilterOpen
  } = useUserManagementList()

  const [fetchFunc] = useUserManagementListLazyQuery({
    fetchPolicy: 'no-cache'
  })

  const convertFunc = (user) => {
    const created = dayjs(user.created).format('MM/DD/YYYY')
    const last_visited = dayjs(user.last_visited).format('MM/DD/YYYY')
    const socialLogins = Object.entries(user.social || {})
      .map((entry) => {
        const [key, value] = entry
        if (key === '__typename') return null
        return !!value ? key : null
      })
      .filter((val) => !!val)
      .join(', ')
    const NotApplicable = 'N/A',
      NotSpecified = 'N/A'

    let referer: string = null
    let refererPath: any = null
    if (user.referer) {
      referer = user.referer === '' ? 'organic' : user.referer
    }
    if (user.referrerPath) {
      refererPath = user.referrerPath === '' ? NotApplicable : user.referrerPath
      if (refererPath != NotApplicable) {
        refererPath = refererPath.replaceAll('+', ' ')
        refererPath = refererPath.replace('?', '')
        refererPath = refererPath.replace(/%\w\w/g, '')
      }
    }

    return {
      EMAIL: user.email || NotSpecified,
      'INSTITUTIONAL EMAIL': user.institutionalEmail || NotSpecified,
      'DISPLAY NAME': user.display_name || NotSpecified,
      ROLE: user.role,
      'USER TYPE': user.user_type || NotSpecified,
      SPECIALTY: user.specialty || NotSpecified,
      'INSTITUTION NAME(STATED)': user.institution_name || NotSpecified,
      'INSTITUTION NAME(MATCHED)':
        user.matched_institution_name || NotApplicable,
      'MATCH STATUS': user.accessType?.matchStatus,
      'LAST VISITED': last_visited,
      REGISTERED: created,
      SUBSCRIBED: user.subscription?.fromInst,
      'PROMO-CODE': user.promo_code || 'N/A',
      LOGINS: user.loginCount ?? 0,
      VIEWS: user.articleCount ?? 0,
      'SOCIAL LOGINS': socialLogins || NotApplicable,
      COUNTRY: user.countryCode || NotApplicable,
      REIGON: user.regionName || NotApplicable,
      REFERRER: referer ?? NotApplicable,
      'REFERRER PATH': refererPath ?? NotApplicable,
      'REQUESTED SUBSCRIPTION': user.hasRequestedSubscription ? 'Yes' : 'No',
      'REQUEST COUNT': user.requestSubscriptionCount ?? 0
    }
  }

  const getMainData = (data) => {
    return data?.users.users ?? []
  }

  const {
    downloadCsv,
    loading: dLoading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    collection: 'user',
    filters,
    sort_by: sortBy,
    sort_order: sortOrder,
    search: searchTerm,
    showAuthorsOnly,
    pageSize: 1000,
    totalCount: count
  })

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters?.length) {
      setFilters([])
    } else {
      setFilters(filters)
    }
  }

  const [download] = useDownloadUserListLazyQuery({
    fetchPolicy: 'no-cache'
  })

  return (
    <CmsLayout>
      <DbQueryDialog
        open={showQuery}
        onClose={() => setShowQuery(false)}
        queryStr={dbQueryString}
      />
      <Drawer
        anchor={'right'}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={columnOptions}
          filters={filters}
        />
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
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
          {/* <DownloadCsvButton
            onClick={downloadCsv}
            loading={dLoading}
            csvProgress={csvProgress}
          /> */}
        </Stack>
        <Box>
          <FilterButton />
        </Box>
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
      <Stack px={2}>
        <TableFilters filters={filters} />
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
