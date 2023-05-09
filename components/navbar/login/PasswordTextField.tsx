import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormikTextFieldProps } from 'components/common/formik/FormikTextFIeld'
import { useState } from 'react'
import LoginTextField from './LoginTextField'

const PasswordTextField = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <LoginTextField
      size="small"
      type={isPasswordVisible ? 'text' : 'password'}
      name="password"
      placeholder="Enter password here"
      sx={{
        mt: 1,
        mb: 1.5
      }}
      InputProps={{
        sx: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          '&.Mui-focused fieldset': {
            borderStyle: 'none',
            outlineColor: 'grey.200'
          }
        },
        endAdornment: isPasswordVisible ? (
          <Visibility
            sx={{
              ':hover': {
                cursor: 'pointer',
                color: 'grey.50'
              },

              color: 'grey.400'
            }}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          />
        ) : (
          <VisibilityOff
            sx={{
              ':hover': {
                cursor: 'pointer',
                color: 'grey.50'
              },
              color: 'grey.400'
            }}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          />
        )
      }}
    />
  )
}
export default PasswordTextField
