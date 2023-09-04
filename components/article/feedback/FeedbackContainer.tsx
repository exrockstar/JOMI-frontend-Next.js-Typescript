import { useAppState } from 'components/_appstate/useAppState'
import FeedbackModal from './FeedbackModal'
import { amplitudeTrackFeedback } from 'apis/amplitude'
import { useSession } from 'next-auth/react'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import {
  TrackFeedbackMutation,
  useGetFeedbackQuestionsQuery,
  useTrackFeedbackMutation
} from 'graphql/mutations/collect-feedback.generated'
import { useEffect, useState } from 'react'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useRouter } from 'next/router'
import { Box, Button } from '@mui/material'
import { frontPageTheme } from 'components/theme'
import { ThemeProvider } from '@mui/material/styles'
import CTAButton from 'components/common/CTAButton'
import { TrackFeedbackInput } from 'graphql/types'
import { Formik } from 'formik'
type FeedbackContainerProps = {
  hideSkipButton?: boolean
}

/**
 *
 * @returns
 */
const FeedbackContainer = ({ hideSkipButton }: FeedbackContainerProps) => {
  const { showFeedbackDialog, setShowFeedbackDialog, setFeedbackButtonText } =
    useAppState()

  const { data: session, status } = useSession()
  const router = useRouter()
  const isSessionLoading = status === 'loading'
  const { data: userData, loading } = useUserProfileQuery({
    skip: isSessionLoading
  })
  const isCMSOrAccess = ['/cms', '/access'].some((path) =>
    router.pathname.startsWith(path)
  )
  const isArticlePage = router.pathname.startsWith('/article')
  const article_publication_id = isArticlePage ? router.query.slug?.at(0) : ''

  const { anon_link_id } = useGoogleAnalyticsHelpers()
  const { data: feedbackQuestionData } = useGetFeedbackQuestionsQuery({
    skip: isSessionLoading || isCMSOrAccess,
    variables: {
      anon_link_id
    },
    onCompleted(result) {
      if (!result.question) {
        setFeedbackButtonText('')
      }
    }
  })
  const [trackFeedback] = useTrackFeedbackMutation()

  const forceShowFeedback = Boolean(router.query.feedback as string)
  useEffect(() => {
    if (!!forceShowFeedback) {
      setShowFeedbackDialog('feedback-link')
    }
  }, [forceShowFeedback, setShowFeedbackDialog])
  const question = feedbackQuestionData?.question
  const user = userData?.user
  if (!question || loading || isCMSOrAccess) return null
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Formik<TrackFeedbackInput>
        initialValues={{
          questionId: question?._id,
          type: question?.type,
          value: '',
          anon_link_id: anon_link_id,
          user: user?._id
        }}
        onSubmit={async (values, helpers) => {
          gtag('event', 'track_feedback', {
            question_id: question._id,
            question: question.question,
            value: values.value,
            type: question.type,
            method: showFeedbackDialog
          })
          amplitudeTrackFeedback({
            question_id: question._id,
            question: question.question,
            value: values.value,
            type: question.type,
            userId: session && session.user ? session.user._id : 'anon',
            comment: values.comment,
            method: showFeedbackDialog
          })
          await trackFeedback({
            variables: {
              input: {
                ...values,
                value: values.value + '',
                method: showFeedbackDialog,
                article_publication_id: article_publication_id
              }
            },
            onCompleted(result) {
              setShowFeedbackDialog(false)
              //set the feedback id so that it can be updated later on
              const feedback_id = result.trackFeedack?._id
              helpers.setFieldValue('feedback_id', feedback_id)

              setFeedbackButtonText('Adjust')
            }
          })
        }}
      >
        <FeedbackModal
          open={showFeedbackDialog}
          onClose={(e) => {
            setShowFeedbackDialog(false)
          }}
          hideSkipButton={forceShowFeedback || hideSkipButton}
          question={feedbackQuestionData?.question}
        />
      </Formik>
    </ThemeProvider>
  )
}
export default FeedbackContainer
