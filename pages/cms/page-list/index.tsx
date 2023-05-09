import { Alert, Badge, CircularProgress, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {StringOperations } from 'components/common/FilterDrawer/operations'
import { ColumnFilter } from 'graphql/types'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { useState } from 'react'
import { Add, FilterList } from '@mui/icons-material'
import { PagesListProvider, usePagesList } from 'components/cms/pages-list/usePagesList'
import PagesList from 'components/cms/pages-list/PagesList'
import { LoadingButton } from '@mui/lab'
import PageCreateModal from 'components/cms/pages-list/PageCreateModal'

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
    values: [
        'draft',
        'publish',
    ]
},
{
    columnName: 'slug',
    type: 'text',
    label: 'Slug',
    operations: StringOperations
},
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
        filters
    } = usePagesList()
    const [addPageModalOpen, setAddPageModalOpen] = useState(false)

    const onSubmitFilter = (filters: ColumnFilter[]) => {
        setFilters([...filters])
        setPage(1)
        setDrawerOpen(!drawerOpen)
    }
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }
    return(
        <CmsLayout >
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
            <Stack direction={'row'} justifyContent="space-between" px={2} pt={2}>
                <Typography variant="h4" py={1}>Pages</Typography>
                <Typography><Typography fontWeight={'bold'} marginTop={1}>Table Filters&nbsp;</Typography>{filters.length == 0 ? 'None' : `${filters.length} total:` + filters.map((filter, i) => ` ${filter.columnName} ${filter.operation} ${filter.value}`)}</Typography>
                <SearchInput
                    onSubmit={(str)=> {
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
            <LoadingButton
                startIcon={<Add />}
                variant="contained"
                color="secondary"
                onClick={() => setAddPageModalOpen(true)}
                sx={{width:180, height:40, ml:2}}
            >
                Create a Page
            </LoadingButton>
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

