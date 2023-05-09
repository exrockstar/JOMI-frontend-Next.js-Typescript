import { Autocomplete, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import { countries, CountryType } from './countryList'

type Props = {
  name: string
}

const CountrySelector = ({ name }: Props) => {
  const [field, meta] = useField<string>(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    country: CountryType
  ) => {
    setFieldValue(name, country?.code ?? null)
  }

  const value = countries.find((c) => c.code === field.value)
  return (
    <Autocomplete
      onChange={handleChange}
      value={value}
      options={countries}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select country"
          error={!!meta.error}
          helperText={meta.error}
        />
      )}
    />
  )
}

export default CountrySelector
