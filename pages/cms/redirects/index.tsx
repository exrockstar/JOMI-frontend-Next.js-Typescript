import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, CircularProgress, Stack, Typography } from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import RedirectsCreateModal from 'components/cms/redirects/RedirectsCreateModal'
import RedirectsList from 'components/cms/redirects/RedirectsList'
import {
  RedirectsListProvider,
  useRedirectsList
} from 'components/cms/redirects/useRedirectsList'
import { useState } from 'react'

import { useRedirectsListLazyQuery } from 'graphql/cms-queries/redirects-list.generated'
import useCsvDownload from 'components/cms/useCsvDownload'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const RedirectsListPage = () => {
  const {
    redirects,
    loading,
    error,
    count,
    sortBy,
    sortOrder,
    searchTerm,
    setSearchTerm,
    setPage
  } = useRedirectsList()
  const [addRedirectModalOpen, setAddRedirectModalOpen] = useState(false)

  const [fetchFunc] = useRedirectsListLazyQuery({ fetchPolicy: 'no-cache' })

  const convertFunc = (redir) => {
    return {
      ABOUT: redir.name || 'N/A',
      FROM: redir.from,
      TO: redir.to,
      CLICKS: redir.stats?.length ?? 0,
      AUTHOR: redir.author
        ? redir.author.name.first + ' ' + redir.author.name.last
        : 'None',
      TYPE: redir.type
    }
  }

  const getMainData = (data) => {
    return data?.fetchRedirects.redirects ?? []
  }

  const {
    downloadCsv,
    loading: csvLoading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    collection: 'redirect',
    sort_order: sortOrder,
    sort_by: sortBy,
    search_term: searchTerm,
    totalCount: count
  })

  return (
    <CmsLayout>
      <Typography variant="h4" p={2}>
        Redirects
      </Typography>
      <Stack
        px={2}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {/* Add Redirect Modal goes here */}
        <RedirectsCreateModal
          open={addRedirectModalOpen}
          onClose={() => setAddRedirectModalOpen(false)}
        />
        <Stack direction={'row'} spacing={2}>
          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddRedirectModalOpen(true)}
          >
            Create a Redirect
          </LoadingButton>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
        </Stack>
        <SearchInput
          onSubmit={(str) => {
            setSearchTerm(str)
            setPage(1)
          }}
          placeholder="Search by About, From, or To"
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
          <RedirectsList redirects={redirects} count={count} />
        </Stack>
      )}
    </CmsLayout>
  )
}
const RedirectsListPageWrapper = () => {
  return (
    <RedirectsListProvider>
      <RedirectsListPage />
    </RedirectsListProvider>
  )
}
export default RedirectsListPageWrapper
