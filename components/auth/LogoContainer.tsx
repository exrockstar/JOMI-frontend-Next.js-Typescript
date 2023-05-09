import { Box, Hidden } from '@mui/material'
import Logo from 'components/common/Logo'
export const LogoContainer: React.FC = () => {
  return (
    <Hidden smDown>
      <Box
        sx={{
          backgroundColor: ' black',
          width: { lg: '50%', md: '40%' },
          display: 'flex'
        }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Logo height={180} />
      </Box>
    </Hidden>
  )
}
