import { Box } from '@mui/material'
import CTAButton from 'components/common/CTAButton'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { OrderType } from 'graphql/types'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import PromocodeModal from 'components/article/sidebar/AccessBox/common/PromocodeModal'
import { analytics } from 'apis/analytics'

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
  const Button =
    type === OrderType.PurchaseArticle ? CTAButton : CTAButtonOutlined
  const event =
    type === OrderType.PurchaseArticle
      ? 'initiate_purchase_article'
      : 'initiate_rent_article'
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
        <Button
          fullWidth
          onClick={(e) => {
            setOpen(true)
            analytics.trackClick(e)
          }}
          type="button"
        >
          {text}
        </Button>
      </Box>
    </>
  )
}
export default PurchaseArticleButton
