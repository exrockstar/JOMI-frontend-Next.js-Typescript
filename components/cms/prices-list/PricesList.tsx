import { Delete } from '@mui/icons-material'
import {
  Button,
  Card,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink
} from '@mui/material'
import { isProduction } from 'common/constants'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useDeletePriceMutation } from 'graphql/cms-queries/price-management.generated'
import {
  PricesListDocument,
  usePricesListQuery
} from 'graphql/cms-queries/prices-list.generated'
import { StripePrice } from 'graphql/types'
import { entries } from 'lodash'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import CountryCodesChips from './CountryCodesChips'
import EditPriceDialog from './EditPriceDialog'
import { usePricesListControls } from './usePricesListControls'

type GroupedById = {
  [key: string]: StripePrice[]
}

const PricesList = () => {
  const { filters } = usePricesListControls()
  const { data: session } = useSession()
  const { data, refetch } = usePricesListQuery({
    skip: !session?.user,
    variables: {
      input: { filters }
    }
  })
  const { enqueueSnackbar } = useSnackbar()
  const [selected, setSelected] = useState<StripePrice | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const prices = data?.prices
  const [deletePrice, { loading: deletingPrice, client }] =
    useDeletePriceMutation({
      onCompleted(result) {
        enqueueSnackbar(
          `Successfully deleted price: ${result.deletePrice?.priceId}`,
          {
            variant: 'success'
          }
        )
        client.cache.updateQuery(
          {
            query: PricesListDocument
          },
          (current) => {
            return {
              prices: current.prices.filter(
                (price) => price._id !== result.deletePrice?._id
              )
            }
          }
        )
        closeDelete()
        refetch()
      },
      onError(error) {
        enqueueSnackbar(`Delete price failed: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const startEdit = (price: StripePrice) => {
    setEditDialogOpen(true)
    setSelected(price)
  }
  const startDelete = (price: StripePrice) => {
    setConfirmDialogOpen(true)
    setSelected(price)
  }

  const closeEdit = () => {
    setEditDialogOpen(false)
    setSelected(null)
  }

  const closeDelete = () => {
    setConfirmDialogOpen(false)
    setSelected(null)
  }

  const handleDelete = () => {
    if (!selected) return
    deletePrice({
      variables: {
        priceId: selected.priceId
      }
    })
  }

  const grouped: GroupedById =
    prices?.reduce((acc, price) => {
      const prices = acc[price.product] ?? []

      acc[price.product] = [...prices, price]
      return acc
    }, {}) ?? {}
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
      <ConfirmationDialog
        key={'confirm-delete-price' + selected?._id}
        open={confirmDialogOpen}
        dialogTitle={'Confirm Delete Price'}
        onClose={() => closeDelete()}
        onComplete={handleDelete}
        onCancel={closeDelete}
        loading={deletingPrice}
      >
        Are you sure you want to delete <strong> {selected?.nickname} </strong>?
      </ConfirmationDialog>
      <Card>
        <TableContainer sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Price Id</TableCell>

                <TableCell>Description</TableCell>
                <TableCell>Country Code</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Interval</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(grouped).map((entry) => {
                const [product, prices] = entry
                const productUrl = isProduction
                  ? `https://dashboard.stripe.com/products/${product}`
                  : `https://dashboard.stripe.com/test/products/${product}`
                return (
                  <>
                    <TableRow sx={{ backgroundColor: 'neutral.200' }}>
                      <TableCell colSpan={6}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography fontWeight="bold">Product</Typography>
                          <MuiLink
                            variant="body2"
                            href={productUrl}
                            underline="hover"
                            fontWeight="bold"
                            target="_blank"
                          >
                            {product}
                          </MuiLink>
                          <Chip
                            label={prices.length + ' prices'}
                            size="small"
                            color="secondary"
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>

                    {prices.map((price) => {
                      const isBaseProductPrice = !price.countryCode
                      const priceUrl = isProduction
                        ? `https://dashboard.stripe.com/prices/${price.priceId}`
                        : `https://dashboard.stripe.com/test/prices/${price.priceId}`
                      return (
                        <StyledTableRow key={price._id}>
                          <TableCell>
                            <MuiLink
                              href={priceUrl}
                              underline="hover"
                              target="_blank"
                            >
                              {price.priceId}
                            </MuiLink>
                          </TableCell>
                          <TableCell>{price.nickname}</TableCell>
                          <TableCell>
                            {!isBaseProductPrice ? (
                              <>
                                {price.countryCode && (
                                  <CountryCodesChips
                                    countryCode={price.countryCode}
                                  />
                                )}
                              </>
                            ) : (
                              <Chip label="Default" />
                            )}
                          </TableCell>
                          <TableCell>
                            {price.unit_amount / 100}{' '}
                            {price.currency.toUpperCase()}
                          </TableCell>
                          <TableCell>{price.interval}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => startEdit(price)}
                              size="small"
                            >
                              Edit
                            </Button>
                            <IconButton
                              size="small"
                              disabled={isBaseProductPrice}
                              color="error"
                              onClick={() => startDelete(price)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      )
                    })}
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default PricesList
