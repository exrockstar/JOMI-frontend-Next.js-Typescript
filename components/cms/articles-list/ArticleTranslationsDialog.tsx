import { Close, Tab } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogProps,
  DialogActions,
  Typography,
  Button,
  FormControlLabel,
  Table,
  Box
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { sleep } from 'common/utils'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { Form, Formik } from 'formik'
import { useTranslateArticlesMutation } from 'graphql/cms-queries/articles-list.generated'
import { TranslateArticlesInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React from 'react'
import { uniq } from 'underscore'
import LanguageSelector from './LanguageSelector'
import { useArticlesList } from './useArticlesList'

type Props = {} & DialogProps
const ArticleTranslationsDialog = (props: Props) => {
  const { selectedItems, refetch } = useArticlesList()
  const { enqueueSnackbar } = useSnackbar()
  const [translateArticles, { loading, data }] = useTranslateArticlesMutation({
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    },
    async onCompleted(result) {
      refetch()
      const results = result.translateArticles
      const unique_publications = uniq(
        result.translateArticles?.map((res) => res.publication_id)
      )

      for (let pub of unique_publications) {
        const res = results.find((res) => res.publication_id === pub)
        if (res?.success) {
          try {
            await fetch(`/api/revalidate?path=/article/${res.publication_id}`)
            await fetch(
              `/api/revalidate?path=/article/${res.publication_id}/${res.slug}`
            )
          } catch {}
        }
        await sleep(500)
      }
    }
  })

  const results = data?.translateArticles
  return (
    <Formik<TranslateArticlesInput>
      initialValues={{
        article_ids: selectedItems,
        languages: [],
        enableImmediately: true
      }}
      onSubmit={async (values) => {
        translateArticles({
          variables: {
            input: values
          }
        })
      }}
    >
      <Dialog {...props} maxWidth="lg">
        <DialogTitle>Add Translations</DialogTitle>
        <Divider />

        <DialogContent>
          <Typography>
            Adding translations for {selectedItems.length} article(s):
          </Typography>

          <Box>
            <LanguageSelector />
            <FormControlLabel
              control={<FormikCheckbox name="enableImmediately" size="small" />}
              label="Immediately enable translation if succeeded"
            />
          </Box>
          {!!results?.length && (
            <Box sx={{ minWidth: 900 }}>
              <Divider>Results:</Divider>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Publication ID</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{result.publication_id}</TableCell>
                        <TableCell>{result.language}</TableCell>
                        <TableCell>
                          {result.success ? 'success' : 'failed'}
                        </TableCell>
                        <TableCell>{result.message}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <Form>
          <DialogActions>
            <Button
              color="error"
              startIcon={<Close />}
              variant="contained"
              onClick={(e) => props.onClose(e, 'backdropClick')}
            >
              Close Dialog
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loading}
            >
              Translate Articles
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default ArticleTranslationsDialog
