import { Close, FilterList, Visibility } from '@mui/icons-material'
import {
  Stack,
  Typography,
  IconButton,
  Badge,
  Collapse,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  Box,
  Tooltip
} from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import TriageQueueFilter from 'components/cms/triage-queue-list/TriageQueueFilter'
import TriageQueueList from 'components/cms/triage-queue-list/TriageQueueList'
import {
  TriageQueueListProvider,
  useTriageQueueList
} from 'components/cms/triage-queue-list/useTriageQueueList'
import DbQueryDialog from 'components/common/DbQueryDialog'
import { useState } from 'react'

const TriageQueueListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const { filters, dbQueryString } = useTriageQueueList()
  console.log(filters)
  return (
    <CmsLayout>
      <TriageQueueFilter
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
        }}
      />
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">Triage Queue</Typography>
          <Tooltip title="Display the MongoDB aggregate operation used to filter the data">
            <Button
              color="primary"
              onClick={() => setShowQuery(true)}
              startIcon={<Visibility />}
            >
              Show DB Query Parameters
            </Button>
          </Tooltip>
          <Typography><Typography fontWeight={'bold'}>Table Filters&nbsp;</Typography>{filters.length == 0 ? 'None' : `${filters.length} total:` + filters.map((filter, i) => ` ${filter.columnName} ${filter.operation} ${filter.value}`)}</Typography>
        </Stack>
        <DbQueryDialog
          open={showQuery}
          onClose={() => setShowQuery(false)}
          queryStr={dbQueryString}
        />
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Badge color="secondary" badgeContent={filters?.length ?? null}>
            <FilterList />
          </Badge>
        </IconButton>
      </Stack>
      <Stack p={2}>
        <TriageQueueList />
      </Stack>
    </CmsLayout>
  )
}

const TriageQueueListPageWrapper = () => {
  return (
    <TriageQueueListProvider>
      <TriageQueueListPage />
    </TriageQueueListProvider>
  )
}
export default TriageQueueListPageWrapper
