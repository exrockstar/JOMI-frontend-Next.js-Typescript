/* eslint-disable @next/next/no-html-link-for-pages */
import { Stack, Divider } from '@mui/material'
import React, { memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CategoryButton from './CategoryButton'
import { CategoriesQuery } from 'graphql/queries/categories.generated'
import { analytics } from 'apis/analytics'

type Props = {
  categories: CategoriesQuery['categories']
}
const CategorySidebar: React.FC<Props> = ({ categories }) => {
  const router = useRouter()

  return (
    <Stack px={2} pt={2.5}>
      <CategoryButton href="/index">Article Index</CategoryButton>
      <Divider
        sx={{ backgroundColor: 'rgba(255,255,255,.6)' }}
        component="div"
      />
      <Link href="/articles" passHref legacyBehavior>
        <CategoryButton
          active={router.pathname === '/articles'}
          sx={{ mt: 1 }}
          data-event="Articles List - Category All Articles"
          onClick={analytics.trackClick}
        >
          All Articles
        </CategoryButton>
      </Link>
      {categories.map((category) => {
        const url = `/index#${category.slug}`
        const title = `View ${category.displayName} Articles`
        return (
          <CategoryButton
            title={title}
            key={category._id}
            href={url}
            data-event={`Articles List - Category ${category.displayName}`}
            onClick={analytics.trackClick}
          >
            {category.displayName}
          </CategoryButton>
        )
      })}
    </Stack>
  )
}

export default memo(CategorySidebar)
