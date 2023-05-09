import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// import MoreInfoDialog2 from './MoreInfoModal/MoreInfoDialog2'
const MoreInfoDialog2 = dynamic(() => import('./MoreInfoDialog2'))
/**
 * Asks more information about the user if the user is newly registered.
 * @returns
 */
const MoreInfoDialog: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const { data } = useUserProfileQuery({
    skip: !session?.user
  })
  const user = data?.user
  const isLackingInfo = Boolean(user) && (!user.user_type || !user.specialty)

  useEffect(() => {
    const path = router.asPath
    const excludedUrls = [
      '/password-protect',
      '/login',
      '/signup',
      '/account/confirm-email',
      '/account/inst-confirm-email',
      '/account/reset-password',
      '/account/signup-success'
    ]
    if (
      isLackingInfo &&
      excludedUrls.every((excluded) => !path.startsWith(excluded))
    ) {
      setOpen(true)
    }
  }, [isLackingInfo, router.asPath])

  if (!open) return null
  return (
    <MoreInfoDialog2 user={user} open={open} onClose={() => setOpen(false)} />
  )
}

export default MoreInfoDialog
