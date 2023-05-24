import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import dayjs from 'dayjs'
import { useMarkAnnouncementAsReadMutation } from 'graphql/queries/announcement-for-user.generated'
import { useCookies } from 'react-cookie'

const COOKIE_KEY = 'jomi-closed-announcements'
const TARGETED_ANNOUNCEMENT_KEY = 'jomi-closed-targeted'
/**
 * use cookies to track closed announcements since it's possible that localStorage will error.
 * @returns
 */
export const useClosedAnnouncements = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY, TARGETED_ANNOUNCEMENT_KEY])
  const previouslyClosed = (cookies[COOKIE_KEY]?.split(',') as string[]) ?? []
  const setPreviouslyClosed = (cacheIds: string[]) => {
    setCookies(COOKIE_KEY, cacheIds.join(','), {
      httpOnly: false,
      expires: dayjs().add(365, 'day').toDate()
    })
  }
  const [markAsRead] = useMarkAnnouncementAsReadMutation()

  const markNotificationAsRead = async (cacheId: string) => {
    const { data } = await markAsRead({
      variables: {
        cacheId
      }
    })
    const closedAnnouncements = data?.markAnnouncementAsRead
    return closedAnnouncements
  }
  return {
    previouslyClosed,
    setPreviouslyClosed,
    markNotificationAsRead
  }
}
