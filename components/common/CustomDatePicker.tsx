import { DatePicker, DatePickerProps } from '@mui/lab'
import { TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {
  defaultLabel: string
} & Omit<DatePickerProps, 'renderInput'>
const CustomDatePicker = ({ defaultLabel, ...props }: Props) => {
  const [date, setDate] = useState<Dayjs>(
    props.value ? dayjs(props.value as Dayjs) : null
  )

  const onChange = (newVal: Dayjs) => {
    setDate(newVal)
    if (!newVal || newVal.isValid()) {
      props.onChange(newVal)
    }
  }
  const isValid = !date || date.isValid()

  useEffect(() => {
    setDate(props.value ? dayjs(props.value as Dayjs) : null)
  }, [props.value])
  return (
    <DatePicker
      clearable
      value={date ?? null}
      label={isValid ? defaultLabel : `${defaultLabel} (Invalid Format)`}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} size="small" sx={{ maxWidth: 160 }} />
      )}
      mask=""
    />
  )
}

export default CustomDatePicker
