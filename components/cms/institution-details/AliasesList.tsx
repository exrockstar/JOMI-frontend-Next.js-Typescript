import { Add, Delete } from '@mui/icons-material'
import { Stack, Box, Button, IconButton } from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useField } from 'formik'
import React, { useState } from 'react'

const AliasesList = () => {
  const [field, meta, helpers] = useField('aliases')
  const aliases = field.value
  const addAlias = () => helpers.setValue([...aliases, ''])

  const removeAlias = (value: string) => {
    const updated = field.value?.filter((alias) => alias !== value)
    helpers.setValue(updated)
  }

  return (
    <Stack spacing={1}>
      {aliases.map((alias, index) => {
        return (
          <Stack direction="row" key={index} alignItems={'flex-start'}>
            <FormikTextField
              name={`aliases[${index}]`}
              size="small"
              placeholder="Alias"
              sx={{ width: { md: 400, xs: '100%' } }}
            />
            <IconButton color="error" onClick={() => removeAlias(alias)}>
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
          Add Alias
        </Button>
      </Box>
    </Stack>
  )
}

export default AliasesList
