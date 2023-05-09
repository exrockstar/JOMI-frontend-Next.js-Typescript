import { Delete } from '@mui/icons-material'
import { Stack, Box, Button, IconButton } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useField } from 'formik'
import React from 'react'

const DomainsList = () => {
  const [field, meta, helpers] = useField('domains')
  const aliases = field.value
  const addAlias = () => helpers.setValue([...aliases, ''])

  const remove = (value: string) => {
    const updated = field.value?.filter((alias) => alias !== value)
    helpers.setValue(updated)
  }

  return (
    <Stack spacing={1}>
      <Box my={2}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => addAlias()}
        >
          Add Domains
        </Button>
      </Box>
      {aliases.map((alias, index) => {
        return (
          <Stack direction="row" key={index}>
            <FormikTextField
              name={`domains[${index}]`}
              size="small"
              placeholder="e.g., college.edu"
              sx={{ width: { md: 400, xs: '100%' } }}
            />
            <IconButton color="error" onClick={() => remove(alias)}>
              <Delete />
            </IconButton>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default DomainsList
