import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useIpAddress } from './useIpAddress'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { UserRoles } from 'graphql/types'
import { MetaData } from 'backend/seo/MetaData'
import { analytics } from 'apis/analytics'
import { isProduction } from 'common/constants'

const googleTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

type Props = {
  metadata: MetaData
}
/**
 *  This hook is used for initializing google analytics.
 *  `process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS` must be defined.
 *  CUSTOMER METRICS:
 *  - dimension3: User ID
 *  - dimension4: Institution
 *  - dimension8: User Type
 *  - dimension9: Client ID
 *  - dimension10: IP Address
 *  - dimension11: Email Address
 *  - dimension5: Is Subscribed
 *  - dimension12: Full Name
 *  - dimension13: Article Section
 *  - dimension14: Specialty
 */
function GoogleAnalytics({ metadata }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data, loading } = useUserProfileQuery({
    skip: status === 'loading'
  })
  const userip = useIpAddress()
  const user = data?.user
  const hasData = !!data
  const url = router.asPath
  const access = user?.accessType
  const onPageView = useCallback(
    (url) => {
      const isAdmin = user?.role === UserRoles.Admin
      const isCms = /^cms/.test(url)
      if (!isProduction) return
      /* invoke analytics function only for production */
      const shouldTrack =
        googleTrackingId && !loading && !isAdmin && !isCms && hasData

      if (!shouldTrack) return

      const hasfullName = user?.name.first && user?.name.last
      const fullName = hasfullName
        ? user?.name.first + ' ' + user?.name.last
        : 'N/A'
      const gadata = {
        userId: `${user?._id || 'N/A'}`,
        dimension3: `${user?._id || 'N/A'}`,
        dimension9: `${access?.institution_id || 'N/A'}`,
        dimension8: `${user?.user_type || 'N/A'}`,
        dimension4: `${access?.institution_name || 'N/A'}`,
        dimension10: `${userip || 'N/A'}`,
        dimension11: `${user?.email || 'N/A'}`,
        dimension5: `${user?.subActive || false}`,
        dimension12: fullName,
        dimension13: `N/A`,
        dimension14: `${user?.specialty || 'N/A'}`
      }

      analytics.set({
        location: location.href,
        page: location.pathname,
        title: metadata.title,
        ...gadata
      })

      analytics.pageView(url)
    },
    [hasData, loading, metadata.title, user, userip, access]
  )

  useEffect(() => {
    // if (!isProduction) return
    analytics.init()
  }, [])

  useEffect(() => {
    onPageView(url)
  }, [url, onPageView])

  return null
}

export default GoogleAnalytics
