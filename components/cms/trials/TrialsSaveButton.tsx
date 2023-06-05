import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

const TrialsSaveButton = () => {
  const { dirty, isSubmitting, submitForm } = useFormikContext()

  const label = dirty ? 'Save Changes' : 'No Changes to save'
  return (
    <Box position="fixed" sx={{ bottom: 16, right: 16, zIndex: 2, borderRadius: 1 }} bgcolor="white">
      <LoadingButton
        loading={isSubmitting}
        variant="contained"
        color="primary"
        disabled={!dirty}
        startIcon={<Save />}
        size="large"
        sx={{ boxShadow: '0px 2px 6px rgba(100, 116, 139, 0.12)' }}
        onClick={submitForm}
      >
        {label}
      </LoadingButton>
    </Box>
  )
}

export default TrialsSaveButton
