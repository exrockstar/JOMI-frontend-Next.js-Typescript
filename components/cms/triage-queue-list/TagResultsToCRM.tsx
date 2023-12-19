import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { useAddCrmTagsToFoundUsersMutation } from 'graphql/cms-queries/user-list.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useTriageQueueList } from './useTriageQueueList'
import {
  useAddCrmTagsToTriageQueueResultsMutation,
  useAddCrmTagsToTriageQueueResultsPreviewLazyQuery
} from 'graphql/cms-queries/triage-queue-list.generated'
import { InfoOutlined } from '@mui/icons-material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

const TagResultsToCRM = () => {
  const { input, count, filters } = useTriageQueueList()
  const [showConfirm, setShowConfirm] = useState(false)
  const [val, setVal] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const tags = val.split(',').map((t) => t.trim())
  const [getPreviewData, { data: previewData }] =
    useAddCrmTagsToTriageQueueResultsPreviewLazyQuery({
      fetchPolicy: 'network-only'
    })
  const [addCrmTagsToResults, { loading }] =
    useAddCrmTagsToTriageQueueResultsMutation({
      variables: {
        input: input,
        tags: tags
      },
      onCompleted() {
        enqueueSnackbar('Successfully updated CRM', {
          variant: 'success'
        })
        setShowConfirm(false)
      },
      onError(error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        })
        setShowConfirm(false)
      }
    })

  const showConfirmDialog = () => {
    if (!filters.length) {
      window.alert('You must set at least one filter to update leads')
      return
    }
    if (!tags.length) {
      window.alert('At least one tag is required')
      return
    }

    getPreviewData({
      variables: {
        input: input
      }
    }).then((result) => {
      console.log(result.data.result)
      setShowConfirm(true)
    })
  }
  const previewCount = previewData?.result
  return (
    <Box>
      <ConfirmationDialog
        open={showConfirm}
        dialogTitle="Confirmation"
        onCancel={() => setShowConfirm(false)}
        onComplete={() => {
          addCrmTagsToResults()
        }}
        loading={loading}
      >
        <Typography>
          Found {previewCount} registered users out of {count} results. Are you
          sure you want to update these users with the following tags:
        </Typography>
        <Box>
          {tags.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
        </Box>
      </ConfirmationDialog>
      <Stack gap={1} direction="row" alignItems="center">
        <span>Add CRM Tags to found users </span>
        <Tooltip title="For now, this only applies to registered users. Split tags using comma">
          <InfoOutlined color="info" />
        </Tooltip>
        <TextField
          size="small"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <LoadingButton
          color="primary"
          variant="contained"
          onClick={showConfirmDialog}
          loading={loading}
          size="small"
        >
          Update
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default TagResultsToCRM
