import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import { Article, InstitutionArticleStats } from 'graphql/types'
import { visuallyHidden } from '@mui/utils'
import React from 'react'
import { useRouter } from 'next/router'
import { useListInput } from 'components/hooks/useListInput'

interface HeadCell {
  id: keyof InstitutionArticleStats | `article.${keyof Article}`
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'article.publication_id',
    label: 'Publication Id'
  },
  {
    id: 'article.title',
    label: 'Title'
  },
  // {
  //   id: 'article.status',
  //   label: 'Status'
  // },
  {
    id: 'articleViews',
    label: 'Article Events'
  },

  {
    id: 'uniqueViews',
    label: 'Unique Views'
  }
]

const ArticleActivityTableHead = () => {
  const { sortBy, sortOrder, setSort } = useListInput({})

  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      const _sortOrder = property === sortBy ? -sortOrder : -1
      setSort(property, _sortOrder)
    }
  return (
    <>
      <colgroup>
        <col style={{ width: '10%' }} />
        <col style={{ width: '45%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            const order = sortOrder >= 1 ? 'asc' : 'desc'
            return (
              <TableCell
                key={headCell.id}
                sortDirection={sortBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={sortBy === headCell.id}
                  direction={sortBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {sortBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          })}
          <TableCell key={'details'}>Details</TableCell>
        </TableRow>
      </TableHead>
    </>
  )
}

export default ArticleActivityTableHead
