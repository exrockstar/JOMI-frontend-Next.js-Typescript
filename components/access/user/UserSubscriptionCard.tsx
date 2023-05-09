import { Card, Typography, Divider, CardContent, Box } from '@mui/material'
import dayjs from 'dayjs'
import { useUserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { SubType, MatchedBy } from 'graphql/types'

type Props = {
  userId: string
}

const UserSubscriptionCard = ({ userId }: Props) => {
  const { data } = useUserDetailQuery({
    variables: {
      id: userId
    },
    skip: !userId
  })

  const user = data?.userById

  if (!user) {
    return null
  }

  const subType = user?.subscription?.subType
  const access = subType
    ? subType === SubType.NotCreated
      ? user.lastSubType
      : subType
    : 'No Access'
  const needsInstEmailConfirmation =
    user?.matchedBy === MatchedBy.InstitutionalEmail && !user?.instEmailVerified
  const needsEmailConfirmation =
    user?.matchedBy === MatchedBy.Email && user?.emailNeedsConfirm

  const needsConfirmation =
    access === SubType.Institution &&
    (needsInstEmailConfirmation || needsEmailConfirmation)
  return (
    <Card sx={{ mr: 2 }}>
      <Typography variant="h4" p={2}>
        User Access
      </Typography>
      <Divider />
      <CardContent>
        <Typography sx={{ textTransform: 'capitalize' }}>{access}</Typography>
        {needsConfirmation && (
          <Box width={'100%'}>
            <Typography variant="caption" color="error.main">
              Needs email confirmation
            </Typography>
          </Box>
        )}
        {!!user.accessExpiredAt && (
          <Box width={'100%'}>
            <Typography variant="caption" color="error.main">
              Expired: {dayjs(user.accessExpiredAt).format('L LT')}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
export default UserSubscriptionCard
