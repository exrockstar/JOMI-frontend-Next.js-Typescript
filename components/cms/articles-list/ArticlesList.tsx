import {
  Add,
  Check,
  Edit,
  MoreVert,
  Refresh,
  Visibility
} from '@mui/icons-material'
import {
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TablePagination,
  Table,
  Button,
  Checkbox,
  Typography,
  Box,
  Menu,
  MenuItem,
  TableFooter
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import {
  ArticlesListQuery,
  useGenerateDoiArticleMutation
} from 'graphql/cms-queries/articles-list.generated'
import ArticlesTableHead from './ArticlesTableHead'
import { useArticlesList } from './useArticlesList'
import ArticlesUpdateModal from './ArticlesUpdateModal'
import { useEffect, useRef, useState } from 'react'
import { useSnackbar } from 'notistack'
import Link from 'next/link'
import { StickyTableCell } from 'components/common/StickyTableCell'

type Props = {
  articles: ArticlesListQuery['fetchArticles']['articles']
  totalCount: number
}

const ArticlesList: React.FC<Props> = ({ articles, totalCount }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    selectedItems,
    allArticleIds,
    setSelectedItems
  } = useArticlesList()
  const { enqueueSnackbar } = useSnackbar()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const tableRef = useRef<HTMLDivElement>(null)
  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      const newItems = selectedItems.filter((_id) => _id !== id)
      setSelectedItems(newItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const [generateDoiMutation] = useGenerateDoiArticleMutation({
    refetchQueries: ['ArticlesList'],
    onCompleted() {
      enqueueSnackbar(`Successfully generated DOI!`, { variant: 'success' })
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const _tableRef = tableRef.current

      if (e.key === 'ArrowRight') {
        _tableRef.scrollTo({
          left: _tableRef.scrollLeft + 10
        })
      }

      if (e.key === 'ArrowLeft') {
        _tableRef.scrollTo({
          left: _tableRef.scrollLeft - 10
        })
      }
    }
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <>
      <ArticlesUpdateModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onCompleted={() => setUpdateModalOpen(false)}
        article={selectedArticle}
        key={new Date().getTime()}
      />

      <Card>
        <TableContainer sx={{ minWidth: 1050, fontSize: 14 }} ref={tableRef}>
          <TableFooter
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'sticky',
              left: 0
            }}
            component="div"
          >
            <Box display="flex" gap={2} alignItems="center" my={1} ml={2}>
              {!!selectedItems.length ? (
                <Box display="flex" gap={2} alignItems="center">
                  <Typography>
                    {selectedItems.length} articles selected.{' '}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedItems(allArticleIds)
                    }}
                    color="secondary"
                    size="small"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedItems([])
                    }}
                    color="error"
                    size="small"
                  >
                    Clear All
                  </Button>
                </Box>
              ) : (
                <Box></Box>
              )}
            </Box>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={pageSize}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </TableFooter>
          <Table>
            <ArticlesTableHead />
            <TableBody>
              {articles?.map((article, i) => {
                const production_id = article.production_id || 'N/A'
                const publication_id = article.publication_id || 'N/A'
                const selected = selectedItems.includes(article._id)
                let stickyTableCellColor: string
                i % 2 !== 0
                  ? (stickyTableCellColor = 'white')
                  : (stickyTableCellColor = '#fafafa')

                const ppaCountries = article.purchaseAllowedCountries
                const ppAcountriesText =
                  ppaCountries?.length > 4
                    ? `${ppaCountries?.slice(0, 4).join(', ')} and ${
                        ppaCountries.length - 4
                      } others`
                    : `${ppaCountries?.slice(0, 4).join(', ')}`
                return (
                  <StyledTableRow key={article._id}>
                    <StickyTableCell
                      backgroundColor={stickyTableCellColor}
                      sx={{ p: 0 }}
                    >
                      <Box display="flex" alignItems="center" boxShadow={5}>
                        <TableCell component="div">
                          <Checkbox
                            onChange={() => toggleSelectItem(article._id)}
                            checked={selected}
                          />
                        </TableCell>

                        <TableCell component="div" sx={{ minWidth: 160 }}>
                          {publication_id}
                        </TableCell>
                        <TableCell
                          sx={{ minWidth: 300, fontSize: 14 }}
                          component="div"
                        >
                          {article.title}
                        </TableCell>
                      </Box>
                    </StickyTableCell>
                    <TableCell>{production_id}</TableCell>
                    {article.authors[0] ? (
                      <TableCell
                        sx={{
                          whiteSpace: 'nowrap',
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={article.authors
                          .map((a) => a.display_name)
                          .join(', ')}
                      >
                        {article.authors
                          .map((author) => {
                            return author.display_name
                          })
                          .join('\n')}
                      </TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    <TableCell>{article.status}</TableCell>
                    {article.published ? (
                      <TableCell>{article.published.split('T')[0]}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {article.preprint_date ? (
                      <TableCell>
                        {article.preprint_date.split('T')[0]}
                      </TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {article.has_complete_abstract ? (
                      <TableCell>Yes</TableCell>
                    ) : (
                      <TableCell>No</TableCell>
                    )}
                    {article.restrictions ? (
                      <TableCell>{article.restrictions.article}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {article.DOIStatus ? (
                      <TableCell>{article.DOIStatus}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    <TableCell>
                      {article.languages?.join(', ') ?? 'N/A'}
                    </TableCell>
                    <TableCell>
                      {article.enabled_languages?.join(', ') ?? 'N/A'}
                    </TableCell>
                    <TableCell>
                      {!article.languages?.length ? (
                        'No translations'
                      ) : article.outdatedTranslations?.length ? (
                        article.outdatedTranslations?.join(', ')
                      ) : (
                        <Typography display="flex" alignItems="center">
                          <Check color="success" /> Up to date
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{article.contentlength}</TableCell>
                    {article.categories[0] ? (
                      <TableCell
                        sx={{
                          whiteSpace: 'nowrap',
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={article.categories
                          .map((c) => c.displayName)
                          .join(', ')}
                      >
                        {article.categories.map((category, index) => (
                          <div key={index}>{category.displayName}</div>
                        ))}
                      </TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    <TableCell>
                      {article.isRentArticleFeatureOn ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell>
                      {article.isPurchaseArticleFeatureOn ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell sx={{ minWidth: 150, textOverflow: 'ellipsis' }}>
                      {article.purchaseAllowedCountries?.length > 0 ? (
                        <Typography variant="caption">
                          {ppAcountriesText}
                        </Typography>
                      ) : (
                        'All Countries'
                      )}
                    </TableCell>
                    <TableCell>
                      <Box display={'flex'} gap="2">
                        <Link
                          href={`/cms/articles-list/${article._id}`}
                          passHref
                          legacyBehavior
                        >
                          <Button
                            color="primary"
                            component="a"
                            startIcon={<Visibility />}
                            sx={{ mr: 1, mt: 1 }}
                            variant="contained"
                            size="small"
                          >
                            Details
                          </Button>
                        </Link>
                        <Button
                          color="primary"
                          startIcon={<Edit />}
                          sx={{ mr: 1, mt: 1 }}
                          variant="contained"
                          onClick={() => {
                            setSelectedArticle(article)
                            setUpdateModalOpen(true)
                          }}
                          size="small"
                        >
                          Edit
                        </Button>
                        {article.DOIStatus !== 'publish' &&
                        article.DOIStatus !== 'submitted' &&
                        article.DOIStatus !== 'not required' &&
                        article.publication_id ? (
                          <Button
                            color="secondary"
                            startIcon={<Add />}
                            variant="contained"
                            size="small"
                            sx={{ mr: 1, mt: 1 }}
                            onClick={() => {
                              generateDoiMutation({
                                variables: {
                                  id: `${article._id}`
                                }
                              })
                            }}
                          >
                            DOI
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            startIcon={<Add />}
                            variant="contained"
                            size="small"
                            sx={{ mr: 1, mt: 1 }}
                            disabled
                          >
                            DOI
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
          <TableFooter
            component="div"
            sx={{
              left: 0,
              position: 'sticky',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div></div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={pageSize}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
          </TableFooter>
        </TableContainer>
      </Card>
    </>
  )
}

export default ArticlesList
