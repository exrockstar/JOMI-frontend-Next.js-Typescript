import { Box, Typography, OutlinedInput } from '@mui/material'
import { BASE_URL } from 'common/constants'

import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon
} from 'react-share'

export default function ShareSection({ publicationId, slug }) {
  const link = `${BASE_URL}/article/${publicationId}/${slug}`
  return (
    <Box component="section" mt={2}>
      <Typography
        align="center"
        sx={{
          textTransform: 'capitalize',
          fontWeight: 600,
          fontSize: '0.9em',
          color: 'rgb(51, 51, 51)'
        }}
        component="h2"
      >
        Share this Article
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
      >
        <Box padding={1}>
          <TwitterShareButton url={link}>
            <TwitterIcon round size={32} />
          </TwitterShareButton>
        </Box>
        <Box padding={1}>
          <FacebookShareButton url={link}>
            <FacebookIcon round size={32} />
          </FacebookShareButton>
        </Box>
        <Box padding={1}>
          <LinkedinShareButton url={link}>
            <LinkedinIcon round size={32} />
          </LinkedinShareButton>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        flexGrow={1}
        mt={1}
      >
        <OutlinedInput
          id="article-url"
          value={link}
          disabled
          fullWidth
          aria-describedby="article-url"
          inputProps={{
            'aria-label': 'article-url',
            color: 'rgb(51, 51, 51)'
          }}
          sx={{
            width: '250px',
            height: 32,
            borderRadius: '4px 4px 4px 4px'
          }}
        />
      </Box>
    </Box>
  )
}
