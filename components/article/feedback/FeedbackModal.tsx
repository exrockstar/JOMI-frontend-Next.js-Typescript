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
import { question1 } from './questions'
import { FeedbackComponent, Question } from './Question'
import LikertScaleFeedback from './LikertScaleFeedback'
import { useState } from 'react'
type Props = DialogProps & {
  onAnswer(value: any, questionId: string): void
}

const FeedbackModal = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const question = question1
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
            onAnswer={(value) => {
              setAnswer(value)
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
              props.onAnswer(answer, question.id)
              enqueueSnackbar('Thank you for your feedback!', {
                variant: 'info'
              })
            }}
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
