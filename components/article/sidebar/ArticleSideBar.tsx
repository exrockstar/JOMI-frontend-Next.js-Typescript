import { Box, Hidden, Tooltip } from '@mui/material'
import ShareSection from './ShareSection'
import InfoSection from './InfoSection'
import AuthorSection from './AuthorSection'
import HospitalSection from './HospitalSection'
import ArticleAccessBox from './ArticleAccessBox'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import LanguageSwitcher from '../LanguageSwitcher'
import { memo, useRef } from 'react'

type Article = ArticlesBySlugQuery['articleBySlug']
type ArticleSideBarProps = {
  article: Article
}

function ArticleSideBar({ article }: ArticleSideBarProps) {
  const myRef = useRef()

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box ref={myRef}>
        <ArticleAccessBox article={article} />

        <Hidden smDown>
          <LanguageSwitcher enabledLanguages={article.enabled_languages} />
        </Hidden>
        <Box
          display="flex"
          sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'column'
          }}
          component="aside"
        >
          <ShareSection
            publicationId={article?.publication_id}
            slug={article?.slug}
          />
          <AuthorSection authors={article?.authors} />

          <HospitalSection hospitalName={article?.hospital?.name} />

          <InfoSection
            published={article?.published?.split('T')[0]}
            publicationId={article?.publication_id}
            productionId={article?.production_id}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(ArticleSideBar)
