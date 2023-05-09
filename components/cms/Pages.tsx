import {
  Announcement,
  ChatBubble,
  Domain,
  Explore,
  FormatAlignLeft,
  Gavel,
  LocalOffer,
  LockOutlined,
  MergeType,
  Message,
  MonetizationOn,
  People,
  PhotoLibrary,
  Settings,
  Subject
} from '@mui/icons-material'
import { SidenavItem } from 'components/common/Sidenav/SideNavItem'

const CMS_URL = '/cms'

const SidebarItems: SidenavItem[] = [
  {
    name: 'Dashboard',
    icon: <Explore />,
    url: `${CMS_URL}`,
    disabled: false
  },
  {
    name: 'Announcements',
    icon: <Announcement />,
    url: `${CMS_URL}/announcements`,
    disabled: false
  },
  {
    name: 'Article Management',
    icon: <FormatAlignLeft />,
    url: `${CMS_URL}/articles-list`,
    disabled: false
  },
  {
    name: 'User Management',
    icon: <People />,
    url: `${CMS_URL}/user-list`,
    disabled: false
  },
  {
    name: 'Institution Management',
    icon: <Domain />,
    url: `${CMS_URL}/institutions-list`,
    disabled: false
  },
  {
    name: 'Price Management',
    icon: <MonetizationOn />,
    url: `${CMS_URL}/prices-list`,
    disabled: false
  },
  {
    name: 'Promo codes',
    icon: <LocalOffer />,
    url: `${CMS_URL}/promocodes-list`,
    disabled: false
  },
  {
    name: 'Comments',
    icon: <Message />,
    url: `${CMS_URL}/comments`,
    disabled: true
  },

  {
    name: 'User Blocks',
    icon: <LockOutlined />,
    url: `${CMS_URL}/user-blocks`,
    disabled: true
  },

  {
    name: 'Block Responses',
    icon: <ChatBubble />,
    url: `${CMS_URL}/block-responses`,
    disabled: true
  },

  {
    name: 'Triage Queue',
    icon: <Gavel />,
    url: `${CMS_URL}/triage-queue`,
    disabled: false
  },

  {
    name: 'Media Library',
    icon: <PhotoLibrary />,
    url: `${CMS_URL}/media-library`,
    disabled: false
  },
  {
    name: 'Pages',
    icon: <Subject />,
    url: `${CMS_URL}/page-list`,
    disabled: false
  },
  {
    name: 'Redirects',
    icon: <MergeType />,
    url: `${CMS_URL}/redirects`,
    disabled: false
  },
  // {
  //   name: 'Categories',
  //   icon: 'settings_input_component',
  //   url: `${CMS_URL}/edit-categories`,
  //   disabled: true
  // },
  // {
  //   name: 'Promo Codes',
  //   icon: 'redeem',
  //   url: `${CMS_URL}/promo-codes`,
  //   disabled: true
  // },
  {
    name: 'Site Settings',
    icon: <Settings />,
    url: `${CMS_URL}/settings`,
    disabled: false
  }
]

export default SidebarItems
