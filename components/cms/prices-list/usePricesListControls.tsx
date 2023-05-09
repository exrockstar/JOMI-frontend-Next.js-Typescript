import { ColumnFilter } from 'graphql/types'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type State = {
  filters?: ColumnFilter[]
  setFilters(filters: ColumnFilter[]): void
}

const PricesListContext = createContext<State>({
  setFilters(filters: ColumnFilter[]) {}
})

export const PricesListProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [filters, setFilters] = useState<ColumnFilter[]>([])

  return (
    <PricesListContext.Provider
      value={{
        filters,
        setFilters
      }}
    >
      {children}
    </PricesListContext.Provider>
  )
}

export const usePricesListControls = () => {
  const context = useContext(PricesListContext)
  if (!context) {
    throw new Error('No PricesListProvider in parent!')
  }

  return context
}
