import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useState } from 'react'

const ChatlioWrapper = () => {
  const router = useRouter()

  const cmsOrAccess =
    router.pathname.startsWith('/cms') || router.pathname.startsWith('/access')

  return (
    !cmsOrAccess && (
      <Script id="chatlio-live-chat" strategy="afterInteractive">
        {`window._chatlio = window._chatlio||[];
          !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
            n.setAttribute('data-widget-id','145be33d-48ed-4372-7043-56e1deb70d6a');
            c.parentNode.insertBefore(n,c);
          }();`}
      </Script>
    )
  )
}

export default ChatlioWrapper
