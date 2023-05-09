import React, { memo, useMemo } from 'react'
import usePagination from '@mui/material/usePagination'
import { useArticles } from 'components/articles/useArticles'
import { Typography, Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
import Link from 'next/link'
import { frontPageTheme } from 'components/theme'

type Props = {
  totalCount: number
  itemsPerPage: number
}

function Pagination(props: Props) {
  const { totalCount, itemsPerPage } = props
  // const { totalCount, itemsPerPage, setPage, currentPage } = useArticles()
  const router = useRouter()

  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1

  const handlePageChange = (e: React.MouseEvent<HTMLElement>, page: number) => {
    analytics.trackClick(e)
  }

  const { items } = usePagination({
    count: Math.ceil(totalCount / itemsPerPage),
    page: currentPage,
    siblingCount: 3,
    onChange: handlePageChange
  })

  const renderedItems = useMemo(() => {
    return items.map(({ page, type, selected, ...item }, index) => {
      let children = null

      if (type === 'start-ellipsis' || type === 'end-ellipsis') {
        children = (
          <Typography color={frontPageTheme.palette.text.secondary}>
            ...
          </Typography>
        )
      } else if (type === 'page') {
        children = (
          <Link
            href={{ query: { ...router.query, page: page } }}
            passHref
            prefetch={false}
            legacyBehavior
          >
            <PageLink
              sx={{
                textDecoration: selected ? 'underline' : undefined,
                px: 0.75
              }}
              {...item}
              data-event={`Articles Pagination - Page ${page}`}
            >
              {page}
            </PageLink>
          </Link>
        )
      } else {
        children = !item.disabled && (
          <Link
            href={{ query: { ...router.query, page: page } }}
            passHref
            prefetch={false}
            legacyBehavior
          >
            <PageLink
              {...item}
              sx={{ textTransform: 'capitalize' }}
              data-event={`Articles Pagination - Back / Next`}
            >
              {type === 'previous' && <ArrowBackIos sx={{ fontSize: 14 }} />}
              {type}
              {type === 'next' && <ArrowForwardIos sx={{ fontSize: 14 }} />}
            </PageLink>
          </Link>
        )
      }

      return <li key={index}>{children}</li>
    })
  }, [items, router.query])
  if (totalCount < itemsPerPage) return null
  return <List>{renderedItems}</List>
}

export default memo(Pagination)

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center'
})

const PageLink = styled(MuiLink)({
  color: '#ccc',
  fontSize: 14,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
})
