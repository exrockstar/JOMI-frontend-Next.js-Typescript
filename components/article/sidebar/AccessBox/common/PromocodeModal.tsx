import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CTAButton from 'components/common/CTAButton'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import { useEffect, useState } from 'react'
import { ArrowRight } from '@mui/icons-material'
import { useGetStripePromoCodeByCodeLazyQuery } from 'graphql/cms-queries/stripe-promo-codes.generated'
import { OrderType } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { analytics } from 'apis/analytics'
import { frontPageTheme } from 'components/theme'

type Props = {
  promocode: string
  type: OrderType.PurchaseArticle | OrderType.RentArticle
  onChangePromocode(code: string): void
} & DialogProps
const PromocodeModal = ({
  promocode,
  type,
  onChangePromocode,
  onSubmit,
  ...props
}: Props) => {
  const { data: session } = useSession()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [_promocode, setPromocode] = useState(promocode)
  const [getCode] = useGetStripePromoCodeByCodeLazyQuery()

  useEffect(() => {
    if (!props.open) {
      setError('')
      setPromocode('')
      setSuccess('')
    }
  }, [props.open])

  const validateCode = async () => {
    const { data } = await getCode({
      variables: {
        code: _promocode
      }
    })
    const code = data?.getStripePromoCodeByCode
    if (!code) {
      setError('This promocode is invalid.')
      setSuccess('')
      setPromocode('')
      return
    }

    const product =
      type === OrderType.PurchaseArticle
        ? 'product_purchase_article'
        : 'product_rent_article'
    if (!code.valid || !code.applies_to?.includes(product)) {
      setError('This promocode is invalid.')
      setSuccess('')
    } else {
      onChangePromocode(_promocode)
      setSuccess('Promocode is valid. Proceeding to Check out...')
      setTimeout(() => {
        onSubmit(null)
      }, 300)
      setError('')
    }
  }
  return (
    <ThemeProvider theme={frontPageTheme}>
      <Dialog {...props} disablePortal maxWidth="lg">
        <DialogTitle>
          <Typography variant="h5">Do you have a promocode?</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: { md: 480 } }}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              validateCode()
            }}
          >
            <TextField
              value={_promocode}
              onChange={(e) => setPromocode(e.target.value?.trim())}
              label="Enter promocode"
              fullWidth
              size="small"
              sx={{ mt: 2 }}
            />
            {!!error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
            {!!success && (
              <Typography variant="caption" color="success.main">
                {success}
              </Typography>
            )}
            <Stack direction={'column'} alignItems={'stretch'} mt={1}>
              <CTAButtonOutlined
                type="submit"
                data-event="promocode-modal-apply-code-button"
                onClick={analytics.trackClick}
              >
                Apply Promocode
              </CTAButtonOutlined>
            </Stack>
          </form>
          <Stack direction={'column'} alignItems={'stretch'} gap={1} my={2}>
            <CTAButton
              endIcon={<ArrowRight />}
              onClick={(e) => {
                onSubmit(null)
                analytics.trackClick(e)
              }}
              data-event="promocode-modal-continue-to-checkout-button"
            >
              Continue to Checkout
            </CTAButton>
            {!session?.user && (
              <Typography variant="caption" color="info.main">
                {`You'll have to login or create an account before being redirected
              to checkout`}
              </Typography>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
export default PromocodeModal
