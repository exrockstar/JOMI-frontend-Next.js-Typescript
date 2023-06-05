import { useField, useFormikContext } from 'formik'

import React, { useRef, useState } from 'react'
import { CountryType, countries } from '../prices-list/countryList'
import { Autocomplete } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import uniq from 'lodash/uniq'

const TrialsCountrySelector = () => {
  const [_value, setValue] = useState<string>('')
  const [field] = useField<string[]>('enabledCountries')
  const { setFieldValue } = useFormikContext()
  const ref = useRef<HTMLButtonElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, country: CountryType) => {
    setValue(country?.code)
  }
  const value = countries.find((c) => _value?.includes(c.code))
  return (
    <Box
      display="flex"
      gap={2}
      component="form"
      onSubmit={(e) => {
        e.preventDefault()

        console.log('Adding country', value)
        setFieldValue('enabledCountries', uniq([value.code, ...field.value]))
        setValue('')
      }}
    >
      <Box width={400}>
        <Autocomplete
          onChange={handleChange}
          value={value ?? null}
          options={countries}
          renderInput={(params) => <TextField {...params} label={'Select country'} />}
        />
      </Box>

      <Button variant="contained" color="secondary" startIcon={<Add />} disabled={!value} type="submit">
        Add country
      </Button>
    </Box>
  )
}

export default TrialsCountrySelector
