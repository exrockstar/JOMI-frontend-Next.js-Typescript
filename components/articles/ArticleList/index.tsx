import { Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme, defaultTheme } from 'components/theme'
import { memo, useMemo, useState } from 'react'
import { useArticles, ViewType } from 'components/articles/useArticles'
import ShowAuthors from '../ArticleControls/ShowAuthors'
import LargeArticleItem from './LargeArticleItem'
import MediumArticleItem from './MediumArticleItem'
import TinyArticleItem from './TinyArticleItem'
import { ArticlesQuery } from 'graphql/queries/articles.generated'
import { useRouter } from 'next/router'

type Articles = ArticlesQuery['articleOutput']['articles']
type Props = {
  articles: Articles
  totalCount: number
  itemsPerPage: number
}

function ArticleList({ articles, totalCount, itemsPerPage }: Props) {
  const router = useRouter()
  const query = router.query
  const view = (query.display as ViewType) ?? 'large'
  const [showAuthors, setShowAuthors] = useState(true)
  const itemsShown = Math.min(totalCount, itemsPerPage)
  const ArticleComponent = useMemo(() => {
    switch (view) {
      case 'large':
        return LargeArticleItem
      case 'medium':
        return MediumArticleItem
      case 'tiny':
      case 'small':
        return TinyArticleItem
    }
  }, [view])

  const renderArticles = useMemo(() => {
    return articles?.map((article, index) => {
      return (
        <li key={article._id}>
          <ArticleComponent
            {...article}
            showAuthors={showAuthors}
            priority={index < 3}
          />
        </li>
      )
    })
  }, [ArticleComponent, articles, showAuthors])

  const isViewTiny = view === 'tiny' || view === 'small'
  // const articleTheme = !isViewTiny ? frontPageTheme : defaultTheme
  const rowGap = !isViewTiny ? 1 : 0
  return (
    <>
      {isViewTiny && (
        <ShowAuthors
          checked={showAuthors}
          onChange={(e) => {
            setShowAuthors(e.target.checked)
          }}
          itemsShown={itemsShown}
        />
      )}
      <Stack
        direction="column"
        alignItems="stretch"
        rowGap={rowGap}
        component="ul"
        pl={0}
        sx={{
          listStyle: 'none'
        }}
      >
        {renderArticles}
      </Stack>
    </>
  )
}

export default memo(ArticleList)
