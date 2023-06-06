import {
  Box,
  Button,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import CountryListTableHead from './CountryTableHead'
import useCountryList from './useCountryList'
import CountryListActions from './CountryListActions'
import { StyledTableRow } from 'components/common/StyledTableRow'

/**
 * Shows the enabled countries for trials
 * @returns
 */
const CountryList = () => {
  const {
    count,
    page,
    pageSize,
    setPage,
    setPageSize,
    pagedcountries,
    selectedCodes,
    selectCountry,
    unselectCountry,
    selectAll
  } = useCountryList()

  return (
    <Box>
      <Box display="flex" mb={2} gap={2}>
        <CountryListActions />
      </Box>
      <TableContainer>
        <Box display="flex" justifyContent={'space-between'}>
          {!!selectedCodes.length ? (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Selected {selectedCodes.length} countries.</Typography>
              <Button size="small" onClick={() => selectAll(true)}>
                Select all {count}
              </Button>
              <Button color="error" size="small" onClick={() => selectAll(false)}>
                Clear
              </Button>
            </Box>
          ) : (
            <Box />
          )}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={(e, page) => {
              setPage(page + 1)
            }}
            onRowsPerPageChange={(e) => setPageSize(+e.target.value)}
            showFirstButton={true}
            showLastButton={true}
          />
        </Box>
        <Table>
          <CountryListTableHead />
          <TableBody>
            {pagedcountries.map((country) => {
              const selected = selectedCodes.includes(country.code)
              return (
                <StyledTableRow key={country.code}>
                  <TableCell>
                    <Checkbox
                      checked={selected}
                      onChange={(e) => {
                        const checked = !!e.target.checked
                        if (checked) {
                          selectCountry(country.code)
                        } else {
                          unselectCountry(country.code)
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{country.label}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>
                    <Chip label={country.enabled ? 'Yes' : 'No'} color={country.enabled ? 'success' : 'default'} />
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CountryList
