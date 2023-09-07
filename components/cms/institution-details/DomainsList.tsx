import { Add, Delete } from '@mui/icons-material'
import { Stack, Box, Button, IconButton } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useField } from 'formik'
import React from 'react'

const DomainsList = () => {
  const [field, meta, helpers] = useField('domains')
  const domains = field.value
  const addAlias = () => helpers.setValue([...domains, ''])

  const remove = (value: string) => {
    const updated = field.value?.filter((domain) => domain !== value)
    helpers.setValue(updated)
  }

  return (
    <Stack spacing={1}>
      {domains.map((alias, index) => {
        return (
          <Stack direction="row" key={index} alignItems={'start'}>
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
      <Box my={2}>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => addAlias()}
          startIcon={<Add />}
        >
          Add Domains
        </Button>
      </Box>
    </Stack>
  )
}

export default DomainsList
