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
  FormControlLabel
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
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]) // [Other, Physician, etc...]
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
  const sorted = [...selectedUserTypes.sort()]

  const setSelectedIds = (ids: string[]) => {
    setFieldValue('applies_to', uniq([...ids]))
  }
  const getProductIdsForType = (type: string) => {
    return [`prod_${snakeCase(type)}_year`, `prod_${snakeCase(type)}_month`]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value as unknown as string[]
    const productIds = values
      .filter((v) => !selectedUserTypes.includes(v))
      .flatMap((value) => getProductIdsForType(value))
    setSelectedUserTypes(values)
    setSelectedIds([...selectedIds, ...productIds])
  }

  //update the selected user types on the select component based on the products
  function updatedSelectedUserTypes(newValues: string[]) {
    const selected = userTypes
      .filter(({ type }) => {
        const productIds = getProductIdsForType(type)
        return productIds.some((p) => newValues?.includes(p))
      })
      .map((type) => type.type)
    setSelectedUserTypes(selected)
  }

  const onCheckboxChange = (checked: boolean, productId: string) => {
    if (!checked) {
      const newValues = selectedIds.filter((val) => val !== productId)
      updatedSelectedUserTypes(newValues)
      setSelectedIds(newValues)
    } else {
      const newValues = uniq([...selectedIds, productId])
      updatedSelectedUserTypes(newValues)
      setSelectedIds(newValues)
    }
  }

  const onAllChange = (checked: boolean, products: string[]) => {
    const currentValue = field?.value ?? []
    if (!checked) {
      //remove all monthly products
      const newValues = currentValue.filter((val) => !products.includes(val))
      updatedSelectedUserTypes(newValues)
      setSelectedIds(newValues)
    } else {
      const newValues = uniq([...currentValue, ...products])
      updatedSelectedUserTypes(newValues)
      setSelectedIds(newValues)
    }
  }

  return (
    <FormControl fullWidth size="small" sx={{ width: 300 }}>
      <Select multiple value={sorted ?? []} onChange={handleChange}>
        {userTypes?.map((userType) => {
          return (
            <MenuItem key={userType._id} value={userType.type}>
              {userType.type}
            </MenuItem>
          )
        })}
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
      {!!sorted.length && (
        <Box my={2} sx={{ maxHeight: 400, width: 800, overflowY: 'scroll' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  User Type
                </TableCell>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  Monthly
                </TableCell>
                <TableCell sx={{ backgroundColor: 'grey.200' }}>
                  Yearly
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((user_type, index) => {
                const monthlyProductId = `prod_${snakeCase(user_type)}_month`
                const yearlyProductId = `prod_${snakeCase(user_type)}_year`
                const monthlyChecked = selectedIds.includes(monthlyProductId)
                const yearlyChecked = selectedIds.includes(yearlyProductId)
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '& td': {
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'divider'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ width: 250 }} variant="body2">
                        {user_type}
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
