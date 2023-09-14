import React, { memo, useEffect } from 'react'

import '../styles/globals.css'
import '../styles/generated.css'
import '../styles/contentLabel.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme, frontPageTheme } from 'components/theme'
import Head from 'next/head'
import GoogleAnalytics from 'components/utils/GoogleAnalytics'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'apis/apollo-client'
import MoreInfoDialog from 'components/common/MoreInfoModal/MoreInfoModalContainer'
import MySnackbarProvider from 'components/common/MySnackbarProvider'
import PageMetadata from 'components/utils/PageMetadata'
import { defaultMeta } from 'backend/seo/defaultMetaInfo'
import { MetaData } from 'backend/seo/MetaData'
import { AppStateProvider, useAppState } from 'components/_appstate/useAppState'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'common/emotionCache'
import Script from 'next/script'
import router, { useRouter } from 'next/router'
import GoogleGtag from 'components/common/GoogleGtag'
import PageStructuredData from 'components/utils/PageStructuredData'
import { fbPixelInit } from 'apis/fbpixel'
import { LinkedInInsightTag } from 'nextjs-linkedin-insight-tag'
import HotJar from 'components/utils/HotJar'
import { ErrorBoundary } from 'react-error-boundary'
import AppErrorFallback from 'components/fallbacks/AppErrorFallback'
import { CookiesProvider } from 'react-cookie'
import { NextPage } from 'next'
import AmplitudeAnalytics from 'components/utils/AmplitudeAnalytics'
import FeedbackContainer from 'components/article/feedback/FeedbackContainer'
import PricingSignupDialog from 'components/common/PricingModal/PricingSignupDialog'

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache
}
const clientSideEmotionCache = createEmotionCache()
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: MyAppProps) {
  const apolloClient = useApollo(pageProps)
  const _pageProps = pageProps as any
  const meta: MetaData = _pageProps.meta_data ?? defaultMeta
  const theme = _pageProps.theme === 'frontPage' ? frontPageTheme : defaultTheme

  //Initialize FB pixel and call PageView event any time the router.events changes, needs to be in _app
  useEffect(() => {
    fbPixelInit()
  }, [router.events])

  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <AppStateProvider>
          <CacheProvider value={emotionCache}>
            <PageMetadata meta_data={meta} />
            <ThemeProvider theme={theme}>
              <MySnackbarProvider>
                <AmplitudeAnalytics />
                <GoogleAnalytics metadata={meta} />
                <GoogleGtag metadata={meta} />
                <LinkedInInsightTag />
                <HotJar />
                <MoreInfoDialog />
                <PricingSignupDialog />
                <Component {...pageProps} />
                <FeedbackContainer />
                <noscript>
                  <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_GTM}`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                  ></iframe>
                </noscript>
                {!!_pageProps.structured_data && (
                  <script
                    id="structured_data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: _pageProps.structured_data
                    }}
                  ></script>
                )}
              </MySnackbarProvider>
            </ThemeProvider>
          </CacheProvider>
        </AppStateProvider>
      </ApolloProvider>
    </CookiesProvider>
  )
}

const MyAppWrapper: React.FC<MyAppProps> = (appProps) => {
  const pageProps = appProps.pageProps as any
  const session = pageProps.session

  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <SessionProvider session={session}>
        <MyApp {...appProps} />
      </SessionProvider>
      <PageStructuredData />
    </ErrorBoundary>
  )
}

export default memo(MyAppWrapper)
