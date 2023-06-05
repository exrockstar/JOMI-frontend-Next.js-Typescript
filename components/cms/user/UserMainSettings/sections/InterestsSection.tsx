import {
  FormControlLabel,
  Stack,
  Checkbox,
  Typography,
  Autocomplete,
  TextField,
  createFilterOptions,
  Box
} from '@mui/material'
import { INTEREST_CATEGORIES } from 'common/constants'
import { removeDuplicates } from 'common/utils'
import { useField, useFormikContext } from 'formik'
import React from 'react'

type Option = {
  title: string
  inputValue?: string
}
const InterestsSection = () => {
  const interests = INTEREST_CATEGORIES
  const { setFieldValue } = useFormikContext()
  const [field] = useField<string[]>({ name: 'interests' })
  const flattenedInterests = interests.flatMap((i) => [
    i.name,
    ...(i.sub_categories ?? [])
  ])
  const handleChangeParent = (
    interest: Unpacked<typeof INTEREST_CATEGORIES>,
    checked: boolean
  ) => {
    let updated: string[]
    if (checked) {
      const subCategories = interest.sub_categories ?? []
      updated = removeDuplicates([
        ...field.value,
        interest.name,
        ...subCategories
      ])
    } else {
      updated = field.value.filter((val) => val !== interest.name)
      if (interest.sub_categories) {
        updated = updated.filter(
          (val) => !interest.sub_categories.includes(val)
        )
      }
    }
    setFieldValue('interests', updated)
  }

  const handleSubCategoryChange = (sub_category: string, checked: boolean) => {
    let updated: string[]
    if (checked) {
      updated = removeDuplicates([...field.value, sub_category])
    } else {
      updated = field.value.filter((val) => val !== sub_category)
    }
    setFieldValue('interests', updated)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    other_interest: (string | { title: string; inputValue: string })[]
  ) => {
    let updated: string[]
    console.log(`other_interest`, other_interest)

    updated = removeDuplicates([
      ...field.value.filter((val) => flattenedInterests.includes(val)),
      ...other_interest.map((x) => {
        if (typeof x === 'string') {
          return x
        }
        if (x) return x.inputValue
      })
    ])

    console.log(updated)
    setFieldValue('interests', updated)
  }

  const otherInterests = field.value
    .filter((val) => !flattenedInterests.includes(val))
    .map((val) => {
      return {
        title: val,
        inputValue: val
      }
    })
  return (
    <>
      <Typography variant="h5" mt={2}>
        Interests
      </Typography>
      <Stack px={2}>
        {interests.map((interest, index) => {
          const checked = field.value?.includes(interest.name)
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={checked}
                    onChange={(e, checked) =>
                      handleChangeParent(interest, checked)
                    }
                  />
                }
                label={interest.name}
              />
              {interest.sub_categories?.map((subCategory, _index) => {
                const checked = field.value?.includes(subCategory)
                return (
                  <Box key={_index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={checked}
                          onChange={(e, checked) =>
                            handleSubCategoryChange(subCategory, checked)
                          }
                        />
                      }
                      label={subCategory}
                      sx={{ ml: 2 }}
                    />
                  </Box>
                )
              })}
            </div>
          )
        })}
      </Stack>

      <Typography variant="h5" mt={2}>
        Other Interests
      </Typography>
      <Stack mt={2}>
        <Autocomplete
          value={otherInterests}
          options={otherInterests}
          onChange={handleChange}
          getOptionLabel={(option: Option) => {
            // Regular option
            return option.title
          }}
          filterOptions={(options: Option[], params) => {
            const { inputValue } = params
            const filtered = options.filter((o) => {
              return o.inputValue.indexOf(inputValue) > -1
            })
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.inputValue
            )
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`
              })
            }

            return filtered
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          limitTags={2}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Other Interests"
              helperText="Type and hit enter to add other interests"
              fullWidth
            />
          )}
          multiple
          freeSolo
        />
      </Stack>
    </>
  )
}

export default InterestsSection
