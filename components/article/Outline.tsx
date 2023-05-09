import { Box, Typography, Link } from '@mui/material'
import { BlueLink } from 'components/common/BlueLink'
import { HiddenHeader } from 'components/common/HiddenHeader'
import { defaultTheme } from 'components/theme'
import { contains } from 'underscore'
import { injectTOCAnchors } from '../utils/helpers'

type Props = Readonly<{
  outline: string
  otoc: any[]
}>

const Outline: React.FC<Props> = ({ outline = '', otoc = [] }): JSX.Element => {
  const theme = defaultTheme
  const stripHeaderArtifacts = (text: string) => {
    const bad = '0 1 2 3 4 5 6 7 8 9 , . : ;'.split(' ')
    while (contains(bad, text.charAt(text.length - 1))) {
      text = text.slice(0, -1)
    }
    return text
  }

  const createOutlineMarkup = () => {
    // add anchors before h4 and h5 if toc exists
    // '<a class="anchor-hidden" id="' + header.id + '" href="#' + header.id + '" aria-hidden="true"></a>'
    var html = otoc && otoc.length > 0 ? injectTOCAnchors(outline) : outline
    return {
      __html: html
    }
  }

  const renderTableOfContents = () => {
    const toc = otoc
    if (toc === undefined || toc.length <= 0) return null
    const items = []
    for (let i = 0; i < toc.length; i++) {
      const header = toc[i]
      const subitems = []
      if (header.subheaders !== undefined && header.subheaders.length > 0) {
        for (let j = 0; j < header.subheaders.length; j++) {
          const subheader = header.subheaders[j]
          var text = subheader.text
          text = stripHeaderArtifacts(text)
          subitems.push(
            <Box
              component="li"
              key={`toc-subitem:${j}`}
              sx={{
                listStyleType: 'none'
              }}
            >
              <BlueLink href={`#${subheader.id.toLowerCase()}`} title={text}>
                {text}
              </BlueLink>
            </Box>
          )
        }
      }
      let sublist = null
      if (subitems.length > 0) {
        sublist = (
          <Box
            component="ol"
            sx={{
              margin: 0,
              padding: 0,
              paddingLeft: '20px',
              listStyleType: 'none'
            }}
          >
            {subitems}
          </Box>
        )
      }
      text = header.text
      text = stripHeaderArtifacts(text)
      items.push(
        <Box
          component="li"
          key={`toc-item:${i}`}
          sx={{
            listStyleType: 'none'
          }}
        >
          <BlueLink href={`#${header.id.toLowerCase()}`} title={text}>
            {text}
          </BlueLink>
          {sublist}
        </Box>
      )
    }

    return (
      <Box
        sx={{
          padding: '10px',
          marginBottom: '10px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.800',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: 'grey.50',
          float: { md: 'right' },
          width: { md: '50%' },
          marginLeft: { md: '10px' },
          marginTop: { xs: '10px' }
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'bold'
          }}
          component={'h3'}
        >
          Table of Contents
        </Typography>
        <Box
          component="ol"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            margin: 0,
            padding: 0,
            marginTop: '5px',
            marginLeft: '15px',
            paddingLeft: '10px',
            listStyleType: 'none',
            lineHeight: 1.42857143,
            fontSize: '14px',
            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
          }}
        >
          {items}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      className="article-outline"
      sx={{
        position: 'relative',
        h4: {
          fontSize: '1.5em'
        },
        h5: {
          fontSize: '1.25em'
        }
      }}
      component="section"
    >
      <HiddenHeader component="h2">Procedure Outline</HiddenHeader>
      {renderTableOfContents()}
      <Box
        // className="article-outline-text"
        sx={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          color: 'grey.800',
          lineHeight: 1.42857143,
          fontSize: '14px',
          fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
          p: {
            margin: '0 0 10px'
          },
          '.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6': {
            marginTop: '10px',
            marginBottom: '10px',
            fontWeight: 'unset',
            lineHeight: 1.1,
            color: 'inherit'
          },
          h3: {
            fontSize: '1.5em'
          },
          h4: {
            fontSize: '1.25em'
          },
          img: {
            maxWidth: '100%',
            height: 'auto',
            transition: 'filter 300ms, box-shadow 300ms'
          },
          a: {
            color: 'linkblue.main',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            'img:hover': {
              filter: 'grayscale(50%)',
              boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.3)'
            }
          },
          'img:hover': {
            filter: 'grayscale(50%)',
            boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          },
          figure: {
            display: 'table',
            margin: '1rem auto',
            figcaption: {
              color: 'grey.400',
              display: 'block',
              marginTop: '0.25rem',
              textAlign: 'center'
            }
          },
          '.row': {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column'
            }
          },

          '.col-sm-4': {
            [theme.breakpoints.up('sm')]: {
              width: '33.33%',
              float: 'left',
              px: 2
            }
          }
        }}
        dangerouslySetInnerHTML={createOutlineMarkup()}
      />
    </Box>
  )
}

export default Outline
