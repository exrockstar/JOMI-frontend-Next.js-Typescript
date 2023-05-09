import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Chapter, SubChapter } from 'graphql/types'

type ChapterContextState = {
  chapters: Chapter[]
  subchapters: SubChapter[]
  videoTime?: number
  setVideoTime(videoTime: number): void
  setActiveChapter(chapter: Chapter): void
  setActiveSubChapter(subchapter: SubChapter): void
  activeChapter?: Chapter | null
  activeSubChapter?: SubChapter | null
}

const ChapterContext = createContext<ChapterContextState>(null)

export const ChapterProvider: React.FC<
  { chapters: Chapter[] } & PropsWithChildren
> = (props) => {
  const { chapters } = props
  const subchapters = chapters
    .flatMap((chapters) => chapters.subchapters)
    .sort((a, b) => a.time - b.time)
  const [videoTime, setVideoTime] = useState(undefined)
  const [activeChapter, setActiveChapter] = useState(chapters[0])
  const [activeSubChapter, setActiveSubChapter] = useState(null)
  const sorted = [...chapters].sort((a, b) => a.time - b.time)

  const context = {
    chapters: sorted,
    subchapters,
    videoTime,
    setVideoTime,
    activeChapter,
    setActiveChapter,
    activeSubChapter,
    setActiveSubChapter
  }

  return (
    <ChapterContext.Provider value={context}>
      {props.children}
    </ChapterContext.Provider>
  )
}

export const useChapters = () => {
  const context = useContext(ChapterContext)
  if (!context) {
    throw new Error('Please use ChapterProvider in parent component')
  }

  return context
}
