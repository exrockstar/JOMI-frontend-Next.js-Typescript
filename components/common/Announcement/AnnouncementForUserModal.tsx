import { Close, MarkEmailRead } from '@mui/icons-material'
import { Box, Button, Dialog, DialogContent, Divider, IconButton, Typography } from '@mui/material'
import { useAppState } from 'components/_appstate/useAppState'
import { AnnoucementForUserQuery } from 'graphql/queries/announcement-for-user.generated'

/**
 * Component to show targeted announcements to logged-in users
 * @returns
 */
const UserAnnouncementModal = () => {
  const { personalAnnouncements, setShowPersonalAnnouncements: setShow, markNotificationAsRead } = useAppState()
  const show = personalAnnouncements.show
  const announcements = personalAnnouncements.announcements as AnnoucementForUserQuery['announcementForUser']
  if (!announcements?.length) return null
  return (
    <Dialog open={show} maxWidth="md" fullWidth>
      <Box position="relative">
        <Typography sx={{ fontSize: 24, p: 2 }} variant="h2">
          Notifications
        </Typography>
        <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setShow(false)}>
          <Close fontSize="large" />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
        {announcements?.map((announcement, i) => {
          return (
            <Box
              key={announcement._id}
              sx={{ borderTopColor: 'divider', borderTopStyle: 'solid', borderTopWidth: i > 0 ? 1 : 0, p: 2 }}
            >
              <div>
                <Typography fontWeight={700}>{announcement.title}</Typography>
                <Box sx={{ color: 'text.secondary' }}>
                  <div dangerouslySetInnerHTML={{ __html: announcement.content }}></div>
                </Box>
              </div>
              <Button
                startIcon={<MarkEmailRead />}
                onClick={() => {
                  markNotificationAsRead(announcement.cache_id)
                }}
                color="success"
                sx={{ textTransform: 'none' }}
              >
                Mark as read
              </Button>
            </Box>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}

export default UserAnnouncementModal
