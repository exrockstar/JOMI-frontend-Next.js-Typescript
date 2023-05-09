import {
  Autocomplete,
  CircularProgress,
  List,
  ListItemText,
  MenuItem,
  TextField
} from '@mui/material'
import { useField, useFormikContext } from 'formik'
import { useInstitutionSearchLazyQuery } from 'graphql/cms-queries/institutions-list.generated'
import { QueryOperation } from 'graphql/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import throttle from 'lodash/throttle'
import { useSnackbar } from 'notistack'

type Props = {
  name: string
  helperText?: string
  size?: 'small' | 'medium'
}
const InstitutionSelector = ({ name, helperText, size }: Props) => {
  const [field, meta] = useField(name)
  const [typing, setTyping] = useState(false)
  const [value, setValue] = useState(null)
  const { setFieldValue } = useFormikContext()
  const { enqueueSnackbar } = useSnackbar()
  const [search, { data, loading }] = useInstitutionSearchLazyQuery({
    onCompleted() {
      setTyping(false)
    },
    onError(e) {
      setTyping(false)
      enqueueSnackbar(`Search institution error ${e.message}`, {
        variant: 'error'
      })
    }
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    institution: Unpacked<typeof data.institutions.institutions>
  ) => {
    if (institution) {
      console.log('handleChange', institution)
      setFieldValue(name, institution?.value ?? '')
      setValue(institution)
    } else {
      setFieldValue(name, '')
      setValue(null)
    }
  }

  const handleTextChange = useCallback(
    throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value as any
      if (typeof val !== 'string') return
      setTyping(true)
      search({
        variables: {
          input: {
            skip: 0,
            limit: 5,
            filters: [
              {
                columnName: 'name',
                operation: QueryOperation.Contains,
                value: val
              }
            ]
          }
        }
      })
    }, 500),
    []
  )

  useEffect(() => {
    search({
      variables: {
        input: {
          skip: 0,
          limit: 5
        }
      }
    })
  }, [])

  const institutions = data?.institutions?.institutions ?? []
  const isLoading = loading || typing

  return (
    <Autocomplete
      onChange={handleChange}
      onInputChange={handleTextChange}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      value={value}
      options={institutions}
      loading={isLoading}
      limitTags={2}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Institution"
          error={!!meta.error}
          helperText={meta.error ?? helperText}
          size={size}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <MenuItem {...props}>
            <ListItemText
              primary={option.label}
              secondary={`Database ID: ${option.value}`}
            ></ListItemText>
          </MenuItem>
        )
      }}
    />
  )
}

export default InstitutionSelector
