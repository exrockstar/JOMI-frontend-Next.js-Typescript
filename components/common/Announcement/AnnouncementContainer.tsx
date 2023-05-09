import { AppBar, Box, Slide } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IS_SERVER } from 'common/constants'
import { useTrackAnnouncementMutation } from 'graphql/mutations/track-announcement.generated'
import { useAnnoucementForUserLazyQuery } from 'graphql/queries/announcement-for-user.generated'

import { forwardRef, memo, useEffect, useState } from 'react'

import Announcement from '../Announcement'

const LOCAL_STORAGE_KEY = 'jomi-closed-announcements'

const AnnouncementContainer = forwardRef<HTMLDivElement, {}>(
  function AnnouncementContainer(props, ref) {
    const [trackAnnouncement, {}] = useTrackAnnouncementMutation()
    const [fetchAnnouncements, { data, error, loading, called }] =
      useAnnoucementForUserLazyQuery()
    const [previouslyClosedAnnouncements, setClosedAnnouncements] =
      useState<string[]>(null)
    const announcements = data?.announcementForUser

    useEffect(() => {
      if (IS_SERVER) return
      try {
        const items = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY)
        ) as string[]

        setClosedAnnouncements([...items])
      } catch (e) {
        setClosedAnnouncements([])
      }
    }, [])

    useEffect(() => {
      const handler = () => {
        if (announcements?.length > 0 && called) return
        console.log('fetching announcements')
        fetchAnnouncements()
      }

      document.addEventListener('touch', handler)
      document.addEventListener('scroll', handler)
      document.addEventListener('click', handler)

      return () => {
        document.removeEventListener('touch', handler)
        document.removeEventListener('scroll', handler)
        document.removeEventListener('click', handler)
      }
    }, [announcements])

    useEffect(() => {
      if (loading || error || !announcements || !previouslyClosedAnnouncements)
        return
      setTimeout(() => {
        announcements.forEach(({ _id, cache_id }) => {
          if (previouslyClosedAnnouncements?.includes(cache_id)) return
          trackAnnouncement({
            variables: { _id }
          })
        })
      }, 0)
    }, [
      announcements,
      error,
      loading,
      previouslyClosedAnnouncements,
      trackAnnouncement
    ])

    const onCloseAnnouncement = (id: string) => {
      const set = new Set([...previouslyClosedAnnouncements, id])
      const arr = Array.from(set)
      setClosedAnnouncements(arr)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr))
    }

    if (loading || error || !announcements) return null
    const filtered = announcements.filter(
      (a) => !previouslyClosedAnnouncements?.includes(a.cache_id)
    )
    return (
      <Wrapper ref={ref}>
        <Slide
          direction="down"
          in={filtered?.length > 0}
          mountOnEnter
          unmountOnExit
        >
          <div>
            {filtered.map((announcement) => (
              <Box mb={'1px'} key={announcement.cache_id}>
                <Announcement
                  announcement={announcement}
                  onClose={() => onCloseAnnouncement(announcement.cache_id)}
                />
              </Box>
            ))}
          </div>
        </Slide>
      </Wrapper>
    )
  }
)

const Wrapper = styled(AppBar)({
  position: 'fixed',
  zIndex: 2500
})
export default memo(AnnouncementContainer)
