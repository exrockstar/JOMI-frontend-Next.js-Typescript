import { Box, Stack, Tooltip, Typography } from '@mui/material'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'
import PurchaseArticleButton from './common/PurchaseArticleButton'
import { useSession } from 'next-auth/react'
import { OrderType } from 'graphql/types'

type Props = {
  data: ArticleAccessQuery
}

const PurchaseArticleSection = ({ data }: Props) => {
  const { article, getPurchaseAndRentPrices: prices = [] } = data
  const access = article.articleAccessType
  const { data: session } = useSession()
  const [purchasePrice, rentPrice] = prices
  const purchaseDescription = `${article.publication_id} - ${article.title}`
  const userId = session?.user?._id
  const showRentArticleButton = article.showRentArticle
  const showPurchaseArticleButton = article.showPurchaseArticle

  const price = showPurchaseArticleButton ? purchasePrice : rentPrice
  const title = showPurchaseArticleButton
    ? 'Purchase Individual Article'
    : 'Rent Individual Article'
  const rentDuration = article.rentDuration
  const purchaseDescriptionText = `A One-Time Purchase will get you unlimited access to the entire video article.`
  const rentDescription = `Purchase access to this article for ${rentDuration} days.`
  const description = showPurchaseArticleButton
    ? purchaseDescriptionText
    : rentDescription
  const preprintDescription = `Access to preprints is available to subscribers only and cannot be purchased individually.`

  return (
    <Box p={2}>
      <Typography fontWeight={800} fontFamily={'Manrope'}>
        {title}
      </Typography>
      {article.status === 'preprint' ? (
        <Typography
          variant="body2"
          fontFamily={'Manrope'}
          color="grey.600"
          lineHeight={1.5}
          mt={2}
        >
          {preprintDescription}
        </Typography>
      ) : (
        <Box>
          <Typography
            variant="body2"
            fontFamily={'Manrope'}
            color="grey.600"
            lineHeight={1.5}
            mt={2}
          >
            {description}
          </Typography>
          <Typography
            fontWeight={800}
            fontFamily={'Manrope'}
            sx={{
              background: `linear-gradient(0deg, #4F46E5 0%, #60A5FA 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            variant="h4"
            component="p"
          >
            ${(price.unit_amount / 100).toFixed(0)}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            mt={2}
            alignItems={'stretch'}
            justifyContent={'space-between'}
          >
            {showPurchaseArticleButton && (
              <PurchaseArticleButton
                userId={userId}
                purchaseDescription={purchaseDescription}
                articleId={article._id}
                text={`Purchase  for $${(
                  purchasePrice.unit_amount / 100
                ).toFixed(0)}`}
                type={OrderType.PurchaseArticle}
              />
            )}
            {showRentArticleButton && (
              <Tooltip title={rentDescription}>
                <PurchaseArticleButton
                  userId={userId}
                  purchaseDescription={rentDescription}
                  articleId={article._id}
                  text={`Rent Article`}
                  type={OrderType.RentArticle}
                />
              </Tooltip>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  )
}
export default PurchaseArticleSection
