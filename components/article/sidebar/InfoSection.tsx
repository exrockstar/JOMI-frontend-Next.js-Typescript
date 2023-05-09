import React from 'react'
import { Box, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

const doiPrefix = 'https://doi.org/10.24296/jomi/'

export default function InfoSection({
  publicationId,
  productionId,
  published
}) {
  const articleId = publicationId
  let doiTag = articleId ? doiPrefix + articleId.toString() : 'DOI unavailable'
  if (productionId && productionId.length < 4) {
    productionId = '0' + productionId
  }

  let volume = 'N/A'
  let pubDateString = 'N/A'
  let issue = 'N/A'
  let pubDate = ''
  if (published) {
    const pub_date = dayjs(published)
    const GOOGLE_SCHOLAR_FORMAT = 'YYYY/MM/DD'
    pubDateString = pub_date.format(GOOGLE_SCHOLAR_FORMAT)
    issue = pub_date.month().toString()
    volume = pub_date.year().toString()
    pubDate = pub_date.toISOString()
  }

  return (
    <Box
      sx={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      component="section"
    >
      <Typography
        component="h2"
        mb={1}
        sx={{
          fontWeight: 'bold'
        }}
      >
        Article Information
      </Typography>
      <Table
        aria-label="info-table"
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderBottom: 'none'
        }}
      >
        <TableBody>
          <TableRow
            sx={{
              backgroundColor: 'grey.A200'
            }}
            component={'tr'}
          >
            <TableCell
              component="th"
              size="small"
              sx={{
                maxWidth: '220px',
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              Publication Date
            </TableCell>
            <TableCell
              component={'td'}
              size="small"
              sx={{
                maxWidth: '220px',
                overflow: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              <time dateTime={pubDate}>{pubDateString}</time>
            </TableCell>
          </TableRow>
          <TableRow
            component="tr"
            sx={{
              backgroundColor: '#fff'
            }}
          >
            <TableCell
              className="key"
              component="th"
              size="small"
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              Article ID
            </TableCell>
            <TableCell
              component="td"
              size="small"
              sx={{
                maxWidth: '220px',
                overflow: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              {publicationId}
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: 'grey.A200'
            }}
            component="tr"
          >
            <TableCell
              component="th"
              size="small"
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              Production ID
            </TableCell>
            <TableCell
              scope="row"
              size="small"
              component={'td'}
              sx={{
                maxWidth: '220px',
                overflow: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              {productionId}
            </TableCell>
          </TableRow>
          <TableRow
            component={'tr'}
            sx={{
              backgroundColor: '#fff'
            }}
          >
            <TableCell
              className="key"
              component={'th'}
              size="small"
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              Volume
            </TableCell>
            <TableCell
              component={'td'}
              size="small"
              sx={{
                maxWidth: '220px',
                overflow: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              {volume}
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: 'grey.A200'
            }}
            component="tr"
          >
            <TableCell
              component="th"
              size="small"
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              Issue
            </TableCell>
            <TableCell
              component={'td'}
              size="small"
              sx={{
                maxWidth: '220px',
                overflow: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              {publicationId}
            </TableCell>
          </TableRow>
          <TableRow
            component={'tr'}
            sx={{
              backgroundColor: '#fff'
            }}
          >
            <TableCell
              className="key"
              component="th"
              size="small"
              colSpan={3}
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200',
                fontWeight: 'bold'
              }}
            >
              DOI
            </TableCell>
          </TableRow>
          <TableRow
            component={'tr'}
            sx={{
              backgroundColor: '#fff'
            }}
          >
            <TableCell
              className="key"
              component="td"
              scope="row"
              size="small"
              colSpan={3}
              sx={{
                borderRight: '1px solid',
                borderRightColor: 'grey.200'
              }}
            >
              {doiTag}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}
