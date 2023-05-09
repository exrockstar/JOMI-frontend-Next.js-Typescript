import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import WatchNowIcon from 'public/img/news/watch-now-icon.svg'

const WatchNowButton = styled(Button)<ButtonProps>(() => ({}))

export default WatchNowButton

WatchNowButton.defaultProps = {
  startIcon: <WatchNowIcon className="watch-icon" />,
  variant: 'text',
  color: 'secondary',
  sx: {
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 24,
    gap: 2,
    pr: 4,
    py: 2,
    ':hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
      '& .watch-icon': {
        transform: 'scale(1.05)',
        transition: 'all .2s ease-in'
      }
    }
  }
}
