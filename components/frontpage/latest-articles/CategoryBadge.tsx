import { Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Category } from 'graphql/types'
import Link from 'next/link'
import React from 'react'
type Props = {
  category: Category
}

export const Badge = styled(Chip)<{ component?: any }>({
  color: '#fff',
  borderRadius: 3,
  border: '1px solid rgba(0,0,0,0)'
})

const CategoryBadge = ({ category }: Props) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      passHref
      key={category._id}
      prefetch={false}
      legacyBehavior
    >
      <Badge
        sx={{
          backgroundColor: category.color,
          ':hover': {
            backgroundColor: category.color,
            border: '1px solid white'
          },
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
          fontSize: '11px'
        }}
        size="small"
        label={category.displayName}
        component="a"
      />
    </Link>
  )
}

export default CategoryBadge
