import { Cancel, Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress } from '@mui/material'
import { useInstitutionList } from 'components/cms/institutions-list/useInstitutionList'
import {
  useRunJobManuallyMutation,
  useIsJobRunningLazyQuery,
  useCancelJobMutation
} from 'graphql/cms-queries/jobs.generated'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'

const RefreshInstStatsButton = () => {
  const jobName = 'UpdateAllInstStats'
  const { enqueueSnackbar } = useSnackbar()
  const { input, refetch: refreshList } = useInstitutionList()
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
  const [cancelJob] = useCancelJobMutation({
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      refetch()
    },
    onCompleted(result) {
      enqueueSnackbar(result.cancelJob, { variant: 'success' })

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
        refreshList()
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
  const progressText = `Updating Institution Stats: ${(
    isJobRunningData?.jobProgress || 0
  ).toFixed(2)}% Completed`
  return (
    <div>
      {isJobRunningData?.isJobRunning ? (
        <LoadingButton
          endIcon={<Cancel />}
          startIcon={<CircularProgress size={16} color="inherit" />}
          color="error"
          variant="outlined"
          title="Cancel job"
          onClick={() => {
            cancelJob({
              variables: {
                name: jobName
              }
            })
          }}
        >
          {progressText}
        </LoadingButton>
      ) : (
        <LoadingButton
          variant="outlined"
          startIcon={<Refresh />}
          loading={isJobRunningData?.isJobRunning}
          disabled={isJobRunningData?.isJobRunning}
          title="Recalculates the institution stats for the found institutions. Use sparingly"
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
                name: jobName,
                data: input
              }
            })
          }}
        >
          Refresh Inst Stats
        </LoadingButton>
      )}
    </div>
  )
}

export default RefreshInstStatsButton
