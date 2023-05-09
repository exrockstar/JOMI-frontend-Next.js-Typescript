import { Delete, Key } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Link, Stack } from '@mui/material'
import { BASE_URL } from 'common/constants'
import {
  useCreateSignInTokenMutation,
  useDeleteSignInTokenMutation
} from 'graphql/cms-queries/user-list.generated'
import {
  UserDetailFragmentDoc,
  UserDetailFragment
} from 'graphql/cms-queries/UserListParts.fragment.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import SignInTokenDialog from './SignInTokenDialog'
type Props = {
  signInToken?: string
  userId: string
}
const SignInToken = ({ signInToken, userId }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [deleteSignInToken, { loading: deleting, client }] =
    useDeleteSignInTokenMutation({
      onCompleted() {
        enqueueSnackbar('Successfully deleted sign-in token', {
          variant: 'success'
        })

        client.cache.updateFragment(
          {
            fragment: UserDetailFragmentDoc,
            fragmentName: 'UserDetail',
            id: `User:${userId}`
          },
          (data: UserDetailFragment) => {
            return {
              ...data,
              signInToken: ''
            }
          }
        )
      },
      onError(error) {
        enqueueSnackbar(`Error: ${error}`, {
          variant: 'error'
        })
      }
    })

  const handleClick = () => {
    if (signInToken) {
      deleteSignInToken({
        variables: {
          user_id: userId
        }
      })
    } else {
      setShowCreateDialog(true)
    }
  }

  const icon = signInToken ? <Delete /> : <Key />
  const label = signInToken ? 'Delete Sign in token' : 'Create Sign in token'
  const color = signInToken ? 'error' : 'secondary'
  const tokenUrl = `${BASE_URL}/sign-in/token/${signInToken}`
  return (
    <div>
      {!signInToken && (
        <SignInTokenDialog
          userId={userId}
          open={showCreateDialog}
          onClose={() => {
            setShowCreateDialog(false)
          }}
        />
      )}
      <Stack spacing={1} alignItems={'center'}>
        <LoadingButton
          variant="contained"
          color={color}
          startIcon={icon}
          fullWidth
          onClick={handleClick}
          size="large"
          loading={deleting}
        >
          {label}
        </LoadingButton>
        {signInToken && (
          <Link href={tokenUrl} target="_blank" variant="body2">
            {tokenUrl}
          </Link>
        )}
      </Stack>
    </div>
  )
}

export default SignInToken
