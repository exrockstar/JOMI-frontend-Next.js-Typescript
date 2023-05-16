import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Layout from 'components/layout'
import AccountLayout from 'components/account/AccountLayout'

import Head from 'next/head'
import { SITE_NAME } from 'common/constants'
import { useGetPurchasedArticlesQuery } from 'graphql/mutations/purchase-article.generated'
import { useSession } from 'next-auth/react'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import Link from 'next/link'
import { BlueLink } from 'components/common/BlueLink'

export default function PurchasedArticles() {
  const { data: session } = useSession()
  const { data, loading } = useGetPurchasedArticlesQuery({
    skip: !session?.user
  })

  const articles = data?.articles
  return (
    <Layout>
      <Head>
        <title>Purchase History | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AccountLayout>
        <Box
          bgcolor="white"
          height="100%"
          alignItems="center"
          justifyContent="center"
          flex={1}
          p={2}
        >
          <Typography variant="h5" component="h1" my={2} color="grey.800">
            Article Purchase History
          </Typography>
          {loading ? (
            <Box>Loading...</Box>
          ) : !!articles?.length ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                  >
                    Expires At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => {
                  const a = article.article
                  const url = `/article/${a.publication_id}/${a.slug}`
                  const expired =
                    article.end && dayjs(article.end).isBefore(Date.now())
                  return (
                    <StyledTableRow key={article._id} sx={{ fontSize: 12 }}>
                      <TableCell>
                        <BlueLink href={url}>{a.publication_id}</BlueLink>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 400 }}>{a.title}</TableCell>
                      <TableCell>${article.amount.toFixed(2)}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {dayjs(article.created).format('MM/DD/YYYY HH:mm:ss A')}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Typography
                          color={expired ? 'error' : 'text.secondary'}
                          variant="body2"
                        >
                          {article.end
                            ? dayjs(article.end).format('MM/DD/YYYY HH:mm:ss A')
                            : 'N/A'}
                        </Typography>
                        {expired && (
                          <Typography color="error" variant="caption">
                            Expired
                          </Typography>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <Typography>You have no purchased articles.</Typography>
          )}
        </Box>
      </AccountLayout>
    </Layout>
  )
}
