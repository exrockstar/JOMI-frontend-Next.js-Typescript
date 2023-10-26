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
import { ThemeProvider, useTheme } from '@mui/material/styles'
import React from 'react'
import { frontPageTheme } from 'components/theme'


type Props = {
  deleteMutation: any,
  deleteMutationOpts: {},
  header: string,
} & DialogProps
/**
 * Dialog pop up to confirm if a user wants to delete.
 * @returns
 */
const DeleteDialog: React.FC<Props> = ({ header, deleteMutation, deleteMutationOpts, open, onClose }: Props) => {
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  if (!open) return null
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullScreen={isSmallDevice}
      >
        <DialogTitle>
          <Typography variant="h5" textAlign={'center'}>
            {header}
          </Typography>
          <Typography textAlign={'center'}>
            This is irreversible!
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
                deleteMutation(deleteMutationOpts)
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
    </>
  )
}

export default DeleteDialog