import { Edit, Delete, Save, Close, OpenInNew } from '@mui/icons-material'
import {
  Box,
  Card,
  Table,
  TableCell,
  TableBody,
  TablePagination,
  TableContainer,
  Button,
  Input,
  Link
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { BASE_URL } from 'common/constants'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import {
  MediaLibraryQuery,
  useDeleteMediaMutation,
  useUpdateMediaLibraryMutation
} from 'graphql/cms-queries/media-library.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import MediaLibraryTableHead from './MediaLibraryTableHead'
import { useMediaLibraryList } from './useMediaLibraryList'
import MediaLibraryImage from './MediaLibraryImage'
import NextLink from 'next/link'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
type Props = {
  medias: MediaLibraryQuery['files']['files']
  count: number
}

type Media = Unpacked<MediaLibraryQuery['files']['files']>

const MediaLibraryList: React.FC<Props> = ({ medias, count }) => {
  const { page, setPage, pageSize, setPageSize, refetch } =
    useMediaLibraryList()
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selected, setSelected] = useState<Media | null>(null)
  const { enqueueSnackbar } = useSnackbar()
  const [editRowId, setEditRowId] = useState('')
  const [editData, setEditData] = useState({
    title: '',
    description: ''
  })

  const [deleteMedia, { loading: deleteLoading }] = useDeleteMediaMutation({
    onCompleted: () => {
      refetch()
      enqueueSnackbar(`Media has been deleted.`, {
        variant: 'success'
      })
    },
    onError: () => {
      enqueueSnackbar("Couldn't delete the media", {
        variant: 'error'
      })
    }
  })

  const [updateMediaLibrary] = useUpdateMediaLibraryMutation({
    onCompleted: ({}) => {
      setEditRowId('')
      setEditData({
        title: '',
        description: ''
      })
      refetch()
      enqueueSnackbar(`Media has been updated.`, {
        variant: 'success'
      })
    },
    onError: () => {
      enqueueSnackbar("Couldn't update the media", {
        variant: 'error'
      })
    }
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Table>
          <MediaLibraryTableHead />
          <TableBody>
            {medias?.map((media) => {
              const url = `${BASE_URL}/api/files/${media.filename}`
              const created = dayjs(media.uploadDate).format('MM/DD/YYYY')

              return (
                <StyledTableRow key={media._id}>
                  <TableCell sx={{ width: 100 }}>
                    <Box
                      position="relative"
                      width={100}
                      sx={{
                        '& :hover': {
                          cursor: 'pointer'
                        },
                        height: 100
                      }}
                    >
                      <MediaLibraryImage src={url} alt={media.filename} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/api/files/${media.filename}`}
                      target="_blank"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      underline="hover"
                    >
                      {media.filename}
                      <OpenInNew fontSize={'inherit'} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {editRowId !== media._id ? (
                      media.metadata?.title ?? 'N/A'
                    ) : (
                      <Input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 400 }}>
                    {editRowId !== media._id ? (
                      media.metadata?.description ?? 'N/A'
                    ) : (
                      <Input
                        value={editData.description ?? 'N/A'}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value
                          })
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>{created}</TableCell>
                  <TableCell>
                    {editRowId !== media._id && (
                      <Button
                        color="primary"
                        startIcon={<Edit />}
                        sx={{ mr: 2 }}
                        variant="outlined"
                        onClick={() => {
                          setEditRowId(media._id)
                          setEditData({
                            title: media.metadata?.title ?? 'N/A',
                            description: media.metadata?.description ?? 'N/A'
                          })
                        }}
                        size="small"
                      >
                        Edit
                      </Button>
                    )}
                    {editRowId === media._id && (
                      <>
                        <Button
                          color="primary"
                          startIcon={<Save />}
                          sx={{ mr: 2 }}
                          variant="outlined"
                          onClick={() =>
                            updateMediaLibrary({
                              variables: {
                                input: {
                                  id: media._id,
                                  ...editData
                                }
                              }
                            })
                          }
                          size="small"
                        >
                          Save
                        </Button>
                        <Button
                          color="primary"
                          startIcon={<Close />}
                          sx={{ mr: 2 }}
                          variant="outlined"
                          onClick={() => setEditRowId('')}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    <LoadingButton
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => {
                        setSelected(media)
                      }}
                      loading={deleteLoading}
                    >
                      Delete
                    </LoadingButton>
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
        />
      </TableContainer>
      <ConfirmationDialog
        key={'confirm-delete-range' + selected}
        open={!!selected}
        dialogTitle={'Delete File'}
        onClose={() => {
          setSelected(null)
        }}
        onComplete={() => {
          deleteMedia({
            variables: {
              _id: selected._id
            }
          })
          setSelected(null)
        }}
        onCancel={() => {
          setSelected(null)
        }}
        loading={deleteLoading}
      >
        Are you sure you want to delete <b>{selected?.filename}</b>?
      </ConfirmationDialog>
    </Card>
  )
}

export default MediaLibraryList
