import { LoadingButton, LoadingButtonProps } from '@mui/lab'

type Props = {
  content: string
} & LoadingButtonProps
const OutlinedButton = ({ content, sx, ...props }: Props) => {
  return (
    <LoadingButton
      {...props}
      sx={{
        maxWidth: '100%',
        textTransform: 'none',
        background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
        fontWeight: '600',
        border: 'none',
        outline: 'none',
        zIndex: '1',
        borderRadius: 1,
        '::before': {
          position: 'absolute',
          content: '""',
          top: '1px',
          right: '1px',
          bottom: '1px',
          left: '1px',
          backgroundColor: 'white',
          zIndex: '-1',
          borderRadius: 1
        },

        '::after': {
          content: `"${content}"`,
          fontWeight: 'bold',
          background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        },

        transition: 'all 0.2s ease-in-out',

        '&:hover': {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)'
        },
        ...sx
      }}
    />
  )
}
export default OutlinedButton
