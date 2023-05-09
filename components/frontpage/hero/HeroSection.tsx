import { Box, Container, Typography, IconButton, Grid } from '@mui/material'
import TwoColumnLayout from 'components/common/layouts/TwoColumn'
import Image from 'next/image'
import Link from 'next/link'
import HeadingDivider from '../HeadingDivider'
import { ArrowForward, NorthEast } from '@mui/icons-material'
import CTAButton from '../../common/CTAButton'
import HarvardLogo from 'public/img/harvard-logo.png'
import JohnHopkinsLogo from 'public/img/john-hopkins-logo.png'
import TheMethodistLogo from 'public/img/the-methodist-logo.png'
import StanfordLogo from 'public/img/stanford-logo.png'
import CTAButtonOutlined from '../CTAButtonOutlined'

import { useSession } from 'next-auth/react'
const partners = [HarvardLogo, JohnHopkinsLogo, TheMethodistLogo, StanfordLogo]
const HeroSection = () => {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  return (
    <Box position="relative" bgcolor="transparent">
      <Container maxWidth="lg" sx={{ px: { sm: 2 } }} component="section">
        <Box zIndex={1100}>
          <TwoColumnLayout left={7} right={5}>
            <Box zIndex={1} overflow={'visible'} position="relative">
              <Typography
                variant="h1"
                component="h1"
                fontWeight={700}
                mb={2.5}
                mt={{ xs: 4, md: 9.5 }}
              >
                Surgical Video Articles for Attendings, Residents, and Medical
                Students
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The Journal of Medical Insight publishes full-length,
                incision-to-closure surgical videos with live narration from the
                operating room. Articles are peer-reviewed and include a full
                text component, animation, and more.
              </Typography>
              <Box
                display="flex"
                gap={2}
                mt={5}
                width={{ xs: '100%', md: 'unset' }}
              >
                <Link href="/index" passHref legacyBehavior>
                  <CTAButton
                    variant="contained"
                    sx={{ flexGrow: { xs: 1, md: 0 } }}
                  >
                    View Articles
                  </CTAButton>
                </Link>
                {!isLoggedIn && (
                  <Link href="/signup" passHref legacyBehavior>
                    <CTAButtonOutlined
                      sx={{
                        flexGrow: { xs: 1, md: 0 }
                      }}
                    >
                      Get Started
                    </CTAButtonOutlined>
                  </Link>
                )}
              </Box>
              {/* <Box display={{ xs: 'none', md: 'flex' }} gap={2} mt={3.5}>
                <Link href="/index#general-surgery" legacyBehavior passHref>
                  <CategoryLink>General Surgery</CategoryLink>
                </Link>
                <Link href="/index#neurosurgery" legacyBehavior passHref>
                  <CategoryLink>Neurosurgery</CategoryLink>
                </Link>
                <Link href="/index#urology" legacyBehavior passHref>
                  <CategoryLink>Urology</CategoryLink>
                </Link>
                <Link href="/index#global-surgery" legacyBehavior passHref>
                  <CategoryLink>Global Surgery</CategoryLink>
                </Link>
              </Box> */}
              <Box mt={5.25}>
                <Box
                  display={{ md: 'flex', xs: 'none' }}
                  gap={2}
                  alignItems="center"
                >
                  <Typography color="text.secondary">Trusted By</Typography>
                  <HeadingDivider />
                </Box>

                <Typography color="text.secondary" display={{ sm: 'none' }}>
                  JOMI is used at prestigious medical schools and hospitals
                  around the world:
                </Typography>

                <Box display={'flex'} gap={2} mt={3} alignItems={'center'}>
                  <Grid container item flexGrow={1} spacing={2}>
                    {partners.map((school, i) => {
                      return (
                        <Grid item key={i} xs={3}>
                          <Box position="relative" paddingTop={'25%'}>
                            <Image
                              src={school.src}
                              alt={school.src}
                              blurDataURL={school.blurDataURL}
                              fill
                              style={{ objectFit: 'contain' }}
                              priority
                            />
                          </Box>
                        </Grid>
                      )
                    })}
                  </Grid>
                  <Link href="/subscribers" passHref legacyBehavior>
                    <IconButton
                      title="View all"
                      sx={{
                        borderColor: 'grey.100',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        display: { xs: 'none', md: 'inline-flex' },
                        ':hover': {
                          backgroundColor: 'common.white',
                          color: 'primary.main'
                        }
                      }}
                    >
                      <NorthEast />
                    </IconButton>
                  </Link>
                </Box>
                <Link href="/subscribers" passHref legacyBehavior>
                  <CTAButtonOutlined
                    sx={{
                      mt: 3,
                      width: { xs: '100%', md: 'unset' },
                      display: { md: 'none' }
                    }}
                    endIcon={<ArrowForward />}
                  >
                    {' '}
                    View all Subscribers
                  </CTAButtonOutlined>
                </Link>
              </Box>
            </Box>
          </TwoColumnLayout>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
