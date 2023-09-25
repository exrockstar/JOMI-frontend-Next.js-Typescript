import { Box, Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { BlueLink } from 'components/common/BlueLink'
import { ArticleIndexSection } from './types'

type Props = {
  sections: ArticleIndexSection[]
}
const TableOfContents = ({ sections }: Props) => {
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <nav>
      <Typography
        component="h2"
        variant="h5"
        my={1}
        sx={{ position: 'relative' }}
      >
        Specialties:
        <span
          id="toc"
          style={{ visibility: 'hidden', top: -100, position: 'absolute' }}
        ></span>
      </Typography>
      <Grid container sx={{ my: 2, maxHeight: isSmallDevice ? 1000 : 200 }} 
        direction={'column'}
      >
        {sections.map((section) => {
          return (
            <Grid
              item
              key={section.categoryId}
              // xs={6}
              // md={4}
              // lg={3}
              pr={2}
              pb={0.5}
            >
              <TocItem p={1}>
                <BlueLink
                  href={`#${section.categoryId}`}
                  sx={{
                    color: '#0094FF',
                    ':hover': {
                      color: '#0094FF'
                    },
                    mr: 2
                  }}
                >
                  {section.categoryText}
                </BlueLink>
              </TocItem>
            </Grid>
          )
        })}
      </Grid>
    </nav>
  )
}

export default TableOfContents

const TocItem = styled(Box)({
  backgroundColor: '#f9f9f9',
  fontSize: 16,
  paddingLeft: 12,
  borderRadius: 8
})
