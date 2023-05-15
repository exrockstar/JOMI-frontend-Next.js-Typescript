import { Box, Stack, Typography } from '@mui/material'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import OutlinedButton from './common/OutlinedButton'
import AccessBoxDivider from './common/AccessBoxDivider'
import CTAButton from 'components/common/CTAButton'

type Props = {
  data: ArticleAccessQuery
}
const RequiresLoginSection = ({ data }: Props) => {
  const { article } = data
  const access = article.articleAccessType
  return (
    <Box p={2}>
      <Typography fontWeight={700}>{access.institution_name}</Typography>
      <Typography variant="body2" color="grey.600">
        {access.institution_name} Medical Center is currently subscribed. Please
        log in to access the video-article
      </Typography>
    </Box>
  )
}
export default RequiresLoginSection
