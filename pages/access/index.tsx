import { CircularProgress, Stack, Typography } from '@mui/material'
import AccessLayout from 'components/access/AccessLayout'
import InstitutionAccessList from 'components/access/institution/InstitutionAccessList'
import InstitutionHeader from 'components/access/institution/InstitutionHeader'
import { InstitutionAccessProvider } from 'components/access/institution/useInstitutionAccessList'
import Error403 from 'components/error-pages/Error403'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { UserRoles } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AccessIndex = () => {
  const { data: session, status } = useSession()
  const { data: profile, loading } = useUserProfileQuery({
    skip: !session
  })
  const user = profile?.user
  const role = user?.role
  const router = useRouter()
  const isAuthorized = role === UserRoles.Admin

  useEffect(() => {
    if (role === UserRoles.Librarian) {
      router.push(`/access/${user.institution}`)
    }
  }, [role, router, user])

  if (status === 'loading' || loading) {
    return (
      <Stack py={10} alignItems="center">
        <CircularProgress />
        <Typography>Loading</Typography>
      </Stack>
    )
  }

  if (!user || !isAuthorized) {
    if (role === UserRoles.Librarian) {
      return (
        <Stack py={10} alignItems="center">
          <CircularProgress />
          <Typography>Loading</Typography>
        </Stack>
      )
    }
    return <Error403 />
  }

  return (
    <AccessLayout>
      <Stack p={2} pt={2}>
        <InstitutionAccessProvider>
          <InstitutionHeader />
          <InstitutionAccessList />
        </InstitutionAccessProvider>
      </Stack>
    </AccessLayout>
  )
}

export default AccessIndex
