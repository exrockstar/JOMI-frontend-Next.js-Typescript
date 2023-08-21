import { Box, Button, ButtonProps } from '@mui/material'
import CTAButton from 'components/common/CTAButton'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import DefaultButton from './DefaultButton'
import PromocodeModal from './PromocodeModal'
import { OrderType } from 'graphql/types'
import { analytics } from 'apis/analytics'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { amplitudeTrackInitiateCheckout } from 'apis/amplitude'

type Props = {
  userId: string
  purchaseDescription: string
  articleId: string
  text: string
  type: OrderType.PurchaseArticle | OrderType.RentArticle
  price: number
}

const PurchaseArticleButton = (props: Props) => {
  const { userId, purchaseDescription, articleId, text, type, price } = props
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const [promocode, setPromocode] = useState('')
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()

  useEffect(() => {
    const query = router.query

    if (query.action === type) {
      ref.current?.submit()
    }
  }, [])

  const getFromUrl = () => {
    const baseUrl = window.location.href
    if (userId) {
      return baseUrl
    }
    const url = new URL(baseUrl.split('?')[0])

    url.searchParams.append('action', type)

    if (promocode) {
      url.searchParams.append('promocode', promocode)
    }
    return url.toString()
  }

  return (
    <>
      <PromocodeModal
        open={open}
        type={type}
        onClose={() => {
          setOpen(false)
        }}
        promocode={promocode}
        onChangePromocode={(code) => {
          setPromocode(code)
        }}
        onSubmit={() => {
          ref.current.submit()
        }}
      />
      <Box
        component="form"
        method="POST"
        action="/api/purchase_article"
        flexGrow={1}
        ref={ref}
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="description" value={purchaseDescription} />
        <input type="hidden" name="articleId" value={articleId} />
        <input type="hidden" name="from" value={getFromUrl()} />
        <input type="hidden" name="type" value={type} />
        <input
          type="hidden"
          name="coupon"
          value={router.query.promocode || promocode}
        />
        {type === OrderType.PurchaseArticle ? (
          <CTAButton
            fullWidth
            sx={{ fontSize: '.875rem', fontWeight: 700 }}
            onClick={(e) => {
              setOpen(true)
              gtag('event', 'initiate_purchase_article', {
                referredFrom,
                referrerPath,
                anon_link_id,
                userId,
                value: price
              })
              amplitudeTrackInitiateCheckout({
                label: "Purchase Article",
                userId,
                value: price
              })
              analytics.trackClick(e)
            }}
            type="button"
            data-event="article-access-box-purchase-article-button"
          >
            {text}
          </CTAButton>
        ) : (
          <DefaultButton
            sx={{ fontSize: '.875rem' }}
            fullWidth
            onClick={(e) => {
              setOpen(true)
              gtag('event', 'initiate_rent_article', {
                referredFrom,
                referrerPath,
                anon_link_id,
                userId,
                value: price
              })
              amplitudeTrackInitiateCheckout({
                label: "Rent Article",
                userId,
                value: price
              })
              analytics.trackClick(e)
            }}
            type="button"
            data-event="article-access-box-rent-article-button"
          >
            Rent Article
          </DefaultButton>
        )}
      </Box>
    </>
  )
}
export default PurchaseArticleButton
