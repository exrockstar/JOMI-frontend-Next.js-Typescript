import { Stack } from '@mui/material'
import CircularLoader from 'components/common/CircularLoader'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

/**
 * Endpoint for recieving /sign-in/token/:token endpoint generated from JOMIv4.
 * @returns
 */
const SignInViaToken = () => {
  const router = useRouter()
  const query = router.query
  useEffect(() => {
    if (!query.tokenId) return

    signIn('tokenid', {
      tokenId: query.tokenId,
      callbackUrl: '/'
    })
  }, [query.tokenId])

  return (
    <Stack height="90vh" alignItems="center" justifyContent="center">
      <CircularLoader />
    </Stack>
  )
}

export default SignInViaToken
