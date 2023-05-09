import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  FormControlLabel
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import React from 'react'

const TrialsSettings = () => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <FormGroup sx={{ gap: 2 }}>
          <Typography variant="h5">Trials</Typography>
          <FormControlLabel
            control={<FormikCheckbox name="isTrialFeatureOn" />}
            label="Enable trials"
          />
          <FormikTextField
            name="trialDuration"
            type="number"
            label="Trial duration (days)"
            size="small"
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
}

export default TrialsSettings
