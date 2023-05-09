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

const RedirectsListPage = () => {
    const {
        redirects,
        loading,
        error,
        count,
        setSearchTerm,
        setPage
    } = useRedirectsList()
    const [addRedirectModalOpen, setAddRedirectModalOpen] = useState(false)
    return(
        <CmsLayout >
            <Stack px={2}>
                <Typography variant="h4" py={2}>Redirects</Typography>
                {/* Add Redirect Modal goes here */}
                <RedirectsCreateModal
                    open={addRedirectModalOpen}
                    onClose={() => setAddRedirectModalOpen(false)}
                />
                <LoadingButton
                    startIcon={<Add />}
                    variant="contained"
                    color="primary"
                    onClick={() => setAddRedirectModalOpen(true)}
                    sx={{width:200, marginBottom:2}}
                    
                >
                    Create a Redirect
                </LoadingButton>
                <SearchInput
                    onSubmit={(str)=> {
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