import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
export default styled(Box)(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  zIndex: 1,
  top: 0,
  left: 0,
  //desktop
  background: `radial-gradient(circle at 75% 15%, rgba(0,0,0,0), ${theme.palette.background.default}, ${theme.palette.background.default})`,
  //mobile
  [theme.breakpoints.down('sm')]: {
    background: `linear-gradient(180deg, rgba(0,0,0,0), ${theme.palette.background.default})`
  }
}))
