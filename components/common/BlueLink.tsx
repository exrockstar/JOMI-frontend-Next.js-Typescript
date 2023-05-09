import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'
/**
 * Standard link component that uses theme to be used in most links for the website
 */
export const BlueLink = styled(Link)(({ theme }) => ({
  color: theme.palette.linkblue.main,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    // color: darken(theme.palette.linkblue.main, 0.2)
    color: theme.palette.linkblue.dark
  }
}))
