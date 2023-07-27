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
import { Feedback, TrackFeedbackInput } from 'graphql/types'
import { Formik } from 'formik'
type FeedbackContainerProps = {
  hideSkipButton?: boolean
}

type TrackFeedbackResult = {
  _id: string
  value: any
  comment?: string
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
  const { data: userData, loading } = useUserProfileQuery({
    skip: isSessionLoading
  })
  //button at the bottom right of the screen.
  const [feedbackButtonText, setFeedbackButtonText] = useState<
    'Leave' | 'Adjust'
  >('Leave')
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
  const question = feedbackQuestionData?.question
  const user = userData?.user
  if (!question || loading) return null
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Formik<TrackFeedbackInput>
        initialValues={{
          questionId: question?._id,
          type: question?.type,
          value: '',
          anon_link_id: anon_link_id,
          institution: user?.institution,
          user: user?._id
        }}
        onSubmit={async (values, helpers) => {
          gtag('event', 'track_feedback', {
            question_id: question._id,
            question: question.question,
            value: values.value,
            type: question.type
          })
          amplitudeTrackFeedback({
            question_id: question._id,
            question: question.question,
            value: values.value,
            type: question.type,
            userId: session && session.user ? session.user._id : 'anon',
            comment: values.comment
          })
          await trackFeedback({
            variables: {
              input: {
                ...values,
                value: values.value + ''
              }
            },
            onCompleted(result) {
              setShowFeedbackDialog(false)
              setHasGivenFeedback(true)

              //set the feedback id so that it can be updated later on
              const feedback_id = result.trackFeedack?._id
              helpers.setFieldValue('feedback_id', feedback_id)

              setFeedbackButtonText('Adjust')
            }
          })
        }}
      >
        <div>
          <FeedbackModal
            open={showFeedbackDialog}
            onClose={(e) => {
              setShowFeedbackDialog(false)
              const event = e as any
              if (event.feedback_id) {
                setFeedbackButtonText('Adjust')
              } else {
                setFeedbackButtonText('Leave')
              }
            }}
            hideSkipButton={forceShowFeedback || hideSkipButton}
            question={feedbackQuestionData?.question}
          />
          {!!feedbackButtonText && (
            <Box position="fixed" right={16} bottom={16} sx={{ zIndex: 500 }}>
              <CTAButton
                onClick={() => {
                  setShowFeedbackDialog(true)
                }}
              >
                {feedbackButtonText} Feedback
              </CTAButton>
            </Box>
          )}
        </div>
      </Formik>
    </ThemeProvider>
  )
}
export default FeedbackContainer
