import { DateTimePicker, DateTimePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useField, useFormikContext } from 'formik'

import React from 'react'
type Props = { name: string; helperText?: string } & Omit<
  DateTimePickerProps,
  'onChange' | 'value' | 'renderInput'
>

const FormikDateTimePicker = ({ name, helperText, ...props }: Props) => {
  const [field, meta] = useField(name)
  const { setFieldValue, setFieldError } = useFormikContext()

  return (
    <DateTimePicker
      value={field.value}
      onChange={(newValue) => {
        if (!newValue) {
          setFieldValue(name, '')
          return
        }

        try {
          setFieldValue(name, newValue.toISOString())
        } catch (e) {
          console.debug(e, newValue)
          setFieldError(name, 'Invalid date')
        }
      }}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={meta.error || helperText}
          size="small"
          error={!!meta.error}
        />
      )}
    />
  )
}

export default FormikDateTimePicker
