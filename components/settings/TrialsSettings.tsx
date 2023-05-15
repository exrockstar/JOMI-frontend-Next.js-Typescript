import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  FormControlLabel,
  Box
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import React from 'react'

const TrialsSettings = () => {
  return (
    <Card>
      <CardContent>
        <FormGroup sx={{ gap: 2 }}>
          <Box>
            <Typography variant="h5">Trials</Typography>
            <Typography variant="caption">Trials - global settings</Typography>
          </Box>
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
