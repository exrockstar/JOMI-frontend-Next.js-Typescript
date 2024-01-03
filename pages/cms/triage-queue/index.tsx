import { Close, FilterList, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
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
import TagResultsToCRM from 'components/cms/triage-queue-list/TagResultsToCRM'
import TriageQueueFilter from 'components/cms/triage-queue-list/TriageQueueFilter'
import TriageQueueList from 'components/cms/triage-queue-list/TriageQueueList'
import {
  TriageQueueListProvider,
  useTriageQueueList
} from 'components/cms/triage-queue-list/useTriageQueueList'
import DbQueryDialog from 'components/common/DbQueryDialog'
import TableFilters from 'components/common/TableFilters'
import { useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'

import useCsvDownload from 'components/cms/useCsvDownload'
import { useTriageQueueListLazyQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import dayjs from 'dayjs'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const TriageQueueListPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const { filters, dbQueryString, count: totalCount } = useTriageQueueList()

  const [fetchFunc] = useTriageQueueListLazyQuery()

  const convertFunc = (item) => {
    const user = item.user
    const inst = item.institution
    const subscribedText = user?.subActive ? 'Yes' : 'No'
    const NotApplicable = 'N/A'
    const NotMatched = 'N/A'
    const NotSpecified = 'N/A'
    const NotSet = 'N/A'
    return {
      'USER NAME': user?.display_name || item.display_name || 'Name not found',
      'USER EMAIL': user?.email ?? item.email,
      COUNTRY: user?.countryCode ?? item.countryCode ?? NotApplicable,
      REIGON: user?.regionName ?? item.regionName ?? NotApplicable,
      STATED: user?.institution_name ?? item.institution_name ?? NotApplicable,
      MATCHED: inst?.name ?? NotMatched,
      '(INST)CATEGORY': inst?.category ?? NotApplicable,
      '(INST)USER COUNT': inst ? inst.stats?.userCount : NotApplicable,
      '(INST)ARTICLE VIEWS': inst
        ? inst.stats?.totalArticleCount
        : NotApplicable,
      '(INST)LOGIN COUNT': inst ? inst.stats?.loginCount : NotApplicable,
      'USER TYPE': user?.user_type ?? NotSpecified,
      SPECIALITY: user?.specialty ?? NotSpecified,
      SUBSCRIBED: subscribedText,
      CREATED: dayjs(item.created).format('MM/DD/YYYY'),
      'SEND EMAIL DATE': item.sentEmailAt
        ? dayjs(item.sentEmailAt).format('MM/DD/YYYY')
        : NotApplicable,
      TYPE: item.type,
      PRIORITY: item.priority,
      MARKET: item.market ? item.market : NotSet,
      NOTES: item.notes
    }
  }

  const getMainData = (data) => {
    return data?.triageQueueRequests.triage_requests ?? []
  }

  const {
    downloadCsv,
    loading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    collection: 'triage',
    filters,
    totalCount
  })

  return (
    <CmsLayout>
      <TriageQueueFilter
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
        }}
      />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        p={2}
        pt={5}
        alignItems={'center'}
      >
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
        </Stack>
        <DbQueryDialog
          open={showQuery}
          onClose={() => setShowQuery(false)}
          queryStr={dbQueryString}
        />

        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <DownloadCsvButton
            onClick={downloadCsv}
            loading={loading}
            csvProgress={csvProgress}
          />
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Badge color="secondary" badgeContent={filters?.length ?? null}>
              <FilterList />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>
      <Stack px={2}>
        <TagResultsToCRM />
      </Stack>
      <Stack p={2}>
        <TableFilters filters={filters} />
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
