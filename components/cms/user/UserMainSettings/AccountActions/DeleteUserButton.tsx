import { LoadingButton } from '@mui/lab'
import { useField, useFormikContext } from 'formik'
import React, { useCallback } from 'react'

import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'
import RestoreIcon from '@mui/icons-material/RestorePageOutlined'

const DeleteUserButton = () => {
  const [deletedField] = useField<boolean>('deleted')
  const { setFieldValue } = useFormikContext()
  const deleted = deletedField.value

  const toggleDelete = useCallback(() => {
    setFieldValue('deleted', !deleted)
  }, [deleted, setFieldValue])

  const label = deleted ? 'Restore User' : 'Delete user'
  const icon = deleted ? <RestoreIcon /> : <DeleteIcon />
  const color = deleted ? 'secondary' : 'error'

  return (
    <LoadingButton
      startIcon={icon}
      color={color}
      variant="contained"
      onClick={toggleDelete}
    >
      {label}
    </LoadingButton>
  )
}

export default DeleteUserButton
