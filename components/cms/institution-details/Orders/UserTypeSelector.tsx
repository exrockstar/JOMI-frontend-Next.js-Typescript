import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { useField, useFormikContext } from 'formik'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const UserTypeSelector = () => {
  const { data } = useUserTypesAndSpecialtiesQuery()
  // const [userTypes, setUserTypes] = React.useState<string[]>([])
  const [field] = useField('restricted_user_types')
  const { setFieldValue } = useFormikContext()
  const userTypes = field.value
  const handleChange = (event: SelectChangeEvent<typeof userTypes>) => {
    const {
      target: { value }
    } = event
    // On autofill we get a stringified value.
    const newVal = typeof value === 'string' ? value.split(',') : value
    setFieldValue('restricted_user_types', newVal)
  }

  const user_types = data?.userTypes ?? []
  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="multiple-user-type-select-label">
          Restricted User Types
        </InputLabel>
        <Select
          labelId="multiple-user-type-select-label"
          id="multiple-user-type-select"
          multiple
          value={userTypes}
          onChange={handleChange}
          input={<OutlinedInput label="Restricted User Types" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {user_types?.map((user_type) => (
            <MenuItem key={user_type._id} value={user_type.type}>
              <Checkbox checked={userTypes.indexOf(user_type.type) > -1} />
              <ListItemText primary={user_type.type} />
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="text.secondary">
          Only the selected user type(s) will have access. Leave blank for
          no restrictions.
        </Typography>
      </FormControl>
    </div>
  )
}

export default UserTypeSelector
