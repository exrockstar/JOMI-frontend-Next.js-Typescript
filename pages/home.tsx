import { Box } from '@mui/material'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import { BASE_URL } from 'common/constants'
import AnnouncementContainer from 'components/common/Announcement/AnnouncementContainer'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import Footer2 from 'components/Footer/Footer'
import BackgroundVideo from 'components/frontpage/BackgroundVideo'
import HeroSection from 'components/frontpage/hero/HeroSection'
import LatestArticlesSection from 'components/frontpage/latest-articles/LatestArticlesSection'
import RecentNewsSection from 'components/frontpage/recent-news/RecentNewsSection'
import TestimonialSection from 'components/frontpage/testimonial/TestimonialSection'
import Navbar from 'components/navbar/Navbar'
import { frontPageTheme } from 'components/theme'
import { FrontPageDocument, FrontPageQuery } from 'graphql/queries/frontpage.generated'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { createRef } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import {
  SiteWideAnnouncementsDocument,
  SiteWideAnnouncementsQuery
} from 'graphql/queries/announcement-for-user.generated'
import { useAppState } from 'components/_appstate/useAppState'
import UserAnnouncementModal from 'components/common/Announcement/AnnouncementForUserModal'

const Home: NextPage = (props) => {
  const ref = createRef<HTMLDivElement>()
  const {
    state: { announcementsShown }
  } = useAppState()

  return (
    <div>
      <Head>
        <link rel="canonical" href={BASE_URL + '/'} key="canonical" />
      </Head>
      <ThemeProvider theme={frontPageTheme}>
        <Box minHeight="100vh" bgcolor="background.default" zIndex={1} position="relative">
          <PageLoadingIndicator />
          <Navbar />
          <Box visibility={announcementsShown ? 'visible' : 'hidden'}>
            <AnnouncementContainer ref={ref} />
            <Box width="100%" left={0} top={0} zIndex={-1} position="absolute" overflow="hidden">
              <BackgroundVideo />
            </Box>
            <Box zIndex={1} position="relative" overflow="hidden">
              <HeroSection />
              <LatestArticlesSection />
            </Box>
            <TestimonialSection />
            <RecentNewsSection />
            <Footer2 />
          </Box>
        </Box>
      </ThemeProvider>
      <UserAnnouncementModal />
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const client = getApolloAdminClient(true)
  await client.query<FrontPageQuery>({
    query: FrontPageDocument
  })

  await client.query<SiteWideAnnouncementsQuery>({
    query: SiteWideAnnouncementsDocument
  })
  return {
    props: {
      theme: 'frontPage',
      [APOLLO_STATE_PROP_NAME]: client.cache.extract()
    },
    revalidate: 3600 //refresh every hour.
  }
}
