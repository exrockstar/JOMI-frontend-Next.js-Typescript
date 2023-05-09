import { styled } from '@mui/material/styles'
import { Link, LinkProps } from '@mui/material'

const CategoryLink = styled(Link)<LinkProps>(({ theme }) => ({
  textDecoration: 'underline',
  backgroundColor: 'transparent',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.spacing(0.5),
  color: theme.palette.grey[400],
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.grey[400]
  }
}))

export default CategoryLink
