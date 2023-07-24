import { ArrowRight, Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Typography
} from '@mui/material'

import CTAButton from 'components/common/CTAButton'
import { useSnackbar } from 'notistack'
import { FeedbackComponent } from './Question'
import LikertScaleFeedback from './LikertScaleFeedback'
import { useEffect, useState } from 'react'
import { GetFeedbackQuestionsQuery } from 'graphql/mutations/collect-feedback.generated'
import { useField, useFormikContext } from 'formik'
type Question = GetFeedbackQuestionsQuery['question']
type Props = DialogProps & {
  question?: Question
  hideSkipButton?: boolean
}

const FeedbackModal = (props: Props) => {
  const question = props.question
  const { enqueueSnackbar } = useSnackbar()
  const [answer] = useField<any>('value')
  const [feedback_id] = useField<string>('feedback_id')
  const { submitForm, isSubmitting } = useFormikContext()
  const getFeedbackComponent = (question: Question): FeedbackComponent => {
    switch (question.type) {
      case 'yes-no':
      // TODO: Add return when we have more question types.
      case 'likert':
      default:
        return LikertScaleFeedback
    }
  }

  useEffect(() => {
    if (props.open) {
      gtag('event', 'show_feeback_block', {
        question_id: question?._id
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  if (!question) {
    return null
  }
  const Component = getFeedbackComponent(question)
  return (
    <Dialog {...props} maxWidth="xl">
      <DialogTitle>
        <Typography>Give us some feedback!</Typography>
        <IconButton
          sx={{ position: 'absolute', right: 0, top: 0 }}
          onClick={(e) => {
            props.onClose({ feedback_id: feedback_id.value }, null)
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Component question={question} />
      </DialogContent>
      <Divider />
      <Box
        my={2}
        px={2}
        display={'flex'}
        flexWrap={'wrap'}
        flexDirection={'column'}
        gap={2}
      >
        <CTAButton
          endIcon={<ArrowRight />}
          onClick={(e) => {
            enqueueSnackbar('Thank you for your feedback!', {
              variant: 'info'
            })
            submitForm()
          }}
          loading={isSubmitting}
          disabled={!answer.value}
        >
          Send Feedback
        </CTAButton>
        {!props.hideSkipButton && (
          <Button
            onClick={(e) => {
              props.onClose({ feedback_id: feedback_id.value }, null)
            }}
            color="secondary"
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Continue Watching Video
          </Button>
        )}
      </Box>
    </Dialog>
  )
}
export default FeedbackModal
