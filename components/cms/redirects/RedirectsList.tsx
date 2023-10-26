import { Delete, Edit } from '@mui/icons-material'
import {
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TablePagination,
  Table,
  Button,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import {
  RedirectsListQuery,
  useDeleteRedirectMutation
} from 'graphql/cms-queries/redirects-list.generated'
import RedirectsTableHead from './RedirectsTableHead'
import { useRedirectsList } from './useRedirectsList'
import RedirectsUpdateModal from './RedirectsUpdateModal'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

type Props = {
  redirects: RedirectsListQuery['fetchRedirects']['redirects']
  count: number
}

type Redirect = Unpacked<RedirectsListQuery['fetchRedirects']['redirects']>

const RedirectsList: React.FC<Props> = ({ redirects, count }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedUpdateRedirect, setSelectedUpdateRedirect] = useState(null)
  const [selectedDeleteRedirect, setSelectedDeleteRedirect] = useState<Redirect | null>(null)
  const { page, setPage, pageSize, setPageSize } = useRedirectsList()
  const { enqueueSnackbar } = useSnackbar()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }
  const [deleteRedirect, { loading: deleteLoading}] = useDeleteRedirectMutation({
    refetchQueries: ['RedirectsList'],
    onCompleted() {
      enqueueSnackbar(`Redirect Deleted!`, {
        variant: 'success'
      })
    },
    onError: (error) => {
      enqueueSnackbar('Error deleting Redirect', {
        variant: 'error'
      })
    }
  })

  const startDelete = (redirect: Redirect) => {
    setSelectedDeleteRedirect(redirect)
    setShowDeleteDialog(true)
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setSelectedDeleteRedirect(null)
  }

  const handleDelete = () => {
    if (!selectedDeleteRedirect) return
    deleteRedirect({
      variables: { input: { _id: selectedDeleteRedirect._id } }
    })
    setShowDeleteDialog(false)
    setSelectedDeleteRedirect(null)
  }

  return (
    <>
      <RedirectsUpdateModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onCompleted={() => setUpdateModalOpen(false)}
        redirect={selectedUpdateRedirect}
        key={new Date().getTime()}
      />
      <ConfirmationDialog
        key={'confirm-delete-redirect' + selectedDeleteRedirect?._id}
        open={showDeleteDialog}
        dialogTitle={'Please confirm this deletion'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={deleteLoading}
      >
        <Typography mb={2}>
          Are you sure you want to delete this redirect?
        </Typography>
        <Typography>
          <strong> {selectedDeleteRedirect?.name} </strong>
        </Typography>
      </ConfirmationDialog>
      <Card>
        <TableContainer sx={{ minWidth: 1050 }}>
          <Table>
            <RedirectsTableHead />
            <TableBody>
              {redirects?.map((redir) => {
                return (
                  <StyledTableRow key={redir.from}>
                    {redir.name ? (
                      <TableCell>{redir.name}</TableCell>
                    ) : (
                      <TableCell>N/A</TableCell>
                    )}
                    <TableCell>{redir.from}</TableCell>
                    <TableCell>{redir.to}</TableCell>
                    {redir.stats ? (
                      <TableCell>{redir.stats.length}</TableCell>
                    ) : (
                      <TableCell>0</TableCell>
                    )}
                    {redir.author ? (
                      <TableCell>
                        {redir.author.name.first} {redir.author.name.last}
                      </TableCell>
                    ) : (
                      <TableCell>None</TableCell>
                    )}
                    <TableCell>{redir.type}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        startIcon={<Edit />}
                        sx={{ mr: 2 }}
                        variant="outlined"
                        onClick={() => {
                          setSelectedUpdateRedirect(redir)
                          setUpdateModalOpen(true)
                        }}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        startIcon={<Delete />}
                        variant="outlined"
                        onClick={() => {
                          startDelete(redir)
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
            count={count}
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

export default RedirectsList
