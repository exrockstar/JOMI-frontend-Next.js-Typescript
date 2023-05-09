import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/legacy/image'
import { BASE_URL } from 'common/constants'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { BlueLink } from 'components/common/BlueLink'
import { Link as MuiLink, Divider} from '@mui/material'
type ExampleCaseItem = {
  title: string
  slug: string
  author: string
  hospital: string
  publication_id: string
  category: string
}

type Props = {
  cases: ExampleCaseItem[]
}
const ExampleCases = ({ cases }: Props) => {
  return (
    <div>
      <Typography variant="h4" component="h1" sx={{marginTop: 3}}>
        Sample Cases
      </Typography>
      <Grid container sx={{mb:-2}}>
        {cases.map((item) => {
          // const imageUrl = `/img/example-cases/${item.publication_id}.jpg`
          const imageUrl = `https://jomi.com/api/files/${item.publication_id}.jpg`
          const articleUrl = `/article/${item.publication_id}/${item.slug}`
          return (
            <Grid item xs={6} md={3} key={item.publication_id}>
              <Box component="article" mr={2} mb={2}>
                <Typography
                  textOverflow={'ellipsis'}
                  noWrap
                  title={item.category}
                  my={1}
                >
                  {item.category}:
                </Typography>
                <ImageWrapper>
                  <Image
                    src={imageUrl}
                    alt={'article-image'}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </ImageWrapper>
                <Box py={1}>
                  <Link href={articleUrl} passHref legacyBehavior>
                    <Typography
                      component={BlueLink}
                      sx={{ color: '#0094FF', lineHeight: 0.5 }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                </Box>
                <Typography color="text.secondary" variant="body2">
                  {item.hospital}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {item.author}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
      <Link
        href="https://jomi.com/sample-cases"
        passHref
        legacyBehavior
      >
        {/* <MuiLink>{Additional Sample Cases}</MuiLink> */}
        More Sample Cases
      </Link>
      <Divider sx={{backgroundColor: '#e45252', my: 3}}/>
    </div>
  )
}

export default ExampleCases

const ImageWrapper = styled('div')({
  position: 'relative',
  paddingTop: '56.25%'
})
