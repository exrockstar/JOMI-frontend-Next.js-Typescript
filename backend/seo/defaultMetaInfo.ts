import { SITE_NAME, BASE_URL } from 'common/constants'
import { MetaData } from './MetaData'

const defaultDescription = `The ${SITE_NAME} (JOMI) is a surgical journal publishing high-definition, peer-reviewed video articles for surgeons, physicians, and medical students.`
const defaultTitle = `${SITE_NAME} | Peer-Reviewed Surgical Videos For Video-Based Surgical Education`

export const defaultMeta: MetaData = {
  'og:description': defaultDescription,
  'og:image:height': '1600',
  'og:image:type': 'image/jpeg',
  'og:image:width': '533',
  'og:image': BASE_URL + '/logo_onblack_text.jpg',
  'og:locale': 'en_US',
  'og:site_name': SITE_NAME,
  'og:title': defaultTitle,
  'og:type': 'website',
  'og:url': BASE_URL,
  'twitter:card': 'summary',
  'twitter:description': defaultDescription,
  'twitter:image': BASE_URL + '/img/jomi-site.png',
  'twitter:site': '@jomijournal',

  description: defaultDescription,
  title: defaultTitle
}
