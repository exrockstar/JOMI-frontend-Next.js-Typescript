import React, { useState } from 'react'
import { FeedbackComponent } from './Question'
import { Typography, Box } from '@mui/material'
import FeedbackButton from './FeedbackButton'

const LikertScaleFeedback: FeedbackComponent = (props) => {
  const { question } = props
  const { id, choices } = question
  const [selected, setSelected] = useState(null)
  const handleClick = (value: number) => {
    props.onAnswer(value, id)
    setSelected(value)
  }
  return (
    <div>
      <Typography align="center" my={2}>
        {question.question}
      </Typography>
      <Box display="flex" gap={1} flexWrap={'wrap'} justifyContent={'center'}>
        {choices.map((input, i) => {
          const variant = selected === input.value ? 'contained' : 'outlined'
          return (
            <Box key={i}>
              <FeedbackButton
                onClick={() => handleClick(input.value)}
                variant={variant}
              >
                {input.value}
              </FeedbackButton>
            </Box>
          )
        })}
      </Box>
      <Box display="flex" justifyContent={'space-between'} my={2}>
        {question.legends.map((legend, i) => {
          return (
            <Typography key={i} variant="body2" color="text.secondary">
              {legend}
            </Typography>
          )
        })}
      </Box>
    </div>
  )
}

export default LikertScaleFeedback
