import { Box, Card, Container, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import QouteStartSvg from 'public/img/quote-start.svg'
import QouteEndSvg from 'public/img/quote-end.svg'
import Heading from '../Heading'
const TestimonialSection = () => {
  const lillemoeQuote = `The future is in video journals, and JOMI will be at the head of
  the line showing how to do it.`
  return (
    <Container maxWidth="lg" sx={{ px: { sm: 2 } }} component="section">
      <Heading>Spotlight</Heading>
      <Grid container spacing={{ xs: 2, md: 5 }}>
        <Grid item md={7}>
          <Card
            sx={{
              px: { xs: 2, md: 8 },
              py: { xs: 2, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              minHeight: { md: 280 }
            }}
            elevation={0}
          >
            <Box sx={{marginBottom: 4.5}}>
              <QouteStartSvg />
            </Box>
            <Typography
              fontSize={{ md: '1.5rem', xs: '1.25rem' }}
              lineHeight={1.375}
              fontWeight={700}
            >
              {lillemoeQuote}
            </Typography>
            <Box sx={{marginTop: 4.5}} style={{alignSelf: 'flex-end'}}>
              <QouteEndSvg />
            </Box>
          </Card>
        </Grid>
        <Grid item md={5} xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'row', md: 'column' }}
            alignItems={'flex-start'}
            height="100%"
            gap={{ xs: 2, md: 0 }}
          >
            <Box flexShrink={0} height={96} mt={1}>
              <Image
                src="/img/dr-lillemoe.png"
                width={96}
                height={96}
                alt="Keith Lillemoe MD, FACS"
                style={{
                  borderRadius: 4,
                  overflow: 'hidden'
                }}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography
                variant="h2"
                component="p"
                mt={{ xs: 0, md: 2.5 }}
                mb={{ xs: 1, md: 2.5 }}
                fontSize={{ xs: '1.125rem', md: '2.5rem' }}
              >
                Keith Lillemoe{' '}
                <StyledBr
                  sx={{ display: { md: 'inline-block', xs: 'none' } }}
                />{' '}
                MD, FACS
              </Typography>
              <Typography color="text.secondary" variant={'body2'}>
                Chief of Surgery, Massachusetts General Hospital
                <br /> Section Editor, JOMI
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TestimonialSection

const StyledBr = styled('br')({})
