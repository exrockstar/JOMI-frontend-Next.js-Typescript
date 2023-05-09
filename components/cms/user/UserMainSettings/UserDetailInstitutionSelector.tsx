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

type Option = {
  value: string
  label: string
  inputValue?: string
}
/**
 * Sets both institution_name and institution for user
 * @param param0
 * @returns
 */
const UserDetailInstitutionSelector = () => {
  const [institution_name] = useField('institution_name')
  const [institution] = useField('institution_name')
  const [typing, setTyping] = useState(false)
  const [value, setValue] = useState(
    institution
      ? {
          label: institution_name.value,
          value: institution.value
        }
      : null
  )
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
    institution: Option
  ) => {
    if (institution) {
      setFieldValue('institution', institution?.value ?? '')
      setFieldValue(
        'institution_name',
        institution.inputValue ?? institution.label
      )
      setValue({
        label: institution.inputValue ?? institution.label,
        value: institution.inputValue ?? institution.value
      })
    } else {
      setFieldValue('institution', '')
      setFieldValue('institution_name', '')
      setValue(null)
    }
  }

  const handleTextChange = useCallback(
    throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e?.target.value as any
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

  const institutions: Option[] = data?.institutions?.institutions ?? []
  const isLoading = loading || typing

  return (
    <Autocomplete
      onChange={handleChange}
      onInputChange={handleTextChange}
      filterOptions={(options: Option[], params) => {
        const { inputValue } = params
        const filtered = options.filter((o) => {
          return o.label.indexOf(inputValue) > -1
        })
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.label)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            value: '',
            inputValue: inputValue,
            label: `Add "${inputValue}"`
          })
        }

        return filtered
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option: Option) =>
        option.inputValue ?? option.label ?? ''
      }
      value={value}
      options={institutions}
      loading={isLoading}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderInput={(params) => (
        <TextField
          {...params}
          label="Institution"
          size={'small'}
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
              secondary={option.value ? `Database ID: ${option.value}` : null}
            ></ListItemText>
          </MenuItem>
        )
      }}
    />
  )
}

export default UserDetailInstitutionSelector
