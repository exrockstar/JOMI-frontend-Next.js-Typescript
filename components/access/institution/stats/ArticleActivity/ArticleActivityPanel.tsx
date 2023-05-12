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
  Chip
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
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import ArticleActivityFilter from './ArticleActivityFilter'
import { Info, Visibility } from '@mui/icons-material'

type Props = {
  institution: InstitutionByIdQuery['institution']
}

const ArticleActivityPanel = ({ institution }: Props) => {
  const router = useRouter()
  const sort_by = (router.query.sort_by as string) ?? 'articleViews'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const search = router.query.search as string
  const page = parseInt((router.query.page as string) ?? '1')
  const perPage = 20
  const skip = (page - 1) * perPage
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const filters = useReadLocalStorage<ColumnFilter[]>(
    ArticleActivityFilter.STORAGE_KEY
  )
  const input: AccessFilterInput = {
    sort_by,
    sort_order,
    limit: perPage,
    skip,
    filters: [
      {
        columnName: 'institution',
        operation: QueryOperation.Equal,
        value: institution._id
      },
      ...(filters || [])
    ]
  }
  if (search) {
    input.search = search
  }
  const { data, loading, error } = useArticleActivityStatsQuery({
    variables: { input }
  })

  const articles = data?.articleAccessStats?.items || []
  const count = data?.articleAccessStats?.totalCount || 0
  const pageCount = Math.ceil(count / perPage)
  const handlePageChange = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page
      }
    })
  }
  const TablePagination = (
    <TableFooter>
      <Box p={1} display="flex" alignItems="center" gap={2}>
        <Pagination
          count={pageCount}
          shape="rounded"
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
        {!!count && (
          <Typography color="text.secondary">
            {skip} to {Math.min(skip + perPage, count)} of {count} articles
          </Typography>
        )}
        {filters?.length > 0 && (
          <Chip color="info" label="Filter Applied" icon={<Info />}></Chip>
        )}
      </Box>
    </TableFooter>
  )

  return (
    <div>
      <ArticleActivityHeader />
      <Card>
        <TableContainer>
          {TablePagination}
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
                          href={`/access/${institution._id}/articles/${item._id}`}
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
