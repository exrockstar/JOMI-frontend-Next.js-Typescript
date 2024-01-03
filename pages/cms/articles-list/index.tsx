import {
  Alert,
  Badge,
  Button,
  CircularProgress,
  LinearProgress,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import {
  ArticlesListProvider,
  useArticlesList
} from 'components/cms/articles-list/useArticlesList'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {
  StringOperations,
  DateOperations
} from 'components/common/FilterDrawer/operations'
import {
  ColumnFilter,
  QueryOperation,
  ArticleRestrictionEnum
} from 'graphql/types'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { useEffect, useState } from 'react'
import { FilterList, Home } from '@mui/icons-material'
import DownloadIcon from '@mui/icons-material/Download'
import ArticlesList from 'components/cms/articles-list/ArticlesList'
import {
  useCheckOutdatedTranslationsMutation,
  useUpdateWistiaMetadataMutation
} from 'graphql/cms-queries/articles-list.generated'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import {
  useGenerateAllScienceOpenXmlMutation,
  useScienceOpenLastGeneratedLazyQuery,
  useScienceOpenLastGeneratedQuery
} from 'graphql/queries/scienceopen.generated'
import dayjs from 'dayjs'
import ArticleTranslationsDialog from 'components/cms/articles-list/ArticleTranslationsDialog'
import PurchaseSettingDialog from 'components/cms/articles-list/PurchaseSettingDialog'
import { ARTICLE_CATEGORIES } from 'common/constants'
import { countries } from 'components/cms/prices-list/countryList'
import { useCategoriesQuery } from 'graphql/queries/categories.generated'
import useCsvDownload from 'components/cms/useCsvDownload'
import { useArticlesListLazyQuery } from 'graphql/cms-queries/articles-list.generated'

import DownloadCsvButton from 'components/common/DownloadCsvButton'

const ArticlesListPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const { data: categoriesData } = useCategoriesQuery()
  const {
    articles,
    loading,
    error,
    totalCount,
    setSearchTerm,
    setFilters,
    filters,
    selectedItems,
    searchTerm,
    sortBy,
    sortOrder,
    refetch
  } = useArticlesList()

  const [fetchFunc] = useArticlesListLazyQuery({ fetchPolicy: 'no-cache' })

  const convertFunc = (item) => {
    const production_id = item.production_id || 'N/A'
    const publication_id = item.publication_id || 'N/A'

    const ppaCountries = item.purchaseAllowedCountries
    const ppAcountriesText =
      ppaCountries?.length > 4
        ? `${ppaCountries?.slice(0, 4).join(', ')} and ${
            ppaCountries.length - 4
          } others`
        : `${ppaCountries?.slice(0, 4).join(', ')}`
    return {
      'PUBLICATION ID': publication_id,
      TITLE: item.title,
      'PRODUCTION ID': production_id,
      'AUTHOR(S)':
        item.authors.map((item) => item.display_name).join(', ') || 'N/A',
      STATUS: item.status,
      'PUBLISH DATE': item.published ? item.published.split('T')[0] : 'N/A',
      'PREPRINT DATE': item.preprint_date
        ? item.preprint_date.split('T')[0]
        : 'N/A',
      'ABSTRACT DONE?': item.has_complete_abstract ? 'Yes' : 'No',
      RESTRICTION: item.restrictions?.article || 'N/A',
      DOI: item.DOIStatus,
      'AVAILABLE TRANSLATIONS': item.languages?.join(', ') ?? 'N/A',
      'ENABLED TRANSLATIONS': item.enabled_languages?.join(', ') ?? 'N/A',
      'OUTDATED TRANSLATIONS': !item.languages?.length
        ? 'No translations'
        : item.outdatedTranslations?.length
        ? item.outdatedTranslations?.join(', ')
        : 'Up to date',
      'CONTENT LENGTH': item.contentlength,
      CATEGORIES: item.categories
        ? item.categories.map((item) => item.displayName).join(', ')
        : 'N/A',
      'RENT ENABLED': item.isRentArticleFeatureOn ? 'Yes' : 'No',
      'PURCHASE ENABLED': item.isPurchaseArticleFeatureOn ? 'Yes' : 'No',
      'PPA SCOPE':
        item.purchaseAllowedCountries?.length > 0
          ? ppAcountriesText
          : 'All Countries'
    }
  }

  const getMainData = (data) => {
    return data?.fetchArticles?.articles ?? []
  }

  const {
    downloadCsv,
    loading: csvLoading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    totalCount,
    collection: 'article',
    filters,
    search_term: searchTerm,
    sort_by: sortBy,
    sort_order: sortOrder
  })

  const columnOptions: ColumnOption[] = [
    {
      columnName: 'title',
      type: 'text',
      label: 'Title',
      operations: StringOperations
    },
    {
      columnName: 'production_id',
      type: 'text',
      label: 'Production ID',
      operations: StringOperations
    },
    {
      columnName: 'publication_id',
      type: 'text',
      label: 'Publication ID',
      operations: StringOperations
    },
    {
      columnName: 'status',
      type: 'text',
      label: 'Status',
      operations: StringOperations
    },
    {
      columnName: 'published',
      type: 'date',
      label: 'Publish Date',
      operations: DateOperations
    },
    {
      columnName: 'preprint_date',
      type: 'date',
      label: 'Preprint Date',
      operations: DateOperations
    },
    {
      columnName: 'has_complete_abstract',
      type: 'boolean',
      label: 'Abstract Done?',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      columnName: 'restrictions.article',
      type: 'select',
      label: 'Restrictions',
      operations: StringOperations,
      values: ['Evaluation', 'Free', 'None', 'Requires_Subscription']
    },
    {
      columnName: 'DOIStatus',
      type: 'select',
      label: 'DOI',
      operations: StringOperations,
      values: ['error', 'false', 'preprint', 'publish']
    },
    {
      columnName: 'languages',
      type: 'text',
      label: 'Available Languages',
      operations: StringOperations
    },
    {
      columnName: 'enabled_languages',
      type: 'text',
      label: 'Enabled Languages',
      operations: StringOperations
    },
    {
      columnName: 'contentlength',
      type: 'text',
      label: `Content Length`,
      operations: [
        QueryOperation.GreaterThanOrEqual,
        QueryOperation.LessThanOrEqual
      ]
    },
    {
      columnName: 'isRentArticleFeatureOn',
      type: 'boolean',
      label: 'Is Rent Enabled',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      columnName: 'isPurchaseArticleFeatureOn',
      type: 'boolean',
      label: 'Is Purchase Enabled',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      columnName: 'purchaseAllowedCountries',
      type: 'select',
      label: 'PPA Scope',
      operations: [
        QueryOperation.Equal,
        QueryOperation.Contains,
        QueryOperation.NotContains
      ],
      values: ['[]', ...countries.map((c) => c.code)],
      labels: ['All Countries', ...countries.map((c) => c.label)]
    },
    {
      columnName: 'categories',
      type: 'select',
      label: 'Categories',
      operations: StringOperations,
      labels: categoriesData?.categories?.map((c) => c.displayName),
      values: categoriesData?.categories?.map((c) => c._id)
    }
  ]

  const onSubmitFilter = (filters: ColumnFilter[]) => {
    setFilters([...filters])
    setDrawerOpen(!drawerOpen)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }
  const [updateWistiaMetadata, { loading: updatingWistia }] =
    useUpdateWistiaMetadataMutation({
      onCompleted(result) {
        enqueueSnackbar(result.updateWistiaMetadata, { variant: 'success' })
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })

  const [checkOutdated, { loading: checkOutdatedLoading }] =
    useCheckOutdatedTranslationsMutation({
      onCompleted() {
        refetch()
      }
    })

  const { data, refetch: refetchGenerated } = useScienceOpenLastGeneratedQuery()
  const [generateScienceOpen, { loading: updatingScienceOpen }] =
    useGenerateAllScienceOpenXmlMutation({
      onCompleted(result) {
        enqueueSnackbar(result.generateAllScienceOpenXml, {
          variant: 'success'
        })
        refetchGenerated()
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })
  const lastGenerateDate = data?.scienceOpenLastGeneratedAt
    ? dayjs(data?.scienceOpenLastGeneratedAt).format('MM/DD/YYYY HH:mm: A')
    : null

  const regenerateHomePage = async () => {
    setRegenerating(true)
    try {
      await fetch(`/api/revalidate?path=/`)
      enqueueSnackbar('Successfully regenerated home page', {
        variant: 'success'
      })
    } catch (e) {
      enqueueSnackbar('Failed to regenerate home page', { variant: 'error' })
    }
    setRegenerating(false)
  }
  return (
    <CmsLayout>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
        <FilterDrawer
          columnOptions={columnOptions}
          filters={filters}
          onSubmit={onSubmitFilter}
        />
      </Drawer>
      <Stack direction={'row'} justifyContent="space-between" px={2} pt={2}>
        <Typography variant="h4" py={2}>
          Articles
        </Typography>
        <Typography py={1}>
          <Typography fontWeight={'bold'} component="span">
            Table Filters&nbsp;
          </Typography>
          {filters.length == 0
            ? 'None'
            : `${filters.length} total:` +
              filters.map(
                (filter, i) =>
                  ` ${filter.columnName} ${filter.operation} ${filter.value}`
              )}
        </Typography>
        <SearchInput
          onSubmit={(str) => {
            setSearchTerm(str)
          }}
          value={searchTerm}
          placeholder="Search by Title, Author Name, or ID"
        />
        <Tooltip
          title={`Filter list.  ${filters?.length || 0} filters set`}
          placement="left"
          arrow
        >
          <Badge
            badgeContent={filters?.length}
            color="secondary"
            invisible={!filters?.length}
            sx={{
              '& .MuiBadge-badge': {
                right: 8,
                top: 30
              }
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <FilterList />
            </IconButton>
          </Badge>
        </Tooltip>
      </Stack>
      <Stack
        px={2}
        spacing={{ xs: 1, sm: 1 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <LoadingButton
          onClick={() => {
            updateWistiaMetadata()
          }}
          color="secondary"
          variant="outlined"
          loading={updatingWistia}
        >
          Update wistia metadata
        </LoadingButton>
        <Tooltip title={`Last generated at: ${lastGenerateDate}`} arrow>
          <LoadingButton
            color="secondary"
            variant="outlined"
            onClick={() => {
              generateScienceOpen()
            }}
            loading={updatingScienceOpen}
          >
            Generate scienceopen.xml
          </LoadingButton>
        </Tooltip>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setDialogOpen(true)}
          disabled={!selectedItems.length}
        >
          Add Translations
        </Button>
        <Tooltip title={`Last generated at: ${lastGenerateDate}`} arrow>
          <LoadingButton
            color="secondary"
            variant="outlined"
            onClick={() => {
              checkOutdated()
            }}
            loading={checkOutdatedLoading}
          >
            Check Outdated Translations
          </LoadingButton>
        </Tooltip>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setPurchaseDialogOpen(true)}
          disabled={!selectedItems.length}
        >
          Update Purchase Settings
        </Button>
        <LoadingButton
          color="secondary"
          variant="outlined"
          onClick={() => {
            regenerateHomePage()
          }}
          loading={regenerating}
          startIcon={<Home />}
        >
          Regenerate Home Page
        </LoadingButton>
        <DownloadCsvButton
          loading={csvLoading}
          onClick={downloadCsv}
          csvProgress={csvProgress}
        />
      </Stack>
      <ArticleTranslationsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        key={selectedItems.toString()}
      />
      <PurchaseSettingDialog
        open={purchaseDialogOpen}
        onClose={(e, reason) => {
          if (reason === 'backdropClick') return
          setPurchaseDialogOpen(false)
        }}
        key={selectedItems.toString() + 1}
      />
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          <CircularProgress />
        </Stack>
      ) : error ? (
        <Stack p={2}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Stack>
      ) : (
        <Stack p={2}>
          <ArticlesList articles={articles} totalCount={totalCount} />
        </Stack>
      )}
    </CmsLayout>
  )
}
const ArticlesListPageWrapper = () => {
  return (
    <ArticlesListProvider>
      <ArticlesListPage />
    </ArticlesListProvider>
  )
}
export default ArticlesListPageWrapper
