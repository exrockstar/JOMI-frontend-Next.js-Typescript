import { Divider, DividerProps } from '@mui/material'

const FormDivider = (props: DividerProps) => {
  return (
    <Divider
      {...props}
      sx={{
        fontSize: '.75rem',
        color: 'text.secondary',
        '&:before': {
          borderTopWidth: '1px',
          borderTopColor: 'grey.700',
          borderTopStyle: 'solid'
        },
        '&:after': {
          borderTopWidth: '1px',
          borderTopColor: 'grey.700',
          borderTopStyle: 'solid'
        }
      }}
    />
  )
}

export default FormDivider
