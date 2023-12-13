import {
  Alert,
  Box,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useState } from 'react'
import EditPriceDialog from './EditPriceDialog'
import { usePricesListByCountry } from './usePricesListByCountry'
import currency from 'currency.js'
import { uniq } from 'lodash'
import { StickyTableCell } from 'components/common/StickyTableCell'
import colors from 'tailwindcss/colors'
import { Edit } from '@mui/icons-material'
import { PricePartsFragment } from 'graphql/cms-queries/PriceParts.fragment.generated'

const PricesList = () => {
  const {
    countries,
    refetch,
    defaultPrices,
    loading,
    error,
    page,
    pageSize,
    setPage,
    setPageSize,
    count
  } = usePricesListByCountry()
  const [selected, setSelected] = useState<PricePartsFragment | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const closeEdit = () => {
    setEditDialogOpen(false)
    setSelected(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const startEdit = (price: PricePartsFragment) => {
    setEditDialogOpen(true)
    setSelected(price)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }
  const products = uniq(defaultPrices?.map((p) => p.product))
  return (
    <>
      <EditPriceDialog
        open={!!editDialogOpen}
        onClose={() => {
          closeEdit()
          refetch()
        }}
        price={selected}
        key={'edit-price-' + selected?._id}
      />

      <Card>
        {loading || !countries ? (
          <Stack alignItems="center" justifyContent="center" height="40vh">
            <CircularProgress /> Loading...
          </Stack>
        ) : error ? (
          <Stack p={2}>
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Stack>
        ) : (
          <TableContainer sx={{ minWidth: 1050 }}>
            <Box sx={{ position: 'sticky', left: 0 }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={pageSize}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
              />
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <StickyTableCell backgroundColor={colors.zinc[100]}>
                    Country (Code)
                  </StickyTableCell>
                  {products?.map((product, i) => {
                    const colSpan = product.includes('article') ? 1 : 2
                    return (
                      <TableCell colSpan={colSpan} key={i}>
                        {product}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StickyTableCell
                    backgroundColor={colors.zinc[50]}
                    sx={{
                      borderRightColor: 'grey.100',
                      borderRightWidth: 1,
                      borderRightStyle: 'solid'
                    }}
                  >
                    Interval
                  </StickyTableCell>
                  {products?.map((product) => {
                    if (product.includes('article'))
                      return <TableCell>N/A</TableCell>

                    return (
                      <>
                        <TableCell>monthly</TableCell>
                        <TableCell
                          sx={{
                            borderRightColor: 'grey.100',
                            borderRightWidth: 1,
                            borderRightStyle: 'solid'
                          }}
                        >
                          yearly
                        </TableCell>
                      </>
                    )
                  })}
                </StyledTableRow>
                <StyledTableRow>
                  <StickyTableCell
                    sx={{ fontWeight: 700 }}
                    backgroundColor={colors.white}
                  >
                    Default Prices{' '}
                  </StickyTableCell>
                  {products?.map((product) => {
                    const prices = defaultPrices
                      .filter((p) => p.product === product)
                      .sort((a, b) => a.unit_amount - b.unit_amount)

                    return prices.map((p) => {
                      return (
                        <TableCell
                          key={p._id}
                          sx={{
                            borderRightColor: 'grey.100',
                            borderRightWidth: 1,
                            borderRightStyle: 'solid'
                          }}
                        >
                          <Stack direction="row" gap={2} alignItems={'center'}>
                            <span>
                              {currency(p.unit_amount, {
                                fromCents: true
                              }).format({ precision: 0 })}
                            </span>
                            <IconButton
                              size={'small'}
                              title="Edit price"
                              onClick={() => startEdit(p)}
                            >
                              <Edit />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      )
                    })
                  })}
                </StyledTableRow>
                {countries?.map((country, index) => {
                  const bgColor =
                    index % 2 == 0 ? colors.zinc[50] : colors.white
                  return (
                    <StyledTableRow key={country.code}>
                      <StickyTableCell
                        sx={{
                          whiteSpace: 'nowrap'
                        }}
                        backgroundColor={bgColor}
                      >
                        {country.name} - ({country.code})
                      </StickyTableCell>
                      {products?.map((product) => {
                        const prices = country.prices
                          .filter((p) => p.product === product)
                          .sort((a, b) => a.unit_amount - b.unit_amount)

                        return prices.map((p) => {
                          return (
                            <TableCell
                              key={p._id}
                              sx={{
                                borderRightColor: 'grey.100',
                                borderRightWidth: 1,
                                borderRightStyle: 'solid'
                              }}
                            >
                              {currency(p.unit_amount, {
                                fromCents: true
                              }).format({ precision: 0 })}
                            </TableCell>
                          )
                        })
                      })}
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
            <Box sx={{ position: 'sticky', left: 0 }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count}
                rowsPerPage={pageSize}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
              />
            </Box>
          </TableContainer>
        )}
      </Card>
    </>
  )
}

export default PricesList
