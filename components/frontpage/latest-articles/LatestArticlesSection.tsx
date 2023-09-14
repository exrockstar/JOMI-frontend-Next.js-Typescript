import { ArrowForward } from '@mui/icons-material'
import { Box, Container, Grid } from '@mui/material'
import {
  FrontPageQuery,
  useFrontPageQuery
} from 'graphql/queries/frontpage.generated'
import Link from 'next/link'
import CTAButton from '../../common/CTAButton'
import Heading from '../Heading'
import ArticleCard from './ArticleCard'
import useEmblaCarousel from 'embla-carousel-react'

type Props = {
  latestArticles: FrontPageQuery['latestArticles']
}
const LatestArticlesSection = (props: Props) => {
  const articles = props.latestArticles
  const [emblaRef] = useEmblaCarousel({
    dragFree: true
  })
  return (
    <Container maxWidth="lg" sx={{ px: { sm: 2 } }} component="section">
      <Heading mb={{ xs: 4, md: 5 }}>Latest Publications</Heading>
      <Box mt={3} overflow="hidden" ref={emblaRef}>
        <Box display="flex" gap={2}>
          {articles?.map((article) => (
            <Box
              key={article._id}
              flex={{ xs: '0 0 75%', sm: '0 0 25%' }}
              minWidth={0}
            >
              <ArticleCard article={article} />
            </Box>
          ))}
        </Box>
      </Box>
      <CTAButton
        variant="contained"
        color="primary"
        LinkComponent={Link}
        href="/articles"
        size="large"
        endIcon={<ArrowForward />}
        sx={{ mt: 6, width: { xs: '100%', md: 'unset' } }}
      >
        View New Articles
      </CTAButton>
    </Container>
  )
}

export default LatestArticlesSection
