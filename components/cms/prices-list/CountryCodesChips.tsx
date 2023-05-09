import { Chip, Stack, Tooltip } from '@mui/material'
import { CountryEnum } from 'graphql/types'
import React from 'react'
import { countries } from './countryList'

type Props = {
  countryCode: CountryEnum
}

const CountryCodesChips = ({ countryCode }: Props) => {
  const country = countries.find((country) => country.code === countryCode)
  return (
    <Tooltip title={country?.label} key={countryCode}>
      <Chip
        label={countryCode}
        variant="outlined"
        size="small"
        color="secondary"
      />
    </Tooltip>
  )
}

export default CountryCodesChips
