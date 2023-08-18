import { useTrackAnnouncementsMutation } from 'graphql/mutations/track-announcement.generated'
import {
  useSiteWideAnnouncementsQuery,
  useAnnoucementForUserQuery
} from 'graphql/queries/announcement-for-user.generated'
import { useRouter } from 'next/router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { useClosedAnnouncements } from './useClosedAnnouncements'
import { useSession } from 'next-auth/react'
import uniq from 'lodash/uniq'
import { useSessionStorage } from 'usehooks-ts'

const defaultValue = {
  articlesViewed: [],
  videosViewed: [],
  videosBlocked: [],
  announcementsShown: false,
  announcements: []
}

type ShowFeedbackDialogMethod =
  | 'feedback-page'
  | 'feedback-link'
  | 'feedback-block'
  | 'click-leave-feedback'
  | 'click-account-dropdown'
  | false

const context = {
  state: defaultValue,
  showFeedbackDialog: null,
  showFeedbackTime: 0,
  feedbackButtonText: '',
  personalAnnouncements: {
    show: false,
    count: 0,
    announcements: []
  },
  setShowPersonalAnnouncements(val: boolean) {},
  setFeedbackButtonText(val: string) {},
  setShowFeedbackDialog(val: ShowFeedbackDialogMethod) {},
  setShowFeedbackTime(val: number) {},
  setContextState: (state: typeof defaultValue) => {},
  setArticlesViewed: (pub_id: String) => {},
  setVideosViewed: (pub_id: String) => {},
  setVideosBlocked: (pub_id: String) => {},
  setAnnouncementsShown(value: boolean) {},
  closeAnnouncement(cache_id: string) {},
  markNotificationAsRead(cache_id: string) {}
}

const AppContext = createContext<typeof context>(context)

export const AppStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(context.state)

  const [feedbackButtonText, setFeedbackButtonText] = useState('Leave')
  const [showFeedbackDialog, setShowFeedbackDialog] =
    useState<ShowFeedbackDialogMethod>(false)
  const [showFeedbackTime, setShowFeedbackTime] = useState(0)
  const [trackAnnouncements, { called }] = useTrackAnnouncementsMutation()
  const router = useRouter()
  const { previouslyClosed, markNotificationAsRead, setPreviouslyClosed } =
    useClosedAnnouncements()
  const noAnnouncements = ['/cms', '/access', '/signup', '/login']
  const shouldSkip = noAnnouncements.some((path) =>
    router.pathname.startsWith(path)
  )
  const [showPersonalAnnouncements, setShowPersonalAnnouncements] =
    useState(true)

  const { data: session } = useSession()
  const { data: personalAnnouncementsData, updateQuery } =
    useAnnoucementForUserQuery({
      skip: !session?.user,
      onCompleted(result) {
        const ids = result.announcementForUser?.map((a) => a._id)
        if (!!ids.length) {
          trackAnnouncements({
            variables: {
              _ids: ids
            }
          })
        }
      }
    })
  const personalAnnouncements = personalAnnouncementsData?.announcementForUser

  const { data } = useSiteWideAnnouncementsQuery({
    skip: shouldSkip,
    onCompleted(result) {
      const announcements = result.getSiteWideAnnouncements
      const filtered = previouslyClosed.length
        ? announcements?.filter((a) => !previouslyClosed?.includes(a.cache_id))
        : announcements

      setState({
        ...state,
        announcements: filtered,
        announcementsShown: true
      })
    }
  })

  useEffect(() => {
    if (!called && !!state.announcements?.length) {
      const filtered_ids = state.announcements?.map((a) => a._id)
      trackAnnouncements({
        variables: {
          _ids: filtered_ids
        }
      })
    }
  }, [called, state.announcements, trackAnnouncements])

  const setContextState = (newState: (typeof context)['state']) => {
    setState(newState)
  }

  const setArticlesViewed = (pub_id: String) => {
    setState({
      ...state,
      articlesViewed: [...state.articlesViewed, pub_id]
    })
  }

  const setVideosViewed = (pub_id: String) => {
    setState({
      ...state,
      videosViewed: uniq([...state.videosViewed, pub_id])
    })
  }

  const setVideosBlocked = (pub_id: String) => {
    setState({
      ...state,
      videosBlocked: uniq([...state.videosBlocked, pub_id])
    })
  }

  const setAnnouncementsShown = (value: boolean) => {
    setState({
      ...state,
      announcementsShown: value
    })
  }
  const closeAnnouncement = (cacheId: string) => {
    const closedAnnouncements = Array.from(
      new Set([...previouslyClosed, cacheId])
    )
    const filtered = data.getSiteWideAnnouncements?.filter(
      (a) => !closedAnnouncements?.includes(a.cache_id)
    )
    setPreviouslyClosed(closedAnnouncements)
    setState({
      ...state,
      announcements: filtered
    })
  }

  const markAnnouncementAsRead = async (cacheId: string) => {
    const ids = await markNotificationAsRead(cacheId)
    updateQuery((result) => {
      return {
        __typename: 'Query',
        announcementForUser: result.announcementForUser.filter(
          (a) => !ids.includes(a.cache_id)
        )
      }
    })
  }

  return (
    <AppContext.Provider
      value={{
        state,
        personalAnnouncements: {
          show: showPersonalAnnouncements,
          announcements: personalAnnouncements,
          count: personalAnnouncements?.length
        },
        showFeedbackDialog,
        feedbackButtonText,
        showFeedbackTime,
        setShowFeedbackTime,
        setFeedbackButtonText,
        setShowFeedbackDialog,
        setShowPersonalAnnouncements,
        setContextState,
        setArticlesViewed,
        setVideosViewed,
        setVideosBlocked,
        setAnnouncementsShown,
        closeAnnouncement,
        markNotificationAsRead: markAnnouncementAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/**
 * Houses all the common state for the application like modals, etc.
 */
export const useAppState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('no AppStateProvider!')
  }
  return context
}
