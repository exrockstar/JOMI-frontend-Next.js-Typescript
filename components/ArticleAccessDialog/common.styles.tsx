import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
export const CustomDialogTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: theme.palette.warning.main,
  textAlign: 'center'
}))
