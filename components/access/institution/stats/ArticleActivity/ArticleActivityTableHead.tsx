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
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      const order = sort_order >= 1 ? 'desc' : 'asc'
      router.push({
        query: {
          ...router.query,
          sort_by: property,
          sort_order: order
        }
      })
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
            const order = sort_order >= 1 ? 'asc' : 'desc'
            return (
              <TableCell
                key={headCell.id}
                sortDirection={sort_by === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={sort_by === headCell.id}
                  direction={sort_by === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {sort_by === headCell.id ? (
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
