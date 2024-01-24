import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material'
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
        <Grid container spacing={1} mt={1}>
          {showPurchaseArticleButton && (
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <PurchaseArticleButton
                userId={userId}
                purchaseDescription={purchaseDescription}
                articleId={article._id}
                text={`Purchase for $${(
                  purchasePrice.unit_amount / 100
                ).toFixed(0)}`}
                type={OrderType.PurchaseArticle}
                price={purchasePrice.unit_amount / 100}
              />
            </Grid>
          )}
          {showRentArticleButton && (
            <Grid
              item
              xs={12}
              sm={showPurchaseArticleButton ? 6 : 12}
              md={12}
              lg={showPurchaseArticleButton ? 6 : 12}
            >
              <Tooltip title={rentDescription}>
                <div>
                  <PurchaseArticleButton
                    userId={userId}
                    purchaseDescription={rentDescription}
                    articleId={article._id}
                    text={`Rent Article`}
                    type={OrderType.RentArticle}
                    price={rentPrice.unit_amount / 100}
                  />
                </div>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
export default PurchaseArticleSection
