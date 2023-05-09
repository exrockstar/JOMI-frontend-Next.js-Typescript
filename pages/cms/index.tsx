import { createTheme, ThemeProvider } from '@mui/material/styles'
// import Sidebar from 'components/cms/Sidebar'
// import StatusBar from 'components/cms/StatusBar'
import CircularLoader from 'components/common/CircularLoader'
import { useSession } from 'next-auth/react'
import CmsLayout from 'components/cms/CmsLayout'
import Error403 from 'components/error-pages/Error403'

const theme = createTheme({})

const CMS = () => {
  const { data: session } = useSession()

  return session === undefined ? (
    <CircularLoader />
  ) : session?.user?.role !== 'admin' && session === null ? (
    <Error403 />
  ) : (
    <CmsLayout></CmsLayout>
  )
}

export default CMS
