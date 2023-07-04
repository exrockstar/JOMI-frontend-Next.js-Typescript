import React, { useState } from 'react'
import { FeedbackComponent } from './Question'
import { Typography, Box, Button, TextField } from '@mui/material'
import FeedbackButton from './FeedbackButton'

const LikertScaleFeedback: FeedbackComponent = (props) => {
  const { question } = props
  const { _id, choices } = question
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')
  const handleClick = (value: number) => {
    props.onAnswer(value, _id, comment)
    setSelected(value)
  }
  const hasDescription = !!choices?.at(0)?.description
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
          const variant = selected === input.value ? 'contained' : 'outlined'
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
                  onClick={() => handleClick(input.value)}
                  fullWidth
                >
                  {text}
                </Button>
              ) : (
                <FeedbackButton
                  onClick={() => handleClick(input.value)}
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
        <TextField
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => {
            props.onAnswer(selected, _id, comment)
            setComment(e.target.value)
          }}
        ></TextField>
      </Box>
    </div>
  )
}

export default LikertScaleFeedback
