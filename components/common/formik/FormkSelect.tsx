import {
  FormControl,
  Select,
  SelectProps,
  InputLabel,
  FormHelperText
} from '@mui/material'
import { maxHeight } from '@mui/system'
import { useField, useFormikContext } from 'formik'
import React from 'react'

type Props = { name: string; id: string; helperText?: string } & SelectProps

const FormikSelect: React.FC<Props> = ({
  name,
  children,
  helperText,
  size,
  ...props
}) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value)
  }

  const error = Boolean(meta.touched && meta.error)
  const showHelperText = error || !!helperText
  const id = props.id
  return (
    <FormControl fullWidth error={error} size={size}>
      <InputLabel id={id + '-label'}>{props.label}</InputLabel>
      <Select
        {...props}
        name={name}
        id={id}
        labelId={id + '-label'}
        onChange={handleChange}
        value={field.value}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250
            }
          }
        }}
      >
        {children}
      </Select>
      {showHelperText && (
        <FormHelperText>{meta.error ?? helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default FormikSelect
