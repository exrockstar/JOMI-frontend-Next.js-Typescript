import { Checkbox, CheckboxProps } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import React from 'react'

type Props = { name: string } & CheckboxProps

/**
 * Formik Wrapper for mui checkbox
 */
const FormikCheckbox = ({ name, ...props }: Props) => {
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.checked)
  }

  return (
    <Checkbox
      name={name}
      checked={field.value}
      onChange={handleChange}
      {...props}
    />
  )
}

export default FormikCheckbox
