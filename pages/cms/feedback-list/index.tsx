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
import { feedbackListColumnFilterOptions } from 'components/access/institution/feedback/feedbacklistColumnFilterOptions'
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

const columnFilterOptions: ColumnOption[] = [
  ...feedbackListColumnFilterOptions,
  {
    columnName: '_institution._id',
    label: 'Institution ID',
    operations: StringOperations,
    type: 'text'
  },
  {
    columnName: '_institution.name',
    label: 'Institution Name',
    operations: StringOperations,
    type: 'text'
  }
]
const FeedbackListPage = () => {
  const { loading, error, filters, setFilters } = useFeedbackList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }
  return (
    <CmsLayout>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={columnFilterOptions}
          filters={filters}
        />
      </Drawer>
      <FeedbackSettingsModal
        open={showSettings}
        onClose={() => {
          setShowSettings(false)
        }}
      />
      <Stack direction={'row'} justifyContent="space-between" px={2} pt={5}>
        <Typography variant="h4">User Feedback</Typography>
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
