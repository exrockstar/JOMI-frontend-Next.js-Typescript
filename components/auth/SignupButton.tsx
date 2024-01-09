import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'

export const SignupButton = styled(LoadingButton)({
  background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
  color: 'white',
  borderRadius: 4,
  height: 40,
  textTransform: 'none',
  ':hover': {
    background: `linear-gradient(358.52deg, #4F46E5 50%, #60A5FA 98.74%)`
  }
})
