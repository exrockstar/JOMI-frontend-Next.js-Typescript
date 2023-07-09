import { Typography } from '@mui/material'
import dayjs from 'dayjs'

type Props = {
  date: string
}
const VerifyDateText = ({ date }: Props) => {
  const formatted = dayjs(date).format('MM/DD/YYYY')
  const isExpired = dayjs(date).add(1, 'year').isBefore(new Date())
  const expiredText = isExpired ? '(Expired)' : ''
  const text = date
    ? `Verified at: ${formatted} ${expiredText}`
    : `Verified at: N/A`
  return (
    <Typography
      color="text.secondary"
      variant="caption"
      sx={{ display: 'block' }}
    >
      {text}
    </Typography>
  )
}
export default VerifyDateText
