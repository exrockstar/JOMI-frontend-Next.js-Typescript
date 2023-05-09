import router from 'next/router'

//Call in _app.tsx to put at header of every page
export const fbPixelInit = () => {
  try {
  import('react-facebook-pixel')
    .then((x) => x.default)
    .then((ReactPixel) => {
      ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`)
      ReactPixel.pageView()

      router.events.on('routeChangeComplete', () => {
        ReactPixel.pageView()
      })
      return () => {
        router.events.off('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      }
    })
  } catch (e) {
    throw new Error('Error when initializing FB Pixel')
  }
}

//Track a custom event
export const fbPixelTrackCustom = (fbEvent: string, data: Object) => {
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.trackCustom(fbEvent, data)
      })
  } catch (e) {
    throw new Error('Error when tracking Custom FB Pixel event')
  }
} 

//Track a Purchase event
export const fbPixelTrackPurchase = (currency: string, value: number, id: string, userId: string) => {
  const data = {
    currency: currency,
    content_name: "Purchase Individual Subscription",
    value: value,
    num_items: 1,
    content_ids: [id],
    _id: userId
  }
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.track("Purchase", data)
      })
  } catch (e) {
    throw new Error('Error when tracking Purchase FB Pixel event')
  }
}

//Track a Subscribe event
export const fbPixelTrackSubscribe = (currency: string, value: number, userId: string) => {
  const data = {
    currency: currency,
    value: value,
    _id: userId
  }
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.track("Subscribe", data)
      })
  } catch (e) {
    throw new Error('Error when tracking Subscribe FB Pixel event')
  }
}

//Track a Initiate Checkout event
export const fbPixelTrackInitiateCheckout = (content_category: string, content_ids: string[], currency: string, value: number, userId: string) => {
  const data = {
    content_category: content_category,
    content_ids: content_ids,
    currency: currency,
    value: value,
    num_items: 1,
    _id: userId
  }
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.track("InitiateCheckout", data)
      })
  } catch (e) {
    throw new Error('Error when tracking Initiate Checkout FB Pixel event')
  }
}

//Track a Complete Registration event
export const fbPixelTrackCompleteRegistration = (content_name: string) => {
  const data = {
    content_name: content_name,
    status: true,
  }
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.track("CompleteRegistration", data)
      })
  } catch (e) {
    throw new Error('Error when tracking Complete Registration FB Pixel event')
  }
}

//Track a View Content event
export const fbPixelTrackViewContent = (content_category: string, content_name: string) => {
  const data = {
    content_name: content_name,
    content_category: content_category
  }
  try {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.FACEBOOK_PIXEL_ID}`, undefined, {debug:false, autoConfig:true})
        ReactPixel.track("ViewContent", data)
      })
  } catch (e) {
    throw new Error('Error when tracking View Content FB Pixel event')
  }
}