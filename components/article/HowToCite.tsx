import { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { Article } from 'graphql/types'
import { generateHowToCiteStr } from './generateHowToCite';

type HowToCiteProps = Readonly<{
  article: Article
}>

const HowToCite = ({ article }: HowToCiteProps) => {
  const theme = useTheme();
  const manual = article.content.cite_this_article;
  const generated = manual ?? generateHowToCiteStr(article);

  if (!article?.published) return null
  return (
    <Box
      sx={{
        borderTop: '1px solid #ccc',
        padding: '10px 0px'
      }}
      position={"relative"}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{
          mt: 1,
          mb: 1
        }}
      >
        Cite this article
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: generated }} sx={{
        fontSize: 14,
        'a': {
          color: theme.palette.linkblue.main,
          textDecoration: 'none',
          '&:hover': {
            color: theme.palette.linkblue.dark,
            textDecoration: 'underline',
          },
        },
      }} />
    </Box>
  )
}

export default memo(HowToCite)
