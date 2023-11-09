import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React from 'react'
dayjs.extend(duration)
type Props = {
  time_watched: number // time watched in seconds
}
const TimeWatched = (props: Props) => {
  if (!props.time_watched) return null
  const formatted = dayjs
    .duration(props.time_watched, 'seconds')
    .format('HH:mm:ss')

  console.log(props.time_watched)
  return (
    <Typography variant="body2" color="text.secondary" ml={0.5}>
      ({formatted})
    </Typography>
  )
}

export default TimeWatched
