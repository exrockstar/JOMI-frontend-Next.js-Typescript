import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  Stack,
  Divider
} from '@mui/material'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { useUpdateInstitutionContactsMutation } from 'graphql/cms-queries/create-institution.generated'
import { ContactPerson, ContactPersonInput } from 'graphql/types'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { boolean, object, string, TypeOf, number } from 'yup'

type ContactPersonWithId = ContactPerson & { id: number }
type Props = {
  poc?: ContactPersonWithId
  contacts: ContactPersonWithId[]
  dialogTitle: string
} & DialogProps

const defaultPoc: ContactPersonWithId = {
  email: '',
  name: '',
  role: 'Librarian',
  isMainContact: false,
  notes: 'Request this article with your library to gain access.',
  id: -1
}

const schema = object({
  email: string().required().email('Enter a valid email'),
  name: string().optional(),
  role: string().required('Please enter a role'),
  isMainContact: boolean().required(),
  notes: string().optional(),
  id: number().required()
})

const EditPocModal = ({
  poc,
  contacts,
  dialogTitle = 'Add Point of Contact',
  ...props
}: Props) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [updatePocs, { client, loading }] =
    useUpdateInstitutionContactsMutation({
      onCompleted(data) {
        enqueueSnackbar('Successfully updated points of contact', {
          variant: 'success'
        })
        props.onClose({}, 'escapeKeyDown')
      },
      onError(error) {
        enqueueSnackbar(`${error.message}`, { variant: 'error' })
      }
    })

  const handleSubmit = (values: TypeOf<typeof schema>) => {
    const [institutionId] = router.query.id as string[]
    const isAdd = dialogTitle === 'Add Point of Contact'
    let updatedContacts: ContactPersonInput[]
    if (isAdd) {
      updatedContacts = [
        ...contacts.map((contact) => {
          return {
            ...contact,
            isMainContact: values.isMainContact ? false : contact.isMainContact
          }
        }),
        values
      ]
    } else {
      updatedContacts = contacts.map((contact) => {
        if (contact.id === values.id) {
          return values
        }
        return {
          ...contact,
          isMainContact: values.isMainContact ? false : contact.isMainContact
        }
      })
    }

    updatePocs({
      variables: {
        contacts: updatedContacts.map((c) => ({
          email: c.email,
          name: c.name,
          isMainContact: c.isMainContact,
          role: c.role,
          notes: c.notes
        })),
        id: institutionId
      }
    })
  }
  return (
    <Formik
      initialValues={
        poc ?? {
          ...defaultPoc,
          id: contacts.length
        }
      }
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Dialog {...props} maxWidth={'md'}>
        <Form>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={2} width={600}>
              <FormikTextField label="Email" name="email" size="small" />
              <FormikTextField label="Name" size="small" name="name" />
              <FormikTextField label="Role" size="small" name="role" />
              <FormControlLabel
                control={<FormikCheckbox name="isMainContact" size="small" />}
                label="Set as main contact"
              />

              <FormikTextField label="Message" size="small" name="notes" />
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => props.onClose(e, 'backdropClick')}
            >
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Submit
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default EditPocModal
