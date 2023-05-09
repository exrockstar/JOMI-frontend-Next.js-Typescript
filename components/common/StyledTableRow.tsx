import { TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
export const StyledTableRow = styled(TableRow)(({ theme, selected }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: !selected ? theme.palette.grey[50] : null
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
