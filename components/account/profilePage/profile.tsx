import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Form from './form'
import { useSession } from 'next-auth/react'

import { useSnackbar } from 'notistack'
import { useUpdateProfileMutation } from 'graphql/mutations/update-profile.generated'
import { UserPricesDocument } from 'graphql/queries/user-prices.generated'
import {
  useUserProfilePageQuery,
  UserProfilePageDocument
} from 'graphql/queries/user-profile-page.generated'
import { UserProfileDocument } from 'graphql/queries/user-profile.generated'
import { UpdateProfileInput } from 'graphql/types'

export default function Profile() {
  const { data: session } = useSession()
  const { data, loading, error, refetch } = useUserProfilePageQuery()
  const { enqueueSnackbar } = useSnackbar()

  const [updateProfile, { loading: updating }] = useUpdateProfileMutation({
    refetchQueries: [
      { query: UserProfilePageDocument },
      { query: UserProfileDocument },
      { query: UserPricesDocument }
    ],
    onCompleted: () => {
      enqueueSnackbar('Your profile has been updated.', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Failed to update profile.', { variant: 'error' })
    }
  })

  useEffect(() => {
    //refetch query upon login
    if (session) {
      refetch()
    }
  }, [session, refetch])

  if (loading || error) return null

  const handleSubmit = (values: UpdateProfileInput, actions) => {
    updateProfile({
      variables: {
        input: values
      }
    })
    actions.setSubmitting(false)
  }
  return (
    <Box p={2} pt={0}>
      <Box>
        <ProfileText>Profile</ProfileText>
      </Box>
      <Form
        handleSubmit={handleSubmit}
        userData={data?.user}
        loading={updating}
      />
    </Box>
  )
}

const ProfileText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '28px',
  textAlign: 'start',
  padding: '8px',
  fontWeight: '200px'
}))
