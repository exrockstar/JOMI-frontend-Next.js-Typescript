import { Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { UpdateOrderInput } from 'graphql/types'

const OrderFormErrors = () => {
  const { errors } = useFormikContext<UpdateOrderInput>()
  const entries = Object.entries(errors)
  return (
    <div>
      {entries.map((entry) => {
        const [key, value] = entry
        return (
          <Typography key={key} color="error.main">
            {key}: {JSON.stringify(value)}
          </Typography>
        )
      })}
    </div>
  )
}
export default OrderFormErrors
