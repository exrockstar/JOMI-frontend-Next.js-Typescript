import {
  MenuItem,
  Checkbox,
  Select,
  FormControl,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  FormControlLabel,
  Divider
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { useField, useFormikContext } from 'formik'

import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { every, intersection } from 'lodash'
import snakeCase from 'lodash/snakeCase'
import uniq from 'lodash/uniq'
import { useState } from 'react'

const ProductSelect = () => {
  const { data } = useUserTypesAndSpecialtiesQuery()
  const [field] = useField<string[]>('applies_to')
  const { setFieldValue } = useFormikContext()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]) // [Other, Physician, etc...]
  const userTypes = data?.userTypes ?? []
  const monthlyIds = userTypes?.map(
    ({ type }) => `prod_${snakeCase(type)}_month`
  )
  const yearlyIds = userTypes.map(({ type }) => `prod_${snakeCase(type)}_year`)
  const selectedIds = field.value ?? []

  const allMonthlySelected = every(monthlyIds, (p) => selectedIds.includes(p))
  const someMonthlySelected =
    !allMonthlySelected && monthlyIds.some((p) => selectedIds.includes(p))

  const allYearlySelected = every(yearlyIds, (p) => selectedIds.includes(p))
  const someYearlySelected =
    !allYearlySelected && yearlyIds.some((p) => selectedIds.includes(p))

  const sortedSelectedProducts = [...selectedProducts.sort()]

  const setSelectedProductIds = (ids: string[]) => {
    setFieldValue('applies_to', uniq(ids))
  }
  const getProductIdsForType = (type: string) => {
    return [`prod_${snakeCase(type)}_year`, `prod_${snakeCase(type)}_month`]
  }

  const isOneTimePaymentProduct = (product_id: string) =>
    product_id.endsWith('article')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value as unknown as string[]

    // convert values to product ids
    const productIds = values.flatMap((value) => {
      if (isOneTimePaymentProduct(value)) {
        return [value]
      }
      return getProductIdsForType(value)
    })
    setSelectedProducts(values)
    setSelectedProductIds(productIds)
  }

  //update the selected user types on the select component based on the products
  function updateSelectedProducts(newValues: string[]) {
    const selected = userTypes
      .filter(({ type }) => {
        const productIds = getProductIdsForType(type)
        return productIds.some((p) => newValues?.includes(p))
      })
      .map((type) => type.type)

    const oneTimeProducts = newValues.filter(isOneTimePaymentProduct)
    setSelectedProducts([...selected, ...oneTimeProducts])
  }

  // handler for checkbox change on table
  const onCheckboxChange = (checked: boolean, productId: string) => {
    if (!checked) {
      const newValues = selectedIds.filter((val) => val !== productId)
      updateSelectedProducts(newValues)
      setSelectedProductIds(newValues)
    } else {
      const newValues = [...selectedIds, productId]
      updateSelectedProducts(newValues)
      setSelectedProductIds(newValues)
    }
  }

  const onAllChange = (checked: boolean, products: string[]) => {
    const currentValue = field?.value ?? []
    if (!checked) {
      //remove all products
      const newValues = currentValue.filter((val) => !products.includes(val))
      updateSelectedProducts(newValues)
      setSelectedProductIds(newValues)
    } else {
      const newValues = [...currentValue, ...products]

      updateSelectedProducts(newValues)
      setSelectedProductIds(newValues)
    }
  }

  return (
    <FormControl fullWidth size="small" sx={{ width: 300 }}>
      <Select
        multiple
        value={sortedSelectedProducts ?? []}
        onChange={handleChange}
      >
        <Divider sx={{ fontSize: 12 }}>Subscriptions</Divider>
        {userTypes?.map((userType) => {
          return (
            <MenuItem key={userType._id} value={userType.type}>
              {userType.type}
            </MenuItem>
          )
        })}
        <Divider sx={{ fontSize: 12 }}>One-Time Purchases</Divider>
        <MenuItem
          key="product_purchase_article"
          value="product_purchase_article"
        >
          Purchase Article
        </MenuItem>
        <MenuItem key="product_rent_article" value="product_rent_article">
          Rent Article
        </MenuItem>
      </Select>
      <FormControlLabel
        control={
          <Checkbox
            indeterminate={someMonthlySelected}
            checked={allMonthlySelected}
            onChange={(e) => onAllChange(e.target.checked, monthlyIds)}
          />
        }
        label="Select All Monthly Subscriptions"
      />
      <FormControlLabel
        control={
          <Checkbox
            indeterminate={someYearlySelected}
            checked={allYearlySelected}
            onChange={(e) => onAllChange(e.target.checked, yearlyIds)}
          />
        }
        label="Select All Yearly Subscriptions"
      />
      {!!sortedSelectedProducts.length && (
        <Box my={2} sx={{ maxHeight: 400, width: 800, overflowY: 'scroll' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  User Type / Product
                </TableCell>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  Monthly
                </TableCell>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  Yearly
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& td': {
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'divider'
                }
              }}
            >
              {sortedSelectedProducts.map((product, index) => {
                //render for one-time purchase products
                if (product.endsWith('article')) {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography sx={{ width: 250 }} variant="body2">
                          {product}
                        </Typography>
                      </TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>N/A</TableCell>
                    </TableRow>
                  )
                }
                const monthlyProductId = `prod_${snakeCase(product)}_month`
                const yearlyProductId = `prod_${snakeCase(product)}_year`
                const monthlyChecked = selectedIds.includes(monthlyProductId)
                const yearlyChecked = selectedIds.includes(yearlyProductId)

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography sx={{ width: 250 }} variant="body2">
                        {product}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={monthlyChecked}
                        onChange={(e) =>
                          onCheckboxChange(e.target.checked, monthlyProductId)
                        }
                      ></Checkbox>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={yearlyChecked}
                        onChange={(e) =>
                          onCheckboxChange(e.target.checked, yearlyProductId)
                        }
                      ></Checkbox>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </FormControl>
  )
}
export default ProductSelect
