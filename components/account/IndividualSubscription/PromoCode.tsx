import { Alert } from '@mui/lab'
import { Box, Stack, TextField, Typography } from '@mui/material'
import {
  useGetCombinedPromoCodeLazyQuery,
  useHandleFreePromoCodeMutation
} from 'graphql/queries/promocode.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import PriceButton from './PriceButton'
import { useCookies } from 'react-cookie'
import dayjs from 'dayjs'
import CTAButton from 'components/common/CTAButton'
type Props = {
  stripeId: string
  onStripeCodeChange(code: string): void
}
const PromoCode = ({ stripeId, onStripeCodeChange }: Props) => {
  // On submit check if promo code exists
  // If free - Create order for user
  // Else - Show button for stripe checkout, same as subscription page.
  const [code, setCode] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [validateCode, { data, loading }] = useGetCombinedPromoCodeLazyQuery({
    onError(err) {
      enqueueSnackbar(err.message, { variant: 'warning' })
    }
  })

  const [cookies, setCookie] = useCookies(['jomi-promocode'])

  useEffect(() => {
    const code = cookies['jomi-promocode']
    if (code) {
      tryConsumeCode(code)
      setCode(code)
    }
  }, [cookies])

  useEffect(() => {
    const _code = router.query.code as string
    delete router.query.code
    if (_code) {
      setCookie('jomi-promocode', _code, {
        httpOnly: false,
        expires: dayjs().add(24, 'hour').toDate()
      })
      tryConsumeCode(_code)
      setCode(_code)
      //remove code from search params
      router.replace(
        {
          query: router.query
        },
        null,
        { shallow: true }
      )
    }
  }, [router.query])

  const [handleFreePromoCode] = useHandleFreePromoCodeMutation({
    onCompleted() {
      router.reload()
    },
    onError(e) {
      enqueueSnackbar(e.message, { variant: 'warning' })
    }
  })

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCode(val)
  }

  const tryConsumeCode = async (code: string) => {
    const result = await validateCode({
      variables: {
        code: code.trim()
      }
    })
    const output = result.data?.output

    const promoCode = output?.promoCode

    if (promoCode) {
      if (promoCode.price == 0) {
        handleFreePromoCode({
          variables: {
            code: code
          }
        })
      }
    }

    if (output?.stripeCode) {
      onStripeCodeChange(output.stripeCode.code)
    } else {
      onStripeCodeChange('')
    }
  }
  const handleValidateCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    tryConsumeCode(code)
  }

  const promoCode = data?.output.promoCode
  const stripeCode = data?.output.stripeCode
  const _discount = stripeCode?.amount_off
    ? `$${(stripeCode?.amount_off / 100).toFixed(2)} OFF`
    : `${stripeCode?.percent_off}% OFF`
  return (
    <Box my={2} px={1}>
      <form onSubmit={handleValidateCode}>
        <Typography>Promo code:</Typography>
        <Stack direction="row">
          <TextField
            size="small"
            value={code}
            onChange={handleChangeCode}
            sx={{
              '& .MuiInputBase-root': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }
            }}
          />
          <CTAButton
            color="success"
            variant="contained"
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }}
            disableElevation
            loading={loading}
            type="submit"
          >
            Submit
          </CTAButton>
        </Stack>
      </form>
      {!!promoCode?.price && (
        <Stack my={2}>
          <Alert sx={{ my: 2, width: '450px', display: 'flex' }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={5}
            >
              <Stack>
                <Typography>
                  <b>Title:</b> {promoCode.title}
                </Typography>
                {promoCode.price && (
                  <Typography>
                    <b>Subscription Price: </b>
                    {`$${promoCode.price}`}
                  </Typography>
                )}
                {promoCode.interval && (
                  <Typography>
                    <b>Interval: </b>
                    {promoCode.interval}
                  </Typography>
                )}
                {!promoCode.isSubscription && (
                  <Typography>
                    <b>Duration: </b>
                    {promoCode.days}
                  </Typography>
                )}
              </Stack>
              <Stack justifyContent={'center'}>
                <PriceButton
                  codeType="promoCode"
                  nickname={promoCode.title}
                  stripeId={stripeId}
                  mode={promoCode.isSubscription ? 'subscription' : 'payment'}
                  amount={promoCode.price * 100}
                  interval={promoCode.interval}
                  promocode={code}
                  duration={promoCode.days}
                >
                  {promoCode.title}
                </PriceButton>
              </Stack>
            </Stack>
          </Alert>
        </Stack>
      )}
      {!!stripeCode && (
        <Alert sx={{ my: 2, width: { xs: '100%', md: '450px' } }}>
          <Typography>
            <b>Code:</b> {stripeCode.code}
          </Typography>
          {stripeCode.name && (
            <Typography>
              <b>Description: </b>
              {stripeCode.name}
            </Typography>
          )}
          {
            <Typography>
              <b>Discount:</b> {_discount}
            </Typography>
          }
          <Box sx={{ my: 1 }}>
            <Typography variant="caption">
              Please select a subscription above. If applicable, this code will
              be automatically applied at checkout.
            </Typography>
          </Box>
        </Alert>
      )}
    </Box>
  )
}

export default PromoCode
