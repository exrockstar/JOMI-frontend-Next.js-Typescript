import { MetaData } from 'backend/seo/MetaData'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { UserRoles } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'

type Props = {
  metadata: MetaData
}
const GoogleGtag = ({ metadata }: Props) => {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const { status } = useSession()
  const { data, loading } = useUserProfileQuery({
    skip: status === 'loading'
  })
  const user = data?.user
  const access = data?.user?.accessType
  const isAdmin = data?.user?.role === UserRoles.Admin

  const cmsOrAccess =
    router.pathname.startsWith('/cms') || router.pathname.startsWith('/access')
  const { anon_link_id, referredFrom, referrerPath } =
    useGoogleAnalyticsHelpers()
  const user_type = user?.user_type || 'N/A'
  const specialty = user?.specialty || 'N/A'
  const user_role = user?.role || 'N/A'
  const institution_id = access?.institution_id || 'N/A'
  const institution_name = access?.institution_name || 'N/A'
  const sub_type = user?.subscription?.subType || 'anon'
  useEffect(() => {
    if (cmsOrAccess) return
    if (status === 'loading' || loading) return
    if (initialized) return
    type Config = Gtag.ConfigParams | Gtag.CustomParams

    const config: Config = {
      send_page_view: false,
      userId: `${user?._id || 'N/A'}`,
      user_properties: {
        user_type,
        specialty: specialty,
        user_role,
        institution_id,
        institution_name,
        sub_type,
        userId: `${user?._id || 'N/A'}`
      },
      title: metadata.title
    }

    if (process.env.NODE_ENV === 'development') {
      config.debug_mode = true
    }
    window.dataLayer?.push({
      event: 'config',
      send_page_view: false,
      userId: `${user?._id || 'N/A'}`,
      user_type: user_type,
      specialty: specialty,
      user_role: user_role,
      institution_id: institution_id,
      institution_name: institution_name,
      sub_type: sub_type,
      title: metadata.title
    })
    setInitialized(true)
  }, [
    cmsOrAccess,
    initialized,
    isAdmin,
    loading,
    status,
    user?._id,
    user_role,
    specialty,
    user_type,
    metadata.title,
    institution_id,
    institution_name,
    sub_type
  ])

  useEffect(() => {
    if (!initialized) {
      return
    }

    window.dataLayer?.push({
      event: 'page_view',
      page_path: location.pathname + location.search + location.hash,
      referredFrom: referredFrom,
      referrerPath: referrerPath,
      anon_link_id: anon_link_id
    })
  }, [router.asPath, initialized, referredFrom, referrerPath, anon_link_id])
  return (
    !cmsOrAccess && (
      <div>
        {/* START Initialize GTAG */}
        <Script async strategy="beforeInteractive" id="google-gtm">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GOOGLE_GTM}');`}
        </Script>
      </div>
    )
  )
}

export default GoogleGtag
