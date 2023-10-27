/**
 * Goto jomi.com/cms/page-list and search for 'ESBC' to see the html content.
 */
import { Box, Link as MuiLink, useMediaQuery } from '@mui/material'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import CTAButton from 'components/common/CTAButton'
import ConfArticleCard from 'components/conference/ConfArticleCard'
import Layout from 'components/layout'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ConferencePageDocument,
  ConferencePageQuery,
  useConferencePageQuery
} from 'graphql/queries/conference.generated'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
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
import { ArrowForward } from '@mui/icons-material'
import NextLink from 'next/link'
import Image from 'next/image'
import {
  SiteWideAnnouncementsDocument,
  SiteWideAnnouncementsQuery
} from 'graphql/queries/announcement-for-user.generated'
import cheerio from 'cheerio'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import {
  PageBySlugDocument,
  PageBySlugQuery,
  PageBySlugQueryVariables
} from 'graphql/queries/page-by-slug.generated'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { transformContent } from 'components/conference/transformContentConfPage'
import Script from 'next/script'
import { logger } from 'logger/logger'

type Props = {
  introductionSection: string
  featuredCasesSection: string
  videosSection: string
  scripts: string[]
} & DefaultPageProps

const ESBCPage = ({
  videosSection,
  introductionSection,
  featuredCasesSection,
  scripts
}: Props) => {
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

  return (
    <Layout>
      {scripts?.map((script, index) => (
        <Script key={index} src={script} />
      ))}
      <Box sx={{ backgroundColor: 'white', wordBreak: 'break-word' }} p={2}>
        {/* Conference Title to Conference Cases area */}
        <div
          dangerouslySetInnerHTML={{ __html: introductionSection }}
          className="generated"
        />
        {/* Buttons that go to relevant articles in index page */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            my: 2,
            flexDirection: isSmallDevice ? 'column' : 'row'
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
        {/* Featured Cases text */}
        <div
          dangerouslySetInnerHTML={{ __html: featuredCasesSection }}
          className="generated"
        />
        {/* Article Carousel */}
        {data?.confSampleCases && (
          <Box mt={1} overflow="hidden" ref={emblaRefArticles}>
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
          </Box>
        )}
        {/* How to Film to Subscribing Institutions area */}
        <div
          dangerouslySetInnerHTML={{ __html: videosSection }}
          className="generated"
        />
        {/* Institution carousel and Subscribing Institutions button */}
        <Box mt={2} overflow="hidden" ref={emblaRefInsts}>
          <Box display="flex" gap={{ xs: 4, md: 10 }}>
            {partners.map((school, i) => {
              return (
                <Box
                  key={i}
                  flex={{ xs: '0 0 40%', md: '0 0 15%' }}
                  minWidth={0}
                >
                  <Box position="relative" paddingTop={{ xs: 4, sm: 10 }}>
                    <Image
                      src={school.src}
                      alt={school.src}
                      blurDataURL={school.blurDataURL}
                      fill
                      style={{
                        objectFit: 'contain',
                        filter:
                          school.src ===
                          '/_next/static/media/cornell-university.bbe53418.png'
                            ? 'grayscale(1)'
                            : 'invert(100%) grayscale(1)'
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
            flexDirection: isSmallDevice ? 'column' : 'row'
          }}
        >
          <CTAButton
            sx={{
              mt: 6,
              width: { xs: '100%', md: 'unset' }
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

export default ESBCPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  logger.info('Regenerating esbc page')
  try {
    const client = getApolloAdminClient()

    const { data } = await client.query<
      PageBySlugQuery,
      PageBySlugQueryVariables
    >({
      variables: { slug: 'esbc' },
      query: PageBySlugDocument,
      fetchPolicy: 'no-cache'
    })

    if (!data?.pageBySlug) {
      throw new Error('Page not found')
    }

    await client.query<ConferencePageQuery>({
      query: ConferencePageDocument
    })

    let scripts = []
    data?.pageBySlug?.scripts?.map((script) => {
      const src = getWordsBetween(script)
      src?.map((script) => {
        scripts.push(script)
      })
    })

    const $ = cheerio.load(data?.pageBySlug.content)
    $('a').each(function () {
      var href = $(this).attr('href')
      if (href?.startsWith('http')) {
        $(this).attr('rel', 'nofollow')
      }
    })

    const content = $('body').html()
    const { introductionSection, featuredCasesSection, videosSection } =
      transformContent(content)

    await client.resetStore()
    await client.query<SiteWideAnnouncementsQuery>({
      query: SiteWideAnnouncementsDocument
    })

    return {
      props: {
        _name: 'esbc',
        introductionSection,
        featuredCasesSection,
        videosSection,
        scripts,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
        meta_data: buildGenericMetadata(data?.pageBySlug ?? { title: 'Error' })
      },
      revalidate: 3600
    }
  } catch (e) {
    console.log('error in esbc page getStaticProps: ', e.message)
    return {
      props: {
        _name: 'esbc',
        introductionSection: '',
        featuredCasesSection: '',
        videosSection: '',
        scripts: [],
        meta_data: {}
      }
    }
  }
}

function getWordsBetween(str) {
  let results = [],
    re = /"([^"]+)"/g,
    text

  while ((text = re.exec(str))) {
    results.push(text[1])
  }
  return results
}
