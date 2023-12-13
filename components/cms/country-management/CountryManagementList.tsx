import React from 'react'
import useCountryManagementList from './useCountryManagementList'
import {
  TableContainer,
  Box,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  Chip,
  Checkbox,
  Drawer,
  Link as MuiLink,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import CountryManagementListTableHead from './CountryManagementListTableHead'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { countryColumnOptions } from './countryColumnOptions'
import { ColumnFilter } from 'graphql/types'
import FilterButton from 'components/common/FilterButton'
const CountryManagementList = () => {
  const {
    countries,
    count,
    page,
    pageSize,
    setPage,
    setPageSize,
    filters,
    filterOpen,
    setFilterOpen,
    setFilters,
    selected,
    setSelected,
    selectAll
  } = useCountryManagementList()

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters?.length) {
      setFilters([])
    } else {
      setFilters(filters)
    }
    selectAll(false)
  }

  const selectedCount = selected.length
  return (
    <div>
      <Drawer
        anchor={'right'}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={countryColumnOptions}
          filters={filters}
        />
      </Drawer>
      <TableContainer>
        <Box
          display="flex"
          justifyContent={'space-between'}
          alignItems={'center'}
          pr={2}
        >
          <Box>
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
            {selectedCount > 0 && (
              <Box pl={3} pb={2}>
                <Typography variant="body2">
                  Selected {selectedCount} countries{' '}
                  <MuiLink
                    onClick={() => {
                      selectAll(true)
                    }}
                    href="#"
                  >
                    Select All
                  </MuiLink>{' '}
                  <MuiLink
                    onClick={() => {
                      selectAll(false)
                    }}
                    color="error.main"
                    href="#"
                  >
                    Unselect All
                  </MuiLink>
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            <FilterButton />
          </Box>
        </Box>
        <Table>
          <CountryManagementListTableHead />
          <TableBody>
            {countries.map((country) => {
              const isSelected = selected.includes(country.code)
              return (
                <StyledTableRow key={country.code}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => {
                        console.log(isSelected)
                        setSelected(country.code, !isSelected)
                      }}
                    />
                  </TableCell>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>
                    <Chip
                      label={country.trialsEnabled ? 'Yes' : 'No'}
                      color={country.trialsEnabled ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{country.articleRestriction}</TableCell>
                  <TableCell>{country.coefficient}</TableCell>
                  <TableCell>{country.multiplier ?? 'None'}</TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent={'space-between'}>
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
      </TableContainer>
    </div>
  )
}

export default CountryManagementList
