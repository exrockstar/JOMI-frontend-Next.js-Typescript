import { Add, FilterList } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  IconButton,
  Badge,
  Tooltip,
  Alert,
  CircularProgress,
  Drawer,
  Stack,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {
  MediaLibraryListProvider,
  useMediaLibraryList
} from 'components/cms/media-library/useMediaLibraryList'

import { useState } from 'react'
import {
  StringOperations,
  NumericOperations,
  DateOperations
} from 'components/common/FilterDrawer/operations'
import { ColumnFilter } from 'graphql/types'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import MediaLibraryList from 'components/cms/media-library/MediaLibraryList'
import UploadImageDialog from 'components/cms/UploadImage/UploadImageDialog'

const columnOptions: ColumnOption[] = [
  {
    columnName: 'filename',
    type: 'text',
    label: 'File Name',
    operations: StringOperations
  },
  {
    columnName: 'metadata.title',
    type: 'text',
    label: 'Title',
    operations: NumericOperations
  },
  {
    columnName: 'metadata.description',
    type: 'text',
    label: 'Description',
    operations: NumericOperations
  },
  {
    columnName: 'uploadDate',
    type: 'date',
    label: 'Upload Date',
    operations: DateOperations
  }
]

const MediaLibaryListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const {
    medias,
    loading,
    error,
    count,
    searchMediaName,
    filters,
    setFilters,
    refetch
  } = useMediaLibraryList()

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
      <UploadImageDialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false)
        }}
        onCompleted={() => {
          setAddDialogOpen(false)
          refetch()
        }}
      />
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">Media Library</Typography>

          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
          >
            Upload File
          </LoadingButton>
          <Typography>
            <Typography fontWeight={'bold'}>Table Filters&nbsp;</Typography>
            {filters.length == 0
              ? 'None'
              : `${filters.length} total:` +
                filters.map(
                  (filter, i) =>
                    ` ${filter.columnName} ${filter.operation} ${filter.value}`
                )}
          </Typography>
        </Stack>
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
          onSubmit={searchMediaName}
          placeholder="Search image name..."
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
          <MediaLibraryList medias={medias} count={count} />
        </Stack>
      )}
    </CmsLayout>
  )
}

const MediaLibaryListWrapper = () => {
  return (
    <MediaLibraryListProvider>
      <MediaLibaryListPage />
    </MediaLibraryListProvider>
  )
}
export default MediaLibaryListWrapper
