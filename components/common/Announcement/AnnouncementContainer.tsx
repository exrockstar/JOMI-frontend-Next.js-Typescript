import { Box } from '@mui/material'
import { forwardRef, memo } from 'react'
import Announcement from '../Announcement'
import { useAppState } from 'components/_appstate/useAppState'

const AnnouncementContainer = forwardRef<HTMLDivElement, {}>(function AnnouncementContainer(props, ref) {
  const { state, closeAnnouncement } = useAppState()
  const announcements = state.announcements

  return (
    <div ref={ref}>
      {announcements.map((announcement) => (
        <Box mb={'1px'} key={announcement.cache_id}>
          <Announcement announcement={announcement} onClose={() => closeAnnouncement(announcement.cache_id)} />
        </Box>
      ))}
    </div>
  )
})

export default memo(AnnouncementContainer)
