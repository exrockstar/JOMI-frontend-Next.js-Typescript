import React from 'react'
import { Button, ButtonProps, Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'
const CategoryButton = React.forwardRef<
  any,
  ButtonProps & { active?: boolean }
>(function CategoryButton(props, ref) {
  const { active, sx, ...restProps } = props
  return (
    <ButtonStyled
      variant="outlined"
      fullWidth
      color="secondary"
      sx={{
        backgroundColor: active ? `rgba(255,255,255,.1)` : null,
        color: !active ? 'rgba(255,255,255,.7)' : null,
        borderColor: active ? 'white' : null,
        ...sx
      }}
      {...restProps}
      ref={ref}
    >
      {props.children}
    </ButtonStyled>
  )
})

export default CategoryButton

const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 24,
  borderRadius: 50,
  marginBottom: 8,
  justifyContent: 'flex-start',
  textTransform: 'none',
  ':hover': {
    textDecoration: 'underline',
    color: theme.palette.linkblue.main
  },
  lineHeight: 'normal'
}))
