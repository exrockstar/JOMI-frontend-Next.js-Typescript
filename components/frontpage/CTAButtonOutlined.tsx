import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { styled } from '@mui/material/styles'

const CTAButtonOutlined = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    textTransform: 'none',
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
    },
    borderRadius: 8
  })
)

export default CTAButtonOutlined

CTAButtonOutlined.defaultProps = {
  variant: 'outlined',
  color: 'secondary'
}
