import {
  Card,
  TableContainer,
  Table,
  TableBody,
  Typography,
  Box,
  Link,
  TableCell,
  Badge,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Alert,
  CircularProgress
} from '@mui/material'
import FeedbackListTableHead from './FeedbackListTableHead'
import { useInstitutionFeedbackList } from './useInstitutionFeedbackList'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import FeedbackListPagination from './FeedbackListPagination'
import { useState } from 'react'
import { ColumnFilter } from 'graphql/types'
import { FilterList, Settings } from '@mui/icons-material'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import TableFilters from 'components/common/TableFilters'
import { useFeedbackListColumnOptions } from './feedbacklistColumnFilterOptions'
import { useGetFeedbackSettingsQuery } from 'graphql/cms-queries/feedback-list.generated'
import CircularLoader from 'components/common/CircularLoader'
const InstitutionFeedbackList = () => {
  const { items, setFilters, filters, loading, error } =
    useInstitutionFeedbackList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data: settingsData } = useGetFeedbackSettingsQuery()
  const columnOptions = useFeedbackListColumnOptions()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }
  const dateFormat = 'L'
  const NotApplicable = (
    <Typography color="text.secondary" variant="body2">
      N/A
    </Typography>
  )
  return (
    <div>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={columnOptions}
          filters={filters}
        />
      </Drawer>
      <Stack direction={'row'} justifyContent="space-between" pt={5}>
        <Typography variant="h4">Feedback</Typography>
        <Tooltip title="Filter list">
          <Badge
            badgeContent={filters?.length}
            color="secondary"
            invisible={!filters?.length}
            sx={{
              '& .MuiBadge-badge': {
                right: 8,
                top: 12
              }
            }}
          >
            <IconButton
              onClick={() => {
                setDrawerOpen(!drawerOpen)
              }}
            >
              <FilterList />
            </IconButton>
          </Badge>
        </Tooltip>
      </Stack>

      <Stack my={2}>
        <TableFilters filters={filters} />
      </Stack>
      <Card>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && (
          <Stack py={10} alignItems="center">
            <CircularProgress />
            <Typography>Loading</Typography>
          </Stack>
        )}
        {!error && !loading && (
          <TableContainer sx={{ minWidth: 1050 }}>
            <FeedbackListPagination />
            <Table>
              <FeedbackListTableHead />
              <TableBody>
                {items?.map((item, index) => {
                  const isEven = index % 2 === 0
                  const maxRating = item.question?.choices?.at(-1)
                  return (
                    <StyledTableRow key={item._id}>
                      <StickyTableCell
                        sx={{
                          p: 0,
                          maxWidth: 150,
                          backgroundColor: isEven ? '#fafafa' : 'white'
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRightColor: 'grey.100',
                            borderRightWidth: 2,
                            borderRightStyle: 'solid',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={item.user?.email}
                        >
                          {item.user ? item.user?.email : 'anonymous'}
                        </Box>
                      </StickyTableCell>
                      <TableCell
                        sx={{ maxWidth: 100, color: 'text.secondary' }}
                      >
                        {dayjs(item.createdAt).format(dateFormat)}
                      </TableCell>

                      <TableCell
                        sx={{
                          whiteSpace: 'nowrap',
                          minWidth: 150,
                          maxWidth: 180,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={item.question?.question}
                      >
                        {item.question?.question ?? NotApplicable}
                      </TableCell>
                      <TableCell title={item.value}>
                        {item.value ?? ''}
                      </TableCell>
                      <TableCell>{maxRating?.value ?? ''}</TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: 'nowrap',
                          minWidth: 150,
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={item.comment}
                      >
                        {item.comment ?? ''}
                      </TableCell>
                      <TableCell title={item.user?.user_type}>
                        {item.user?.user_type ?? 'N/A'}
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
            <FeedbackListPagination />
          </TableContainer>
        )}
      </Card>
    </div>
  )
}
export default InstitutionFeedbackList
