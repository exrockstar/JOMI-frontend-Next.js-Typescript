import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import RecentNewsImage from 'public/img/news/recent-news-image.png'
import WatchNowIcon from 'public/img/news/watch-now-icon.svg'
import Link from 'next/link'
import Heading from '../Heading'
import CTAButton from '../../common/CTAButton'
import { PlayArrow } from '@mui/icons-material'
import WatchNowButton from './WatchNowButton'
const RecentNewsSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 18, px: { sm: 2 } }} component="section">
      {/* <Heading>Recent News</Heading> */}

      <Grid container spacing={6} sx={{ mt: { xs: 0, md: 9 } }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="p"
            sx={{
              fontSize: { xs: '1rem', md: '2.5rem' },
              fontWeight: { xs: 600, md: 700 },
              color: { xs: 'text.secondary', md: 'text.primary' }
            }}
          >
            American College Of Surgeons Bulletin Brief
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2.5}>
            Dr. Steven Wexner, Vice-Chair of the ACS Board of Regents,
            interviews Dr. Keith Lillemoe, Chief of Surgery at Massachusetts
            General Hospital, and Dr. Tiffany Chao, former Editor-in-Chief of
            JOMI. Here, they discuss the high-value educational opportunities
            that JOMI provides to surgeons, residents, students, scrub techs,
            and nurses.
          </Typography>

          <Box display={{ xs: 'none', md: 'block' }} mt={4.25}>
            <Link
              rel="noopener nofollow"
              href="https://www.youtube.com/watch?v=43qP8dO9-MM&t=939s&ab_channel=AmericanCollegeofSurgeons"
              passHref
              legacyBehavior
            >
              <WatchNowButton disableRipple>Watch now</WatchNowButton>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box position="relative" width="100%" paddingTop="56.25%">
            <Image
              src={RecentNewsImage.src}
              fill
              alt="RecentNewsImage"
              blurDataURL={RecentNewsImage.blurDataURL}
            />
          </Box>
          <Box display={{ xs: 'block', md: 'none' }} mt={2}>
            <Link
              rel="noopener nofollow"
              href="https://www.youtube.com/watch?v=43qP8dO9-MM&t=939s&ab_channel=AmericanCollegeofSurgeons"
              passHref
              legacyBehavior
            >
              <WatchNowButton disableRipple>Watch now</WatchNowButton>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RecentNewsSection
