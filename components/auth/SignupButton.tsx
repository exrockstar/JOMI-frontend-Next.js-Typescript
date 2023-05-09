import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'

export const SignupButton = styled(LoadingButton)({
  backgroundColor: '#2cb673',
  color: 'white',
  borderRadius: 4,
  height: 40,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#58d799'
  }
})
