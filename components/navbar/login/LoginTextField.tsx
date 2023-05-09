import FormikTextField, {
  FormikTextFieldProps
} from 'components/common/formik/FormikTextFIeld'

const LoginTextField = ({ sx, ...props }: FormikTextFieldProps) => {
  return (
    <FormikTextField
      {...props}
      tabIndex={-1}
      sx={{
        color: 'text.secondary',

        '& input': {
          borderRadius: 0,
          px: 2,
          py: 1.5,
          fontSize: '.875rem'
        },
        backgroundColor: 'grey.700',
        '& input:valid:focus + fieldset': {
          borderStyle: 'none'
        },
        '& input:valid:hover + fieldset': {
          borderColor: 'grey.500',
          borderWidth: 1,
          borderStyle: 'solid'
        },
        '& input:-webkit-autofill': {
          boxShadow: '0 0 0 100px #3f3f46 inset'
        },

        ...sx
      }}
    />
  )
}

export default LoginTextField
