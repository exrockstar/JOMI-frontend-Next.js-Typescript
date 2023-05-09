import { Switch, SwitchProps, TextField as MuiTextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'

type Props = { name: string } & SwitchProps

const FormikSwitch = ({ name, onChange, ...props }: Props) => {
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.checked)
  }

  return (
    <Switch
      name={name}
      checked={field.value}
      onChange={handleChange}
      {...props}
    />
  )
}

export default FormikSwitch
