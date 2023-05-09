import { useEffect, useMemo, useState, memo } from 'react'
import includes from 'lodash/includes'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

/**
 * Displays the abstract, and citation of the article procedure.
 * The table of contents is auto generated based on headers.
 */
import { Link } from '@mui/material'
import { injectTOCAnchors } from 'components/utils/helpers'
import HowToCite from './HowToCite'
import { BlueLink } from 'components/common/BlueLink'
import { HiddenHeader } from 'components/common/HiddenHeader'

type MainTextProps = Readonly<{
  text: string
  toc: any[]
  citations: string
  article: any
}>

const MainText: React.FC<MainTextProps> = ({
  text = '',
  toc = [],
  citations = '',
  article = {}
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [requiresSubscription, setRequiresSubscription] = useState(false)
  const theme = useTheme()
  const showIfSubscriptionRequired = useMemo(
    () =>
      isLoggedIn && requiresSubscription
        ? { height: '450px', maxHeight: '450px', overflow: 'hidden' }
        : {},
    [isLoggedIn, requiresSubscription]
  )

  const stripHeaderArtifacts = (text: string) => {
    const bad = '0 1 2 3 4 5 6 7 8 9 , . : ;'.split(' ')
    while (includes(bad, text.charAt(text.length - 1))) {
      text = text.slice(0, -1)
    }
    return text
  }

  const createArticleMarkup = () => {
    // add anchors before h4 and h5 if toc exists
    // '<a class="anchor-hidden" id="' + header.id + '" href="#' + header.id + '" aria-hidden="true"></a>'
    var html = toc && toc.length > 0 ? injectTOCAnchors(text) : text
    return { __html: html }
  }

  const renderTableOfContents = () => {
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
          width: { md: '50%', xs: '100%' },
          marginLeft: { md: '10px', sx: 0 },
          marginTop: { xs: '5px' }
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
          <Box
            component="li"
            className="toc-item"
            sx={{
              listStyleType: 'none'
            }}
          >
            <BlueLink href="#citations" title="Citations">
              Citations
            </BlueLink>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{ ...showIfSubscriptionRequired, position: 'relative' }}
      component="section"
    >
      <HiddenHeader component="h2">Main Text</HiddenHeader>
      {/* {!isServer && isLoggedIn && requiresSubscription && <TextBlock />} */}
      {renderTableOfContents()}
      <Box
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
            },
            gap: 2
          },

          '.col-sm-4': {
            [theme.breakpoints.up('sm')]: {
              width: '33.33%',
              float: 'left',
              px: 2
            }
          }
        }}
        dangerouslySetInnerHTML={createArticleMarkup()}
      />
      {citations && (
        <div>
          <Link
            className="anchor-hidden"
            id="citations"
            href="#citations"
            aria-hidden="true"
            sx={{
              color: 'linkblue.main',
              textDecoration: 'none'
            }}
          />
          <Box component="section">
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.5em'
              }}
            >
              Citations
            </Typography>
            <Box
              sx={{
                a: {
                  color: 'linkblue.main',
                  textDecoration: 'none',
                  ':hover': {
                    color: 'linkblue.dark',
                    textDecoration: 'underline'
                  }
                },
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                color: 'grey.800',
                lineHeight: '1.42857143',
                fontSize: '14px !important',
                fontFamily:
                  '"Helvetica Neue",Helvetica,Arial,sans-serif !important'
              }}
              dangerouslySetInnerHTML={{ __html: citations }}
            />
          </Box>
        </div>
      )}
      <HowToCite article={article} />
    </Box>
  )
}

export default memo(MainText)
