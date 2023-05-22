import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Checkbox
} from '@mui/material'
import { Article } from 'graphql/types'
import { useArticlesList } from './useArticlesList'
import { visuallyHidden } from '@mui/utils'
import { StickyTableCell } from 'components/common/StickyTableCell'
interface HeadCell {
  id: keyof Article
  label: string
  sticky?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'production_id',
    label: 'Production ID',
    sticky: false
  },
  {
    id: 'publication_id',
    label: 'Publication ID',
    sticky: true
  },
  {
    id: 'title',
    label: 'Title',
    sticky: true
  },
  {
    id: 'authors',
    label: 'Author(s)'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'published',
    label: 'Publish Date'
  },
  {
    id: 'preprint_date',
    label: 'Preprint Date'
  },
  {
    id: 'has_complete_abstract',
    label: 'Abstract Done?'
  },
  {
    id: 'restrictions',
    label: 'Restrictions?'
  },
  {
    id: 'DOIStatus',
    label: 'DOI'
  },
  {
    id: 'languages',
    label: 'Available Translations'
  },
  {
    id: 'enabled_languages',
    label: 'Enabled Translations'
  },
  {
    id: 'outdatedTranslations',
    label: 'Outdated Translations'
  },
  {
    id: 'contentlength',
    label: `Content Length`
  },
  {
    id: 'isRentArticleFeatureOn',
    label: 'Rent Enabled'
  },
  {
    id: 'isPurchaseArticleFeatureOn',
    label: 'Purchase Enabled'
  },
  {
    id: 'purchaseAllowedCountries',
    label: 'PPA Scope'
  }
]

const ArticlesTableHead = () => {
  const {
    sortBy,
    sortOrder,
    setSort,
    selectedItems,
    setSelectedItems,
    articles
  } = useArticlesList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
  }

  const ids = articles?.map((a) => a._id) ?? []
  const allSelected = ids.every((id) => selectedItems.includes(id))
  const someSelected = ids.some((id) => selectedItems.includes(id))
  const stickyCells = headCells.filter((h) => !!h.sticky)
  const regularCells = headCells.filter((h) => !h.sticky)
  return (
    <TableHead>
      <TableRow>
        <StickyTableCell backgroundColor="#efefef" sx={{ p: 0 }}>
          <Box>
            <TableCell component="div">
              <Checkbox
                checked={allSelected}
                onChange={(e) => {
                  if (!allSelected) {
                    const newItems = Array.from(
                      new Set([...ids, ...selectedItems])
                    )
                    setSelectedItems(newItems)
                  } else {
                    const newItems = selectedItems.filter(
                      (id) => !ids.includes(id)
                    )
                    console.log(selectedItems, newItems)
                    setSelectedItems(newItems)
                  }
                }}
                indeterminate={someSelected && !allSelected}
              ></Checkbox>
            </TableCell>
            {stickyCells.map((headCell) => {
              const order = sortOrder >= 1 ? 'asc' : 'desc'
              return (
                <TableCell
                  key={headCell.id}
                  sortDirection={sortBy === headCell.id ? order : false}
                  component="div"
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
          </Box>
        </StickyTableCell>
        {regularCells.map((headCell) => {
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
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ArticlesTableHead
