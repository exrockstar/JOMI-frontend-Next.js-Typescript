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
import { frontPageTheme } from 'components/theme'
import { ThemeProvider } from '@mui/material/styles'
import CTAButton from 'components/common/CTAButton'
import { useSnackbar } from 'notistack'
import { FeedbackComponent } from './Question'
import LikertScaleFeedback from './LikertScaleFeedback'
import { useEffect, useState } from 'react'
import { GetFeedbackQuestionsQuery } from 'graphql/mutations/collect-feedback.generated'
type Question = GetFeedbackQuestionsQuery['question']
type Props = DialogProps & {
  onAnswer(value: any, question: Question, comment?: string): void
  question?: Question
}

const FeedbackModal = (props: Props) => {
  const question = props.question
  const { enqueueSnackbar } = useSnackbar()
  const getFeedbackComponent = (question: Question): FeedbackComponent => {
    switch (question.type) {
      case 'yes-no':
      // TODO: Add return when we have more question types.
      case 'likert':
      default:
        return LikertScaleFeedback
    }
  }
  const [answer, setAnswer] = useState<any>(null)
  const [comment, setComment] = useState('')

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
    <ThemeProvider theme={frontPageTheme}>
      <Dialog {...props} maxWidth="xl">
        <DialogTitle>
          <Typography>Give us some feedback!</Typography>
          <IconButton
            sx={{ position: 'absolute', right: 0, top: 0 }}
            onClick={(e) => {
              props.onClose(e, null)
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Component
            question={question}
            onAnswer={(value, qId, comment) => {
              setAnswer(value)
              setComment(comment)
            }}
          />
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
              props.onClose(e, null)
              props.onAnswer(answer, question, comment)
              enqueueSnackbar('Thank you for your feedback!', {
                variant: 'info'
              })
            }}
            disabled={!answer}
          >
            Send Feedback
          </CTAButton>
          <Button
            onClick={(e) => {
              props.onClose(e, null)
            }}
            color="secondary"
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Continue Watching Video
          </Button>
        </Box>
      </Dialog>
    </ThemeProvider>
  )
}
export default FeedbackModal
