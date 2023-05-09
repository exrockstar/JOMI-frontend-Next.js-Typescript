import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, InputLabel, MenuItem } from "@mui/material"
import FormikTextField from "components/common/formik/FormikTextFIeld"
import { Form, Formik } from "formik"
import { useCreatePageMutation } from "graphql/cms-queries/pages-list.generated"
import router from "next/router"
import { useSnackbar } from "notistack"
import React from 'react'

const PageCreateModal: React.FC<DialogProps> = ({
    children,
    ...props
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const myInitialValues = {
        title: '',
        content: ''
    }
    const [createPage, { loading }] = useCreatePageMutation({
        refetchQueries: [
            'PagesList'
        ],
        onCompleted(result) {
          enqueueSnackbar('Created Page!', {
            variant: 'success'
          })
          router.push(`/cms/page-list/${result.createPage._id}`)
          props.onClose({}, 'escapeKeyDown')
        },
        onError(e) {
          enqueueSnackbar(`Error: ${e.message}`, { variant: 'error' })
        }
    })

    const checkValues = (values : any, actions: any) => {
        if(values.title === '') {
            actions.setFieldError('title', 'Please fill the "title" field')
            return
        }
    }

    return (
        <Formik
          onSubmit={(values, actions) => {
            checkValues(values, actions);
    
            createPage({
              variables: {
                input: {
                  ...values
                }
              }
            })
            values=myInitialValues
          }}
          initialValues={myInitialValues}
        >
          {({values}) =>
          <Dialog {...props}>
          <Form>
            <DialogTitle>Create Page</DialogTitle>
            <Divider />
            <DialogContent sx={{ minWidth: 400 }}>
              <FormikTextField
                name="title"
                label="Page Title"
                placeholder="My Title"
                size="small"
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                color="error"
                onClick={(e) =>
                  props.onClose && props.onClose(e, 'backdropClick')
                }
              >
                Cancel
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Create
              </LoadingButton>
            </DialogActions>
          </Form>
          </Dialog>
          }
        </Formik>
    )
}

export default PageCreateModal