import { Add, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography
} from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { ArticleRestrictionEnum, UpdateCountriesInput } from 'graphql/types'
import React from 'react'
import useCountryManagementList from './useCountryManagementList'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikSelect from 'components/common/formik/FormkSelect'
import { useUpdateCountriesMutation } from 'graphql/cms-queries/countries.generated'
import { useSnackbar } from 'notistack'
import FormikTextField from 'components/common/formik/FormikTextFIeld'

const UpdateCountriesDialog = (props: DialogProps) => {
  const { selected, refetch } = useCountryManagementList()
  const { enqueueSnackbar } = useSnackbar()
  const [updateCountries, { data }] = useUpdateCountriesMutation({
    onCompleted(data) {
      enqueueSnackbar(data.result, { variant: 'success' })
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })
  const handleSubmit = (
    values: any,
    formikHelpers: FormikHelpers<UpdateCountriesInput>
  ) => {
    updateCountries({
      variables: {
        input: {
          codes: selected,
          trialsEnabled:
            values.trialsEnabled === 'Yes'
              ? true
              : values.trialsEnabled === 'No'
              ? false
              : null,
          articleRestriction: values.articleRestriction,
          coefficient: values.coefficient,
          multiplier: values.multiplier
        }
      }
    }).then(() => {
      formikHelpers.resetForm()
      refetch()
      props.onClose({}, null)
    })
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        codes: [],
        trialsEnabled: null,
        articleRestriction: null,
        coefficient: null,
        multiplier: null
      }}
    >
      {({ isSubmitting, submitForm, errors, dirty }) => {
        return (
          <Dialog {...props} maxWidth="lg">
            <Form>
              <DialogTitle>Update Countries</DialogTitle>
              <Divider />
              <DialogContent sx={{ width: 400 }}>
                <Stack gap={2}>
                  <Typography variant="body2" color="warning.main">
                    Selected <b>{selected.length}</b> countries
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Trials Enabled
                    </Typography>
                    <FormikSelect
                      name="trialsEnabled"
                      id={'trialsEnabled-select'}
                      size="small"
                      defaultValue={null}
                    >
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                      <MenuItem value={'No'}>No</MenuItem>
                    </FormikSelect>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Article Restriction
                    </Typography>
                    <FormikSelect
                      name="articleRestriction"
                      id={'aticle-restriction-select'}
                      size="small"
                    >
                      <MenuItem value={ArticleRestrictionEnum.Free}>
                        Free
                      </MenuItem>
                      <MenuItem value={ArticleRestrictionEnum.Evaluation}>
                        Evaluation
                      </MenuItem>
                      <MenuItem
                        value={ArticleRestrictionEnum.RequiresSubscription}
                      >
                        Requires Subscription
                      </MenuItem>
                    </FormikSelect>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Percentage from default price
                    </Typography>
                  </Box>
                  <FormikTextField name="coefficient" type="number" />
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Multiplier
                    </Typography>
                    <FormikTextField name="multiplier" type="number" />
                  </Box>
                </Stack>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 3 }}>
                <Button color="error" onClick={(e) => props.onClose(e, null)}>
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  color="primary"
                  disabled={Object.keys(errors).length > 0 || !dirty}
                  loading={isSubmitting}
                  onClick={() => {
                    submitForm()
                  }}
                >
                  Update
                </LoadingButton>
              </DialogActions>
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default UpdateCountriesDialog
