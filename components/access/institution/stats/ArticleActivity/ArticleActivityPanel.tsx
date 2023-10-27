import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Pagination,
  TableFooter,
  Button,
  Chip,
  TablePagination
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { InstitutionByIdQuery } from 'graphql/cms-queries/institutions-list.generated'
import { useArticleActivityStatsQuery } from 'graphql/queries/access.generated'
import { AccessFilterInput, ColumnFilter, QueryOperation } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import ArticleActivityTableHead from './ArticleActivityTableHead'
import Link from 'next/link'
import ArticleActivityHeader from './ArticleActivityHeader'

import { Info, Visibility } from '@mui/icons-material'
import { useQueryFilters } from 'components/hooks/useQueryFilters'
import { cleanObj } from 'common/utils'
import { useListInput } from 'components/hooks/useListInput'

type Props = {
  institution: InstitutionByIdQuery['institution']
}

const ArticleActivityPanel = ({ institution }: Props) => {
  const router = useRouter()
  const { filters: global } = useQueryFilters('global')
  const start = router.query.start as string | null
  const end = router.query.end as string | null
  const state = useListInput({
    page: 1,
    sort_order: -1,
    page_size: 10,
    sort_by: 'articleViews'
  })
  const {
    page,
    sortOrder,
    sortBy,
    pageSize,
    filters,
    searchTerm,
    setPage,
    setPageSize
  } = state

  const input: AccessFilterInput = {
    sort_by: sortBy,
    sort_order: sortOrder,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    filters: filters,
    globalFilters: global,
    institution_id: institution._id
  }

  if (searchTerm) {
    input.search = searchTerm
  }
  if (start) {
    input.startDate = start
  }
  if (end) {
    input.endDate = end
  }

  const { data, loading, error } = useArticleActivityStatsQuery({
    variables: { input },
    fetchPolicy: 'network-only'
  })

  const articles = data?.articleAccessStats?.items || []
  const count = data?.articleAccessStats?.totalCount || 0
  const hasFilters = input.filters?.length > 0
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const Pagination = (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={'flex-end'}
        gap={2}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
        {hasFilters && (
          <Chip color="info" label="Filter Applied" icon={<Info />}></Chip>
        )}
      </Box>
    </>
  )

  return (
    <div>
      <ArticleActivityHeader />
      <Card>
        <TableContainer>
          {Pagination}
          <Table sx={{ minWidth: 1050 }}>
            <ArticleActivityTableHead />
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Stack py={10} alignItems="center">
                      <CircularProgress />
                      <Typography>Loading</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <Stack py={10} alignItems="center" spacing={1}>
                  <Alert severity="error">{error.message}</Alert>
                </Stack>
              )}
              {!!articles?.length &&
                articles?.map((item) => {
                  const article = item.article
                  return (
                    <StyledTableRow key={item._id}>
                      <TableCell>{article.publication_id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/article/${article.publication_id}/${article.slug}`}
                        >
                          {article.title}
                        </Link>
                      </TableCell>
                      {/* <TableCell>{article.status}</TableCell> */}
                      <TableCell>{item.articleViews}</TableCell>
                      <TableCell>{item.uniqueViews}</TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `/access/${institution._id}/articles/${item._id}`,
                            query: cleanObj({
                              start: router.query.start,
                              end: router.query.end,
                              global: router.query.global
                            })
                          }}
                          passHref
                          legacyBehavior
                        >
                          <Button startIcon={<Visibility />}>Details</Button>
                        </Link>
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default ArticleActivityPanel
