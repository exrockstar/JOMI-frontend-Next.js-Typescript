import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import StyledSelect from './StyledSelect'
import { ArticleSort } from 'graphql/types'
import { frontPageTheme } from 'components/theme'

const SortControl = () => {
  const router = useRouter()
  const query = router.query
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as ArticleSort

    router.push({
      query: {
        ...query,
        sort_by: value
      }
    })
  }
  const sort = (query.sort_by as ArticleSort) ?? ArticleSort.None
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography
        variant="overline"
        color={frontPageTheme.palette.text.secondary}
        fontWeight="bold"
      >
        SORT
      </Typography>
      <StyledSelect value={sort} onChange={handleChange}>
        <option value="">Most Relevant</option>
        <option value="published">Publish Date</option>
        <option value="preprint_date">Release Date</option>
      </StyledSelect>
    </Stack>
  )
}

export default SortControl
