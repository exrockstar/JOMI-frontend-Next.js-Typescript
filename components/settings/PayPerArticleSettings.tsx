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

const PayPerArticleSettings = () => {
  return (
    <Card>
      <CardContent>
        <FormGroup sx={{ gap: 2 }}>
          <Box>
            <Typography variant="h5">Pay Per Article</Typography>
            <Typography variant="caption">
              Pay per article global settings
            </Typography>
          </Box>
          <FormControlLabel
            control={<FormikCheckbox name="isRentArticleFeatureOn" />}
            label="Enable rent article"
          />
          <FormikTextField
            name="rentDuration"
            type="number"
            label="Rent duration (days)"
            size="small"
            fullWidth
          />
          <FormControlLabel
            control={<FormikCheckbox name="isPurchaseArticleFeatureOn" />}
            label="Enable purchase aticle"
          />

          <Box>
            <FormControlLabel
              control={
                <FormikCheckbox name="displayPurchaseAndRentToAdminOnly" />
              }
              label="Display to admin only"
              sx={{ display: 'block' }}
            />
            <Typography variant="caption">
              Display only to admin users for testing purposes
            </Typography>
          </Box>
        </FormGroup>
      </CardContent>
    </Card>
  )
}

export default PayPerArticleSettings
