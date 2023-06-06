import SearchInput from 'components/access/SearchInput'
import React from 'react'
import useCountryList from './useCountryList'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'

const CountryListActions = () => {
  const { searchTerm, setSearchTerm, setValue, selectedCodes, showEnabled, setShowEnabled } = useCountryList()
  const hasSelected = selectedCodes.length > 0
  return (
    <Box display="flex" alignItems={'center'} justifyContent={'space-between'} width="100%">
      <SearchInput onSubmit={setSearchTerm} value={searchTerm} />

      <Box>
        <FormControlLabel
          control={<Checkbox checked={showEnabled} onClick={() => setShowEnabled(!showEnabled)} />}
          label={'Show enabled only'}
        />
        <Button onClick={() => setValue(true)} disabled={!hasSelected}>
          Enable Selected
        </Button>
        <Button onClick={() => setValue(false)} disabled={!hasSelected}>
          Disable Selected
        </Button>
      </Box>
    </Box>
  )
}

export default CountryListActions
