import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

const SaveArticleDetailButton = () => {
  const { dirty, isSubmitting, submitForm } = useFormikContext()
  return (
    <LoadingButton
      disabled={!dirty}
      sx={{
        position: 'fixed',
        right: 16,
        bottom: 16
      }}
      variant="contained"
      color="secondary"
      size="large"
      startIcon={<Save />}
      type="submit"
      loading={isSubmitting}
      onClick={() => submitForm()}
    >
      Save
    </LoadingButton>
  )
}

export default SaveArticleDetailButton
