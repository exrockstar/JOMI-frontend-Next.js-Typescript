const ListDivider = {
  kind: 'list-divider'
}

type MainMenuItem = {
  name: string
  label: string
  href?: string
  subItems?: (SubMenuItem | typeof ListDivider)[]
}

type SubMenuItem = {
  label: string
  href?: string
  externalLink?: boolean
  noNextLink?: boolean
  rel?: string
}
export const menuData: MainMenuItem[] = [
  {
    name: 'articles',
    label: 'Articles',
    subItems: [
      {
        label: 'Article Index',
        href: '/index'
      },
      {
        label: 'Most recent',
        href: '/articles'
      },
      ListDivider,
      {
        label: 'General Surgery',
        href: '/index#general-surgery'
      },
      {
        label: 'Orthopaedics',
        href: '/index#orthopaedics'
      },
      {
        label: 'Otolaryngology',
        href: '/index#otolaryngology'
      },
      {
        label: 'More...',
        href: '/index#toc'
      }
    ]
  },
  {
    name: 'about',
    label: 'About',
    subItems: [
      {
        label: 'About JOMI',
        href: '/about'
      },
      {
        label: 'Editorial board',
        href: '/editorial-board'
      },
      {
        label: 'Subscribing Institutions',
        href: '/subscribers'
      },
      {
        label: 'News',
        href: 'http://blog.jomi.com/category/announcement/',
        externalLink: true,
        rel: ''
      },
      {
        label: 'Careers',
        href: '/careers'
      },
      {
        label: 'Contact Us',
        href: '/contact'
      }
    ]
  },
  {
    name: 'publish',
    label: 'Publish',
    subItems: [
      {
        label: 'Peer Review Process',
        href: 'https://docs.google.com/document/d/1TAEPN0-LVIyZw6hLd44O3YXfPwCRK83w7UtnqiNHESE/edit',
        externalLink: true
      },
      {
        label: 'Submit Publication',
        href: '/publish'
      }
    ]
  },
  // {
  //   name: 'subscribe',
  //   label: 'Subscribe',
  //   subItems: [
  //     {
  //       label: 'Personal',
  //       href: '/account/subscription'
  //     },
  //     {
  //       label: 'Institutional',
  //       href: '/institutional-access'
  //     }
  //   ]
  // }
  {
    name: 'pricing',
    label: 'Pricing',
    href: '/#pricing'
  }
]
