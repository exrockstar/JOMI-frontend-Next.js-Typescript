import { Stack, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CategoriesQuery } from 'graphql/queries/categories.generated'
import React, { memo } from 'react'

type Props = {
  category: Unpacked<CategoriesQuery['categories']>
}
function CategoryHeader({ category }: Props) {
  if (!category) return null
  return (
    <Wrapper direction="column" pb={2}>
      <Stack direction="row" alignItems="center" p={2}>
        <CategoryLogo bgcolor={category.color} mr={2}>
          {category.short}
        </CategoryLogo>
        <Typography
          color="textSecondary"
          variant="h4"
          fontSize="1.5rem"
          component="h1"
        >
          JOMI {category.displayName}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="textSecondary"
        mt={1}
        ml={{ xs: 2, lg: 10 }}
        mr={{ xs: 2, lg: 0 }}
        maxWidth={{ xs: '100%', lg: '70%' }}
      >
        {category.desc}
      </Typography>
    </Wrapper>
  )
}

export default memo(CategoryHeader)

const Wrapper = styled(Stack)({
  borderBottom: '1px dashed rgba(255,255,255,.4)',
  marginBottom: 32
})

const CategoryLogo = styled(Box)({
  width: 48,
  height: 48,
  color: 'white',
  borderRadius: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 21
})
