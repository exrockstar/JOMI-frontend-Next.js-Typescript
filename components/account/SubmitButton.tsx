import { styled } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: '#31cb80',
  padding: '5px 12px',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#27a166'
  }
}))

export default SubmitButton
