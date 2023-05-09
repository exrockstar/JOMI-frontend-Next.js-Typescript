import AccessLayout from 'components/access/AccessLayout'
import UserActivityPanel from 'components/access/user/UserActivityPanel'
import { useRouter } from 'next/router'
import React from 'react'

const UserActivityPage = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const instId = router.query.id as string
  if (!userId || !instId) {
    return null
  }
  return (
    <AccessLayout>
      <UserActivityPanel userId={userId} instId={instId} />
    </AccessLayout>
  )
}

export default UserActivityPage
