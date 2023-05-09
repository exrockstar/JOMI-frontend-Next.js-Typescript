import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Divider,
  Button
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Layout from 'components/layout'
import Link from 'next/link'
import Image from 'next/legacy/image'
import cheerio from 'cheerio'
import { GetServerSideProps, GetStaticProps } from 'next'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { BASE_URL } from 'common/constants'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { logger } from 'logger/logger'

import {
  InstitutionSubsQuery,
  InstitutionSubsQueryVariables,
  InstitutionSubsDocument
} from 'graphql/queries/institution-subs.generated'
import { analytics } from 'apis/analytics'
import {
  PageBySlugDocument,
  PageBySlugQuery,
  PageBySlugQueryVariables
} from 'graphql/queries/page-by-slug.generated'

type GroupedInstitutions = {
  [key: string]: any[]
}

type FeaturedInst = {
  url: string
  name: string
  imageUrl: string
}

type Props = {
  institutions: InstitutionSubsQuery['institution_subs']
  featured: FeaturedInst[]
} & DefaultPageProps
export default function SubscribersPage({
  institutions = [],
  featured
}: Props) {
  const sorted = [...institutions].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  const groupedInstitutions = sorted
    .filter((inst) => !!inst.category)
    .reduce((acc: GroupedInstitutions, institution) => {
      const category: string = institution.category ?? 'Other'

      if (acc[category]) {
        acc[category].push(institution)
      } else {
        acc[category] = [institution]
      }
      return acc
    }, {} as GroupedInstitutions)

  const allExceptSurgicalTech = Object.keys(groupedInstitutions).filter(
    (category) => category !== 'SurgTech'
  )
  const surgTech = groupedInstitutions['SurgTech']

  const getCategoryHeader = (category: string) => {
    switch (category) {
      case 'Residency':
        return 'Residencies'
      case 'Others':
        return 'Other'
      case 'PA Program':
        return 'Physician Assistant Programs'
      default:
        return category
    }
  }
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ backgroundColor: 'white' }}>
        <Grid container py={2} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" fontSize="2rem">
              Subscribing Institutions
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'stretch', md: 'flex-end' }}
            >
              <Link
                href="/account/request-subscription"
                passHref
                legacyBehavior
              >
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                  color="neutral"
                  data-event="Subscribers - Insitutional Subscription"
                  onClick={analytics.trackClick}
                >
                  Request an Institutional Subscription
                </Button>
              </Link>
              <Link href="/account/subscription" passHref legacyBehavior>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                  href="/account/subscription"
                  color="neutral"
                  data-event="Subscribers - Individual Subscription"
                  onClick={analytics.trackClick}
                >
                  Individual Subscription
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="body2" mt={2}>
          {`JOMI's goal is to contribute to improvement in quality of care and
          medical education through publishing high quality surgical videos. The
          following institutions share our commitment to excellence in medical
          instruction.`}
        </Typography>
        <Box my={2}>
          <Grid container>
            {featured?.map((institution, index) => {
              const imageUrl = `${BASE_URL}/api/files/${institution.imageUrl}/`

              const name = institution.name
              return (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <Link href={institution.url} passHref legacyBehavior>
                    <Stack
                      direction="column"
                      alignItems="stretch"
                      mx={0.5}
                      component="a"
                      sx={{ textDecoration: 'none' }}
                      rel="nofollow"
                    >
                      <Box
                        sx={{
                          backgroundColor: 'grey.A200',
                          ':hover': {
                            backgroundColor: '#e8e8e8'
                          }
                        }}
                        display="flex"
                        justifyContent="center"
                      >
                        <Box
                          position="relative"
                          height={150}
                          width="100%"
                          margin={2.5}
                        >
                          <Image
                            src={imageUrl}
                            layout="fill"
                            objectFit="contain"
                            alt={institution.name}
                            quality={100}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {name}
                      </Typography>
                    </Stack>
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              {allExceptSurgicalTech.map((category) => {
                const instSubs = groupedInstitutions[category]
                const categoryHeader = getCategoryHeader(category)

                return (
                  <Box key={category}>
                    <Typography variant="h5" color="text.primary" my={1}>
                      {categoryHeader}
                    </Typography>
                    <Box
                      sx={{
                        borderLeft: '1px solid #cecece',
                        pl: 2,
                        ml: 2,
                        py: 0.25
                      }}
                    >
                      {instSubs.map((inst) => {
                        return (
                          <Typography key={inst._id}>
                            {inst.displayName || inst.name}
                          </Typography>
                        )
                      })}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="h5" color="text.primary" my={1}>
                Surgical Technology Programs
              </Typography>
              <Box
                sx={{
                  borderLeft: '1px solid #cecece',
                  pl: 2,
                  ml: 2,
                  py: 0.25
                }}
              >
                {surgTech?.map((inst) => {
                  return (
                    <Typography key={inst._id}>
                      {inst.displayName || inst.name}
                    </Typography>
                  )
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  logger.info('Regenerating /subscribers')
  const client = getApolloAdminClient()
  const { data: institutionData } = await client.query<
    InstitutionSubsQuery,
    InstitutionSubsQueryVariables
  >({
    query: InstitutionSubsDocument,
    fetchPolicy: 'no-cache'
  })

  const { data } = await client.query<
    PageBySlugQuery,
    PageBySlugQueryVariables
  >({
    variables: {
      slug: 'subscribers'
    },
    query: PageBySlugDocument,
    fetchPolicy: 'no-cache'
  })

  const $ = cheerio.load(data.pageBySlug.content)
  const featured_insts = $('.orgs .col-sm-3')
    .map((i, elem) => {
      const url = $(elem).find('a').attr('href')
      const imageUrl = $(elem).find('img').attr('src')
      const name = $(elem).text()
      return {
        url,
        imageUrl,
        name
      }
    })
    .get() as FeaturedInst[]

  return {
    props: {
      institutions: institutionData?.institution_subs,
      featured: featured_insts,
      meta_data: buildGenericMetadata({
        title: 'Subscribing Institutions',
        meta_desc: `JOMI's goal is to contribute to improvement in quality of care and
          medical education through publishing high quality surgical videos. The
          following institutions share our commitment to excellence in medical
          instruction.`,
        slug: 'subscribers'
      })
    },
    revalidate: 3600
  }
}
