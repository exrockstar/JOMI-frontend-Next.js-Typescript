import {
  Box,
  Container,
  Grid,
  Hidden,
  SvgIcon,
  Typography
} from '@mui/material'

import Image from 'next/image'
import FooterImage from 'public/img/footer-phone.png'
import FooterLink from './FooterLink'
import { Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import FacebookIcon from 'public/icons/facebook-icon.svg'
import SocialLink from './SocialLink'
import Link from 'next/link'
import LogoWhite from 'public/logo-white.svg'
const Footer2 = () => {
  return (
    <Box
      bgcolor={{ xs: '#0E0E10', md: 'background.paper' }}
      color="text.primary"
      mt={15}
    >
      <Container maxWidth="lg" disableGutters component="footer">
        <Box position="relative" paddingLeft={{ md: '380px' }} display="flex">
          <Box
            sx={{
              position: 'absolute',
              left: -43,
              bottom: 0,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Image
              src={FooterImage.src}
              width={FooterImage.width}
              height={FooterImage.height}
              alt="footer phone "
              style={{ bottom: 0, position: 'absolute' }}
            />
          </Box>
          <Grid
            container
            flexGrow={1}
            justifyContent="space-between"
            mt={{ xs: 4, md: 6 }}
            mb={6}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Box
                display="flex"
                flexDirection={'column'}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                mb={{ xs: 2, md: 0 }}
              >
                <Hidden mdDown>
                  <Typography
                    variant="h5"
                    component="h2"
                    fontFamily={'DM Sans'}
                    mb={2.25}
                  >
                    JOMI
                  </Typography>
                </Hidden>
                <Hidden mdUp>
                  <Link href="/" passHref>
                    <LogoWhite />
                  </Link>
                </Hidden>
                <Typography
                  fontFamily={'DM Sans'}
                  mb={2}
                  color={{ xs: 'text.primary', md: 'grey.500' }}
                >
                  ISSN:
                  <FooterLink
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    data-event={'Footer - ISSN'}
                    href="https://portal.issn.org/resource/ISSN/2373-6003"
                    linkProps={{
                      sx: {
                        color: 'inherit'
                      }
                    }}
                  >
                    2373-6003
                  </FooterLink>
                </Typography>
              </Box>
              <Hidden mdDown>
                <Typography
                  fontFamily={'DM Sans'}
                  color="grey.500"
                  variant="body2"
                >
                  Copyright © 2021 JOMI LLC.
                </Typography>
                <Typography
                  fontFamily={'DM Sans'}
                  color="grey.500"
                  variant="body2"
                >
                  All rights reserved.
                </Typography>
              </Hidden>
            </Grid>
            <Grid
              item
              display="flex"
              gap={{ xs: 0.75, md: 2 }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              flexDirection={'column'}
              xs={6}
              lg={3}
              sx={{
                borderWidth: { xs: '0.5px 0.5px 0.5px 0px', md: 0 },
                borderStyle: 'solid',
                borderColor: 'grey.800'
              }}
              py={{ xs: 2.5, md: 0 }}
            >
              {/* <Typography
                variant="h5"
                component="h4"
                fontFamily={'DM Sans'}
                mb={0.25}
                display={{ xs: 'none', md: 'block' }}
              >
                Company
              </Typography> */}
              <FooterLink data-event="Footer - About" href="/about">
                About JOMI
              </FooterLink>
              <FooterLink data-event="Footer - Article Index" href="/index">
                Article Index
              </FooterLink>
              <FooterLink data-event="Footer - Publish" href="/publish">
                Publish
              </FooterLink>
              <FooterLink
                data-event="Footer - Editorial Board"
                href="/editorial-board"
              >
                Editorial Board
              </FooterLink>
              <FooterLink data-event="Footer - FAQ" href="/faq">
                FAQ
              </FooterLink>
            </Grid>
            <Grid
              item
              display="flex"
              gap={{ xs: 0.75, md: 2 }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              xs={6}
              lg={3}
              py={{ xs: 2.5, md: 0 }}
              sx={{
                borderWidth: { xs: '0.5px 0px', md: 0 },
                borderStyle: 'solid',
                borderColor: { xs: 'grey.800', md: 'transparent' },
                flexDirection: 'column'
              }}
            >
              {/* <Typography
                variant="h5"
                component="h4"
                fontFamily={'DM Sans'}
                mb={0.25}
                display={{ xs: 'none', md: 'block' }}
              >
                Newsletter
              </Typography> */}
              <FooterLink
                href="https://blog.jomi.com"
                data-event="Footer - Blog"
                target={'_blank'}
                rel=""
              >
                JOMI Blog
              </FooterLink>
              <FooterLink
                href="https://jomi.us7.list-manage.com/subscribe?u=ff1ad1d783cea4c924eb266ca&id=6faff1126d"
                data-event="Footer - Newsletter"
                target={'_blank'}
                rel={'noreferrer noopener nofollow'}
              >
                Newsletter
              </FooterLink>
              <FooterLink data-event="Footer - Careers" href="/careers">
                Careers
              </FooterLink>
              <FooterLink
                data-event="Footer - Partners/Sponsors"
                href="/partners"
              >
                Partners/Sponsors
              </FooterLink>
              <FooterLink data-event="Footer - Contact Us" href="/contact">
                Contact Us
              </FooterLink>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Box
                display="flex"
                flexDirection={'column'}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                mt={{ xs: 4, md: 2, lg: 0 }}
              >
                <Typography
                  variant="h5"
                  component="p"
                  fontFamily={'DM Sans'}
                  mb={2}
                >
                  Connect with us
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'row', md: 'column' }}
                  flexWrap={'wrap'}
                  justifyContent={'center'}
                  px={2}
                  gap={2}
                >
                  <SocialLink href="https://instagram.com/jomijournal">
                    <Instagram />
                    <Typography component="span" color="inherit">
                      Instagram
                    </Typography>
                  </SocialLink>
                  <SocialLink href="https://www.facebook.com/JoMIJournal/">
                    <SvgIcon component={FacebookIcon} inheritViewBox />
                    <Typography component="span" color="inherit">
                      Facebook
                    </Typography>
                  </SocialLink>
                  <SocialLink href="https://twitter.com/JoMIJournal">
                    <Twitter />
                    <Typography component="span" color="inherit">
                      Twitter
                    </Typography>
                  </SocialLink>
                  <SocialLink href="https://www.linkedin.com/company/jomijournal/">
                    <LinkedIn />
                    <Typography component="span" color="inherit">
                      LinkedIn
                    </Typography>
                  </SocialLink>
                </Box>
                <FooterLink
                  data-event="Footer - Contact Us"
                  href="mailto:contact@jomi.com"
                  linkProps={{ my: 2 }}
                  target="_blank"
                >
                  contact@jomi.com
                </FooterLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer2
