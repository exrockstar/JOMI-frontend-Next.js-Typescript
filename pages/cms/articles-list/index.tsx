import {
  Alert,
  Badge,
  Button,
  CircularProgress,
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
    columnName: 'purchaseSettingEnabled',
    type: 'boolean',
    label: 'Purchase Setting',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    columnName: 'purchaseAllowedCountries',
    type: 'text',
    label: 'PPA Scope',
    operations: StringOperations
  }
]
const ArticlesListPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const {
    articles,
    loading,
    error,
    totalCount,
    setSearchTerm,
    setPage,
    setFilters,
    filters,
    selectedItems,
    searchTerm,
    refetch
  } = useArticlesList()

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
      <Stack px={2}>
        <div>
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
              sx={{ ml: 2 }}
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
            sx={{ ml: 2 }}
            onClick={() => setDialogOpen(true)}
            disabled={!selectedItems.length}
          >
            Add Translations
          </Button>
          <Tooltip title={`Last generated at: ${lastGenerateDate}`} arrow>
            <LoadingButton
              color="secondary"
              variant="outlined"
              sx={{ ml: 2 }}
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
            sx={{ ml: 2 }}
            onClick={() => setPurchaseDialogOpen(true)}
            disabled={!selectedItems.length}
          >
            Update Purchase Settings
          </Button>
          <LoadingButton
            color="secondary"
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => {
              regenerateHomePage()
            }}
            loading={regenerating}
            startIcon={<Home />}
          >
            Regenerate Home Page
          </LoadingButton>
        </div>
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
