import * as React from 'react'
import { SignUpForm } from 'components/auth/SignUpForm'
import { Box, Hidden } from '@mui/material'
import { LogoContainer } from 'components/auth/LogoContainer'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { GetStaticProps } from 'next'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import Layout from 'components/layout'

export default function SignupPage() {
  return (
    <div>
      <Hidden smDown>
        <Box display="flex" flexDirection="column" flex={1}>
          <PageLoadingIndicator />
          <Box display="flex" height="100%">
            <LogoContainer />
            <Box
              display="flex"
              width={{ xs: '100%', md: '60%', lg: '50%' }}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={{ xs: '100%', md: 600 }} px={{ xs: 2, md: 4 }} py={2}>
                <SignUpForm />
              </Box>
            </Box>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Layout noBackground noContainer noFooter>
          <Box
            display="flex"
            width={{ xs: '100%', md: '60%', lg: '50%' }}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box width={{ xs: '100%', md: 600 }} px={{ xs: 2, md: 4 }} py={2}>
              <SignUpForm />
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
        title: 'Sign up',
        slug: 'signup'
      })
    }
  }
}
