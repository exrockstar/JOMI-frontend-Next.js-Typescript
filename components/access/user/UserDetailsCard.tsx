import { Card, Typography, Divider, CardContent } from '@mui/material'
import dayjs from 'dayjs'
import { useUserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import React from 'react'

type Props = {
  userId: string
}
const UserDetailsCard = ({ userId }: Props) => {
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
  return (
    <Card sx={{ mr: 2 }}>
      <Typography variant="h4" p={2}>
        User Details{' '}
      </Typography>
      <Divider />
      <CardContent>
        <Typography color="text.primary" fontWeight={600}>
          Email address
        </Typography>
        <Typography color="text.secondary">
          {user.institutionalEmail || user.email}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          Display name
        </Typography>
        <Typography color="text.secondary">
          {user.display_name ?? 'N/A'}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          First name
        </Typography>
        <Typography color="text.secondary">
          {user.name?.first ?? 'N/A'}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          Last name
        </Typography>
        <Typography color="text.secondary">
          {user.name?.last ?? 'N/A'}
        </Typography>

        <Typography color="text.primary" fontWeight={600}>
          User type
        </Typography>
        <Typography color="text.secondary">
          {user.user_type ?? 'N/A'}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          Specialty
        </Typography>
        <Typography color="text.secondary">
          {user.specialty ?? 'N/A'}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          Date Registered
        </Typography>
        <Typography color="text.secondary">
          {dayjs(user.created).format('MM/DD/YYYY hh:mm A')}
        </Typography>
        <Typography color="text.primary" fontWeight={600}>
          Last Visited
        </Typography>
        <Typography color="text.secondary">
          {dayjs(user.last_visited).format('MM/DD/YYYY hh:mm A')}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserDetailsCard
