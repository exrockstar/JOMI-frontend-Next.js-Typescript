import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import Heading from '../Heading'
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
import Image from 'next/image'
import NextLink from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowForward } from '@mui/icons-material'
import CTAButtonOutlined from '../CTAButtonOutlined'
const SubscribingInstitutionsSection = () => {
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
  const [emblaRef] = useEmblaCarousel({
    dragFree: true
  })
  return (
    <Container maxWidth="lg" sx={{ mt: 12, px: { sm: 2 } }} component="section">
      <Heading>Subscribing Institutions</Heading>
      <Box mt={3} overflow="hidden" ref={emblaRef}>
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
                      filter: 'grayscale(1) opacity(50%)'
                    }}
                    priority
                  />
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
      <CTAButtonOutlined
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
      </CTAButtonOutlined>
    </Container>
  )
}

export default SubscribingInstitutionsSection
