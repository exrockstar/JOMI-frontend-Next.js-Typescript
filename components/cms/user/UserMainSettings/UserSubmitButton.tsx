import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { Form, useFormikContext } from 'formik'
import React from 'react'

type Props = {
  loading: boolean
}
const UserSubmitButton = ({ loading }: Props) => {
  const { dirty } = useFormikContext()

  const label = dirty ? 'Save Changes' : 'No Changes to save'
  return (
    <Form>
      <Box
        position="fixed"
        sx={{ bottom: 16, right: 16, zIndex: 2, borderRadius: 1 }}
        bgcolor="white"
      >
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          color="primary"
          disabled={!dirty}
          startIcon={<Save />}
          size="large"
          sx={{ boxShadow: '0px 2px 6px rgba(100, 116, 139, 0.12)' }}
        >
          {label}
        </LoadingButton>
      </Box>
    </Form>
  )
}

export default UserSubmitButton
