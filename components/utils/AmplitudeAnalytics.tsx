import { amplitudeInit, amplitudeSetUserID, amplitudeSetUserProps, amplitudeSetUserPropsOnce } from "apis/amplitude"
import useGoogleAnalyticsHelpers from "components/hooks/useGoogleAnalyticsHelpers"
import { useUserProfileQuery } from "graphql/queries/user-profile.generated"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function AmplitudeAnalytics() {
  const router = useRouter()
  const {data: session, status} = useSession()
  const [initialized, setInitialized] = useState(false)
  //Get user data
  const { data, loading } = useUserProfileQuery({
    skip: status === 'loading'
  })
  //Setup props for user configuration
  const user = data?.user
  const user_id = data?.user?._id || 'anon'
  const access = data?.user?.accessType
  const user_type = user?.user_type || 'N/A'
  const specialty = user?.specialty || 'N/A'
  const user_role = user?.role || 'N/A'
  const institution_name = access?.institution_name || 'N/A'
  const sub_type = user?.subscription?.subType || 'anon'
  const { anon_link_id, referredFrom, referrerPath } =
    useGoogleAnalyticsHelpers()

  //Check if the user is in the CMS or Access page
  const cmsOrAccess =
    router.pathname.startsWith('/cms') || router.pathname.startsWith('/access')

  //Initialize Amplitude
  useEffect(() => {
    if (cmsOrAccess) return
    if (initialized) return
    amplitudeInit()
    setInitialized(true)
  }, [cmsOrAccess, initialized])

  //Configure user properties
  useEffect(() => {
    if (cmsOrAccess) return
    if(status === "loading" || loading) return;
    user_id !== 'anon' && amplitudeSetUserID(user_id)
    amplitudeSetUserPropsOnce({
      anonLinkID: anon_link_id,
      referredFrom: referredFrom,
      referrerPath: referrerPath
    })
    amplitudeSetUserProps({
      userType: user_type,
      specialty: specialty,
      userRole: user_role,
      institution: institution_name,
      subType: sub_type
    })
  }, [session, status, loading, cmsOrAccess])

  return null
}

export default AmplitudeAnalytics