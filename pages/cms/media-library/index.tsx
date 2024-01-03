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

import { useMediaLibraryLazyQuery } from 'graphql/cms-queries/media-library.generated'
import dayjs from 'dayjs'
import useCsvDownload from 'components/cms/useCsvDownload'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

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
    sortBy,
    sortOrder,
    refetch
  } = useMediaLibraryList()

  const [fetchFunc] = useMediaLibraryLazyQuery({ fetchPolicy: 'no-cache' })
  const getMainData = (data) => {
    return data?.files.files ?? []
  }
  const convertFunc = (media) => {
    const created = dayjs(media.uploadDate).format('MM/DD/YYYY')
    return {
      'FILE NAME': media.filename,
      TITLE: media.metadata?.title ?? 'N/A',
      DESCRIPTION: media.metadata?.description ?? 'N/A',
      'UPLOAD DATE': created
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
    totalCount: count,
    collection: 'media-library',
    filters,
    sort_by: sortBy,
    sort_order: sortOrder
  })

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
      <Typography variant="h4" p={2} pt={5}>
        Media Library
      </Typography>
      <Stack direction={'row'} justifyContent="space-between" p={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddDialogOpen(true)}
          >
            Upload File
          </LoadingButton>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
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
        <Stack>
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
