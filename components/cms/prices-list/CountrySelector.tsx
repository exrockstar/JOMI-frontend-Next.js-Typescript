import { Autocomplete, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import { countries, CountryType } from './countryList'

type Props = {
  name: string
  multiple?: boolean
  label?: string
}

const CountrySelector = ({ name, multiple, label }: Props) => {
  const [field, meta] = useField<string | string[]>(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    countries: CountryType | CountryType[]
  ) => {
    if (Array.isArray(countries)) {
      const codes = countries.map((c) => c.code).filter((c) => !!c)

      setFieldValue(name, codes ?? null)
    } else {
      setFieldValue(name, countries?.code ?? null)
    }
  }
  const value = Array.isArray(field.value)
    ? countries.filter((c) => field.value.includes(c.code))
    : countries.find((c) => c.code === field.value)
  return (
    <Autocomplete
      onChange={handleChange}
      value={value}
      options={countries}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? 'Select country'}
          error={!!meta.error}
          helperText={meta.error}
        />
      )}
    />
  )
}

export default CountrySelector
