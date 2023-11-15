import { OpenInNew, Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  Button
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from 'formik'
import {
  PageByIdDocument,
  PageByIdQuery,
  useUpdatePageMutation
} from 'graphql/cms-queries/pages-list.generated'
import { UpdatePageInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import TextEditor from 'ui/TextEditor'
import { object, string, array } from 'yup'
import { ScriptsList } from '../pages-list/ScriptsList'

type Props = {
  page: PageByIdQuery['page']
}

const schema = object({
  id: string().required(),
  title: string(),
  scripts: array().optional().nullable(),
  slug: string(),
  password: string().optional().nullable(),
  content: string().optional().nullable(),
  status: string().optional().nullable(),
  meta_desc: string().optional().nullable(),
  sidebar: string().optional().nullable()
})
const PageDetails = ({ page }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [newContent, setNewContent] = useState(page.content)
  const [updating, setUpdating] = useState(false)
  const [updatePage, { client, loading }] = useUpdatePageMutation({
    refetchQueries: ['PageById'],
    async onCompleted(result) {
      enqueueSnackbar('Update received, revalidating page', {
        variant: 'success'
      })
      client.cache.updateQuery({ query: PageByIdDocument }, () => {
        return {
          page: result.page
        }
      })
      try {
        await fetch(`/api/revalidate?path=/${result.page.slug}`)
        enqueueSnackbar(`Successfully updated page`, {
          variant: 'success'
        })
      } catch (e) {
        enqueueSnackbar(`Couldn't update page: ${e.message}`, {
          variant: 'error'
        })
      }
      setUpdating(false)
    },
    onError(err) {
      enqueueSnackbar(`Update error: ${err.message}`, {
        variant: 'error'
      })
      setUpdating(false)
    }
  })

  const setContent = (value) => {
    setNewContent(value)
  }

  return (
    <>
      <Formik
        key={page._id}
        onSubmit={(values) => {
          const input: UpdatePageInput = {
            id: values.id,
            title: values.title,
            scripts: values.scripts,
            slug: values.slug,
            password: values.password,
            content: newContent,
            status: values.status,
            meta_desc: values.meta_desc,
            sidebar: values.sidebar
          }
          input.id = page._id
          setUpdating(true)
          updatePage({
            variables: {
              input
            }
          })
        }}
        validationSchema={schema}
        initialValues={{
          id: page._id,
          title: page.title,
          scripts: page.scripts ?? [''],
          slug: page.slug,
          password: null,
          content: page.content,
          status: page.status,
          meta_desc: page.meta_desc ?? null,
          sidebar: page.sidebar ?? null
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6} gap={2}>
              <Stack>
                <FormikTextField
                  name="title"
                  label="Page Title"
                  placeholder="My Title"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <FormikTextField
                  name="slug"
                  label="Page Slug"
                  placeholder="my-title"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <Alert severity="info">
                  Used for the URL of the page. E.g.,
                  https://dev1.jomi.com/page_slug
                </Alert>
                <InputLabel htmlFor="status-type">Status</InputLabel>
                <FormikSelect name="status" id="status-type" size="small">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="publish">Publish</MenuItem>
                </FormikSelect>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <FormikTextField
                  name="password"
                  label="Page Password"
                  placeholder="MyExtremelySafePassword"
                  size="small"
                  fullWidth
                  margin="normal"
                />
                <Alert severity="warning">
                  If the password field is provided, a user will be prompted to
                  enter this password when first accessing this page, in their
                  browser.
                </Alert>
                <InputLabel htmlFor="sidebar-type">Sidebar</InputLabel>
                <FormikSelect name="sidebar" id="sidebar-type" size="small">
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="JoMI Info">JoMI Info</MenuItem>
                </FormikSelect>
              </Stack>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <FormikTextField
                name="meta_desc"
                label="Metadata Description"
                placeholder="This is the descriptive text that shows up in search engines"
                size="small"
                fullWidth
                margin="normal"
              />
              <TextEditor value={newContent} setField={setContent} />
              <ScriptsList fieldName="scripts" />
            </Grid>
          </Grid>
          <Box
            position="fixed"
            sx={{ bottom: 16, right: 16, zIndex: 2 }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Box bgcolor={'white'}>
              <Button
                color="primary"
                sx={{ px: 10 }}
                variant="outlined"
                href={'/' + page.slug}
                target="_blank"
                title={'View Page ' + page.title}
                rel="noreferrer"
                startIcon={<OpenInNew />}
              >
                View Page
              </Button>
            </Box>
            <LoadingButton
              variant="contained"
              size="large"
              sx={{ px: 10 }}
              startIcon={<Save />}
              type="submit"
              loading={loading || updating}
            >
              Save
            </LoadingButton>
          </Box>
        </Form>
      </Formik>
    </>
  )
}

export default PageDetails
