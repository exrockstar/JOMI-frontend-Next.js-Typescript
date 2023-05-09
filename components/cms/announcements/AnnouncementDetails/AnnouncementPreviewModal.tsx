import { Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  Stack
} from '@mui/material'
import Announcement from 'components/common/Announcement'
import { AnnouncementPartsFragment } from 'graphql/fragments/AnnouncementParts.generated'
import React from 'react'

type Props = {
  announcement: AnnouncementPartsFragment
} & DialogProps

const AnnouncementPreviewModal = ({
  open,
  onClose,
  announcement,
  ...props
}: Props) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      {...props}
      maxWidth="lg"
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderRadius: 0
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Announcement
          announcement={announcement}
          onClose={(e) => onClose({}, 'backdropClick')}
        />
        <Stack alignItems="center" mt={2}>
          <Button
            onClick={(e) => onClose({}, 'backdropClick')}
            variant="contained"
            startIcon={<Close />}
          >
            Close Preview
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default AnnouncementPreviewModal
