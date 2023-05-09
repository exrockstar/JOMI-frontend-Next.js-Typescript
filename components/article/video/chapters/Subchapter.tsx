import React, { memo } from 'react'
import { styled } from '@mui/material/styles'
import {
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemButtonProps
} from '@mui/material'
import { Chapter as TChapter, SubChapter } from 'graphql/types'
import { useChapters } from '../useChapters'
import { analytics } from 'apis/analytics'

type SubChapterProps = {
  isOpen: boolean
  parent: TChapter
}

const Subchapter: React.FC<SubChapterProps> = ({ isOpen, parent }) => {
  const children = parent.subchapters
  const { setVideoTime, activeSubChapter, setActiveSubChapter } = useChapters()

  const handleClick = (subChap: SubChapter) => {
    setVideoTime(subChap.time)
    setActiveSubChapter(subChap)
    analytics.event('Click', 'SubChapter Button')
  }
  return (
    <SubChapterList in={isOpen} timeout="auto" unmountOnExit component={'li'}>
      {children?.map((subChap, index) => (
        <SubChapterItemButton
          key={`${subChap?.parent}:${index}`}
          onClick={() => handleClick(subChap)}
          selected={subChap.time === activeSubChapter?.time}
          hasBorderTop={index === 0}
          hasBorderBottom={index < children.length - 1}
        >
          <ListItemText
            key={`${subChap?.parent}:${index}`}
            primaryTypographyProps={{
              fontSize: 12,
              color: 'rgba(255,255,255,.65)'
            }}
            primary={`${subChap.title}`}
          />
        </SubChapterItemButton>
      ))}
    </SubChapterList>
  )
}

export default memo(Subchapter)

const SubChapterList = styled(Collapse)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[900]
}))

const SubChapterItemButton: React.FC<
  ListItemButtonProps & { hasBorderTop: boolean; hasBorderBottom: boolean }
> = (props) => {
  const {
    selected,
    hasBorderTop,
    hasBorderBottom,
    children,
    sx,
    ...restProps
  } = props
  return (
    <ListItemButton
      sx={{
        border: '0.5px solid rgba(255,255,255,.25)',
        borderTop: hasBorderTop ? '0.5px solid rgba(255,255,255,.25)' : 'none',
        borderBottom: hasBorderBottom
          ? '0.5px solid rgba(255,255,255,.25)'
          : 'none',
        ':hover': { backgroundColor: 'grey.700' },
        borderLeft: selected
          ? '4px solid #ffffff'
          : '0.5px solid rgba(255,255,255,.25)',
        padding: '0px 16px',
        paddingLeft: selected ? '5px' : '8px',
        ...sx
      }}
      {...restProps}
    >
      {children}
    </ListItemButton>
  )
}
