import { DateTimePicker } from '@mui/lab'
import {
  Box,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { useField } from 'formik'

const TrialsSection = () => {
  const [field] = useField('trialAccessAt')

  return (
    <Box>
      <FormGroup sx={{ my: 2 }}>
        <Typography variant="h5">Trials</Typography>
        <FormControlLabel
          control={<FormikCheckbox name="trialsAllowed" />}
          label="Trials Allowed?"
          sx={{ mb: 2 }}
        />
        <DateTimePicker
          value={field.value}
          onChange={() => {}}
          disabled
          renderInput={(params) => (
            <TextField {...params} size="small" label="Trial Accessed At" />
          )}
        />
      </FormGroup>
    </Box>
  )
}
export default TrialsSection
