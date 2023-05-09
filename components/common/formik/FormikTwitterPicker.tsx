import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useField, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { ColorResult, TwitterPicker } from 'react-color'
type Props = {
  name: string
}
const FormikTwitterPicker = ({ name }: Props) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (
    color: ColorResult,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(name, color.hex)
    setOpen(false)
  }

  const colors = [
    '#840B0B',
    '#EB144C',
    '#F78DA7',
    '#E67E23',
    '#FF6900',
    '#FCB900',
    '#F1C40F',
    '#169179',
    '#00D084',
    '#BFEDD2',
    '#236FA1',
    '#3598DB',
    '#C2E0F4',
    '#843FA1',
    '#9900EF',
    '#ECF0F1',
    '#CED4D9',
    '#95A5A6',
    '#282828',
    '#121212',
    '#000000'
  ]

  return (
    <>
      <Box
        sx={{
          backgroundColor: field.value,
          color: field.value,
          height: 40,
          width: 40,
          boderRadius: 2,
          boxShadow: theme.shadows[20]
        }}
      />
      <Box pt={2}>
        <TwitterPicker
          color={field.value}
          onChangeComplete={handleChange}
          colors={colors}
        />
      </Box>
    </>
  )
}

export default FormikTwitterPicker
