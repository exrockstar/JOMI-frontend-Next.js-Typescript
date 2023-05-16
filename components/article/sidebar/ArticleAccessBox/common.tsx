import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { shadows } from '@mui/system'
export const ArticleAccessBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '-1px 2px 3px 0 rgb(10 0 0 / 22%)',
  backgroundColor: 'white',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
    borderTopRightRadius: '10px',
    borderBottomLeftRadius: '10px'
  }
}))

export const BoxHeading = styled(Box)(({ theme }) => ({
  color: '#FFFFFF',
  padding: 16,
  textAlign: 'center',
  backgroundColor: '#E11D48',
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  textTransform: 'uppercase',
  letterSpacing: '.95px',
  width: '100vw',
  [theme.breakpoints.up('md')]: {
    width: '100%'
  },
  fontWeight: 'bold',
  fontFamily: 'Manrope'
}))

export const FreeArticleBox = styled(Box)({
  backgroundColor: '#41B87C',
  display: 'flex',
  justifyContent: 'center',
  color: '#ffffff',
  textTransform: 'uppercase',
  borderBottomLeftRadius: 10,
  borderTopRightRadius: 10,
  boxShadow: '-1px 2px 3px 0 rgb(10 0 0 / 22%)',
  paddingTop: 16,
  paddingBottom: 16
})

export const AccessBoxButton = styled(Button)(({ theme }) => ({
  maxWidth: '100%',
  padding: '7px 21px',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  textTransform: 'none',
  fontWeight: 'bold'
}))

//Hard input for text inside button due to constraints with creating linear-gradient colors
//for just the text and border.
export const RequestSubscriptionButton = styled(Button)(({ theme }) => ({
  maxWidth: '100%',
  padding: '7px 21px',
  textTransform: 'none',
  background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
  fontWeight: '600',
  border: 'none',
  outline: 'none',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  zIndex: '1',

  '::before': {
    position: 'absolute',
    content: '""',
    top: '1px',
    right: '1px',
    bottom: '1px',
    left: '1px',
    backgroundColor: 'white',
    borderRadius: (theme.shape.borderRadius as number) * 1,
    zIndex: '-1'
  },

  '::after': {
    content: '"Request Subscription"',
    fontWeight: 'bold',
    background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)'
  }
}))

//Hard input for text inside button due to constraints with creating linear-gradient colors
//for just the text and border.
export const CreateAnAccountButton = styled(Button)(({ theme }) => ({
  maxWidth: '100%',
  padding: '7px 21px',
  textTransform: 'none',
  background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
  fontWeight: '600',
  border: 'none',
  outline: 'none',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  zIndex: '1',

  '::before': {
    position: 'absolute',
    content: '""',
    top: '1px',
    right: '1px',
    bottom: '1px',
    left: '1px',
    backgroundColor: 'white',
    borderRadius: (theme.shape.borderRadius as number) * 1,
    zIndex: '-1'
  },

  '::after': {
    content: '"Create an Account"',
    fontWeight: 'bold',
    background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)'
  }
}))

export const PurchaseNowAccessBoxButton = styled(Button)(({ theme }) => ({
  maxWidth: '100%',
  padding: '7px 21px',
  textTransform: 'none',
  background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
  fontWeight: '600',
  border: 'none',
  outline: 'none',
  borderRadius: (theme.shape.borderRadius as number) * 1,
  zIndex: '1',

  '::before': {
    position: 'absolute',
    content: '""',
    top: '1px',
    right: '1px',
    bottom: '1px',
    left: '1px',
    backgroundColor: 'white',
    borderRadius: (theme.shape.borderRadius as number) * 1,
    zIndex: '-1'
  },

  '::after': {
    content: '"Purchase Now"',
    fontWeight: 'bold',
    background: 'linear-gradient(to bottom, #AAAAFF, #0000FF)',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)'
  }
}))
