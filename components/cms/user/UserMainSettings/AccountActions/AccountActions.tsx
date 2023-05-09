import { Stack, Typography, Divider } from '@mui/material'
import { UserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import BlockUserButton from './BlockUserButton'
import DeleteUserButton from './DeleteUserButton'
import ResetPassword from './ResetPassword'
import SignInToken from './SignInToken'

type Props = {
  user: UserDetailQuery['userById']
}

const AccountActions = ({ user }: Props) => {
  if (!user) return null
  return (
    <>
      <Stack spacing={1} my={2}>
        <Typography variant="h5" my={1}>
          Account Actions
        </Typography>
        <ResetPassword email={user?.email} />
        <SignInToken signInToken={user.signInToken ?? ''} userId={user._id} />
        <Divider />
        <BlockUserButton />
        <DeleteUserButton />
      </Stack>
    </>
  )
}

export default AccountActions
