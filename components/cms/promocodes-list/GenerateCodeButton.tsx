import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_', 10)

const GenerateCodeButton = () => {
  const { setFieldValue } = useFormikContext()
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        const couponCode = nanoid()
        setFieldValue('code', couponCode)
      }}
    >
      Generate Code
    </Button>
  )
}
export default GenerateCodeButton
