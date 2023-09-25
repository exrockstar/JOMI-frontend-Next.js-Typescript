/**
 * This file is used for different conferences, feel free to update the file name for
 * whatever conference we are remaking the page for.
 */
import { Box, Container, Divider, Grid, Link as MuiLink, Typography, useMediaQuery } from "@mui/material"
import { getApolloAdminClient } from "apis/apollo-admin-client"
import { APOLLO_STATE_PROP_NAME } from "apis/apollo-client"
import CTAButton from "components/common/CTAButton"
import ConfArticleCard from "components/conference/ConfArticleCard"
import Layout from 'components/layout'
import useEmblaCarousel from "embla-carousel-react"
import { ConferencePageDocument, ConferencePageQuery, useConferencePageQuery } from "graphql/queries/conference.generated"
import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { VideoPlayer } from "components/wistia"
import HarvardLogo from 'public/img/subscribers/harvard-logo.png'
import JohnHopkinsLogo from 'public/img/subscribers/john-hopkins-university.png'
import TheMethodistLogo from 'public/img/subscribers/the-methodist.png'
import StanfordLogo from 'public/img/subscribers/stanford-logo.png'
import UniversityOfJerusalem from 'public/img/subscribers/university-of-jerusalem.png'
import UCLA_Logo from 'public/img/subscribers/ucla.png'
import UMASS_Logo from 'public/img/subscribers/umass-medical-school.png'
import MGH_Logo from 'public/img/subscribers/mgh.png'
import WalterReedLogo from 'public/img/subscribers/walter-reed.png'
import CornellUinveristy_Logo from 'public/img/subscribers/cornell-university.png'
import { ArrowForward } from "@mui/icons-material"
import NextLink from 'next/link'
import Image from 'next/image'

