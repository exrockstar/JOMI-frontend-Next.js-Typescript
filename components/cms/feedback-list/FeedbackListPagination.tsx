import { Box, TablePagination } from '@mui/material'
import { useFeedbackList } from './FeedbackListProvider'

const FeedbackListPagination = () => {
  const { count, page, pageSize, setPage, setPageSize } = useFeedbackList()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  return (
    <Box position="sticky" left={0}>
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
    </Box>
  )
}
export default FeedbackListPagination
