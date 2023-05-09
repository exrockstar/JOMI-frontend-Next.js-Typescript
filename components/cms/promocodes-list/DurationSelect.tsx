import { Box, FormControl, MenuItem, Select, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { useField, useFormikContext } from 'formik'
import { PromoCodeDuration } from 'graphql/types'

const DurationSelect = () => {
  const [field, meta] = useField<PromoCodeDuration>('duration')
  const { setFieldValue } = useFormikContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('duration', e.target.value)
    if (e.target.value !== PromoCodeDuration.Repeating) {
      setFieldValue('duration_in_months', null)
    }
  }

  const isRepeating = field.value === PromoCodeDuration.Repeating
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <FormControl fullWidth size="small" sx={{ width: 300 }}>
          <Select value={field.value} onChange={handleChange}>
            <MenuItem value="once">Once</MenuItem>
            <MenuItem value="repeating">Multiple Months</MenuItem>
            <MenuItem value="forever">Forever</MenuItem>
          </Select>
        </FormControl>
        {isRepeating && (
          <FormikTextField
            name="duration_in_months"
            placeholder="e.g., 2"
            label="Duration in months"
            size="small"
            type="number"
          ></FormikTextField>
        )}
      </Stack>
      <Typography variant="caption">
        For subscriptions and customers, this determines how long this coupon
        will apply once redeemed.{' '}
      </Typography>
    </Box>
  )
}
export default DurationSelect
