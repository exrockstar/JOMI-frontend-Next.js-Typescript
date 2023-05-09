import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React from 'react'

const HotJar = () => {
  const router = useRouter()
  const isCms = router.pathname.startsWith('/cms')

  if (isCms) return null

  return (
    <Script
      id="hotjar"
      async
      dangerouslySetInnerHTML={{
        __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3245738,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
      }}
    />
  )
}

export default HotJar
