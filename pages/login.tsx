import * as React from 'react'
import { Box, Hidden } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { LogoContainer } from 'components/auth/LogoContainer'
import { LoginForm } from 'components/auth/LoginForm'
import { GetStaticProps } from 'next'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import Layout from 'components/layout'
import { useAppState } from 'components/_appstate/useAppState'
import { useEffectOnce } from 'usehooks-ts'

export default function LoginPage() {
  const { setAnnouncementsShown } = useAppState()
  useEffectOnce(() => setAnnouncementsShown(true))
  return (
    <div>
      <Hidden smDown>
        <Box display="flex" height="100vh">
          <PageLoadingIndicator />
          <LogoContainer />
          <Box display="flex" width={{ lg: '50%', md: '60%', xs: '100%' }} justifyContent="center" alignItems="center">
            <Box width={400}>
              <LoginForm />
            </Box>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Layout noBackground noContainer noFooter>
          <Box display="flex" width={{ md: '50%', xs: '100%' }} justifyContent="center" alignItems="center" pt={2}>
            <Box width={400}>
              <LoginForm />
            </Box>
          </Box>
        </Layout>
      </Hidden>
    </div>
  )
}

export const getStaticProps: GetStaticProps<DefaultPageProps> = async () => {
  return {
    props: {
      meta_data: buildGenericMetadata({
        title: 'Login',
        slug: 'login'
      })
    }
  }
}
