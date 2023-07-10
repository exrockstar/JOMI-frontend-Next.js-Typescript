import { useAppState } from 'components/_appstate/useAppState'
import FeedbackModal from './FeedbackModal'
import { amplitudeTrackFeedback } from 'apis/amplitude'
import { useSession } from 'next-auth/react'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import {
  useGetFeedbackQuestionsQuery,
  useTrackFeedbackMutation
} from 'graphql/mutations/collect-feedback.generated'
import { useEffect, useState } from 'react'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useRouter } from 'next/router'

type FeedbackContainerProps = {
  hideSkipButton?: boolean
}
/**
 *
 * @returns
 */
const FeedbackContainer = ({ hideSkipButton }: FeedbackContainerProps) => {
  const { setHasGivenFeedback, showFeedbackDialog, setShowFeedbackDialog } =
    useAppState()

  const { data: session, status } = useSession()
  const isSessionLoading = status === 'loading'
  const { data: userData } = useUserProfileQuery({
    skip: isSessionLoading
  })
  const { anon_link_id } = useGoogleAnalyticsHelpers()
  const { data: feedbackQuestionData } = useGetFeedbackQuestionsQuery({
    skip: isSessionLoading,
    variables: {
      anon_link_id
    }
  })
  const [trackFeedback] = useTrackFeedbackMutation()
  const router = useRouter()
  const forceShowFeedback = Boolean(router.query.feedback as string)
  useEffect(() => {
    if (!!forceShowFeedback) {
      setShowFeedbackDialog(true)
    }
  }, [forceShowFeedback, setShowFeedbackDialog])
  return (
    <>
      <FeedbackModal
        open={showFeedbackDialog}
        onClose={() => {
          setShowFeedbackDialog(false)
        }}
        hideSkipButton={forceShowFeedback || hideSkipButton}
        question={feedbackQuestionData?.question}
        onAnswer={async (value, question, comment) => {
          gtag('event', 'track_feedback', {
            question_id: question._id,
            question: question.question,
            value,
            type: question.type
          })
          amplitudeTrackFeedback({
            question_id: question._id,
            question: question.question,
            value,
            type: question.type,
            userId: session && session.user ? session.user._id : 'anon',
            comment: comment
          })
          await trackFeedback({
            variables: {
              input: {
                value: value + '',
                questionId: question._id,
                type: question.type,
                anon_link_id,
                user: session?.user?._id,
                institution: userData?.user?.accessType.institution_id,
                comment: comment
              }
            },
            onCompleted() {
              setShowFeedbackDialog(false)
              setHasGivenFeedback(true)
            }
          })
        }}
      />
    </>
  )
}
export default FeedbackContainer
