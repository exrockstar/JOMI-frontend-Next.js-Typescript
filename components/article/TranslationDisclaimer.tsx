import { Alert, Box, IconButton } from '@mui/material'
import { BlueLink } from 'components/common/BlueLink'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { Close } from '@mui/icons-material'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const TranslationDisclaimer = ({ article }: Props) => {
  const router = useRouter()
  const [shown, setShown] = useState(true)
  const params = router.query.slug
  const arrayParams = Array.isArray(params) ? params : [params]
  const enabled_languages = article.enabled_languages?.map((l) =>
    l.toLowerCase()
  )
  const isTranslated = arrayParams.find((p) => enabled_languages?.includes(p))

  if (!isTranslated || !shown) return null
  return (
    <Box mt={1} mx={{ xs: 1, lg: 0 }}>
      <Alert
        severity="warning"
        action={
          <IconButton onClick={() => setShown(false)}>
            <Close />
          </IconButton>
        }
        sx={{ alignItems: 'center' }}
      >
        DISCLAIMER: This is an automated translation. For the original English
        version, please click{' '}
        <Link
          href={`/article/${article.publication_id}/${article.slug}`}
          passHref
          prefetch={false}
          legacyBehavior
        >
          <BlueLink>here.</BlueLink>
        </Link>
      </Alert>
    </Box>
  )
}

export default TranslationDisclaimer
