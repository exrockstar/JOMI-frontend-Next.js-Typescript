import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useArticles } from 'components/articles/useArticles'
import { Article } from './types'
import { slugify } from 'components/utils/helpers'
import { BlueLink } from 'components/common/BlueLink'
import { analytics } from 'apis/analytics'
const TinyArticleItem = (
  props: Article & { showAuthors: boolean; priority: boolean }
) => {
  const showAuthors = props.showAuthors
  const articleUrl = `/article/${props.publication_id}/${props.slug}`
  return (
    <Wrapper>
      <Link href={articleUrl} passHref legacyBehavior>
        <BlackLink
          variant="body2"
          flex={1}
          onClick={analytics.trackClick}
          data-event="Tiny Articles - Article Title Link"
        >
          {props.title}
        </BlackLink>
      </Link>
      {showAuthors && (
        <Box lineHeight={'1.2'}>
          {props.authors?.map((author) => {
            const name = `${author.display_name}`
            const authorUrl = `/author/${
              author.slug ?? slugify(author.display_name)
            }`
            return (
              <>
                <Link
                  key={author._id}
                  href={authorUrl}
                  passHref
                  prefetch={false}
                  legacyBehavior
                >
                  <BlackLink
                    variant="caption"
                    fontSize={11}
                    onClick={analytics.trackClick}
                    data-event="Tiny Articles - Author Link"
                    display={'inline-block'}
                  >
                    {name}
                  </BlackLink>
                </Link>
                &nbsp;
              </>
            )
          })}
        </Box>
      )}
      {showAuthors && (
        <Typography
          color="#000"
          variant="caption"
          fontSize={11}
          fontStyle={'italic'}
          lineHeight={'1.2'}
        >
          {props.hospital.name}
        </Typography>
      )}
    </Wrapper>
  )
}

export default TinyArticleItem

const Wrapper = styled(Stack)({
  color: 'black',
  cursor: 'pointer',
  backgroundColor: '#f5f5f5',
  padding: '8px',
  ':hover': {
    backgroundColor: 'grey.A200'
  }
})

const BlackLink = styled(BlueLink)({
  color: '#000',
  lineHeight: 1
})
