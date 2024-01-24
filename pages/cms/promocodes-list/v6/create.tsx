import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Divider, Stack, Typography } from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import DurationSelect from 'components/cms/promocodes-list/DurationSelect'
import GenerateCodeButton from 'components/cms/promocodes-list/GenerateCodeButton'
import ProductSelect from 'components/cms/promocodes-list/ProductSelect'
import FormikDatePicker from 'components/common/formik/FormikDatePicker'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import dayjs from 'dayjs'
import { Formik, Form } from 'formik'
import { useCreateStripeCodeMutation } from 'graphql/cms-queries/stripe-promo-codes.generated'
import { CreatePromoCodeInput, PromoCodeDuration } from 'graphql/types'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { object, string, array } from 'yup'

const schema = object({
  code: string().required()
})

const CreateStripePromoCodePage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [createCode, { loading }] = useCreateStripeCodeMutation({
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    onCompleted(result) {
      enqueueSnackbar(
        `Successfully created code ${result.createStripePromoCode?.code}`,
        {
          variant: 'success'
        }
      )
      location.href = '/cms/promocodes-list/v6'
    }
  })
  return (
    <CmsLayout>
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
          <Typography variant="h4">Create Stripe Promo Code</Typography>
        </Stack>
      </Stack>
      <Stack p={2} mt={2}>
        <Formik<CreatePromoCodeInput>
          initialValues={{
            code: '',
            duration: PromoCodeDuration.Once
          }}
          validationSchema={schema}
          onSubmit={(values, formikHelpers) => {
            console.log(values)
            if (!!values.amount_off && !!values.percent_off) {
              formikHelpers.setFieldError(
                'amount_off',
                'Choose only one type of discount'
              )
            }
            if (!values.amount_off && !values.percent_off) {
              formikHelpers.setFieldError(
                'amount_off',
                'Please enter a discount'
              )
            }

            createCode({
              variables: {
                input: {
                  code: values.code,
                  percent_off: values.percent_off || undefined,
                  amount_off: values.amount_off || undefined,
                  applies_to: values.applies_to || undefined,
                  duration: values.duration || undefined,
                  duration_in_months: values.duration_in_months || undefined,
                  redeem_by: values.redeem_by || undefined,
                  max_redemptions: values.max_redemptions || undefined,
                  name: values.name || undefined
                }
              }
            })
          }}
        >
          <Form>
            <Stack alignItems={'flex-start'} gap={2}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body2">Code</Typography>
                <Stack
                  sx={{ width: '50%' }}
                  direction="row"
                  alignItems={'flex-start'}
                  gap={2}
                >
                  <FormikTextField
                    name="code"
                    size="small"
                    placeholder="Code to be entered by the user. ABCD1234"
                  ></FormikTextField>
                  <GenerateCodeButton />
                </Stack>
              </Box>
              <Box>
                <Typography variant="body2">Code Description</Typography>
                <Typography variant="caption" color="primary">
                  This will appear in invoice, stripe checkout and frontend.
                </Typography>
                <Box width={800}>
                  <FormikTextField
                    name="name"
                    size="small"
                    placeholder="e.g.,20% Off for 3 months"
                    fullWidth
                  ></FormikTextField>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="primary">
                  Choose fixed amount or percentage discount:
                </Typography>
                <Stack direction="row">
                  <Box>
                    <Typography variant="body2">
                      Fixed Amount Discount
                    </Typography>
                    <FormikTextField
                      name="amount_off"
                      size="small"
                      placeholder="20"
                      InputProps={{
                        startAdornment: '$'
                      }}
                      type="number"
                    />
                  </Box>
                  <Divider
                    orientation="vertical"
                    sx={{ alignSelf: 'flex-end' }}
                  >
                    or
                  </Divider>
                  <Box>
                    <Typography variant="body2">Percentage Discount</Typography>
                    <FormikTextField
                      name="percent_off"
                      size="small"
                      placeholder="20"
                      InputProps={{
                        endAdornment: '%'
                      }}
                      type="number"
                    />
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Box>
                  <Typography variant="body2">
                    Apply to specific user types or products
                  </Typography>
                  <ProductSelect />
                </Box>
                <Typography variant="caption">
                  1. Choose which specific user types or products this code will
                  apply to.
                  <br />
                  2. You can select multiple types or products. <br />
                  3. If none is selected, it will apply to all user types or
                  yearly and monthly products.
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">Duration</Typography>
                <Box>
                  <DurationSelect />
                </Box>
              </Box>
              <Box>
                <Typography fontWeight={700}>Redemption Limits</Typography>
                <Typography variant="caption" color="darkorange">
                  {`Leaving this empty means there is no limit to how many times the code can be redeemed.`}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Redeem By
                </Typography>
                <FormikDatePicker name="redeem_by" minDate={dayjs()} />
                <Typography mt={2} variant="body2">
                  {' '}
                  Redemption Count Limit
                </Typography>
                <FormikTextField
                  type="number"
                  name="max_redemptions"
                  size="small"
                  defaultValue={null}
                />
                <Box>
                  <Typography variant="caption" color="primary">
                    Number of times this code can be redeemed.
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              sx={{ my: 4 }}
              startIcon={<Add />}
              loading={loading}
            >
              Create Promo Code
            </LoadingButton>
          </Form>
        </Formik>
      </Stack>
    </CmsLayout>
  )
}
export default CreateStripePromoCodePage
