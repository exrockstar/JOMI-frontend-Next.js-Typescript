import { DatePickerProps, DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useField, useFormikContext } from 'formik'

import React from 'react'
type Props = { name: string } & Omit<
  DatePickerProps,
  'onChange' | 'value' | 'renderInput'
>

const FormikDatePicker = ({ name, ...props }: Props) => {
  const [field, meta] = useField(name)
  const { setFieldValue, setFieldError } = useFormikContext()
  return (
    <DatePicker
      inputFormat="MM/DD/YYYY"
      clearable
      value={field.value ? dayjs(field.value) : null}
      onChange={(newValue: Dayjs) => {
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
          size="small"
          error={!!meta.error}
          helperText={meta.error}
        />
      )}
    />
  )
}

export default FormikDatePicker
