import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
// import ArticleAccessDialog from 'components/ArticleAccessDialog/ArticleAccessDialog'

import { useChapters } from './useChapters'
import { WistiaVideo } from 'components/wistia'

import {
  useTrackVideoBlockMutation,
  useTrackVideoPlayMutation,
  useTrackVideoTimeMutation
} from 'graphql/mutations/track-article.generated'
import {
  useArticleAccessQuery,
  useShowFeedbackModalQuery
} from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { AccessTypeEnum, TrackVideoInput } from 'graphql/types'
import { useRouter } from 'next/router'
import VideoPlayer from 'components/common/VideoPlayer/VideoPlayer'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { isMobile } from 'components/utils/isMobile'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'

import ArticleAccessDialog from 'components/ArticleAccessDialog'
import { kebabCase } from 'lodash'
import { useTrackShowFeedbackMutation } from 'graphql/mutations/collect-feedback.generated'

const TRACK_TIME_INTERVAL = 15
type VideoBlockProps = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const BLOCK_INTERVAL_SECONDS = 300 //seconds
/**
 * Shows a modal to block the user from watching the video.
 * If user has trial access, displays some feedback modal on certain intervals.
 * @param param0
 * @returns
 */
export default function VideoBlock({ article }: VideoBlockProps) {
  const {
    state: { videosBlocked, videosViewed },
    setShowFeedbackDialog,
    setVideosViewed,
    setVideosBlocked
  } = useAppState()
  const [showDialog, setShowDialog] = useState(false)
  const { data: session, status } = useSession()
  const { anon_link_id, referredFrom, referrerPath } =
    useGoogleAnalyticsHelpers()

  const [trackVideoPlay] = useTrackVideoPlayMutation()
  const [trackVideoTime] = useTrackVideoTimeMutation()
  const [trackVideoBlock] = useTrackVideoBlockMutation()
  const [trackShowFeedback] = useTrackShowFeedbackMutation()
  // TODO: Create backend endpoint
  const [nextBlockTime, setNextBlockTime] = useState(0)
  const router = useRouter()
  const {
    chapters,
    videoTime,
    setActiveChapter,
    subchapters,
    activeSubChapter,
    setActiveSubChapter,
    setVideoTime
  } = useChapters()

  const [vidWatchId, setVidwatchId] = useState<string>(null)

  const pubId = article.publication_id
  const { data, refetch } = useArticleAccessQuery({
    skip: status === 'loading',
    variables: { publication_id: pubId }
  })
  const {
    data: showFeedbackModalData,
    refetch: refetchShowFeedbackModalQuery
  } = useShowFeedbackModalQuery({
    skip: status === 'loading',
    variables: { anon_link_id },
    nextFetchPolicy: 'network-only'
  })
  const articleAccess = data?.article?.articleAccessType

  const accessType = articleAccess?.accessType
  const isArticlePreviouslyBlocked = videosBlocked.find((id) => id === pubId)
  const isPreviouslyViewed = videosViewed.find((id) => id === pubId)
  const trackBlockInput: TrackVideoInput = {
    publication_id: pubId,
    uniqueView: !isArticlePreviouslyBlocked,
    referredFrom,
    referrerPath,
    anon_link_id
  }

  const trackPlayInput: TrackVideoInput = {
    ...trackBlockInput,
    uniqueView: !isPreviouslyViewed
  }

  useEffect(() => {
    refetch()
  }, [session?.user?.email, refetch])

  useEffect(() => {
    if (router.isReady && router.query.t) {
      const time = parseInt(router.query.t as string)

      if (typeof time === 'number' && !isNaN(time) && time > 0) {
        setVideoTime(time)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const handleChapterChange = async (seconds: number) => {
    const chapter =
      chapters.find((c, index) => {
        const next = chapters[index + 1]
        if (!next) return c.time <= seconds
        return c.time <= seconds && next.time > seconds
      }) ?? chapters[0]

    setActiveChapter(chapter)

    if (chapter?.subchapters.length <= 0) {
      setActiveSubChapter(null)
      return
    }

    const subchapter = subchapters.find((c, index) => {
      const next = subchapters[index + 1]
      if (!next) return c.time <= seconds

      return c.time <= seconds && next.time > seconds
    })

    if (
      subchapter &&
      subchapter !== activeSubChapter &&
      chapter.subchapters.includes(subchapter)
    ) {
      setActiveSubChapter(subchapter)
    }
  }

  // check block for limited access, require subscription
  const checkSubscriptionBlock = async (
    seconds: number,
    video: WistiaVideo,
    trackBlock?: boolean
  ) => {
    if (!articleAccess) return
    const threeMinutes = 60 * 3

    const hasNoAccess = [
      AccessTypeEnum.LimitedAccess,
      AccessTypeEnum.RequireSubscription,
      AccessTypeEnum.AwaitingEmailConfirmation,
      AccessTypeEnum.EmailConfirmationExpired,
      AccessTypeEnum.InstitutionLoginRequired,
      AccessTypeEnum.InstitutionSubscriptionExpired
    ].includes(accessType)

    const isTimeLimitReached = seconds >= threeMinutes
    const showBlock = isTimeLimitReached && hasNoAccess
    if (!showBlock) return
    video.pause()
    video.cancelFullscreen()
    setShowDialog(true)
    if (trackBlock) {
      trackVideoBlock({
        variables: {
          input: {
            ...trackBlockInput,
            block_type: kebabCase(accessType)
          }
        }
      })
    }
    setVideosBlocked(pubId)
  }

  // check block for evaluation access
  const checkEvaluationBlock = (
    seconds: number,
    video: WistiaVideo,
    trackBlock?: boolean
  ) => {
    if (!articleAccess) return
    const threeMinutes = 60 * 3
    const hasReachedTimeLimit =
      seconds > threeMinutes && seconds >= nextBlockTime
    const isEvaluationAccess = accessType === AccessTypeEnum.Evaluation
    const shouldShowBlock = hasReachedTimeLimit && isEvaluationAccess
    if (!shouldShowBlock) return

    video.pause()
    video.cancelFullscreen()
    setVideoTime(seconds)
    setShowDialog(true)

    if (trackBlock) {
      trackVideoBlock({
        variables: {
          input: {
            ...trackBlockInput,
            block_type: 'evaluation-block'
          }
        }
      })
    }

    setVideosBlocked(pubId)
  }

  /**
   * Show feedback modal at 1 minute, then every subsequent 5 minutes
   * If the user is fast forwarding or skipping, check `showNextAt` which is the time when the last modal was shown + 5 minutes
   * @param seconds
   * @param video
   */
  const checkFeedbackBlock = (seconds: number, video: WistiaVideo) => {
    // TODO: initialTime and interval could also be set in the backend
    const initialTime = 60 // 1-minute
    const interval = 300 // 5-minutes

    // video.time() / seconds is at 60, 360, 660, etc. discussed in the meeting
    const isInTimeStamp = (seconds - initialTime) % interval === 0

    const { show, showNextAt } = showFeedbackModalData.result

    // check if access type is included in the setting
    const showFeedbackToUserAccessType =
      showFeedbackModalData.feedbackAccesses?.includes(accessType)

    const isMoreThanFiveMinutesSinceLastShown =
      Math.floor(Date.now() / 1000) >= showNextAt

    const showFeedback =
      showFeedbackToUserAccessType &&
      show &&
      isMoreThanFiveMinutesSinceLastShown &&
      isInTimeStamp

    if (showFeedback) {
      video.pause()
      video.cancelFullscreen()
      setShowFeedbackDialog('feedback-block')

      trackShowFeedback({
        variables: {
          input: trackBlockInput
        }
      }).then(() => {
        refetchShowFeedbackModalQuery({
          anon_link_id
        })
      })
    }
  }

  const trackPlayTime = async (_, secondsWatched: number) => {
    if (!vidWatchId) return
    if (secondsWatched % TRACK_TIME_INTERVAL !== 0) return

    trackVideoTime({
      variables: {
        input: {
          time_watched: secondsWatched,
          vidWatchId: vidWatchId,
          increment: TRACK_TIME_INTERVAL
        }
      }
    })
  }

  //#region handlers
  const handleSecondChange = (
    seconds: number,
    secondsWatched: number,
    video: WistiaVideo
  ) => {
    handleChapterChange(seconds)
    checkSubscriptionBlock(seconds, video, true)
    checkEvaluationBlock(seconds, video, true)
    checkFeedbackBlock(seconds, video) // disabling the feedback modal popping up in the video until the team comes to an agreement on how it should function.
    trackPlayTime(seconds, secondsWatched)
  }
  const onPlayHandler = async (
    seconds: number,
    secondsWatched: number,
    video: WistiaVideo
  ) => {
    checkSubscriptionBlock(seconds, video)
    checkEvaluationBlock(seconds, video)
    //do not add tracking id if there's already one
    if (vidWatchId) return

    const { data } = await trackVideoPlay({
      variables: {
        input: trackPlayInput
      }
    })
    setVidwatchId(data.trackVideoPlay)
    setVideosViewed(pubId)
  }

  const handleAccessDialog = (open: boolean) => {
    setShowDialog(open)
    const isEvaluationAccess = accessType === AccessTypeEnum.Evaluation
    // need to track the times block to know which feedback block to show
    if (!open && isEvaluationAccess) {
      if (videoTime >= nextBlockTime) {
        setNextBlockTime(videoTime + BLOCK_INTERVAL_SECONDS)
      }
    }
  }
  const imageUrl = article?.wistia?.thumbnail?.url.replace(
    /\?image_crop_resized.*/,
    ''
  )

  //#endregion handlers

  return (
    <Box>
      {showDialog && (
        <ArticleAccessDialog
          open={showDialog}
          handleState={handleAccessDialog}
          publication_id={article.publication_id}
          accessData={data}
        />
      )}

      <VideoPlayer
        chapters={chapters}
        thumbnailUrl={imageUrl}
        wistiaId={article.wistia_id}
        disableJKL={isMobile()}
        key={article.wistia_id}
        onPlay={onPlayHandler}
        onSecondChange={handleSecondChange}
        time={videoTime}
      />
    </Box>
  )
}
