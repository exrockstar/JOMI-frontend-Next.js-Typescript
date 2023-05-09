import React, { useState, useEffect, memo } from 'react'
import { BoxProps, ListItemButtonProps, SvgIconProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Box, ListItemButton, ListItemText } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import SubChapter from './Subchapter'
import { useChapters } from '../useChapters'
import { Chapter as TChapter } from 'graphql/types'
import { analytics } from 'apis/analytics'

type ChapterComponentProps = {
  chapters: TChapter[]
  chapter: TChapter
  isLastChapter: boolean
}

const Chapter: React.FC<ChapterComponentProps> = ({
  chapters,
  chapter,
  isLastChapter
}) => {
  const [isOpen, setOpen] = useState(false)
  const { activeChapter, setVideoTime, setActiveChapter, setActiveSubChapter } =
    useChapters()

  const isActive = activeChapter?.number === chapter.number
  const sortedSubchapters = [...chapter?.subchapters].sort(
    (a, b) => a.number - b.number
  )

  const handleClick = () => {
    setVideoTime(chapter.time)
    setActiveChapter(chapter)
    analytics.event('Click', 'Chapter Button')
    if (chapter.subchapters?.length > 0) {
      setActiveSubChapter(chapter.subchapters[0])
    }
  }

  useEffect(() => {
    setOpen(isActive)
  }, [isActive])
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexGrow={1}
        justifyContent={'space-between'}
        width={'100%'}
        border={'none'}
        bgcolor="#111"
        component={'li'}
      >
        <ChapterItemButton
          dense
          chapter={chapter}
          chapters={chapters}
          activechapter={activeChapter}
          onClick={handleClick}
          isLastChapter={isLastChapter}
        >
          <ListItemText
            primaryTypographyProps={{
              fontSize: 12,
              color: isActive ? '#fff' : `rgba(255,255,255,.65)`
            }}
            primary={`${chapter?.title}`}
          />
        </ChapterItemButton>
        {sortedSubchapters.length > 0 && (
          <ChapterItemIconsContainer
            isLastChapter={isLastChapter}
            px={1}
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            <ExpandMoreIcon fontWeight={700} isOpen={isOpen} />
          </ChapterItemIconsContainer>
        )}
      </Box>
      {sortedSubchapters.length > 0 && (
        <SubChapter isOpen={isOpen} parent={chapter} />
      )}
    </>
  )
}

export default memo(Chapter)

const ChapterItemIconsContainer = (
  props: { isLastChapter: boolean } & BoxProps
) => {
  const { isLastChapter, ...restProps } = props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '0.5px solid rgba(255,255,255,.25)',
        borderLeft: 'none',
        borderBottom: isLastChapter
          ? '0.5px solid rgba(255,255,255,.25)'
          : 'none',
        ':hover': {
          backgroundColor: 'grey.900'
        },
        cursor: 'pointer'
      }}
      {...restProps}
    />
  )
}

type ExpandMoreIconProps = { isOpen: boolean }
const ExpandMoreIcon = ({
  isOpen,
  ...props
}: ExpandMoreIconProps & SvgIconProps) => {
  return (
    <ChevronRight
      sx={{
        paddingLeft: '1px',
        paddingRight: '1px',
        color: 'rgba(255,255,255,.65)',
        transform: `rotate(${!isOpen ? `0deg` : `90deg`})`,
        transition: 'all .25s ease',
        fontSize: 27
      }}
      {...props}
    />
  )
}

type ChapterItemButtonProps = {
  chapters: TChapter[]
  chapter: TChapter
  activechapter: TChapter
  isLastChapter: boolean
}

const ChapterItemButton: React.FC<
  ChapterItemButtonProps & ListItemButtonProps
> = (props) => {
  const { chapter, activechapter, isLastChapter, children, ...restProps } =
    props
  const hasSubChapters = chapter?.subchapters?.length > 0
  const isActiveChapter = activechapter?.number === chapter.number
  return (
    <ListItemButton
      sx={{
        border: '0.5px solid rgba(255,255,255,.25)',
        padding: 0,
        paddingLeft: isActiveChapter ? '5px' : '8px',
        borderBottom: isLastChapter
          ? '0.5px solid rgba(255,255,255,.25)'
          : 'none',
        borderRight: hasSubChapters
          ? 'none'
          : '0.5px solid rgba(255,255,255,.25)',
        borderLeft: isActiveChapter
          ? '4px solid #ffffff'
          : '0.5px solid rgba(255,255,255,.25)',

        ':hover': {
          backgroundColor: 'grey.900'
        }
      }}
      {...restProps}
    >
      {children}
    </ListItemButton>
  )
}
