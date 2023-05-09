import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

const CTAButtonOutlined = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  }
}))

export default CTAButtonOutlined

CTAButtonOutlined.defaultProps = {
  variant: 'outlined',
  color: 'secondary'
}
