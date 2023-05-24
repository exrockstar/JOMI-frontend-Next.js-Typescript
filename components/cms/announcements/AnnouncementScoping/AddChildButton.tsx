import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Operators } from 'graphql/types'
import React from 'react'
import { useAnnouncementFilters } from './useAnnouncementFilters'

const AddChildButton = () => {
  const { filters, addChild } = useAnnouncementFilters()
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => {
        addChild({
          parentId: null,
          operator: Operators.And,
          id: filters.length + 1 + '',
          level: 0
        })
      }}
      startIcon={<Add />}
    >
      Add Filter Condition
    </Button>
  )
}

export default AddChildButton
