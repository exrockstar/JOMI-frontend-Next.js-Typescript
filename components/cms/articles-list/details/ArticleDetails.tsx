
import { Alert, Box, CircularProgress, Stack, Tab, Tabs, Typography } from '@mui/material'
import TabPanel, { a11yProps } from 'components/common/TabPanel'
import { flattenObject } from 'components/utils/flattenObject'
import { Formik, FormikHelpers } from 'formik'
import { useUpdateArticleMutation } from 'graphql/cms-queries/articles-list.generated'
import { useArticleByIdQuery } from 'graphql/queries/article-by-slug.generated'
import { UpdateArticleInput } from 'graphql/types'
import get from 'lodash/get'
import set from "lodash/set"
import { useSnackbar } from 'notistack'
import React from 'react'
import SaveArticleDetailButton from './SaveArticleDetailButton'
import UpdateCiteThisArticle from './UpdateCiteThisArticle'
import useArticleDetailsParams from './useArticleDetailsParams'
import useArticleTabs from './useArticleTabs'

const ArticleDetails = () => {
  const { articleId } = useArticleDetailsParams()
  const { enqueueSnackbar } = useSnackbar();
  const { selectedTab, setSelectedTab, tabs } = useArticleTabs(articleId);
  const { data, error, loading } = useArticleByIdQuery({
    variables: {
      article_id: articleId
    },
    skip: !articleId
  })
  const [updateArticle] = useUpdateArticleMutation({
    async onCompleted() {
      enqueueSnackbar('Successfully updated', { variant: 'success' })
      const article = data?.articleById;
      const pub_id = article.publication_id;
      const slug = article.slug;
      await fetch(`/api/revalidate?path=/article/${pub_id}`)
      await fetch(`/api/revalidate?path=/article/${pub_id}/${slug}`)
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })
  const article = data?.articleById;

  const tabId = `institution-tab`
  const tabPanelId = tabId + '-panel'

  const handleSubmit = async (values: UpdateArticleInput, formik: FormikHelpers<UpdateArticleInput>) => {

    const flattened = flattenObject(initialVal)
    //only get the modified values to not accidentally edit old ones.
    let modifiedValues: any = {}
    Object.entries(flattened)?.map(entry => {
      const [key, oldVal] = entry;
      const newVal = get(values, key)
      if (newVal !== oldVal) {
        set(modifiedValues, key, newVal)
      }
    })
    await updateArticle({
      variables: {
        input: {
          id: articleId,
          ...modifiedValues
        }
      }
    })
    formik.setSubmitting(false)
  }

  const initialVal: UpdateArticleInput = {
    title: article?.title,
    content: {
      cite_this_article: article?.content?.cite_this_article
    },
    id: articleId
  }
  return (
    <Stack direction={'row'} justifyContent="space-between" px={2} pt={2}>
      {!article ? (
        <Stack alignItems="center" justifyContent="center" height="90vh" width="100%">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}
        </Stack>
      ) :
        <Formik initialValues={initialVal} onSubmit={handleSubmit}>
          <>
            <Stack>
              <Typography variant="h4">
                Article Details
              </Typography>
              <Typography variant="h5" py={2}>
                {article.title}
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabs.indexOf(selectedTab)}
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={(e, index: number) => setSelectedTab(tabs[index])}
                  aria-label="basic tabs example"
                >
                  <Tab label="Cite This Article" {...a11yProps(tabId, 0)} />
                </Tabs>
              </Box>
              <TabPanel id={tabPanelId} value={tabs.indexOf(selectedTab)} index={0}>
                <UpdateCiteThisArticle authors={article.authors} preprint_date={article.preprint_date} published={article.published} publication_id={article.publication_id} />
              </TabPanel>
            </Stack>
            <SaveArticleDetailButton />
          </>
        </Formik>
      }
    </Stack >
  )
}

export default ArticleDetails