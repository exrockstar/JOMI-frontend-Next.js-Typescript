import { Box, CircularProgress } from '@mui/material'

const CircularLoader = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        marginTop: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  )
}

export default CircularLoader
