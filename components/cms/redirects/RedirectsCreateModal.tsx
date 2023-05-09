import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, FormControlLabel, InputLabel, MenuItem } from "@mui/material"
import FormikSwitch from "components/common/formik/FormikSwitch"
import FormikTextField from "components/common/formik/FormikTextFIeld"
import FormikSelect from "components/common/formik/FormkSelect"
import { Form, Formik } from "formik"
import { useCreateRedirectMutation } from "graphql/cms-queries/redirects-list.generated"
import { useSnackbar } from "notistack"
import React from 'react'

const RedirectsCreateModal: React.FC<DialogProps> = ({
    children,
    ...props
}) => {
    const { enqueueSnackbar } = useSnackbar()
    const myInitialValues = {
        from: '', 
        to: '',
        name: '',
        type: '301',
        track: false
    }
    const [createRedirect, { loading }] = useCreateRedirectMutation({
        refetchQueries: [
            'RedirectsList'
        ],
        onCompleted(data) {
          enqueueSnackbar('Created Redirect!', {
            variant: 'success'
          })
          props.onClose({}, 'escapeKeyDown')
        },
        onError(e) {
          enqueueSnackbar(`Error: ${e.message}`, { variant: 'error' })
        }
    })
    return (
        <Formik
          onSubmit={(values, actions) => {
            if (values.from === '') {
              actions.setFieldError('from', 'Please fill the "from" field')
              return
            }
            if(values.to === '') {
              actions.setFieldError('to', 'Please fill the "to" field')
              return
            }
    
            createRedirect({
              variables: {
                input: {
                  from: values.from,
                  to: values.to,
                  name: values.name,
                  type: values.type,
                  track: values.track
                }
              }
            })
            values=myInitialValues
          }}
          initialValues={myInitialValues}
        >
          <Dialog {...props}>
            <Form>
              <DialogTitle>Create Redirect</DialogTitle>
              <Divider />
              <DialogContent sx={{ minWidth: 400 }}>
                <FormikTextField
                  name="from"
                  label="From URL"
                  placeholder="https://jomi.com/"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <FormikTextField
                  name="to"
                  label="To URL"
                  placeholder="https://jomi.com/"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <FormikTextField
                  name="name"
                  label="Name of Redirect"
                  placeholder="Home Page"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <InputLabel htmlFor="redirect-type">Type</InputLabel>
                <FormikSelect 
                    name="type"
                    id="redirect-type"
                    size="small"
                >
                    <MenuItem value="301">301</MenuItem>
                    <MenuItem value="302">302</MenuItem>
                </FormikSelect>
                <FormControlLabel
                    control={<FormikSwitch name="track" />}
                    label="Track?"
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
        </Formik>
    )
}

export default RedirectsCreateModal