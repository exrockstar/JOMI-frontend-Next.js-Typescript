import { FeedbackComponent } from './Question'
import { Typography, Box, Button } from '@mui/material'
import FeedbackButton from './FeedbackButton'
import { useField, useFormikContext } from 'formik'
import FormikTextField from 'components/common/formik/FormikTextFIeld'

const LikertScaleFeedback: FeedbackComponent = (props) => {
  const { question } = props
  const { _id, choices } = question
  const [value] = useField<any>('value')
  const { setFieldValue } = useFormikContext()
  const handleSelect = (value: number) => {
    setFieldValue('value', value)
  }
  const hasDescription = choices ? !!choices[0].description : false
  return (
    <div>
      <Typography my={2}>{question.question}</Typography>
      <Box
        display="flex"
        gap={1}
        flexWrap={'wrap'}
        flexDirection={{ xs: hasDescription ? 'column' : 'row', md: 'row' }}
      >
        {choices.map((input, i) => {
          const variant = value.value === input.value ? 'contained' : 'outlined'
          const text = input.description
            ? `${input.value} - ${input.description}`
            : input.value
          return (
            <Box key={i}>
              {hasDescription ? (
                <Button
                  color="warning"
                  variant={variant}
                  sx={{ textTransform: 'none' }}
                  onClick={() => handleSelect(input.value)}
                  fullWidth
                >
                  {text}
                </Button>
              ) : (
                <FeedbackButton
                  onClick={() => handleSelect(input.value)}
                  variant={variant}
                >
                  {text}
                </FeedbackButton>
              )}
            </Box>
          )
        })}
      </Box>
      {!hasDescription && (
        <Box display="flex" justifyContent={'space-between'} my={2}>
          {question.legends.map((legend, i) => {
            return (
              <Typography key={i} variant="body2" color="text.secondary">
                {legend}
              </Typography>
            )
          })}
        </Box>
      )}
      <Box my={2}>
        <Typography my={1}>Leave a comment</Typography>
        <FormikTextField multiline rows={4} fullWidth name="comment" />
      </Box>
    </div>
  )
}

export default LikertScaleFeedback
