import React, { memo } from 'react'
import { List } from '@mui/material'
import { styled } from '@mui/material/styles'
import Chapter from './Chapter'
import { Chapter as TChapter } from 'graphql/types'
import { useChapters } from '../useChapters'

const Chapters: React.FC = () => {
  const { chapters } = useChapters()

  return chapters.length > 0 ? (
    <ChapterList>
      {chapters.map((chapter: TChapter, index: number) => (
        <Chapter
          key={`${chapter?.number}:${index}`}
          chapters={chapters}
          chapter={chapter}
          isLastChapter={index === chapters.length - 1}
        />
      ))}
    </ChapterList>
  ) : null
}

export default memo(Chapters)

const ChapterList = styled(List)(({ theme }) => ({
  width: '100%',
  maxHeight: '500px',
  overflow: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none'
  }
}))
