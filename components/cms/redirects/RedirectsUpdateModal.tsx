import { Dialog, DialogTitle, Divider, DialogContent, Stack, DialogActions, Button, DialogProps, FormLabel, FormControlLabel, InputLabel, MenuItem } from "@mui/material"
import FormikTextField from "components/common/formik/FormikTextFIeld"
import FormikSwitch from 'components/common/formik/FormikSwitch'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from "formik"
// import { RedirectPartsFragmentDoc } from "graphql/cms-queries/RedirectParts.generated"
import { RedirectsListDocument, useUpdateRedirectMutation } from "graphql/cms-queries/redirects-list.generated"
import { Redirect } from "graphql/types"
import { useSnackbar } from "notistack"
import { object, string, boolean } from "yup"
import { LoadingButton } from "@mui/lab"

type Props = {
    redirect?: Redirect
    onCompleted(): void
  } & DialogProps

const schema = object({
    id: string().required(),
    // created: redirect?.created,
    // updated: redirect?.updated,
    // author: redirect?.author,
    name: string().optional(),
    from: string().optional(),
    to: string().optional(),
    type: string().optional(),
    track: boolean().optional(),
    // stats: redirect?.stats
})

const RedirectsUpdateModal: React.FC<Props> = ({
    children,
    redirect,
    onCompleted,
    ...props
  }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [updateRedirectMutation, { client, loading }] = useUpdateRedirectMutation({
        refetchQueries: [
            'RedirectsList'
        ],
        onCompleted() {
            enqueueSnackbar(`Successfully updated redirect!`, {
              variant: 'success'
            })
            onCompleted()
          },
          onError(error) {
            enqueueSnackbar(error.message, { variant: 'error' })
          }
    });

    const handleSubmit = (input) => {
        updateRedirectMutation({
          variables: {
            input: {
              ...input
            }
          }
        })
      }
    return (
        <Formik
        onSubmit={handleSubmit}
        initialValues={{
            id: redirect?._id,
            // created: redirect?.created,
            // updated: redirect?.updated,
            // author: redirect?.author,
            name: redirect?.name,
            from: redirect?.from,
            to: redirect?.to,
            type: redirect?.type,
            track: redirect?.track,
            // stats: redirect?.stats
        }}
        validationSchema={schema}
        >
        <Dialog {...props} maxWidth="sm">
            <Form>
            <DialogTitle>Update Redirect</DialogTitle>
            <Divider />
            <DialogContent>
                <Stack spacing={2} width={500}>
                <FormikTextField
                    name="name"
                    label="Name"
                    size="small"
                    placeholder="e.g., My Redirect"
                />
                <FormikTextField
                    name="from"
                    label="From"
                    size="small"
                    placeholder="e.g., https://jomi.com/"
                />
                <FormikTextField
                    name="to"
                    label="To"
                    size="small"
                    placeholder="e.g., https://jomi.com/"
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
                </Stack>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 3 }}>
                <Button
                color="error"
                variant="outlined"
                onClick={(e) => props.onClose(e, 'backdropClick')}
                >
                    Cancel
                </Button>
                <LoadingButton variant="contained" type="submit" loading={loading}>
                    Update
                </LoadingButton>
            </DialogActions>
            </Form>
        </Dialog>
        </Formik>
    )
    }

export default RedirectsUpdateModal