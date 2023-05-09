import { styled } from '@mui/material/styles'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import MenuItem from '@mui/material/MenuItem'

const CTAButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
  color: theme.palette.grey[50],
  textTransform: 'none',
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  ':hover': {
    background: `linear-gradient(358.52deg, #4F46E5 50%, #60A5FA 98.74%)`
  }
}))

export const CTAMenuItem = styled(MenuItem)<LoadingButtonProps>(
  ({ theme }) => ({
    background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
    color: theme.palette.grey[50],
    textTransform: 'none',
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    ':hover': {
      background: `linear-gradient(358.52deg, #4F46E5 50%, #60A5FA 98.74%)`
    }
  })
)

export default CTAButton
