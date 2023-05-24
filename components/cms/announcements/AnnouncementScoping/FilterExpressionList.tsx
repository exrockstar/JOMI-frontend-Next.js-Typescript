import React from 'react'
import FilterExpressionContainer from './FilterExpressionContainer'
import { useAnnouncementFilters } from './useAnnouncementFilters'

const FilterExpressionList = () => {
  const { filters } = useAnnouncementFilters()
  return (
    <div>
      {filters.map((expression, i) => {
        return <FilterExpressionContainer key={i} expression={expression} />
      })}
    </div>
  )
}

export default FilterExpressionList
