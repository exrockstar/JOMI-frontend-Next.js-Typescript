import { Divider, Stack, Typography } from '@mui/material'
import { analytics } from 'apis/analytics'
import CTAButton from 'components/common/CTAButton'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import React from 'react'

import { useRouter } from 'next/router'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { useAddTrialOrderForUserMutation } from 'graphql/cms-queries/trials.generated'
import { OrderType } from 'graphql/types'
import { useSession } from 'next-auth/react'
import PurchaseArticleButton from '../common/PurchaseArticleButton'
import NextLink from 'next/link'
type Props = {
  accessData: ArticleAccessQuery
}
const RequireSubscriptionActions = ({ accessData }: Props) => {
  const router = useRouter()
  const fromUrl = encodeURIComponent(router?.asPath)
  const user = accessData?.user

  const isShowTrialButton = user?.isTrialsFeatureEnabled && user?.trialsAllowed
  const trialDuration = user?.trialDuration
  const [addTrialOrder, { loading }] = useAddTrialOrderForUserMutation({
    onCompleted() {
      router.reload()
      analytics.trackTrial({})
    }
  })

  const { article, getPurchaseAndRentPrices: prices = [] } = accessData
  const { data: session } = useSession()
  const [purchasePrice, rentPrice] = prices
  const purchaseDescription = `${article.publication_id} - ${article.title}`
  const userId = session?.user?._id
  const showRentArticleButton =
    article.showRentArticle && article.status !== 'preprint'
  const showPurchaseArticleButton =
    article.showPurchaseArticle && article.status !== 'preprint'
  const showDivider = showRentArticleButton || showPurchaseArticleButton
  const rentDuration = article.rentDuration
  const rentDescription = `Purchase access to this article for ${rentDuration} days.`
  return (
    <Stack gap={2}>
      <CTAButton
        LinkComponent={NextLink}
        onClick={analytics.trackClick}
        fullWidth
        href={`/account/subscription?from=${fromUrl}`}
        data-event="ArticleAccessDialog - Individual Subscription Button"
      >
        Purchase Individual Subscription
      </CTAButton>
      {isShowTrialButton && (
        <CTAButtonOutlined
          fullWidth
          data-event="article-access-dialog-trial-button"
          onClick={(e) => {
            addTrialOrder()
          }}
          loading={loading}
        >
          {`Try free for ${trialDuration} days`}
        </CTAButtonOutlined>
      )}

      {showDivider && <Divider>or</Divider>}

      {showRentArticleButton && (
        <PurchaseArticleButton
          userId={userId}
          purchaseDescription={rentDescription}
          articleId={article._id}
          text={`Rent Individual Article`}
          type={OrderType.RentArticle}
          price={rentPrice.unit_amount / 100}
        />
      )}
      {showPurchaseArticleButton && (
        <PurchaseArticleButton
          userId={userId}
          purchaseDescription={purchaseDescription}
          articleId={article._id}
          text={`Purchase Individual Article for $${(
            purchasePrice.unit_amount / 100
          ).toFixed(0)}`}
          type={OrderType.PurchaseArticle}
          price={purchasePrice.unit_amount / 100}
        />
      )}
    </Stack>
  )
}

export default RequireSubscriptionActions
