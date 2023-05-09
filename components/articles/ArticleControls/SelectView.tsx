import { IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import LargeActive from 'public/img/filter/large-active.svg'
import MediumActive from 'public/img/filter/medium-active.svg'
import TinyActive from 'public/img/filter/tiny-active.svg'
import React from 'react'
import { useArticles, ViewType } from 'components/articles/useArticles'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
import { frontPageTheme } from 'components/theme'
const SelectView = () => {
  const views = ['large', 'medium', 'tiny'] as ViewType[]

  const router = useRouter()
  const query = router.query
  const view = (query.display as ViewType) ?? 'large'
  const getIcon = (value: ViewType) => {
    switch (value) {
      case 'large':
        return LargeActive
      case 'medium':
        return MediumActive
      case 'tiny':
      case 'small':
        return TinyActive
    }
  }

  const handleClick = (value: ViewType) => {
    router.push(
      {
        query: {
          ...router.query,
          display: value
        }
      },
      null,
      { shallow: true }
    )
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography
        variant="overline"
        color={frontPageTheme.palette.text.secondary}
        fontWeight="bold"
      >
        VIEW
      </Typography>
      {views.map((_view, index) => {
        const opacity = _view !== view ? 0.6 : null
        return (
          <IconButton
            size="small"
            key={_view}
            sx={{ opacity }}
            aria-label={`display-${view}`}
            onClick={(e) => {
              analytics.event('Click', `Articles Display - ${view}`)
              handleClick(_view)
            }}
          >
            <SvgIcon
              component={getIcon(_view)}
              viewBox="-2 -2 24 24"
              data-event={`Articles Display - ${view}`}
            />
          </IconButton>
        )
      })}
    </Stack>
  )
}

export default SelectView
