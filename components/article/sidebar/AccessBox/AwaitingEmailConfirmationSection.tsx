import { Box, Typography } from '@mui/material'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  data: ArticleAccessQuery
}
const AwaitingEmailConfirmationSection = ({ data }: Props) => {
  const { article } = data
  const access = article.articleAccessType
  const institution_name =
    access?.customInstitutionName ?? access?.institution_name
  return (
    <Box p={2}>
      <Typography variant="body2" mb={1} fontWeight={700} color="grey.900">
        {`Your institution ${institution_name} has an active subscription. `}
      </Typography>
      <Typography
        variant="body2"
        fontSize={13}
        fontWeight={500}
        mb={2}
        color="grey.600"
      >
        {`Please check your email inbox and confirm your email to watch the article-video.`}
      </Typography>
    </Box>
  )
}
export default AwaitingEmailConfirmationSection
