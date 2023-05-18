import { TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'

interface StickyTableCellProps {
  backgroundColor?: string
  selected?: boolean
}
export const StickyTableCell = styled(TableCell)<StickyTableCellProps>(
  ({ theme, backgroundColor, selected }) => ({
    position: 'sticky',
    left: 0,
    zIndex: 1,
    backgroundColor: selected ? '#e3f2fd' : backgroundColor
  })
)
