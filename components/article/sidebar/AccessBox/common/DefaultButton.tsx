import { LoadingButton, LoadingButtonProps } from '@mui/lab'

const DefaultButton = ({ sx, ...props }: LoadingButtonProps) => {
  return (
    <LoadingButton
      {...props}
      sx={{
        textTransform: 'none',
        borderColor: 'grey.300',
        color: 'grey.600',
        ':hover': {
          background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
          color: 'grey.50',
          borderColor: 'grey.300'
        },
        ...sx
      }}
      variant="outlined"
    />
  )
}
export default DefaultButton
