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
import { useArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { AccessTypeEnum, TrackVideoInput } from 'graphql/types'
import { useRouter } from 'next/router'
import VideoPlayer from 'components/common/VideoPlayer/VideoPlayer'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { isMobile } from 'components/utils/isMobile'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import FeedbackModal from '../feedback/FeedbackModal'
import {
  useGetFeedbackQuestionsQuery,
  useTrackFeedbackMutation
} from 'graphql/mutations/collect-feedback.generated'
import difference from 'lodash/difference'
const ArticleAccessDialog = dynamic(
  () => import('components/ArticleAccessDialog/ArticleAccessDialog'),
  {
    ssr: false
  }
)

const TRACK_TIME_INTERVAL = 15
type VideoBlockProps = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const BLOCK_INTERVAL_SECONDS = 300 //seconds
const INITIAL_BLOCK_SECONDS = 180
const feeback_blocks = ['rate-jomi']
/**
 * Shows a modal to block the user from watching the video.
 * If user has trial access, displays some feedback modal on certain intervals.
 * @param param0
 * @returns
 */
export default function VideoBlock({ article }: VideoBlockProps) {
  const {
    state: { videosBlocked, videosViewed },
    hasGivenFeedback,
    setHasGivenFeedback,
    setVideosViewed,
    setVideosBlocked
  } = useAppState()
  const [timesBlocked, setTimesBlocked] = useState(0)
  const [shouldTrackVideoBlock, setShouldTrackVideoBlock] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  // the percentage of the video where feedback modal has been shown
  const [percentBlocked, setPercentBlocked] = useState<number[]>([])
  const { data: session, status } = useSession()
  const { anon_link_id, referredFrom, referrerPath } =
    useGoogleAnalyticsHelpers()

  const { data: feedbackQuestionData } = useGetFeedbackQuestionsQuery({
    skip: status === 'loading',
    variables: {
      anon_link_id
    }
  })
  const [trackFeedback] = useTrackFeedbackMutation({
    onCompleted() {
      console.debug('track feedback')
    }
  })
  const [trackVideoPlay] = useTrackVideoPlayMutation()
  const [trackVideoTime] = useTrackVideoTimeMutation({
    onCompleted() {
      console.debug('track video time')
    }
  })
  const [trackVideoBlock] = useTrackVideoBlockMutation({
    onCompleted() {
      console.debug('track video block')
    }
  })
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
  const articleAccess = data?.article?.articleAccessType
  const accessType = articleAccess?.accessType
  const isArticlePreviouslyBlocked = videosBlocked.find((id) => id === pubId)
  const isPreviouslyViewed = videosViewed.find((id) => id === pubId)
  const feedbackQuestion = feedbackQuestionData?.question
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
    video: WistiaVideo
  ) => {
    if (!articleAccess) return
    const threeMinutes = 60 * 3
    const hasNoAccess = [
      AccessTypeEnum.LimitedAccess,
      AccessTypeEnum.RequireSubscription,
      AccessTypeEnum.AwaitingEmailConfirmation
    ].includes(accessType)
    const isTimeLimitReached = seconds >= threeMinutes
    const showBlock = isTimeLimitReached && hasNoAccess
    if (!showBlock) return
    video.pause()
    setShowDialog(true)
    trackVideoBlock({
      variables: {
        input: trackBlockInput
      }
    })
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
    setShowDialog(true)

    // need to track the times block to know which feedback block to show
    if (seconds >= nextBlockTime) {
      setTimesBlocked((prev) => prev + 1)
      setNextBlockTime(seconds + BLOCK_INTERVAL_SECONDS)
    }

    if (trackBlock) {
      trackVideoBlock({
        variables: { input: trackBlockInput }
      })
    }

    setVideosBlocked(pubId)
  }

  const checkFeedbackBlock = (seconds: number, video: WistiaVideo) => {
    const isInstitutionalTrial =
      AccessTypeEnum.InstitutionalSubscription === accessType &&
      articleAccess?.isTrial
    const isTrial = isInstitutionalTrial
    const percentWatched = Math.floor((seconds / video.duration()) * 100)
    // track which percentage of the video has the feedback modal been shown to the user.
    // remove the ones that was already been shown
    const percentageToCheck = difference([25, 50, 75], percentBlocked)
    const filtered = percentageToCheck.filter((time) => percentWatched >= time)
    const showFeedback =
      !!filtered.length && !hasGivenFeedback && isTrial && feedbackQuestion

    if (showFeedback) {
      video.pause()
      setShowFeedbackDialog(true)
      setPercentBlocked([...percentBlocked, ...filtered])
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
    setShouldTrackVideoBlock(true)
    handleChapterChange(seconds)
    checkSubscriptionBlock(seconds, video)
    checkEvaluationBlock(seconds, video, true)
    checkFeedbackBlock(seconds, video)
    trackPlayTime(seconds, secondsWatched)
  }
  const onPlayHandler = async (
    seconds: number,
    secondsWatched: number,
    video: WistiaVideo
  ) => {
    setShouldTrackVideoBlock(false)
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
        />
      )}
      {showFeedbackDialog && (
        <FeedbackModal
          open={true}
          onClose={() => {
            setShowFeedbackDialog(false)
          }}
          question={feedbackQuestionData?.question}
          onAnswer={async (value, question) => {
            gtag('event', 'track_feedback', {
              question_id: question._id,
              question: question.question,
              value,
              type: question.type
            })
            await trackFeedback({
              variables: {
                input: {
                  value: value + '',
                  questionId: question._id,
                  type: question.type,
                  anon_link_id,
                  user: session?.user?._id,
                  institution: articleAccess.institution_id
                }
              },
              onCompleted() {
                setShowFeedbackDialog(false)
                setHasGivenFeedback(true)
              }
            })
          }}
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
