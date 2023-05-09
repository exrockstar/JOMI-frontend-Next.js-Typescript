import { LoadingButton } from '@mui/lab'
import React, { useCallback } from 'react'
import DisableIcon from '@mui/icons-material/NotInterestedOutlined'
import EnableIcon from '@mui/icons-material/LockOpenOutlined'
import { useField, useFormikContext } from 'formik'
import FormikTextField from 'components/common/formik/FormikTextFIeld'

const HAS_BLOCK_FIELD = 'hasManualBlock'
const BlockUserButton = () => {
  const [hasManualBlockField] = useField<boolean>(HAS_BLOCK_FIELD)
  const { setFieldValue } = useFormikContext()
  const blocked = hasManualBlockField.value

  const toggleBlock = useCallback(() => {
    setFieldValue(HAS_BLOCK_FIELD, !blocked)
  }, [blocked, setFieldValue])

  const label = blocked ? 'Unblock User' : 'Block user'
  const icon = blocked ? <EnableIcon /> : <DisableIcon />
  const color = blocked ? 'secondary' : 'error'
  return (
    <>
      <LoadingButton
        startIcon={icon}
        onClick={toggleBlock}
        color={color}
        variant="contained"
      >
        {label}
      </LoadingButton>
      {blocked && (
        <FormikTextField
          name="manualBlockMessage"
          multiline
          rows={3}
          label="Block message"
          helperText="Message shown to the user"
        />
      )}
    </>
  )
}

export default BlockUserButton
