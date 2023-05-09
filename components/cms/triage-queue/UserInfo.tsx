import { Stack, Typography, Link as MuiLink } from '@mui/material'
import { TriageQueueByIdQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import React from 'react'
import Link from 'next/link'
type Props = {
  user: TriageQueueByIdQuery['triageQueueRequest']['user']
}

const UserInfo = ({ user }: Props) => {
  if (!user) return null
  return (
    <Stack spacing={0.5}>
      <Typography variant="h5"> User Info</Typography>
      <Typography variant="body2">
        <strong>Name: </strong> {user.display_name}
      </Typography>
      <Typography variant="body2">
        <strong>Email: </strong> {user.email}
      </Typography>
      <Typography variant="body2">
        <strong>Database ID: </strong>{' '}
        <Link href={`/cms/user/${user._id}`} passHref legacyBehavior>
          <MuiLink>{user._id}</MuiLink>
        </Link>
      </Typography>
      <Typography variant="body2">
        <strong>Country-Region: </strong> {user.countryCode ?? 'N/A '}-
        {user.regionName ?? 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>User type: </strong> {user.user_type}
      </Typography>
      <Typography variant="body2">
        <strong>Specialty: </strong> {user.specialty}
      </Typography>
    </Stack>
  )
}

export default UserInfo
