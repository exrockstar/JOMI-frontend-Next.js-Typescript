import { Box, Chip, Divider, Hidden, Stack, Typography } from '@mui/material'
import { HiddenHeader } from 'components/common/HiddenHeader'

import React, { memo } from 'react'
import Pagination from './Pagination'
import SelectView from './SelectView'
import SortControl from './SortControl'

type Props = {
  totalCount: number
  itemsPerPage: number
}
function ArticleControls(props: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      rowGap={1}
      pt={{ xs: 2, md: 0 }}
      px={{ xs: 2, md: 0 }}
      mb={2}
      component="section"
    >
      <HiddenHeader component="h2">Controls</HiddenHeader>
      <CountChip totalCount={props.totalCount} />
      <Stack direction="row" spacing={2} alignItems="center">
        <SelectView />
        <Divider orientation="vertical" sx={{ height: 28 }} component="div" />
        <SortControl />
      </Stack>
      <Hidden smDown>
        <Box flex={1}></Box>
      </Hidden>
      <Box>
        <Pagination totalCount={props.totalCount} itemsPerPage={props.itemsPerPage} />
      </Box>
    </Stack>
  )
}

type CountChipProps = {
  totalCount: number
}

function CountChip({ totalCount = 0 }: CountChipProps) {
  const articlesText = totalCount > 1 ? 'articles' : 'article'
  return (
    <Chip
      label={`${totalCount} ${articlesText} found`}
      variant="filled"
      size="small"
      sx={{
        backgroundColor: 'rgba(255,255,255,.15)',
        borderRadius: 0.75,
        py: 1.5,
        fontSize: 14,
        height: 28,
        mr: 2,
        color: 'white'
      }}
    />
  )
}

export default memo(ArticleControls)
