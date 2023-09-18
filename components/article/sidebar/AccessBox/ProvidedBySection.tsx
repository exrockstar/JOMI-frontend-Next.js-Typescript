import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
type Props = {
  data: ArticleAccessQuery
}
const ProvidedBySection = ({ data }: Props) => {
  const { article } = data
  const access = article.articleAccessType
  const expiry = access.subscriptionExpiresAt
    ? dayjs(access.subscriptionExpiresAt).format('MM/DD/YYYY')
    : ''
  const institutionName =
    access?.customInstitutionName ?? access?.institution_name
  return (
    <>
      <Stack
        px={2}
        py={2}
        alignItems="flex-start"
        alignSelf="flex-start"
        fontFamily="Manrope"
      >
        <Typography variant="body1" fontWeight={600} color="grey.900">
          Provided by:
        </Typography>
        <Typography
          variant="body2"
          fontWeight={400}
          color="grey.600"
          fontFamily="Manrope"
        >
          {institutionName}
        </Typography>
        {access.viaTemporaryIp && access.expiry && (
          <Typography variant="body2" color="textSecondary">
            Off-site access until:{' '}
            {dayjs(access.expiry).format('MMMM DD, YYYY')}
          </Typography>
        )}
      </Stack>
      {access.isTrial && (
        <Stack px={2} pb={1} alignItems="flex-start" alignSelf="flex-start">
          <Typography variant="body2" fontFamily="Manrope" color="grey.600">
            Trial access will expire on:{' '}
            <Typography
              fontFamily="Manrope"
              variant="body1"
              component="span"
              fontWeight={700}
            >
              {expiry}
            </Typography>
          </Typography>
        </Stack>
      )}
    </>
  )
}
export default ProvidedBySection
