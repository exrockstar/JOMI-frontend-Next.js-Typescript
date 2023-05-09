import { Box, Link, Typography } from '@mui/material'

const HospitalSection = ({ hospitalName }) => {
  return (
    <Box
      sx={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
      component="section"
    >
      <Typography
        component="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: '3px'
        }}
      >
        Filmed At:
      </Typography>
      <Typography
        title={`View All Articles Filmed In ${hospitalName}`}
        sx={{
          textAlign: 'center',
          color: 'black',
          textDecoration: 'none',
          ':hover': {
            color: 'black',
            textDecoration: 'none'
          }
        }}
      >
        {hospitalName}
      </Typography>
    </Box>
  )
}

export default HospitalSection
