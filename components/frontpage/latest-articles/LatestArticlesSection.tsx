import { ArrowForward } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import { useFrontPageQuery } from 'graphql/queries/frontpage.generated'
import Link from 'next/link'
import CTAButton from '../../common/CTAButton'
import Heading from '../Heading'
import ArticleCard from './ArticleCard'

const LatestArticlesSection = () => {
  const { data } = useFrontPageQuery()
  const articles = data?.latestArticles
  return (
    <Container maxWidth="lg" sx={{ px: { sm: 2 } }} component="section">
      <Heading mb={{ xs: 4, md: 5 }}>Latest Publications</Heading>
      <Grid container spacing={2}>
        {articles?.map((article) => (
          <Grid item key={article._id} xs={12} sm={6} lg={3}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
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
