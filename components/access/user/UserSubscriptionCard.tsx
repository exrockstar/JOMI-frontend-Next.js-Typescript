import { Card, Typography, Divider, CardContent, Box } from '@mui/material'
import dayjs from 'dayjs'
import { useUserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { SubType, MatchedBy, AccessTypeEnum } from 'graphql/types'
import _ from 'lodash'

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

  return (
    <Card sx={{ mr: 2 }}>
      <Typography variant="h4" p={2}>
        Current Access
      </Typography>
      <Divider />
      <CardContent>
        <Typography sx={{ textTransform: '' }}>
          {_.startCase(user?.accessType?.accessType)}
        </Typography>
        {/* {needsConfirmation && (
          <Box width={'100%'}>
            <Typography variant="caption" color="error.main">
              Needs email confirmation
            </Typography>
          </Box>
        )} */}
        {!!user.accessExpiredAt && dayjs().isAfter(user.accessExpiredAt) && (
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
