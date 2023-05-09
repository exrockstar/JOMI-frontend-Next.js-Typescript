import { Add, Delete, EditOutlined } from '@mui/icons-material'
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
  Stack,
  Box,
  Tooltip
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useUpdateInstitutionContactsMutation } from 'graphql/cms-queries/create-institution.generated'
import { InstitutionByIdDocument } from 'graphql/cms-queries/institutions-list.generated'
import { ContactPerson, ContactPersonInput } from 'graphql/types'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import EditPocModal from './EditPocModal'

type ContactPersonWithId = ContactPerson & { id: number }
type Props = {
  contacts: ContactPerson[]
}
const PointOfContactsList = ({ contacts }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [selected, setSelected] = useState<ContactPersonWithId | null>(null)

  const withIdContacts = contacts.map((contact, index) => {
    return {
      ...contact,
      id: index
    } as ContactPersonWithId
  })

  const [updatePocs, { client, loading }] =
    useUpdateInstitutionContactsMutation({
      onCompleted(result) {
        enqueueSnackbar('Successfully updated points of contact', {
          variant: 'success'
        })
        client.cache.updateQuery({ query: InstitutionByIdDocument }, () => {
          return result
        })
        setConfirmDialogOpen(false)
        setSelected(null)
      },
      onError(error) {
        enqueueSnackbar(`${error.message}`, { variant: 'error' })
      }
    })

  const startAddContact = () => {
    setDialogTitle('Add Point of Contact')
    setModalOpen(true)
    setSelected(null)
  }

  const startEditContact = (contact: ContactPersonWithId) => {
    setModalOpen(true)
    setDialogTitle('Edit Point of Contact')
    setSelected(contact)
  }

  const startDeleteContact = (contact: ContactPersonWithId) => {
    setConfirmDialogOpen(true)
    setSelected(contact)
  }

  const handleClose = () => {
    console.log('handle close')
    setModalOpen(false)
    setSelected(null)
  }

  const cancelDelete = () => {
    setConfirmDialogOpen(false)
    setSelected(null)
  }

  const handleDelete = () => {
    console.log('onComplete')
    const [institutionId] = router.query.id as string[]

    let updatedContacts: ContactPerson[] = contacts.filter((c) => {
      return selected.email !== c.email
    })

    const updated = updatedContacts.map((c, index) => {
      const isMainContact =
        c.isMainContact || (selected.isMainContact && index === 0)
      return {
        email: c.email,
        name: c.name,
        isMainContact,
        role: c.role,
        notes: c.notes
      }
    })

    updatePocs({
      variables: {
        id: institutionId,
        contacts: updated
      }
    })
  }

  const toggleMainContact = (contact: ContactPersonWithId) => {
    if (contact.isMainContact) return
    const [institutionId] = router.query.id as string[]

    const updated = withIdContacts.map((c, index) => {
      return {
        email: c.email,
        name: c.name,
        isMainContact: contact.id === c.id,
        role: c.role,
        notes: c.notes
      }
    })

    updatePocs({
      variables: {
        id: institutionId,
        contacts: updated
      }
    })
  }

  return (
    <>
      <EditPocModal
        open={modalOpen}
        onClose={() => handleClose()}
        dialogTitle={dialogTitle}
        poc={selected}
        contacts={withIdContacts}
        // add key to re-render modal when selected is changed
        key={'addedit-' + new Date().getTime()}
      />
      <ConfirmationDialog
        key={'confirm-' + selected?.id}
        open={confirmDialogOpen}
        dialogTitle={'Confirm Delete Contact'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={loading}
      >
        Are you sure you want to delete <strong> {selected?.email} </strong>
        contact?
      </ConfirmationDialog>
      <Box my={2}>
        <Button
          variant="contained"
          onClick={startAddContact}
          startIcon={<Add />}
        >
          Add Point of Contact
        </Button>
      </Box>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Main Contact</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withIdContacts.map((contact) => {
                return (
                  <StyledTableRow key={contact.id}>
                    <TableCell>{contact.name || 'N/A'}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.role || 'N/A'}</TableCell>
                    <TableCell>
                      <Tooltip title="click to toggle ">
                        <Chip
                          label={contact.isMainContact ? 'Yes' : 'No'}
                          variant="outlined"
                          color={contact.isMainContact ? 'success' : 'error'}
                          size="small"
                          clickable
                          onClick={() => toggleMainContact(contact)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>{contact.notes ?? 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        startIcon={<EditOutlined />}
                        variant="outlined"
                        onClick={() => startEditContact(contact)}
                        size="small"
                      >
                        Edit
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => startDeleteContact(contact)}
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

export default PointOfContactsList
