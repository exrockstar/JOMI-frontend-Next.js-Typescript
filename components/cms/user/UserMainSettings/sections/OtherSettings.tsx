import { Checkbox, FormControlLabel, Tooltip, Typography } from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { useField, useFormikContext } from 'formik'
import React from 'react'

const OtherSettings = () => {
  const [emailNeedsConfirmField] = useField('emailNeedsConfirm')
  const [instEmailField] = useField('inst_email')
  const { setFieldValue } = useFormikContext()
  const toggleEmailConfirmation = () => {
    setFieldValue('emailNeedsConfirm', !emailNeedsConfirmField.value)
  }

  const confirmed = !emailNeedsConfirmField.value
  const hasInstEmail = !!instEmailField.value
  return (
    <div>
      <Typography variant="h5" my={2}>
        Email Confirmation
      </Typography>

      <Tooltip
        title={
          !hasInstEmail ? 'Set an institutional email to enable this field' : ''
        }
        arrow
      >
        <FormControlLabel
          control={
            <FormikCheckbox
              name="instEmailVerified"
              id="instEmailVerified"
              size="small"
              disabled={!hasInstEmail}
            />
          }
          label="Has confirmed institution email?"
        />
      </Tooltip>

      <FormControlLabel
        control={
          <Checkbox
            value={confirmed}
            checked={confirmed}
            size="small"
            onChange={() => toggleEmailConfirmation()}
          />
        }
        label="Has confirmed personal email?"
      />
    </div>
  )
}

export default OtherSettings
