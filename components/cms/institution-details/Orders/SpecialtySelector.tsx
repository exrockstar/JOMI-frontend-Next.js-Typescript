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

const SpecialtySelector = () => {
  const { data } = useUserTypesAndSpecialtiesQuery()
  // const [userTypes, setUserTypes] = React.useState<string[]>([])
  const [field] = useField('restricted_specialties')
  const { setFieldValue } = useFormikContext()
  const specialties = field.value
  const handleChange = (event: SelectChangeEvent<typeof specialties>) => {
    const {
      target: { value }
    } = event
    // On autofill we get a stringified value.
    const newVal = typeof value === 'string' ? value.split(',') : value
    setFieldValue('restricted_specialties', newVal)
  }

  const options = data?.specialties ?? []
  console.log(options)
  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="multiple-user-type-select-label">
          Restricted Specialization
        </InputLabel>
        <Select
          labelId="multiple-user-type-select-label"
          id="multiple-user-type-select"
          multiple
          value={specialties}
          onChange={handleChange}
          input={<OutlinedInput label="Restricted Specialization" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options?.map((specialty) => (
            <MenuItem key={specialty._id} value={specialty.name}>
              <Checkbox checked={specialties.indexOf(specialty.name) > -1} />
              <ListItemText primary={specialty.name} />
            </MenuItem>
          ))}
          <MenuItem value={'Other'}>
            <Checkbox checked={specialties.indexOf('Other') > -1} />
            <ListItemText primary={'Other'} />
          </MenuItem>
          <MenuItem value={'Not Specialized'}>
            <Checkbox checked={specialties.indexOf('Not Specialized') > -1} />
            <ListItemText primary={'Not Specialized'} />
          </MenuItem>
        </Select>
        <Typography variant="caption" color="text.secondary">
          Selected specialization will be removed from subscription. Leave blank
          for no restriction
        </Typography>
      </FormControl>
    </div>
  )
}

export default SpecialtySelector
