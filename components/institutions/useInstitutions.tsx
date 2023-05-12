import { useRouter } from 'next/router'
import React, { PropsWithChildren, useState } from 'react'
import { ArticleSort } from 'graphql/types'

export type ViewType = 'large' | 'medium' | 'tiny' | 'small'

export type Query = {
  sort_by?: ArticleSort
  display?: ViewType
  page?: number
  q?: string
}

type InstitutionsContextState = {
  sort: ArticleSort
  view: ViewType
  currentPage: number
  totalCount: number
  itemsPerPage: number
  showInstitutions: boolean
  searchTerm: string
  setSort(value: ArticleSort): void
  setView(value: ViewType): void
  setPage(page: number): void
  setShowInstitutions(value: boolean): void
}

type InstitutionProviderProps = {
  totalCount: number
} & PropsWithChildren

const InstitutionsContext = React.createContext<InstitutionsContextState>(null)

export const InstitutionsProvider: React.FC<InstitutionProviderProps> = ({
  totalCount,
  children
}) => {
  const router = useRouter()
  const query = router.query
  const [sort, setSort] = useState(
    (query.sort_by as ArticleSort) ?? ArticleSort.None
  )
  const [view, setView] = useState((query.display as ViewType) ?? 'large')
  const [showInstitutions, setShowInstitutions] = useState(true)
  const [currentPage, setPage] = useState(1)
  const itemsPerPage = query.q ? 10 : 15 //google search limits to 10

  return (
    <InstitutionsContext.Provider
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
        showInstitutions,
        setShowInstitutions
      }}
    >
      {children}
    </InstitutionsContext.Provider>
  )
}

export const useInstitutions = () => {
  var context = React.useContext(InstitutionsContext)
  if (!context) {
    throw new Error(
      'please use InstitutionsProvider somewhere in the parent elements'
    )
  }

  return context
}
