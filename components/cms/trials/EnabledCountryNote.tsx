import { Typography } from '@mui/material'
import { useField } from 'formik'
import React from 'react'

const EnabledCountryNote = () => {
  const [field] = useField<string[]>('enabledCountries')
  const length = field.value?.length ?? 0
  return (
    <div>
      <Typography
        variant="caption"
        color="error.main"
        sx={{ display: 'block' }}
      >
        NOTE: Trial button will only show for enabled countries. Currently, you
        have {length} enabled.
      </Typography>
    </div>
  )
}

export default EnabledCountryNote
