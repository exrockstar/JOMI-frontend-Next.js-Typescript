import {
  Box,
  Stack,
  Divider,
  Typography,
  Button,
  Link as MuiLink
} from '@mui/material'

import { BlueLink } from 'components/common/BlueLink'

import Link from 'next/link'
import React from 'react'
import FutureArticle from './FutureArticle'
import { groupBySubheading } from './groupBySubheading'
import { Article, ArticleIndexSection } from './types'

type Props = {
  section: ArticleIndexSection
  showComingSoon: boolean
  showAvailable: boolean
  showScore: boolean
}

const ArticleSection = ({
  section,
  showComingSoon,
  showAvailable,
  showScore
}: Props) => {
  const { articles, categoryId, categoryText, description } = section
  const filtered = articles.filter((article) => {
    if (showComingSoon && article.soon) return true
    if (showAvailable && !article.soon) return true
    if (showScore && article.score) return true

    return false
  })

  const groupedBySubheading = groupBySubheading(filtered)

  const hasScore = articles.find((article) => article.score)

  return (
    <Box key={categoryId}>
      <Typography component="h3" fontFamily="Arial, sans-serif">
        <Link href={'#toc'} passHref prefetch={false} legacyBehavior>
          <BlueLink fontSize={20} sx={{ mr: 1 }}>
            ↸
          </BlueLink>
        </Link>
        <Link href={`#`} passHref prefetch={false} legacyBehavior>
          <BlueLink
            underline="hover"
            sx={{ color: 'text.primary', fontSize: 24, position: 'relative' }}
          >
            <span
              id={categoryId}
              style={{ position: 'absolute', top: '-80px' }}
            ></span>
            {categoryText}
          </BlueLink>
        </Link>
      </Typography>

      <Divider sx={{ backgroundColor: '#e45252', mb: 1 }} />
      {description && <Typography py={2}>{description}</Typography>}

      {hasScore && (
        <>
          <Typography color="grey.300" variant="body2" component="span">
            score = part of SCORE curriculum for{' '}
            {section.categoryText.toLowerCase()}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </>
      )}

      <Stack>
        {Object.entries(groupedBySubheading).map((group, i) => {
          const [subheading, articles] = group
          const hasSubheading = subheading !== 'all'

          return (
            <Box key={i}>
              {hasSubheading && (
                <Typography component="h4" my={1} sx={{ color: '#000' }}>
                  <MuiLink
                    fontSize={18}
                    underline="hover"
                    fontStyle="italic"
                    href={`#${subheading}`}
                    sx={{ color: '#000' }}
                  >
                    {subheading}
                  </MuiLink>
                </Typography>
              )}
              <Stack>
                {articles.map((article, i) => {
                  return (
                    <div key={i}>
                      {article.soon ? (
                        <FutureArticle article={article} />
                      ) : (
                        <Stack direction="row">
                          <Box
                            display="flex"
                            sx={{
                              visibility: article.score ? 'visible' : 'hidden',
                              marginLeft: article.level !== 0 ? 6 : 0,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: 'grey.300' }}
                            >
                              score
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'grey.300' }}
                              mx={0.5}
                            >
                              |
                            </Typography>
                          </Box>
                          <Link
                            href={article.url}
                            passHref
                            prefetch={false}
                            legacyBehavior
                          >
                            <BlueLink variant="body2" href={article.url}>
                              {article.title}
                            </BlueLink>
                          </Link>
                        </Stack>
                      )}
                    </div>
                  )
                })}
              </Stack>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default ArticleSection
