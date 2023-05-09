import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import LimitedAccessBox from './LimitedAccessBox'
import RequestOrPurchaseBox from './RequestOrPurchaseBox'
import { useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { ArticleAccessBoxContainer, BoxHeading, FreeArticleBox } from './common'
import InstitutionalAccessBox from './InstitutionalAccessBox'
import SubscriptionExpiredBox from './SubscriptionExpiredBox'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { useArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { AccessTypeEnum } from 'graphql/types'

type Article = ArticlesBySlugQuery['articleBySlug']

type ArticleAccessBoxProps = {
  article: Article
}

export default function ArticleAccessBox({ article }: ArticleAccessBoxProps) {
  const { data: session, status } = useSession()
  const { enqueueSnackbar } = useSnackbar()

  const { data, loading, refetch } = useArticleAccessQuery({
    skip: status === 'loading',
    variables: {
      publication_id: article.publication_id
    }
  })

  useEffect(() => {
    refetch()
  }, [session?.user, refetch])

  const accessData = data?.article?.articleAccessType
  const accessType = accessData?.accessType
  const subscriptionExpired =
    accessData?.subscriptionExpiresAt &&
    dayjs(accessData.subscriptionExpiresAt).isBefore(new Date())

  const Component = useMemo(() => {
    if (accessData?.requireLogin) {
      return (
        <LimitedAccessBox
          message={
            <Typography color={'text.secondary'} variant="body2">
              <b>{accessData?.institution_name}</b> is currently subscribed.
              Please log in to access the video-article.
            </Typography>
          }
        />
      )
    }

    switch (accessType) {
      case AccessTypeEnum.LimitedAccess:
        return <LimitedAccessBox />
      case AccessTypeEnum.Evaluation:
        return (
          <RequestOrPurchaseBox
            message={
              <>
                <Typography variant="body2" mb={1} fontWeight={700}>
                  {`Tired of the annoying blocks?`}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={13}
                  fontWeight={500}
                  mb={2}
                >
                  {`Please request a subscription  or consider purchasing an individual subscription.`}
                </Typography>
              </>
            }
          />
        )
      case AccessTypeEnum.RequireSubscription:
        return (
          <RequestOrPurchaseBox
            message={
              <>
                <Typography variant="body2" mb={1} fontWeight={700}>
                  {`This article requires subscription to view.`}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={13}
                  fontWeight={500}
                  mb={2}
                >
                  {`Please request a subscription  or consider purchasing an individual subscription.`}
                </Typography>
              </>
            }
          />
        )
      case AccessTypeEnum.AwaitingEmailConfirmation:
        return (
          <>
            <Typography variant="body2" mb={1} fontWeight={700}>
              {`Your institution ${accessData?.institution_name} has an active subscription. `}
            </Typography>
            <Typography variant="body2" fontSize={13} fontWeight={500} mb={2}>
              {`Please check your email inbox and confirm your email to watch the article-video.`}
            </Typography>
          </>
        )
    }
  }, [accessType, accessData?.institution_name])

  const accessText = useMemo(() => {
    if (accessData?.requireLogin) {
      return 'Requires Login'
    }
    switch (accessType) {
      case AccessTypeEnum.LimitedAccess:
      case AccessTypeEnum.Evaluation:
        return 'Evaluation'
      case AccessTypeEnum.RequireSubscription:
        return 'Requires Subscription'
      case AccessTypeEnum.AwaitingEmailConfirmation:
        return 'Requires Email Confirmation'
    }
  }, [accessType])

  if (loading || status === 'loading') {
    return null
  }

  if (accessType === AccessTypeEnum.AdminAccess) return null

  if (accessType === AccessTypeEnum.IndividualSubscription) {
    return <FreeArticleBox>SUBSCRIBED</FreeArticleBox>
  }

  if (accessType === AccessTypeEnum.InstitutionalSubscription) {
    return <InstitutionalAccessBox access={accessData} />
  }

  if (accessType === AccessTypeEnum.FreeAccess) {
    return <FreeArticleBox>FREE ARTICLE</FreeArticleBox>
  }

  if (accessType === AccessTypeEnum.LimitedAccess && subscriptionExpired) {
    return <SubscriptionExpiredBox access={accessData} />
  }

  return (
    <ArticleAccessBoxContainer>
      {accessData?.requireLogin ? 
        <BoxHeading sx={{background: 'linear-gradient(to bottom, #60A5FA, #4F46E5)'}}>{accessText}</BoxHeading> :
        <BoxHeading>{accessText}</BoxHeading>
      }
      <Box p={2} sx={{backgroundColor: "#FFFFFF"}}>{Component}</Box>
    </ArticleAccessBoxContainer>
  )
}