const ConferencePage: NextPage = (props) => {
  const router = useRouter()
  const { data, loading } = useConferencePageQuery()
  const [emblaRefInsts] = useEmblaCarousel({
    dragFree: true
  })
  const [emblaRefArticles] = useEmblaCarousel({
    dragFree: true
  })
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const partners = [
    HarvardLogo,
    JohnHopkinsLogo,
    TheMethodistLogo,
    StanfordLogo,
    UniversityOfJerusalem,
    UCLA_Logo,
    UMASS_Logo,
    MGH_Logo,
    WalterReedLogo,
    CornellUinveristy_Logo
  ]

  if (!data || loading) return null

  return(
    <Layout>
      <Box bgcolor="white" px={2} py={4}>
        {/* Conference Title */}
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight={"bold"}
          textAlign={"center"}
          mb={1}
        >
          European Society of Coloproctology Conference
        </Typography>
        <Divider sx={{ backgroundColor: '#e45252', mb: 2 }} />
        {/* What is JOMI section */}
        <Box>
          <Typography
            variant="h5"
            component="h5"
            fontWeight={700}
            textAlign={"center"}
          >
            What is JOMI?
          </Typography>
          <Typography variant="body1" mt={2}>
            The Journal of Medical Insight (JOMI) publishes peer-reviewed
            videos with incision to closure instruction, key animations, and
            expert insight. Explore 220+ videos across 13+ specialities. View our full index
            <Link
              href={'/index'}
              passHref
              prefetch={false}
              legacyBehavior
            >
              <MuiLink
                className="index-link"
                title={`Article Index Page`}
                color="linkblue.main"
              >
                {` here`}
              </MuiLink>
            </Link>
            .
          </Typography>
          
        </Box>
        {/* Latest Publications */}
        {/* <Typography
          variant="h6"
          component="h6"
          mt={2}
        >
          Latest Publications:
        </Typography>
        <Container maxWidth="lg" sx={{ px: { sm: 2 } }} component="section">
        <Box mt={1} overflow="hidden" ref={emblaRef}>
          <Box display="flex" gap={2}>
            {data?.latestArticles.map((article) => (
              <Box
                key={article._id}
                flex={{ xs: '0 0 75%', sm: '0 0 25%' }}
                minWidth={0}
              >
                <ConfArticleCard article={article} />
              </Box>
            ))}
          </Box>
        </Box>
        </Container> */}
        <Divider sx={{ backgroundColor: '#e45252', mb: 2, mt: 3 }} />
        {/* Article Index Section */}
        <Typography
          variant="h5"
          component="h5"
          fontWeight={700}
          textAlign={"center"}
        >
          Colorectal and Anorectal Cases
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2, 
            flexDirection: isSmallDevice ? 'column' : 'row',
          }}
        >
          <CTAButton
            onClick={() => {
              router.push('/index#Colorectal')
            }}
          >
            All Colorectal Cases
          </CTAButton>
          <CTAButton
            sx={{
              ml: isSmallDevice ? 0 : 2,
              mt: isSmallDevice ? 1 : 0
            }}
            onClick={() => {
              router.push('/index#Anorectal')
            }}
          >
            All Anorectal Cases
          </CTAButton>
        </Box>
        <Typography
          variant="h6"
          component="h6"
          mt={2}
        >
          Featured Cases:
        </Typography>
        {data?.confSampleCases && <Box mt={1} overflow="hidden" ref={emblaRefArticles}>
          <Box display="flex" gap={2}>
            {data?.confSampleCases.map((article) => (
              <Box
                key={article._id}
                flex={{ xs: '0 0 75%', sm: '0 0 25%' }}
                minWidth={0}
              >
                <ConfArticleCard article={article} />
              </Box>
            ))}
          </Box>
        </Box>}
        <Divider sx={{ backgroundColor: '#e45252', mb: 2, mt: 3 }} />
        {/* How To Film Section */}
        {/* <Typography
          variant="h5"
          component="h5"
          fontWeight={700}
          textAlign={"center"}
          mb={2}
        >
          How to Film with Us
        </Typography>
        <VideoPlayer wistiaId={'s8tuh5o1e4'} videoLength={'30'}/>
        <Divider sx={{ backgroundColor: '#e45252', mb: 2, mt: 3 }} /> */}
        
        {/* About JOMI Section */}
        {/* <Typography
          variant="h5"
          component="h5"
          fontWeight={700}
          textAlign={"center"}
          mb={2}
        >
          About JOMI
        </Typography>
        <VideoPlayer wistiaId={'s8tuh5o1e4'} videoLength={'30'}/>
        <Divider sx={{ backgroundColor: '#e45252', mb: 2, mt: 3 }} /> */}
        
        {/* Subscribing Institutions Section */}
        <Typography
          variant="h5"
          component="h5"
          fontWeight={700}
          textAlign={"center"}
          mb={2}
        >
          Subscribing Institutions
        </Typography>
        <Box mt={2} overflow="hidden" ref={emblaRefInsts}>
          <Box display="flex" gap={{ xs: 4, md: 10 }}>
            {partners.map((school, i) => {
              return (
                <Box key={i} flex={{ xs: '0 0 40%', md: '0 0 15%' }} minWidth={0}>
                  <Box position="relative" paddingTop={{ xs: 4, sm: 10 }}>
                    <Image
                      src={school.src}
                      alt={school.src}
                      blurDataURL={school.blurDataURL}
                      fill
                      style={{
                        objectFit: 'contain',
                        filter: school.src === '/_next/static/media/cornell-university.bbe53418.png' ? 
                          'grayscale(1)' : 
                          'invert(100%) grayscale(1)'
                      }}
                      priority
                    />
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2, 
            flexDirection: isSmallDevice ? 'column' : 'row',
          }}
        >
          <CTAButton
            sx={{
              mt: 6,
              width: { xs: '100%', md: 'unset' },
            }}
            endIcon={<ArrowForward />}
            size="large"
            LinkComponent={NextLink}
            href="/subscribers"
          >
            View all Subscribers
          </CTAButton>
        </Box>
      </Box>
    </Layout>
  )
}

export default ConferencePage

export const getStaticProps: GetStaticProps = async () => {
  const client = getApolloAdminClient(true)
  await client.query<ConferencePageQuery>({
    query: ConferencePageDocument
  })
  return {
    props: {
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      // articles: data
    },
    revalidate: 3600 //refresh every hour.
  }
}