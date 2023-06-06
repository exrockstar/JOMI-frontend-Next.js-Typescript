import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Stack
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from 'formik'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { AddUserInput, Media, UserRoles } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import Image from 'next/legacy/image'
import MediaLibraryDialog from '../MediaLibraryDialog/MediaLibraryDialog'
import { BASE_URL } from 'common/constants'
import UploadImageDialog from '../UploadImage/UploadImageDialog'
import { useCreatUserMutation } from 'graphql/cms-queries/user-list.generated'
import { useUserManagementList } from './useUserManagementList'
import { object, string } from 'yup'
import UserDetailInstitutionSelector from '../user/UserMainSettings/UserDetailInstitutionSelector'

type Props = {
  addLibrarian?: boolean
} & DialogProps

const schema = object({
  email: string().email().required(),
  password: string().min(8, 'Password must be at least 8 characters').required()
})

const AddUserDialog: React.FC<Props> = ({
  children,
  addLibrarian,
  ...props
}) => {
  const { data } = useUserTypesAndSpecialtiesQuery()
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState('/img/user-profile-icon.png')
  const { refetch } = useUserManagementList()
  const { enqueueSnackbar } = useSnackbar()
  const [createUser, { loading: creatingUser }] = useCreatUserMutation({
    onCompleted(result) {
      refetch()
      enqueueSnackbar(`Successfully created user: ${result.createUser._id}`, {
        variant: 'success'
      })
      props.onClose({}, 'backdropClick')
    },
    onError(error) {
      enqueueSnackbar(`Error creating user: ${error.message}`, {
        variant: 'error'
      })
    }
  })
  const [image, setImage] = useState<{
    name: string
    size: number
  }>(null)
  const userTypes = data?.userTypes ?? []
  const dialogTitle = addLibrarian ? 'Add new Librarian' : 'Add New User'
  const handleRemoveImage = () => {
    setImage(null)
    setImageUrl('/img/user-profile-icon.png')
  }

  const roles = Object.keys(UserRoles).filter(
    (role) => role !== UserRoles.Superadmin
  )
  const handleSubmit = (values, actions) => {
    const input: AddUserInput = {
      ...values
    }
    if (image) {
      input.image = {
        filename: image.name,
        format: image.name.split('.').pop(),
        length: image.size
      }
    }

    if (values.user_role === UserRoles.Librarian && !values.institution) {
      actions.setFieldError(
        'institution',
        'Institution is required for librarians.'
      )
      return
    }
    createUser({
      variables: {
        input
      }
    })
  }
  return (
    <>
      <MediaLibraryDialog
        open={showMediaLibrary}
        onClose={() => {
          setShowMediaLibrary(false)
        }}
        onSelectImage={(media: Media) => {
          if (media) {
            const newUrl = `${BASE_URL}/api/files/${media.filename}`
            setImage({ name: media.filename, size: media.length })
            setImageUrl(newUrl)
          }
          setShowMediaLibrary(false)
        }}
      />
      <UploadImageDialog
        open={openUploadDialog}
        onClose={() => {
          setOpenUploadDialog(false)
        }}
        onCompleted={(uploaded: { name: string; size: number }) => {
          const newUrl = `${BASE_URL}/api/files/${uploaded.name}`
          setImage(uploaded)
          setImageUrl(newUrl)
          setOpenUploadDialog(false)
        }}
      />
      <Formik<AddUserInput>
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{
          display_name: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          institution: '',
          matched_institution_name: '',
          user_type: 'Other',
          user_role: !addLibrarian ? UserRoles.User : UserRoles.Librarian
        }}
      >
        <Dialog {...props}>
          <DialogTitle>{dialogTitle} </DialogTitle>
          <Divider />

          <DialogContent sx={{ minWidth: 400 }}>
            <Form>
              <Stack spacing={1.5}>
                {!addLibrarian && (
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel>Image</FormLabel>
                    <Stack alignItems="center" spacing={1} direction="row">
                      <Box
                        position="relative"
                        width={80}
                        height={80}
                        sx={{ backgroundColor: 'neutral.200' }}
                      >
                        <Image
                          src={imageUrl}
                          alt="institution-logo"
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>

                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => setOpenUploadDialog(true)}
                      >
                        Upload New Image
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => setShowMediaLibrary(true)}
                      >
                        Choose From Library
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    </Stack>
                  </FormControl>
                )}
                <FormikTextField
                  name="email"
                  label="Email (Required)"
                  placeholder="e.g., spaceman.spiff@example.com"
                  helperText="If you do not know or do not wish to use the user's real email address, just use the domain example.com instead"
                  size="small"
                  fullWidth
                />
                <FormikTextField
                  name="password"
                  label="Password (Required)"
                  placeholder="********"
                  helperText="Password must be 8 characters long"
                  size="small"
                  fullWidth
                />
                <FormikTextField
                  name="display_name"
                  label="Display name"
                  placeholder="e.g., Spaceman Spiff"
                  helperText="This is the name displayed on articles, comments, etc. For doctors, write their full title (e.g., Jane Doctor MD PhD)"
                  size="small"
                  fullWidth
                />
                <FormikTextField
                  name="firstName"
                  label="First name"
                  placeholder="e.g., Spaceman "
                  size="small"
                  fullWidth
                />
                <FormikTextField
                  name="lastName"
                  label="Last name"
                  placeholder="e.g., Spiff"
                  size="small"
                  fullWidth
                />

                <UserDetailInstitutionSelector />
                <FormikTextField
                  name="institution"
                  label="Matched Institution ID"
                  size="small"
                  disabled
                />
                <FormikSelect
                  fullWidth
                  label="User Type"
                  size="small"
                  name="user_type"
                  id="user_type"
                >
                  {userTypes?.map((item) => (
                    <MenuItem value={item.type} key={item._id}>
                      {item.type}
                    </MenuItem>
                  ))}
                </FormikSelect>
                <FormikSelect
                  fullWidth
                  label="User Role"
                  size="small"
                  name="user_role"
                  id="user_role"
                  helperText={
                    addLibrarian
                      ? 'New librarians set to role "librarian" by default'
                      : ''
                  }
                  disabled={addLibrarian}
                >
                  {roles.map((item, i) => (
                    <MenuItem value={UserRoles[item]} key={i}>
                      {UserRoles[item]}
                    </MenuItem>
                  ))}
                </FormikSelect>
              </Stack>
            </Form>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button
              color="error"
              onClick={(e) =>
                props.onClose && props.onClose(e, 'backdropClick')
              }
            >
              Cancel
            </Button>
            <Form>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                loading={creatingUser}
              >
                Add User
              </LoadingButton>
            </Form>
          </DialogActions>
        </Dialog>
      </Formik>
    </>
  )
}

export default AddUserDialog
