import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { AccessTypeEnum } from 'graphql/types'
import { PropsWithChildren, useMemo } from 'react'
import { rose, emerald, yellow } from 'tailwindcss/colors'
type Props = {
  data: ArticleAccessQuery
}

const AccessBoxHeading = ({ data }: Props) => {
  const theme = useTheme()
  const { article } = data
  const access = article.articleAccessType
  const { isTrial, requireLogin, accessType, subscriptionExpiresAt } = access
  const background = useMemo(() => {
    if (requireLogin) {
      return `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`
    }

    switch (accessType) {
      case AccessTypeEnum.IndividualSubscription:
      case AccessTypeEnum.ArticlePurchase:
      case AccessTypeEnum.ArticleRent:
      case AccessTypeEnum.AdminAccess:
      case AccessTypeEnum.FreeAccess:
        return emerald[600]
      case AccessTypeEnum.InstitutionalSubscription:
        if (isTrial) {
          return yellow[500]
        } else {
          return emerald[600]
        }
      case AccessTypeEnum.AwaitingEmailConfirmation:
      case AccessTypeEnum.Evaluation:
      case AccessTypeEnum.RequireSubscription:
      case AccessTypeEnum.LimitedAccess:
      default:
        return rose[600]
    }
  }, [accessType, isTrial, requireLogin])

  const headingText = useMemo(() => {
    const isExpired =
      subscriptionExpiresAt && dayjs().isAfter(subscriptionExpiresAt)
    if (requireLogin) {
      return 'Requires Login'
    }
    switch (accessType) {
      case AccessTypeEnum.IndividualSubscription:
        return 'Subscribed'
      case AccessTypeEnum.AdminAccess:
        return 'Admin Access'
      case AccessTypeEnum.InstitutionalSubscription:
        if (isTrial) {
          return 'Trial Access'
        }
        return 'Institutional Access'
      case AccessTypeEnum.ArticlePurchase:
      case AccessTypeEnum.ArticleRent:
        return 'Article Access'
      case AccessTypeEnum.FreeAccess:
        return 'Free Article'
      case AccessTypeEnum.LimitedAccess:
        if (isExpired) {
          return 'Subscription Expired'
        }
      case AccessTypeEnum.Evaluation:
        return 'Evaluation'
      case AccessTypeEnum.AwaitingEmailConfirmation:
        return 'Requires Email Confirmation'
      case AccessTypeEnum.RequireSubscription:
      default:
        return 'Requires Subscription'
    }
  }, [requireLogin, accessType, isTrial, subscriptionExpiresAt])

  return (
    <Box
      sx={{
        background: background,
        color: 'white',
        p: 2,
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: 'Manrope, san-serif',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 15,

        width: '100vw',
        [theme.breakpoints.up('md')]: {
          width: '100%',
          borderTopRightRadius: '10px'
        },
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
      }}
    >
      {headingText}
    </Box>
  )
}
export default AccessBoxHeading
