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

export const localeOptions = [
  { label: 'हिन्दी (Hindi)', value: 'HI' },
  { label: 'العربية (Arabic)', value: 'AR' },
  { label: '中文 (Chinese)', value: 'ZH' },
  { label: 'Nederlands (Dutch)', value: 'NL' },
  { label: 'Français (French)', value: 'FR' },
  { label: 'Deutsch (German)', value: 'DE' },
  { label: 'עִבְרִית (Hebrew)', value: 'HE' },
  { label: 'Italiano (Italian)', value: 'IT' },
  { label: '日本語 (Japanese)', value: 'JA' },
  { label: '한국어 (Korean)', value: 'KO' },
  { label: 'Português (Portuguese)', value: 'PT' },
  { label: 'Русский (Russian)', value: 'RU' },
  { label: 'Español (Spanish)', value: 'ES' },
  { label: 'Türkçe (Turkish)', value: 'TR' }
]

const LanguageSelector = () => {
  const [field] = useField<string[]>('languages')
  const { setFieldValue } = useFormikContext()
  const languages = field.value ?? []
  const handleChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value }
    } = event
    // On autofill we get a stringified value.
    const newVal = typeof value === 'string' ? value.split(',') : value
    setFieldValue('languages', newVal)
  }
  return (
    <div>
      <FormControl fullWidth size="small" sx={{ my: 2 }}>
        <InputLabel id="multiple-languages-select-label">
          Select Languages
        </InputLabel>
        <Select
          labelId="multiple-languages-select-label"
          id="multiple-languages-select"
          multiple
          value={languages}
          onChange={handleChange}
          input={<OutlinedInput label="Select Languages" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {localeOptions?.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              <Checkbox checked={languages.indexOf(lang.value) > -1} />
              <ListItemText primary={lang.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default LanguageSelector
