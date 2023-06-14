import { Add, Delete, Edit } from '@mui/icons-material'
import {
  Stack,
  Typography,
  Button,
  TableContainer,
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  IconButton
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useDeleteIpRangeMutation } from 'graphql/cms-queries/ip-range-management.generated'
import {
  LocationPartsFragment,
  LocationPartsFragmentDoc
} from 'graphql/cms-queries/LocationParts.generated'
import { IpRange } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import IpRangeDialog from './IpRangeDialog'
import Link from 'next/link'

type Props = {
  ip_ranges: IpRange[]
  locationId: string
  institutionId: string
}
type Mode = 'add' | 'edit'

const IpRangesList = ({ ip_ranges, locationId, institutionId }: Props) => {
  const [showDialog, setShowDialog] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [mode, setMode] = useState<Mode>('add')
  const [selected, setSelected] = useState<IpRange | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const [deleteIpRange, { client, loading: deletingRange }] =
    useDeleteIpRangeMutation({
      onCompleted(result) {
        enqueueSnackbar('Successfully deleted IpRange.', { variant: 'success' })
        client.cache.updateFragment(
          {
            fragment: LocationPartsFragmentDoc,
            fragmentName: 'LocationParts',
            id: 'Location:' + locationId
          },
          (data: LocationPartsFragment) => {
            return {
              ...data,
              ip_ranges: data.ip_ranges.filter(
                (ip_range) => ip_range._id !== result.ip_range._id
              )
            }
          }
        )
        setSelected(null)
        setConfirmDialogOpen(false)
      },
      onError(error) {
        enqueueSnackbar(`Failed to delete IpRange. ${error.message}`, {
          variant: 'error'
        })
        setSelected(null)
        setConfirmDialogOpen(false)
      }
    })
  const startCreateIpRange = () => {
    setShowDialog(true)
    setMode('add')
    setDialogTitle('Create IP Range')
    setSelected(null)
  }

  const startEditIpRange = (ip_range: IpRange) => {
    setShowDialog(true)
    setMode('edit')
    setDialogTitle('Edit IP Range')
    setSelected(ip_range)
  }

  const startDelete = (ip_range: IpRange) => {
    setSelected(ip_range)
    setConfirmDialogOpen(true)
  }

  const cancelDelete = () => {
    setConfirmDialogOpen(false)
  }
  const handleDelete = () => {
    if (!selected) return
    deleteIpRange({
      variables: { id: selected._id }
    })
  }
  return (
    <>
      <IpRangeDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        dialogTitle={dialogTitle}
        institutionId={institutionId}
        locationId={locationId}
        ip_range={selected}
        mode={mode}
        key={`ip-range-${new Date().getTime()}`}
      />
      <ConfirmationDialog
        key={'confirm-delete-range' + selected?._id}
        open={confirmDialogOpen}
        dialogTitle={'Confirm Delete Ip Range'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={deletingRange}
      >
        <Typography mb={2}>
          Are you sure you want to delete ip range?
        </Typography>
        <Typography>
          <strong> {selected?.start_string} </strong> -{' '}
          <strong>{selected?.end_string}</strong>
        </Typography>
      </ConfirmationDialog>
      <Stack direction="row" alignItems="center" spacing={2} my={2}>
        <Typography variant="h5" my={2}>
          IP Ranges
        </Typography>
        <Button
          startIcon={<Add />}
          variant="outlined"
          size="small"
          onClick={startCreateIpRange}
        >
          Create IP Range
        </Button>
      </Stack>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Last Edited By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ip_ranges?.map((ip_range) => {
                return (
                  <StyledTableRow key={ip_range._id}>
                    <TableCell>{ip_range._id}</TableCell>
                    <TableCell>{ip_range.start_string}</TableCell>
                    <TableCell>{ip_range.end_string}</TableCell>
                    <TableCell>{ip_range.notes}</TableCell>
                    <TableCell>
                      {ip_range.lastEditedBy ? (
                        <Link href={`/cms/user/${ip_range.lastEditedBy}`}>
                          {ip_range.lastEditedBy}
                        </Link>
                      ) : (
                        <span>N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => startEditIpRange(ip_range)}
                        variant="outlined"
                      >
                        Update IP Range
                      </Button>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => startDelete(ip_range)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default IpRangesList
