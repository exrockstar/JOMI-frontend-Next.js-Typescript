import { Add } from '@mui/icons-material'
import { Button, IconButton, Tooltip } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import slugify from 'slug'

const GenerateSlugButton = () => {
  const [display_name] = useField('display_name')
  const { setFieldValue, setFieldTouched } = useFormikContext()

  return (
    <>
      <FormikTextField
        name="slug"
        label="Author slug"
        fullWidth
        size="small"
        placeholder="e.g., spaceman-spiff"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                const generated = slugify(display_name.value)
                setFieldValue('slug', generated)
              }}
            >
              <Tooltip title="Generate slug">
                <Add />
              </Tooltip>
            </IconButton>
          )
        }}
      />
    </>
  )
}

export default GenerateSlugButton
