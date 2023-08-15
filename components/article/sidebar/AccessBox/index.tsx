import { useArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useMemo } from 'react'
import AccessBoxHeading from './common/AccessBoxHeading'
import { AccessTypeEnum } from 'graphql/types'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import ProvidedBySection from './ProvidedBySection'
import RequiresLoginSection from './RequiresLoginSection'
import PurchaseArticleSection from './PurchaseArticleSection'
import AccessBoxDivider from './common/AccessBoxDivider'
import GetSubscriptionSection from './GetSubscriptionSection'
import CreateAccountOrLoginSection from './CreateAccountOrLoginSection'
import LimitedAccessSection from './LimitedAccessSection'
import EvaluationSection from './EvaluationSection'
import dayjs from 'dayjs'
import SubscriptionExpiredSection from './SubscriptionExpiredSection'
import AwaitingEmailConfirmationSection from './AwaitingEmailConfirmationSection'
import RentAccessSection from './RentAccessSection'
import DividerWithPadding from './common/DividerWithPadding'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import IndividualTrialSection from './IndividualTrialSection'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'

type Article = ArticlesBySlugQuery['articleBySlug']

type AccessBoxProps = {
  article: Article
}
const AccessBox = ({ article }: AccessBoxProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { anon_link_id } = useGoogleAnalyticsHelpers()
  const { data, loading, refetch } = useArticleAccessQuery({
    skip: status === 'loading',
    variables: {
      publication_id: article.publication_id
    }
  })
  const theme = useTheme()
  const access = data?.article?.articleAccessType
  const showPayPerArticle =
    data?.article?.showRentArticle || data?.article?.showPurchaseArticle
  useEffect(() => {
    refetch()
  }, [session?.user, refetch])

  useEffect(() => {
    const error = router.query.error as string
    if (!!error) {
      enqueueSnackbar(decodeURIComponent(error), { variant: 'error' })
      let queryWithoutError = { ...router.query }
      delete queryWithoutError.error
      router.push(queryWithoutError, undefined, { shallow: true })
    }
  }, [router.query])

  const components = useMemo(() => {
    if (!access) return []
    const purchaseSections = showPayPerArticle
      ? [DividerWithPadding, PurchaseArticleSection]
      : []
    switch (access.accessType) {
      case AccessTypeEnum.LimitedAccess:
        return [
          AccessBoxHeading,
          LimitedAccessSection,
          CreateAccountOrLoginSection
        ]
      case AccessTypeEnum.InstitutionSubscriptionExpired:
        return [
          AccessBoxHeading,
          SubscriptionExpiredSection,
          GetSubscriptionSection,
          ...purchaseSections
        ]
      case AccessTypeEnum.InstitutionLoginRequired:
        return [
          AccessBoxHeading,
          RequiresLoginSection,
          CreateAccountOrLoginSection
        ]

      case AccessTypeEnum.InstitutionalTrial:
        return [
          AccessBoxHeading,
          ProvidedBySection,
          GetSubscriptionSection,
          ...purchaseSections
        ]
      case AccessTypeEnum.InstitutionalSubscription:
        return [AccessBoxHeading, ProvidedBySection]
      case AccessTypeEnum.Evaluation:
        return [AccessBoxHeading, EvaluationSection, ...purchaseSections]
      case AccessTypeEnum.RequireSubscription:
        return [AccessBoxHeading, GetSubscriptionSection, ...purchaseSections]
      case AccessTypeEnum.AwaitingEmailConfirmation:
      case AccessTypeEnum.EmailConfirmationExpired:
        return [
          AccessBoxHeading,
          AwaitingEmailConfirmationSection,
          GetSubscriptionSection,
          ...purchaseSections
        ]
      case AccessTypeEnum.ArticleRent:
        return [AccessBoxHeading, RentAccessSection]
      case AccessTypeEnum.IndividualTrial:
        return [AccessBoxHeading, IndividualTrialSection]
      case AccessTypeEnum.ArticlePurchase:
      case AccessTypeEnum.FreeAccess:
      case AccessTypeEnum.AdminAccess:
      case AccessTypeEnum.IndividualSubscription:
      default:
        return [AccessBoxHeading]
    }
  }, [access, showPayPerArticle])

  if (loading || status === 'loading' || !data) {
    return null
  }

  return (
    <Box
      sx={{
        overflow: 'hidden',
        boxShadow: '-1px 2px 3px 0 rgb(10 0 0 / 22%)',
        [theme.breakpoints.down('sm')]: {
          width: '100vw',
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0
        },
        [theme.breakpoints.up('md')]: {
          width: '100%',
          borderTopRightRadius: '10px',
          borderBottomLeftRadius: '10px'
        }
      }}
    >
      {components.map((Component, index) => (
        <Component data={data} key={index} />
      ))}
    </Box>
  )
}
export default AccessBox
