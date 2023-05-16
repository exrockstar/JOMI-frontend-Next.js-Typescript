import { Box, BoxProps } from '@mui/material'

const CommonCard = ({ sx, ...props }: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        backgroundColor: 'grey.100',
        borderColor: 'grey.300',
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        p: 2,
        ':hover': {
          '& .card-title': {
            background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }
        },
        ...sx
      }}
    />
  )
}
export default CommonCard
