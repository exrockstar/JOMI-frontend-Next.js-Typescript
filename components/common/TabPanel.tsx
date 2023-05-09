import { Box, BoxProps } from '@mui/material'
import { memo } from 'react'

type TabPanelProps = {
  children?: React.ReactNode
  index: number | string
  value: number | string
  id: string
} & BoxProps

export function a11yProps(id: string, index: number | string) {
  return {
    id: `${id}-${index}`,
    'aria-controls': `${id}-panel-${index}`
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, id, ...other } = props

  const selected = value === index
  return (
    <Box
      role="tabpanel"
      hidden={!selected}
      id={`${id}-${index}`}
      aria-labelledby={`institution-tab-${index}`}
      {...other}
    >
      {selected && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  )
}

export default memo(TabPanel)
