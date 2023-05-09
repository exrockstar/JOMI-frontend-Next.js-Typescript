import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { useAddCrmTagsToFoundUsersMutation } from 'graphql/cms-queries/user-list.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useUserManagementList } from './useUserManagementList'

const TagUsersToCRM = () => {
  const { input, count, filters } = useUserManagementList()
  const [val, setVal] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const tags = val.split(',').map((t) => t.trim())
  const [updateTags, { loading }] = useAddCrmTagsToFoundUsersMutation({
    variables: {
      input: input,
      tags: tags
    },
    onCompleted() {
      enqueueSnackbar('Successfully updated CRM', {
        variant: 'success'
      })
    },
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  const handleUpdate = () => {
    if (!filters.length && !input.search) {
      window.alert('You must set at least one filter to update leads')
      return
    }
    if (!tags.length) {
      window.alert('At least one tag is required')
      return
    }
    const yes =
      window.confirm(`Are you sure you want to update ${count} users with the following tags?
      ${tags.map((tag) => tag + '\n')}`)
    if (!yes) {
      return
    }
    updateTags()
  }
  return (
    <Stack columnGap={2} direction="row" alignItems="center">
      Add CRM Tags to found users
      <TextField
        size="small"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <LoadingButton
        color="primary"
        variant="contained"
        onClick={handleUpdate}
        loading={loading}
        size="small"
      >
        Update
      </LoadingButton>
    </Stack>
  )
}

export default TagUsersToCRM
