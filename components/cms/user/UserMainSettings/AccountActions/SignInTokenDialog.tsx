import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack
} from '@mui/material'
import { BASE_URL } from 'common/constants'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Formik, Form } from 'formik'
import { useCreateSignInTokenMutation } from 'graphql/cms-queries/user-list.generated'
import {
  UserDetailFragmentDoc,
  UserDetailFragment
} from 'graphql/cms-queries/UserListParts.fragment.generated'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string } from 'yup'

type Props = {
  userId: string
} & DialogProps

const schema = object({
  redirect: string().required('Redirect is required')
})
const SignInTokenDialog = ({ userId, ...props }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [createSignInToken, { client, loading }] = useCreateSignInTokenMutation(
    {
      onCompleted(result) {
        client.cache.updateFragment(
          {
            fragment: UserDetailFragmentDoc,
            fragmentName: 'UserDetail',
            id: `User:${userId}`
          },
          (data: UserDetailFragment) => {
            return {
              ...data,
              signInToken: result.token
            }
          }
        )
        enqueueSnackbar('Successfully created signInToken', {
          variant: 'success'
        })
        props.onClose({}, 'backdropClick')
      },
      onError(error) {
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: 'error'
        })
        props.onClose({}, 'backdropClick')
      }
    }
  )

  return (
    <Formik
      initialValues={{
        redirect: `${BASE_URL}`
      }}
      onSubmit={(values) => {
        createSignInToken({
          variables: {
            input: {
              id: userId,
              redirect: values.redirect
            }
          }
        })
      }}
      validationSchema={schema}
    >
      <Dialog {...props} maxWidth="md">
        <DialogTitle>Create Sign In Token</DialogTitle>
        <Divider />
        <DialogContent sx={{ width: { sm: '100%', md: 600 } }}>
          <Form>
            <Stack my={2}>
              <FormikTextField
                name="redirect"
                id="redirect"
                helperText="Enter the redirect URL that the user will see when they log in"
                label="Redirect URL"
                fullWidth
              />
            </Stack>
          </Form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Form>
            <Button
              onClick={(e) => {
                props.onClose && props.onClose(e, 'backdropClick')
              }}
              color="error"
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={loading}
              type="submit"
            >
              Create
            </LoadingButton>
          </Form>
        </DialogActions>
      </Dialog>
    </Formik>
  )
}

export default SignInTokenDialog
