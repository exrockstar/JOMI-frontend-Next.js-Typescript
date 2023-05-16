import { Divider, DividerProps } from '@mui/material'

const AccessBoxDivider = ({ sx, ...props }: DividerProps) => {
  return (
    <Divider
      {...props}
      sx={{
        fontSize: 12,
        color: 'grey.600',
        ...sx
      }}
    >
      OR
    </Divider>
  )
}
export default AccessBoxDivider
