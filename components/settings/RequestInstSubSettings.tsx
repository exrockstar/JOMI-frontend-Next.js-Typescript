import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  FormControlLabel,
  Box
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import React from 'react'

const RequestInstSubSettings = () => {
  return (
    <Card>
      <CardContent>
        <FormGroup sx={{ gap: 2 }}>
          <Box>
            <Typography variant="h5">Request Institutional Subscription</Typography>
            <Typography variant="caption">
              Request Institutional Subscription global settings
            </Typography>
          </Box>
          <FormControlLabel
            control={<FormikCheckbox name="isRequestInstSubButtonPaperOn" />}
            label="Show Request Button"
          />
        </FormGroup>
      </CardContent>
    </Card>
  )
}

export default RequestInstSubSettings
