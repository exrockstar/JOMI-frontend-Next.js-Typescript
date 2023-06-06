import {
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Typography,
  Box
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import React from 'react'

const TrialsSettings = () => {
  return (
    <Card>
      <CardContent>
        <FormGroup sx={{ gap: 3 }}>
          <Box>
            <FormControlLabel
              control={<FormikCheckbox name="isTrialFeatureOn" />}
              label="Display trials button"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Shows trials button on the subscription and article pages
            </Typography>
          </Box>
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
