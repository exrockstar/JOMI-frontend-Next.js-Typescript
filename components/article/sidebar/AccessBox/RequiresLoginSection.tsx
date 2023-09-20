import { Box, Typography } from '@mui/material'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  data: ArticleAccessQuery
}
const RequiresLoginSection = ({ data }: Props) => {
  const { article } = data
  const access = article.articleAccessType
  const institution_name =
    access?.customInstitutionName ?? access?.institution_name
  return (
    <Box p={2}>
      <Typography fontWeight={700}>{institution_name}</Typography>
      <Typography variant="body2" color="grey.600">
        {institution_name} is currently subscribed. Please log in to access the
        video-article
      </Typography>
    </Box>
  )
}
export default RequiresLoginSection
