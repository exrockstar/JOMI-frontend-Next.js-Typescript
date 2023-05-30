import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ArticleSort } from 'graphql/types'

export type ViewType = 'large' | 'medium' | 'tiny' | 'small'

export type Query = {
  sort_by?: ArticleSort
  display?: ViewType
  page?: number
  q?: string
}

type AuthorsContextState = {
  sort: ArticleSort
  view: ViewType
  currentPage: number
  totalCount: number
  itemsPerPage: number
  showAuthors: boolean
  searchTerm: string
  setSort(value: ArticleSort): void
  setView(value: ViewType): void
  setPage(page: number): void
  setShowAuthors(value: boolean): void
}

type AuthorProviderProps = {
  totalCount: number
} & PropsWithChildren

const AuthorsContext = React.createContext<AuthorsContextState>(null)

export const AuthorsProvider: React.FC<AuthorProviderProps> = ({
  totalCount,
  children
}) => {
  const router = useRouter()
  const query = router.query
  const [sort, setSort] = useState(
    (query.sort_by as ArticleSort) ?? ArticleSort.None
  )
  const [view, setView] = useState((query.display as ViewType) ?? 'large')
  const [showAuthors, setShowAuthors] = useState(true)
  const [currentPage, setPage] = useState(1)
  const itemsPerPage = query.q ? 10 : 15 //google search limits to 10

  return (
    <AuthorsContext.Provider
      value={{
        sort,
        view,
        currentPage,
        searchTerm: query.q as string,
        setSort,
        setView,
        setPage,
        totalCount,
        itemsPerPage: itemsPerPage,
        showAuthors,
        setShowAuthors
      }}
    >
      {children}
    </AuthorsContext.Provider>
  )
}

export const useAuthors = () => {
  var context = React.useContext(AuthorsContext)
  if (!context) {
    throw new Error(
      'please use AuthorsProvider somewhere in the parent elements'
    )
  }

  return context
}
