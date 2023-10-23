import { Delete, Edit } from '@mui/icons-material'
import {
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TablePagination,
  Table,
  Button
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
import DeleteDialog from 'components/common/cms/DeleteDialog'

type Props = {
  redirects: RedirectsListQuery['fetchRedirects']['redirects']
  count: number
}

const RedirectsList: React.FC<Props> = ({ redirects, count }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedRedirect, setSelectedRedirect] = useState(null)
  const [deleteID, setDeleteID] = useState(null)
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
  const [deleteRedirect] = useDeleteRedirectMutation({
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
  return (
    <>
      <RedirectsUpdateModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onCompleted={() => setUpdateModalOpen(false)}
        redirect={selectedRedirect}
        key={new Date().getTime()}
      />
      <DeleteDialog 
        deleteMutation={deleteRedirect} 
        deleteOpts={{
          variables: {
            input: { _id: deleteID }
          }
        }} 
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
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
                          setSelectedRedirect(redir)
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
                          setDeleteID(redir._id)
                          setShowDeleteDialog(true)
                          // deleteRedirect({
                          //   variables: {
                          //     input: { _id: redir._id }
                          //   }
                          // })
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
