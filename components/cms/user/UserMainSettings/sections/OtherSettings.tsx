import { Checkbox, FormControlLabel, Tooltip, Typography } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import VerifyDateText from './VerifyDateText'
import { InfoOutlined } from '@mui/icons-material'

const OtherSettings = () => {
  const [verifiedAt] = useField('emailVerifiedAt')
  const [instEmailVerifiedAt] = useField('instEmailVerifiedAt')
  const { setFieldValue } = useFormikContext()
  const toggleEmailConfirmation = () => {
    const newVal = !verifiedAt.value
    setFieldValue('emailVerifiedAt', newVal ? new Date() : null)
  }

  const toggleInstEmailConfirmation = () => {
    const newVal = !instEmailVerifiedAt.value

    setFieldValue('instEmailVerifiedAt', newVal ? new Date() : null)
  }

  return (
    <div>
      <Typography variant="h5" my={2} display="flex" alignItems={'center'}>
        Email Confirmation{' '}
        <Tooltip title="To set the email verification date, uncheck and check the checkboxes.">
          <InfoOutlined color="info" />
        </Tooltip>
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={!!instEmailVerifiedAt.value}
            size="small"
            onChange={toggleInstEmailConfirmation}
          />
        }
        label="Has confirmed institution email?"
      />
      <VerifyDateText date={instEmailVerifiedAt.value} />
      <FormControlLabel
        control={
          <Checkbox
            checked={!!verifiedAt.value}
            size="small"
            onChange={toggleEmailConfirmation}
          />
        }
        label="Has confirmed account email?"
      />
      <VerifyDateText date={verifiedAt.value} />
    </div>
  )
}

export default OtherSettings
