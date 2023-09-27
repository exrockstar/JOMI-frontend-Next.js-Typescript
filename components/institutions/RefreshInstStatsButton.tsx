import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress } from '@mui/material'
import {
  useRunJobManuallyMutation,
  useIsJobRunningQuery,
  useIsJobRunningLazyQuery
} from 'graphql/cms-queries/jobs.generated'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'

const RefreshInstStatsButton = () => {
  const jobName = 'UpdateAllInstStats'
  const { enqueueSnackbar } = useSnackbar()
  const [runJobManually, { called }] = useRunJobManuallyMutation({
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      refetch()
    },
    onCompleted(result) {
      enqueueSnackbar(result.runJobManually, { variant: 'success' })

      refetch()
    },
    fetchPolicy: 'network-only'
  })

  const [refetch, { data: isJobRunningData }] = useIsJobRunningLazyQuery({
    onCompleted(result) {
      if (result.isJobRunning) {
        setTimeout(() => {
          refetch()
        }, 2000)
      }

      if (called && result.jobProgress >= 100) {
        enqueueSnackbar(`Completed job.`, { variant: 'success' })
      }
    },
    variables: {
      name: jobName
    },
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    refetch()
  }, [refetch])
  const progressText = `Progress: ${(
    isJobRunningData?.jobProgress || 0
  ).toFixed(2)}%`
  return (
    <div>
      <LoadingButton
        startIcon={<Refresh />}
        loading={isJobRunningData?.isJobRunning}
        disabled={isJobRunningData?.isJobRunning}
        loadingIndicator={
          <Box
            display="flex"
            alignItems={'center'}
            gap={2}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {progressText}
            <CircularProgress size={16} color="inherit" />
          </Box>
        }
        onClick={() => {
          runJobManually({
            variables: {
              name: jobName
            }
          })
        }}
      >
        Refresh Inst Stats
      </LoadingButton>
    </div>
  )
}

export default RefreshInstStatsButton
