import {
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TablePagination,
  Table,
  Link as MuiLink,
  Button,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import {
  PagesListQuery,
  useDeletePageMutation
} from 'graphql/cms-queries/pages-list.generated'
import { usePagesList } from './usePagesList'
import PagesTableHead from './PagesTableHead'
import { Delete, Edit } from '@mui/icons-material'
import router from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

type Props = {
  pages: PagesListQuery['fetchPages']['pages']
  totalCount: number
}

type Page = Unpacked<PagesListQuery['fetchPages']['pages']>

const PagesList: React.FC<Props> = ({ pages, totalCount }) => {
  //page var is used for pagination
  const { page, setPage, pageSize, setPageSize } = usePagesList()
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }
  const [deletePage, { loading: deleteLoading }] = useDeletePageMutation({
    refetchQueries: ['PagesList'],
    onCompleted() {
      enqueueSnackbar(`Page Deleted!`, {
        variant: 'success'
      })
    },
    onError: (err) => {
      enqueueSnackbar(`Error deleting Page: ${err.message}`, {
        variant: 'error'
      })
    }
  })

  const startDelete = (page: Page) => {
    setSelectedPage(page)
    setShowDeleteDialog(true)
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setSelectedPage(null)
  }

  const handleDelete = () => {
    if (!selectedPage) return
    deletePage({
      variables: { id: selectedPage._id }
    })
    setShowDeleteDialog(false)
    setSelectedPage(null)
  }

  return (
    <>
      <ConfirmationDialog
        key={'confirm-delete-page' + selectedPage?._id}
        open={showDeleteDialog}
        dialogTitle={'Please confirm this deletion'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
      >
        <Typography mb={2}>
          Are you sure you want to delete this page?
        </Typography>
        <Typography>
          <strong> {selectedPage?.title} </strong>
        </Typography>
      </ConfirmationDialog>
      <Card>
        <TableContainer sx={{ minWidth: 1050 }}>
          <Table>
            <PagesTableHead />
            <TableBody>
              {pages?.map((page) => {
                return (
                  <StyledTableRow key={page._id}>
                    {page.title ? (
                      <TableCell>{page.title}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {page.status ? (
                      <TableCell>{page.status}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {page.slug ? (
                      <TableCell>{page.slug}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    {page.author ? (
                      <TableCell>
                        {page.author.name.first} {page.author.name.last}
                      </TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    <TableCell>
                      <Button
                        color="primary"
                        startIcon={<Edit />}
                        sx={{ mr: 2 }}
                        variant="outlined"
                        onClick={() => {
                          router.push(`/cms/page-list/${page._id}`)
                        }}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        startIcon={<Delete />}
                        size="small"
                        variant="contained"
                        onClick={() => {
                          startDelete(page)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
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
        </TableContainer>
      </Card>
    </>
  )
}

export default PagesList
