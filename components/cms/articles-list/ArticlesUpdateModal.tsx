import { Dialog, DialogTitle, Divider, DialogContent, Stack, DialogActions, Button, DialogProps, FormLabel, FormControlLabel, InputLabel, MenuItem } from "@mui/material"
import FormikTextField from "components/common/formik/FormikTextFIeld"
import FormikSwitch from 'components/common/formik/FormikSwitch'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from "formik"
import FormikDatePicker from 'components/common/formik/FormikDatePicker'
import { useUpdateArticleMutation } from "graphql/cms-queries/articles-list.generated"
import { Article } from "graphql/types"
import { useSnackbar } from "notistack"
import { object, string, boolean, date } from "yup"
import { LoadingButton } from "@mui/lab"

type Props = {
    article?: Article
    onCompleted(): void
  } & DialogProps

const schema = object({
    id: string().required(),
    title: string().optional().nullable(),
    publication_id: string().optional().nullable(),
    production_id: string().optional().nullable(),
    status: string().optional().nullable(),
    published: date().optional().nullable(),
    preprint_date: date().optional().nullable(),
    has_complete_abstract: boolean().optional().nullable(),
    restrictions: string().optional().nullable(),
    DOIStatus: string().optional().nullable()
})

const ArticlesUpdateModal: React.FC<Props> = ({
    children,
    article,
    onCompleted,
    ...props
  }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [updateArticleMutation, { loading }] = useUpdateArticleMutation({
        refetchQueries: [
            'ArticlesList'
        ],
        onCompleted() {
            enqueueSnackbar(`Successfully updated article!`, {
              variant: 'success'
            })
            onCompleted()
          },
          onError(error) {
            enqueueSnackbar(error.message, { variant: 'error' })
          }
    })

    const handleSubmit = (input) => {
        updateArticleMutation({
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
            id: article?._id,
            title: article?.title,
            publication_id: article?.publication_id,
            production_id: article?.production_id,
            status: article?.status,
            published: article?.published,
            preprint_date: article?.preprint_date,
            has_complete_abstract: article?.has_complete_abstract,
            restrictions: article?.restrictions?.article,
            DOIStatus: article?.DOIStatus
        }}
        validationSchema={schema}
        >
        <Dialog {...props} maxWidth="sm">
            <Form>
            <DialogTitle>Update Article</DialogTitle>
            <Divider />
            <DialogContent>
                <Stack spacing={2} width={500}>
                <FormikTextField
                    name="title"
                    label="Title"
                    size="small"
                    placeholder="e.g., My Article"
                />
                <FormikTextField
                    name="publication_id"
                    label="Publication ID"
                    size="small"
                    placeholder="e.g., 1 or 1Example.01"
                />
                <FormikTextField
                    name="production_id"
                    label="Production ID"
                    size="small"
                    placeholder="e.g., 0012 or 0123.4"
                />
                <InputLabel htmlFor="article-status">Status</InputLabel>
                <FormikSelect 
                    name="status"
                    id="article-status"
                    size="small"
                >
                    <MenuItem value="coming_soon">Coming Soon</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="in_production">In Production</MenuItem>
                    <MenuItem value="preprint">Preprint</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                </FormikSelect>
                <FormikDatePicker name="published" label="Published Date" />
                <FormikDatePicker name="preprint_date" label="Preprint Date" />
                <FormControlLabel
                    control={<FormikSwitch name="has_complete_abstract" />}
                    label="Abstract Done?"
                />
                <InputLabel htmlFor="article-restrictions">Restrictions</InputLabel>
                <FormikSelect 
                    name="restrictions"
                    id="article-restrictions"
                    size="small"
                >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Free">Free</MenuItem>
                    <MenuItem value="RequiresSubscription">Requires Subscription</MenuItem>
                    <MenuItem value="Evaluation">Evaluation</MenuItem>
                </FormikSelect>
                {article?.DOIStatus !== "preprint" && article?.DOIStatus !== "publish" ?
                    <>
                    <InputLabel htmlFor="article-DOIStatus">DOI Status</InputLabel>
                    <FormikSelect
                        name="DOIStatus"
                        id="article-DOIStatus"
                        size="small"
                    >
                        <MenuItem value="false">False</MenuItem>
                        <MenuItem value="not required">Not Required</MenuItem>
                        <MenuItem value="preprint">Preprint</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                    </FormikSelect>
                    </>
                : <></>}
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

export default ArticlesUpdateModal

