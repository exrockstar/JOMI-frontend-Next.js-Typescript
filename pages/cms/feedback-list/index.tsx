import { FilterList, Settings } from '@mui/icons-material'
import {
  Alert,
  Badge,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Drawer,
  Button,
  Box
} from '@mui/material'
import { useFeedbackListColumnOptions } from 'components/access/institution/feedback/feedbacklistColumnFilterOptions'
import CmsLayout from 'components/cms/CmsLayout'
import {
  FeedbackListProvider,
  useFeedbackList
} from 'components/cms/feedback-list/FeedbackListProvider'
import TableFilters from 'components/common/TableFilters'
import { ColumnFilter } from 'graphql/types'
import { useState } from 'react'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import FeedbackList from 'components/cms/feedback-list/FeedbackList'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { StringOperations } from 'components/common/FilterDrawer/operations'
import FeedbackSettingsModal from 'components/cms/feedback-list/FeedbackSettingsModal'

import { useGetFeedbackListLazyQuery } from 'graphql/cms-queries/feedback-list.generated'
import useCsvDownload from 'components/cms/useCsvDownload'
import dayjs from 'dayjs'
import { LoadingButton } from '@mui/lab'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const FeedbackListPage = () => {
  const { loading, error, filters, setFilters, sortBy, sortOrder, count } =
    useFeedbackList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const columnOptions = useFeedbackListColumnOptions()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }

  const [fetchFunc] = useGetFeedbackListLazyQuery({ fetchPolicy: 'no-cache' })
  const getMainData = (data) => {
    return data?.output.items ?? []
  }

  const convertFunc = (item) => {
    const maxRating = Math.max(
      ...(item.question?.choices?.map((x) => x.value) ?? [])
    )

    const hasInst = item._institution
    return {
      'USER EMAIL': item.user?.email ?? 'anonymus',
      'ADON LINK TO': item.anon_link_id,
      INSTITUTION: hasInst ? item._institution?.name : 'N/A',
      DATE: dayjs(item.createdAt).format('YYYY-MM-DD'),
      QUESTION: item.question?.question ?? 'N/A',
      RATING: item.value ?? '',
      'MAX RATING': maxRating ?? '',
      COMMENT: item.comment ?? '',
      'USER TYPE': item.user?.user_type ?? 'N/A'
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
    collection: 'feedback',
    sort_order: sortOrder,
    sort_by: sortBy,
    filters
  })

  return (
    <CmsLayout>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={columnOptions}
          filters={filters}
        />
      </Drawer>
      <FeedbackSettingsModal
        open={showSettings}
        onClose={() => {
          setShowSettings(false)
        }}
      />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        px={2}
        pt={5}
        alignItems="center"
      >
        <Typography variant="h4">User Feedback</Typography>
        <Stack direction={'row'} spacing={1}>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
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
      </Stack>
      <Box px={2}>
        <Button
          startIcon={<Settings />}
          size="small"
          variant="outlined"
          onClick={() => {
            setShowSettings(true)
          }}
        >
          Settings{' '}
        </Button>
      </Box>
      <Stack px={2} mt={2}>
        <TableFilters filters={filters} />
      </Stack>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height="80vh">
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
          <FeedbackList />
        </Stack>
      )}
    </CmsLayout>
  )
}

const FeedbackListPageWrapper = () => {
  return (
    <FeedbackListProvider>
      <FeedbackListPage />
    </FeedbackListProvider>
  )
}
export default FeedbackListPageWrapper
