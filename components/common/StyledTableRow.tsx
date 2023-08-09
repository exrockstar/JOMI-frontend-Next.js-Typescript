import { useTheme } from '@mui/material/styles'
import { TableRow, TableRowProps } from '@mui/material'
export const StyledTableRow = (props: TableRowProps) => {
  const theme = useTheme()
  //@ts-ignore
  const bgColor = props.sx?.backgroundColor
  return (
    <TableRow
      sx={{
        ...props.sx,
        '&:nth-of-type(odd)': {
          backgroundColor: bgColor
            ? bgColor
            : !props.selected
            ? theme.palette.grey[50]
            : null
        },
        '&:last-child td, &:last-child th': {
          borderBottom: 0
        }
      }}
      {...props}
    />
  )
}
