import { ArrowBack } from '@mui/icons-material'
import { Alert, Box, Button, Grid, Stack } from '@mui/material'
import { useUserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import React from 'react'
import UserActivityTable from './UserActivityTable'
import UserDetailsCard from './UserDetailsCard'
import Link from 'next/link'
import UserSubscriptionCard from './UserSubscriptionCard'
import { useRouter } from 'next/router'
import { cleanObj } from 'common/utils'

type Props = {
  userId: string
  instId: string
}

const UserActivityPanel = ({ userId, instId }: Props) => {
  const { data } = useUserDetailQuery({
    variables: {
      id: userId
    },
    skip: !userId
  })
  const router = useRouter()
  const user = data?.userById
  if (!user) {
    return null
  }

  const hidden = user.email === 'hidden'
  return (
    <Stack p={2} minHeight="100vh">
      <Box mb={2}>
        <Link
          href={{
            pathname: `/access/${instId}/users`,
            query: cleanObj({
              start: router.query.start,
              end: router.query.end,
              global: router.query.global
            })
          }}
          passHref
          legacyBehavior
        >
          <Button startIcon={<ArrowBack />}>Back to Institution</Button>
        </Link>
      </Box>
      <Grid container>
        <Grid item xs={12} lg={9}>
          <UserDetailsCard userId={userId} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <UserSubscriptionCard userId={userId} />
        </Grid>
      </Grid>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={12}>
          {!hidden ? (
            <UserActivityTable />
          ) : (
            <Box>
              <Alert severity="info">
                Please login to see user activity details
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Stack>
  )
}

export default UserActivityPanel
