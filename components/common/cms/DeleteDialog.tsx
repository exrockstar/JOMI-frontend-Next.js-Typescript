import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  DialogProps
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string, Asserts } from 'yup'
import CTAButton from '../CTAButton'
import { frontPageTheme } from 'components/theme'

// const schema = object({
//   first_name: string().required('Please enter your first name.'),
//   last_name: string().required('Please enter your last name.'),
//   institution_name: string(),
//   inst_email: string().email(),
//   user_type: string().required('Please select your user type.'),
//   specialty: string().required('Please select your specialty.')
// })

// type FormValues = Asserts<typeof schema>

// const initialValues: FormValues = {
//   first_name: '',
//   last_name: '',
//   inst_email: '',
//   institution_name: '',
//   specialty: '',
//   user_type: ''
// }

type Props = {
  deleteMutation: any,
  deleteOpts: {}
} & DialogProps
/**
 * Dialog pop up to confirm if a user wants to delete.
 * @returns
 */
const DeleteDialog: React.FC<Props> = ({ deleteMutation, deleteOpts, open, onClose }: Props) => {
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  if (!open) return null
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Dialog
        open={open}
        maxWidth="sm"
        fullScreen={isSmallDevice}
      >
        <DialogTitle>
          <Typography variant="h5" textAlign={'center'}>
            Are you sure you want to delete this?
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: { lg: 480 }}}>
          <Box
            sx={{
              p: 0,
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              justifyContent: { xs: 'center', md: 'center' },
              gap: 2
            }}
          >
            <Button
              color="error"
              onClick={(e) => {
                deleteMutation(deleteOpts)
                onClose(e, 'backdropClick')
              }}
              variant="contained"
            >
              Delete
            </Button>
            <Button
              color="primary"
              onClick={(e) => onClose(e, 'backdropClick')}
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

export default DeleteDialog