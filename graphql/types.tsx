export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  any: { input: any; output: any; }
};

export type Access = {
  __typename?: 'Access';
  accessType?: Maybe<AccessTypeEnum>;
  activity: ActivityType;
  anon_link_id?: Maybe<Scalars['String']['output']>;
  article_categories_flat: Scalars['String']['output'];
  article_publication_id?: Maybe<Scalars['String']['output']>;
  article_title?: Maybe<Scalars['String']['output']>;
  block_type?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  geolocation?: Maybe<GeoLocation>;
  institution?: Maybe<Institution>;
  ip_address_str?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  matchedBy?: Maybe<MatchedBy>;
  orderId?: Maybe<Scalars['String']['output']>;
  order_amount?: Maybe<Scalars['Float']['output']>;
  promoCode?: Maybe<Scalars['String']['output']>;
  referredFrom?: Maybe<Scalars['String']['output']>;
  referrerPath?: Maybe<Scalars['String']['output']>;
  searchTerm?: Maybe<Scalars['String']['output']>;
  time_watched?: Maybe<Scalars['Float']['output']>;
  uniqueView?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  user_agent?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type AccessEventsOutput = {
  __typename?: 'AccessEventsOutput';
  count: Scalars['Int']['output'];
  events: Array<Access>;
};

export type AccessFilterInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  globalFilters?: InputMaybe<Array<ColumnFilter>>;
  institution_id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccessSettings = {
  __typename?: 'AccessSettings';
  displayTrafficGraph: Scalars['Boolean']['output'];
};

export type AccessSettingsInput = {
  displayTrafficGraph?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccessType = {
  __typename?: 'AccessType';
  accessType?: Maybe<AccessTypeEnum>;
  customInstitutionName?: Maybe<Scalars['String']['output']>;
  expiry?: Maybe<Scalars['DateTime']['output']>;
  institution_id?: Maybe<Scalars['String']['output']>;
  institution_name?: Maybe<Scalars['String']['output']>;
  isTrial?: Maybe<Scalars['Boolean']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  matchStatus?: Maybe<MatchStatus>;
  matchedBy?: Maybe<MatchedBy>;
  orderId?: Maybe<Scalars['String']['output']>;
  requireLogin?: Maybe<Scalars['Boolean']['output']>;
  shouldRequestInstVerification?: Maybe<Scalars['String']['output']>;
  subscriptionExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  viaTemporaryIp?: Maybe<Scalars['Boolean']['output']>;
};

/** Types of access granted to the user/visitor when viewing an article */
export enum AccessTypeEnum {
  AdminAccess = 'AdminAccess',
  ArticlePurchase = 'ArticlePurchase',
  ArticleRent = 'ArticleRent',
  AwaitingEmailConfirmation = 'AwaitingEmailConfirmation',
  EmailConfirmationExpired = 'EmailConfirmationExpired',
  Evaluation = 'Evaluation',
  FreeAccess = 'FreeAccess',
  IndividualSubscription = 'IndividualSubscription',
  IndividualTrial = 'IndividualTrial',
  InstitutionLoginRequired = 'InstitutionLoginRequired',
  InstitutionNameOrAliasRestricted = 'InstitutionNameOrAliasRestricted',
  InstitutionSubscriptionExpired = 'InstitutionSubscriptionExpired',
  InstitutionalSubscription = 'InstitutionalSubscription',
  InstitutionalTrial = 'InstitutionalTrial',
  LimitedAccess = 'LimitedAccess',
  RequireSubscription = 'RequireSubscription'
}

export type AccessesByUserIdInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  userID: Scalars['String']['input'];
};

export enum ActivityType {
  Article = 'Article',
  CreateAccount = 'CreateAccount',
  EnterPromoCode = 'EnterPromoCode',
  InitiateCheckout = 'InitiateCheckout',
  LeaveFeedback = 'LeaveFeedback',
  Login = 'Login',
  RequestInstSubscription = 'RequestInstSubscription',
  Search = 'Search',
  ShowFeedback = 'ShowFeedback',
  Subscribe = 'Subscribe',
  VideoBlock = 'VideoBlock',
  VideoPlay = 'VideoPlay'
}

export type AddUserInput = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageInput>;
  institution?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  matched_institution_name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  user_role: UserRoles;
  user_type: Scalars['String']['input'];
};

export type AdditionalInfo = {
  __typename?: 'AdditionalInfo';
  contactInfo?: Maybe<Scalars['String']['output']>;
  pocs_email_sent?: Maybe<Array<Scalars['String']['output']>>;
  question?: Maybe<Scalars['String']['output']>;
  request_email_sent?: Maybe<Scalars['Boolean']['output']>;
  response?: Maybe<Scalars['String']['output']>;
  suggested_contact?: Maybe<Scalars['String']['output']>;
};

export type Announcement = {
  __typename?: 'Announcement';
  _id: Scalars['ObjectId']['output'];
  author?: Maybe<User>;
  backgroundColor?: Maybe<Scalars['String']['output']>;
  cache_id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  enabled: Scalars['Boolean']['output'];
  filters?: Maybe<Array<FilterExpression>>;
  isPermanent?: Maybe<Scalars['Boolean']['output']>;
  lastEditedBy?: Maybe<Scalars['String']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: AnnouncementType;
  unique_views?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user_views?: Maybe<UserViews>;
  views: Scalars['Float']['output'];
};

export type AnnouncementInput = {
  _id: Scalars['String']['input'];
  backgroundColor: Scalars['String']['input'];
  content: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  filters: Array<FilterExpressionInput>;
  isPermanent: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type: AnnouncementType;
};

export enum AnnouncementType {
  Danger = 'Danger',
  Info = 'Info',
  Success = 'Success',
  Warn = 'Warn'
}

export type Article = {
  __typename?: 'Article';
  DOIStatus?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  all_priority_sort?: Maybe<Scalars['Float']['output']>;
  articleAccessType: AccessType;
  assets: Array<Assets>;
  authors: Array<Author>;
  authors_attr_html?: Maybe<Scalars['String']['output']>;
  categories: Array<Category>;
  category_priority_sort?: Maybe<Scalars['Float']['output']>;
  chapters: Array<Chapter>;
  comment_count: Scalars['Int']['output'];
  comment_status?: Maybe<Scalars['String']['output']>;
  content: Content;
  contentlength?: Maybe<Scalars['Int']['output']>;
  created: Scalars['DateTime']['output'];
  descriptionSEO?: Maybe<Scalars['String']['output']>;
  disableMainTab: Scalars['Boolean']['output'];
  disableProcedureTab: Scalars['Boolean']['output'];
  disableTranscriptTab: Scalars['Boolean']['output'];
  display_last?: Maybe<Scalars['String']['output']>;
  edit_last?: Maybe<Scalars['String']['output']>;
  enabled_languages?: Maybe<Array<Scalars['String']['output']>>;
  has_complete_abstract?: Maybe<Scalars['Boolean']['output']>;
  hospital?: Maybe<Hospital>;
  image?: Maybe<Image>;
  isFree: Scalars['Boolean']['output'];
  isPasswordProtected: Scalars['Boolean']['output'];
  isPurchaseArticleFeatureOn?: Maybe<Scalars['Boolean']['output']>;
  isRentArticleFeatureOn?: Maybe<Scalars['Boolean']['output']>;
  languages?: Maybe<Array<Scalars['String']['output']>>;
  outdatedTranslations?: Maybe<Array<Scalars['String']['output']>>;
  preprint_date?: Maybe<Scalars['DateTime']['output']>;
  previousWistiaIDS?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  production_id?: Maybe<Scalars['String']['output']>;
  publication_id?: Maybe<Scalars['String']['output']>;
  published?: Maybe<Scalars['DateTime']['output']>;
  purchaseAllowedCountries?: Maybe<Array<CountryEnum>>;
  rentDuration: Scalars['Int']['output'];
  restrictions?: Maybe<Restriction>;
  showPurchaseArticle: Scalars['Boolean']['output'];
  showRentArticle: Scalars['Boolean']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  stats?: Maybe<ArticleStats>;
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  vid_length?: Maybe<Scalars['String']['output']>;
  visibility: VisibilityEnum;
  wistia?: Maybe<Wistia>;
  wistia_id?: Maybe<Scalars['String']['output']>;
};

export type ArticleForSlug = {
  __typename?: 'ArticleForSlug';
  _id: Scalars['ID']['output'];
  publication_id?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ArticleInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  display?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
  sort_by?: InputMaybe<ArticleSort>;
};

export type ArticleInputFetch = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search_term?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type ArticleOutput = {
  __typename?: 'ArticleOutput';
  articles: Array<Article>;
  selectAllArticleIds?: Maybe<Array<Scalars['String']['output']>>;
  totalCount: Scalars['Int']['output'];
};

export type ArticlePurchaseInput = {
  amount: Scalars['Float']['input'];
  articleId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  stripeCoupon?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<OrderType>;
  user_id: Scalars['String']['input'];
};

export enum ArticleRestrictionEnum {
  Evaluation = 'Evaluation',
  Free = 'Free',
  None = 'None',
  RequiresSubscription = 'RequiresSubscription'
}

export enum ArticleSort {
  Created = 'created',
  None = 'none',
  PreprintDate = 'preprint_date',
  Published = 'published'
}

export type ArticleStats = {
  __typename?: 'ArticleStats';
  averagePercentWatched?: Maybe<Scalars['Float']['output']>;
  last_checked?: Maybe<Scalars['DateTime']['output']>;
  pageLoads?: Maybe<Scalars['Int']['output']>;
  percentOfVisitorsClickingPlay?: Maybe<Scalars['Float']['output']>;
  plays?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
  visitors?: Maybe<Scalars['Int']['output']>;
};

export type Assets = {
  __typename?: 'Assets';
  _id?: Maybe<Scalars['ID']['output']>;
  contentType: Scalars['String']['output'];
  fileSize: Scalars['Float']['output'];
  height: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID']['output'];
  display_name?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  name?: Maybe<Name>;
  role?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  specialty?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  desc: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  short: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  number: Scalars['Int']['output'];
  subchapters?: Maybe<Array<SubChapter>>;
  time: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type ChartData = {
  __typename?: 'ChartData';
  datasets: Array<ChartDataset>;
  labels: Array<Scalars['String']['output']>;
};

export type ChartDataset = {
  __typename?: 'ChartDataset';
  data: Array<Scalars['Float']['output']>;
  label: Scalars['String']['output'];
};

export type Choice = {
  __typename?: 'Choice';
  description: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type ColumnFilter = {
  columnName: Scalars['String']['input'];
  not?: InputMaybe<Scalars['Boolean']['input']>;
  operation: QueryOperation;
  value?: InputMaybe<Scalars['any']['input']>;
};

export type CombinedCodeOutput = {
  __typename?: 'CombinedCodeOutput';
  promoCode?: Maybe<PromoCode>;
  stripeCode?: Maybe<StripePromoCode>;
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  email: Scalars['String']['output'];
  isMainContact?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
};

export type ContactPersonInput = {
  email: Scalars['String']['input'];
  isMainContact: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
};

export type Content = {
  __typename?: 'Content';
  abstract?: Maybe<Scalars['String']['output']>;
  article?: Maybe<Scalars['String']['output']>;
  citations?: Maybe<Scalars['String']['output']>;
  cite_this_article?: Maybe<Scalars['String']['output']>;
  otoc: Array<ContentItem>;
  outline?: Maybe<Scalars['String']['output']>;
  toc: Array<ContentItem>;
  transcription?: Maybe<Scalars['String']['output']>;
};

export type ContentItem = {
  __typename?: 'ContentItem';
  _id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  subheaders: Array<SubItem>;
  text: Scalars['String']['output'];
};

export type ContentItemInput = {
  number: Scalars['Int']['input'];
  subheaders?: InputMaybe<Array<SubItemInput>>;
  text: Scalars['String']['input'];
};

export type CounterAttribute = {
  attributeName: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CounterFilter = {
  filterName: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CounterInput = {
  institution_id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metric_types?: InputMaybe<Array<Scalars['String']['input']>>;
  report_attributes?: InputMaybe<Array<CounterAttribute>>;
  report_filters?: InputMaybe<Array<CounterFilter>>;
  report_id?: InputMaybe<Scalars['String']['input']>;
  reporting_period_end?: InputMaybe<Scalars['DateTime']['input']>;
  reporting_period_start?: InputMaybe<Scalars['DateTime']['input']>;
  search_term?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type Country = {
  __typename?: 'Country';
  _id: Scalars['ID']['output'];
  articleRestriction: ArticleRestrictionEnum;
  code: CountryEnum;
  coefficient: Scalars['Float']['output'];
  multiplier?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  trialsEnabled: Scalars['Boolean']['output'];
};

export enum CountryEnum {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bl = 'BL',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bv = 'BV',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cc = 'CC',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cu = 'CU',
  Cv = 'CV',
  Cw = 'CW',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  Im = 'IM',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mf = 'MF',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pf = 'PF',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pr = 'PR',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Sv = 'SV',
  Sx = 'SX',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vg = 'VG',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Xk = 'XK',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type CountryListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryListOutput = {
  __typename?: 'CountryListOutput';
  count: Scalars['Int']['output'];
  countries: Array<Country>;
  filteredCodes: Array<Scalars['String']['output']>;
};

export type CreateInstitutionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePageInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  scripts?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePromoCodeInput = {
  amount_off?: InputMaybe<Scalars['Float']['input']>;
  applies_to?: InputMaybe<Array<Scalars['String']['input']>>;
  code: Scalars['String']['input'];
  duration?: InputMaybe<PromoCodeDuration>;
  duration_in_months?: InputMaybe<Scalars['Float']['input']>;
  max_redemptions?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  percent_off?: InputMaybe<Scalars['Float']['input']>;
  redeem_by?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateRedirectInput = {
  from: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['String']['input'];
  track?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSignInTokenInput = {
  id: Scalars['String']['input'];
  redirect: Scalars['String']['input'];
};

export type DeleteInstitutionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};

export type DeleteInstitutionOutput = {
  __typename?: 'DeleteInstitutionOutput';
  _id?: Maybe<Scalars['ID']['output']>;
};

export type DeleteRedirectInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};

export type DeleteRedirectOutput = {
  __typename?: 'DeleteRedirectOutput';
  _id?: Maybe<Scalars['ID']['output']>;
};

export enum EmailPreference {
  All = 'all',
  None = 'none',
  Some = 'some'
}

export type ExtendedRegistrationInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  institution_name?: InputMaybe<Scalars['String']['input']>;
  institutional_email?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
  specialty: Scalars['ID']['input'];
  user_type: Scalars['String']['input'];
};

export type ExtendedRegistrationOutput = {
  __typename?: 'ExtendedRegistrationOutput';
  matchedWithInstitution?: Maybe<Scalars['Boolean']['output']>;
  updatedAccess: AccessType;
  updatedUser: User;
};

export type Feedback = {
  __typename?: 'Feedback';
  _id: Scalars['String']['output'];
  _institution?: Maybe<Institution>;
  anon_link_id?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  institution: Scalars['String']['output'];
  method?: Maybe<Scalars['String']['output']>;
  question?: Maybe<FeedbackQuestion>;
  questionId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  value: Scalars['any']['output'];
};

export type FeedbackListInput = {
  endDAte?: InputMaybe<Scalars['DateTime']['input']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FeedbackListOutput = {
  __typename?: 'FeedbackListOutput';
  count: Scalars['Int']['output'];
  dbQueryString?: Maybe<Scalars['String']['output']>;
  items: Array<Feedback>;
};

export type FeedbackQuestion = {
  __typename?: 'FeedbackQuestion';
  _id: Scalars['String']['output'];
  choices?: Maybe<Array<Choice>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  disabled: Scalars['Boolean']['output'];
  legends?: Maybe<Array<Scalars['String']['output']>>;
  question: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type FeedbackSettings = {
  __typename?: 'FeedbackSettings';
  selectedAccessTypes: Array<AccessTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type FeedbackSettingsInput = {
  selectedAccessTypes: Array<AccessTypeEnum>;
};

export enum FileExtensions {
  Jpeg = 'jpeg',
  Jpg = 'jpg',
  Png = 'png',
  Svg = 'svg',
  Webp = 'webp'
}

export type FilterExpression = {
  __typename?: 'FilterExpression';
  columnName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  operator: Operators;
  parentId?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['any']['output']>;
};

export type FilterExpressionInput = {
  columnName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  operator: Operators;
  parentId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['any']['input']>;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  continentCode?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  regionCode?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
};

export type GeographicPriceInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  countryCode: CountryEnum;
  interval?: InputMaybe<OrderInterval>;
  percentageFromDefaultPrice?: InputMaybe<Scalars['Int']['input']>;
  product_id: Scalars['String']['input'];
};

export type Geolocation = {
  __typename?: 'Geolocation';
  capitolCity?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
};

export type Geometry = {
  __typename?: 'Geometry';
  height: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type GetInstitutionInput = {
  id: Scalars['ID']['input'];
};

export type Hospital = {
  __typename?: 'Hospital';
  name: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  extension?: Maybe<FileExtensions>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['String']['output']>;
  foreign?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  geometry?: Maybe<Geometry>;
  length?: Maybe<Scalars['Float']['output']>;
  metadata?: Maybe<ImageMetadata>;
  path?: Maybe<Scalars['Float']['output']>;
};

export type ImageInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageMetadata = {
  __typename?: 'ImageMetadata';
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  geometry?: Maybe<Geometry>;
  original_name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type InsertPromoCodeInput = {
  _id: Scalars['ID']['input'];
  bulkUnusedCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  bulkUsedCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  days?: InputMaybe<Scalars['Int']['input']>;
  expiration: Scalars['DateTime']['input'];
  interval: OrderInterval;
  isSubscription: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  numberOfCodes?: InputMaybe<Scalars['Int']['input']>;
  numberUnused?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  times_redeemed?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: PromoCodeType;
};

export type Institution = {
  __typename?: 'Institution';
  _id: Scalars['ID']['output'];
  accessSettings: AccessSettings;
  aliases: Array<Scalars['String']['output']>;
  aliases_str: Scalars['String']['output'];
  articleViewsOverTime: ChartData;
  article_count: Scalars['Int']['output'];
  article_count_anon: Scalars['Int']['output'];
  automated_status: Scalars['String']['output'];
  category?: Maybe<Scalars['String']['output']>;
  closed_queries_count: Scalars['Int']['output'];
  contacts: InstitutionContacts;
  created?: Maybe<Scalars['DateTime']['output']>;
  domains: Array<Scalars['String']['output']>;
  expiry: Scalars['Int']['output'];
  expiry_date_cached?: Maybe<Scalars['DateTime']['output']>;
  image?: Maybe<Image>;
  lastChecked?: Maybe<Scalars['DateTime']['output']>;
  locations: Array<Location>;
  matchName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  open_queries_count: Scalars['Int']['output'];
  pending_requests?: Maybe<Scalars['Int']['output']>;
  points_of_contact?: Maybe<Array<ContactPerson>>;
  restrictMatchByName?: Maybe<Scalars['Boolean']['output']>;
  restrictions: Restrictions;
  sent_requests: Scalars['Int']['output'];
  show_on_subscribers_page?: Maybe<Scalars['Boolean']['output']>;
  stats?: Maybe<InstitutionStats>;
  subscriber_display_name?: Maybe<Scalars['String']['output']>;
  subscription: InstitutionSubscription;
  total_article_count: Scalars['Int']['output'];
  total_requests?: Maybe<Scalars['Int']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  urlLink?: Maybe<Scalars['String']['output']>;
  user_count: Scalars['Int']['output'];
};

export type InstitutionAccessInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  globalFilters?: InputMaybe<Array<ColumnFilter>>;
  institutionId: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum InstitutionAccessState {
  Default = 'default',
  RequireRequest = 'require_request',
  RequireSubscription = 'require_subscription'
}

export type InstitutionAccessStats = {
  __typename?: 'InstitutionAccessStats';
  activeUsers: Scalars['Float']['output'];
  anonUserCount: Scalars['Float']['output'];
  anonymousArticleViews: Scalars['Float']['output'];
  articleViewsByUser: Scalars['Float']['output'];
  totalArticleViews: Scalars['Float']['output'];
  totalLogins: Scalars['Float']['output'];
  uniqueVideoBlocks: Scalars['Float']['output'];
  users: Scalars['Float']['output'];
  videoBlocks: Scalars['Float']['output'];
};

export type InstitutionArticleStats = {
  __typename?: 'InstitutionArticleStats';
  _id: Scalars['String']['output'];
  article?: Maybe<Article>;
  articleViews: Scalars['Int']['output'];
  uniqueViews: Scalars['Int']['output'];
  user_ids: Array<Scalars['String']['output']>;
};

export type InstitutionArticleStatsOutput = {
  __typename?: 'InstitutionArticleStatsOutput';
  items: Array<InstitutionArticleStats>;
  totalCount: Scalars['Int']['output'];
};

export type InstitutionContacts = {
  __typename?: 'InstitutionContacts';
  main: ContactPerson;
};

export type InstitutionInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  showExpiry?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type InstitutionOutput = {
  __typename?: 'InstitutionOutput';
  count: Scalars['Int']['output'];
  dbQueryString: Scalars['String']['output'];
  institutions: Array<Institution>;
};

export type InstitutionStats = {
  __typename?: 'InstitutionStats';
  articleCount?: Maybe<Scalars['Int']['output']>;
  articleCountAnon?: Maybe<Scalars['Int']['output']>;
  lastChecked?: Maybe<Scalars['DateTime']['output']>;
  loginCount?: Maybe<Scalars['Int']['output']>;
  totalArticleCount?: Maybe<Scalars['Int']['output']>;
  totalSearches?: Maybe<Scalars['Int']['output']>;
  uniqueVideoBlocks?: Maybe<Scalars['Int']['output']>;
  userCount: Scalars['Int']['output'];
  videoBlocks?: Maybe<Scalars['Int']['output']>;
};

export type InstitutionSubscription = {
  __typename?: 'InstitutionSubscription';
  expiredOrderStatus?: Maybe<OrderType>;
  last_checked?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  status?: Maybe<StatusType>;
};

export type InstitutionUserTypeStat = {
  __typename?: 'InstitutionUserTypeStat';
  count: Scalars['Float']['output'];
  user_type: Scalars['String']['output'];
};

export type IpRange = {
  __typename?: 'IpRange';
  _id: Scalars['ID']['output'];
  created?: Maybe<Scalars['DateTime']['output']>;
  end: Scalars['Float']['output'];
  end_string: Scalars['String']['output'];
  institution: Scalars['String']['output'];
  lastEditedBy?: Maybe<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  start: Scalars['Float']['output'];
  start_string: Scalars['String']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type IpRangeInput = {
  end: Scalars['String']['input'];
  institution: Scalars['String']['input'];
  location: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  start: Scalars['String']['input'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  continent?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  ip_ranges: Array<IpRange>;
  orders: Array<Order>;
  region?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  continent?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institution: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** Specifies how user was matched to an institution */
export enum MatchStatus {
  Admin = 'Admin',
  NotMatched = 'NotMatched',
  System = 'System'
}

/** Specifies with what method user was matched to inst */
export enum MatchedBy {
  Admin = 'Admin',
  Email = 'Email',
  Ip = 'IP',
  InstitutionName = 'InstitutionName',
  InstitutionalEmail = 'InstitutionalEmail',
  NotMatched = 'NotMatched',
  OffsiteAccess = 'OffsiteAccess'
}

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectId']['output'];
  filename: Scalars['String']['output'];
  length: Scalars['Int']['output'];
  metadata?: Maybe<MediaMeta>;
  uploadDate?: Maybe<Scalars['DateTime']['output']>;
};

export type MediaInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaMeta = {
  __typename?: 'MediaMeta';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MediaOutput = {
  __typename?: 'MediaOutput';
  count?: Maybe<Scalars['Int']['output']>;
  files: Array<Media>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCRMTagsToOrderListResults: Scalars['Boolean']['output'];
  addCRMTagsToTriageQueueResults: Scalars['Boolean']['output'];
  addCRMTagsToUsers: Scalars['Boolean']['output'];
  addLanguagesToExistingArticles: Scalars['String']['output'];
  addOrUpdateOrder: Scalars['Boolean']['output'];
  addPromoCode?: Maybe<Scalars['Boolean']['output']>;
  addPurchaseArticleOrder: Scalars['Boolean']['output'];
  addTranslationsHash: Scalars['String']['output'];
  addTrialOrderForUser: Scalars['Boolean']['output'];
  addVote: NewArticleVote;
  applyInstitutionToTriage: TriageQueue;
  cancelJob: Scalars['String']['output'];
  cancelOrder: Scalars['Boolean']['output'];
  checkOutdatedTranslations: Scalars['Boolean']['output'];
  cleanUpFrequentArticleViews: Scalars['String']['output'];
  completeUserRegistration: ExtendedRegistrationOutput;
  confirmEmail?: Maybe<Scalars['String']['output']>;
  confirmInstEmail?: Maybe<Scalars['String']['output']>;
  createAnnouncement: Announcement;
  createGeographicPrice?: Maybe<StripePrice>;
  createInstitution: Institution;
  createIpRange?: Maybe<IpRange>;
  createLocation?: Maybe<Location>;
  createOrder?: Maybe<Order>;
  createOrderForUser?: Maybe<Order>;
  createPage: Page;
  createPublicationRequest: Scalars['Boolean']['output'];
  createRedirect: Redirect;
  createSignInToken: Scalars['String']['output'];
  createStripePromoCode: StripePromoCode;
  createUser: User;
  deleteAnnouncement: Scalars['String']['output'];
  deleteIpRange: IpRange;
  deleteLocation?: Maybe<Location>;
  deleteMedia: Scalars['String']['output'];
  deleteOrder?: Maybe<Order>;
  deletePage: Page;
  deletePrice?: Maybe<StripePrice>;
  deletePromoCode: Scalars['Boolean']['output'];
  deleteRedirect: DeleteRedirectOutput;
  deleteSignInToken: Scalars['Boolean']['output'];
  deleteStripePromocode: Scalars['Boolean']['output'];
  editPromoCode: Scalars['Boolean']['output'];
  forgotPasswordCms: Scalars['Boolean']['output'];
  generateAllScienceOpenXml: Scalars['String']['output'];
  generateDOI: Article;
  generateScienceOpenXmlByArticle: Scalars['String']['output'];
  getInstitution: Institution;
  handleFailedOrderPayment: Scalars['Boolean']['output'];
  handleFreePromoCode: Scalars['Boolean']['output'];
  loginToArticle: Scalars['Boolean']['output'];
  markAnnouncementAsRead: Array<Scalars['String']['output']>;
  redactVote: NewArticleVote;
  removeTemporaryAccessById: Scalars['Boolean']['output'];
  requestSubscription: Scalars['Boolean']['output'];
  resetPasswordCms?: Maybe<Scalars['String']['output']>;
  resubscribeOrder?: Maybe<Order>;
  runJobManually: Scalars['String']['output'];
  sendEmailConfirmation?: Maybe<Scalars['Boolean']['output']>;
  sendInstEmailConfirmation?: Maybe<Scalars['Boolean']['output']>;
  sendTriageQueueEmail: TriageQueue;
  setEnabledAnnouncement: Announcement;
  signIn?: Maybe<User>;
  signInUsingOldToken?: Maybe<User>;
  signUp: Scalars['String']['output'];
  syncDefaultPricesToDb: Scalars['Boolean']['output'];
  toggleTrialAccess: Scalars['Boolean']['output'];
  tokenSignIn?: Maybe<User>;
  trackAnnouncements: Scalars['Boolean']['output'];
  trackArticle: Scalars['Boolean']['output'];
  trackFeedack?: Maybe<Feedback>;
  trackInitiateCheckout: Scalars['Boolean']['output'];
  trackLogin: Scalars['Boolean']['output'];
  trackRequestInstSubscription: Scalars['Boolean']['output'];
  trackSearch: Scalars['Boolean']['output'];
  trackShowFeedback: Scalars['Boolean']['output'];
  trackSubscribe: Scalars['Boolean']['output'];
  trackVideoBlock?: Maybe<Scalars['String']['output']>;
  trackVideoPlay?: Maybe<Scalars['String']['output']>;
  trackVideoTime: Scalars['Boolean']['output'];
  transferDuplicateDomains: Scalars['String']['output'];
  transferInstitutionData: Scalars['String']['output'];
  translateArticles: Array<TranslationResult>;
  triggerUpdateUserSubscription: Scalars['String']['output'];
  unsubscribeOrder?: Maybe<Order>;
  updateAnnouncement: Announcement;
  updateArticle?: Maybe<Article>;
  updateContentLength: Scalars['String']['output'];
  updateCountries: Scalars['String']['output'];
  updateFeedbackSettings: FeedbackSettings;
  updateInstEmail: Scalars['Boolean']['output'];
  updateInstitution?: Maybe<Institution>;
  updateInstitutionContacts?: Maybe<Institution>;
  updateIpRange?: Maybe<IpRange>;
  updateLocation?: Maybe<Location>;
  updateMediaLibrary?: Maybe<Media>;
  updateOrder?: Maybe<Order>;
  updateOrderCms?: Maybe<Order>;
  updatePage?: Maybe<Page>;
  updatePassword: Scalars['Boolean']['output'];
  updatePreference: Scalars['Boolean']['output'];
  updatePrice?: Maybe<StripePrice>;
  updateProfile: Scalars['Boolean']['output'];
  updatePurchaseSetting: Array<Article>;
  updateRedirect?: Maybe<Redirect>;
  updateSiteSettings: SiteSetting;
  updateStripePromoCode: StripePromoCode;
  updateTriageNotes: TriageQueue;
  updateTriageQueueStatus: TriageQueue;
  updateTriageResponse: TriageQueue;
  updateTrialSettings: TrialSettings;
  updateUserCms: User;
  updateWistiaMetadata: Scalars['String']['output'];
  upgradeSubscription?: Maybe<Scalars['Boolean']['output']>;
  upsertSocialUser: User;
  writeLog: Scalars['Boolean']['output'];
};


export type MutationAddCrmTagsToOrderListResultsArgs = {
  input?: InputMaybe<OrderListInput>;
  tags: Array<Scalars['String']['input']>;
};


export type MutationAddCrmTagsToTriageQueueResultsArgs = {
  input?: InputMaybe<TriageQueueInput>;
  tags: Array<Scalars['String']['input']>;
};


export type MutationAddCrmTagsToUsersArgs = {
  input?: InputMaybe<UserInput>;
  tags: Array<Scalars['String']['input']>;
};


export type MutationAddOrUpdateOrderArgs = {
  input: OrderInput;
};


export type MutationAddPromoCodeArgs = {
  input: InsertPromoCodeInput;
};


export type MutationAddPurchaseArticleOrderArgs = {
  input: ArticlePurchaseInput;
};


export type MutationAddVoteArgs = {
  article_title: Scalars['String']['input'];
};


export type MutationApplyInstitutionToTriageArgs = {
  id: Scalars['String']['input'];
  institution_id: Scalars['String']['input'];
};


export type MutationCancelJobArgs = {
  name: Scalars['String']['input'];
};


export type MutationCancelOrderArgs = {
  subscription_id: Scalars['String']['input'];
};


export type MutationCleanUpFrequentArticleViewsArgs = {
  institution_id: Scalars['String']['input'];
};


export type MutationCompleteUserRegistrationArgs = {
  input: ExtendedRegistrationInput;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationConfirmInstEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateGeographicPriceArgs = {
  input: GeographicPriceInput;
};


export type MutationCreateInstitutionArgs = {
  input: CreateInstitutionInput;
};


export type MutationCreateIpRangeArgs = {
  input: IpRangeInput;
};


export type MutationCreateLocationArgs = {
  input?: InputMaybe<LocationInput>;
};


export type MutationCreateOrderArgs = {
  input: OrderInputForLocation;
};


export type MutationCreateOrderForUserArgs = {
  input: UpdateOrderInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationCreatePublicationRequestArgs = {
  input: PublicationRequestInput;
};


export type MutationCreateRedirectArgs = {
  input: CreateRedirectInput;
};


export type MutationCreateSignInTokenArgs = {
  input: CreateSignInTokenInput;
};


export type MutationCreateStripePromoCodeArgs = {
  input: CreatePromoCodeInput;
};


export type MutationCreateUserArgs = {
  input: AddUserInput;
};


export type MutationDeleteAnnouncementArgs = {
  _id: Scalars['String']['input'];
};


export type MutationDeleteIpRangeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMediaArgs = {
  _id: Scalars['String']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePageArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePriceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePromoCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationDeleteRedirectArgs = {
  input?: InputMaybe<DeleteRedirectInput>;
};


export type MutationDeleteSignInTokenArgs = {
  user_id: Scalars['String']['input'];
};


export type MutationDeleteStripePromocodeArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditPromoCodeArgs = {
  input: UpdatePromoCodeInput;
};


export type MutationForgotPasswordCmsArgs = {
  email: Scalars['String']['input'];
};


export type MutationGenerateDoiArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateScienceOpenXmlByArticleArgs = {
  publication_id: Scalars['String']['input'];
};


export type MutationGetInstitutionArgs = {
  input: GetInstitutionInput;
};


export type MutationHandleFailedOrderPaymentArgs = {
  error_code: Scalars['String']['input'];
  order_id: Scalars['String']['input'];
};


export type MutationHandleFreePromoCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationLoginToArticleArgs = {
  password: Scalars['String']['input'];
  publication_id: Scalars['String']['input'];
};


export type MutationMarkAnnouncementAsReadArgs = {
  cacheId: Scalars['String']['input'];
};


export type MutationRedactVoteArgs = {
  article_title: Scalars['String']['input'];
};


export type MutationRemoveTemporaryAccessByIdArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRequestSubscriptionArgs = {
  input: SubscriptionInput;
};


export type MutationResetPasswordCmsArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResubscribeOrderArgs = {
  order_id: Scalars['String']['input'];
};


export type MutationRunJobManuallyArgs = {
  data?: InputMaybe<Scalars['any']['input']>;
  name: Scalars['String']['input'];
};


export type MutationSendEmailConfirmationArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendInstEmailConfirmationArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendTriageQueueEmailArgs = {
  input: TriageQueueEmailInput;
};


export type MutationSetEnabledAnnouncementArgs = {
  _id: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignInUsingOldTokenArgs = {
  tokenId: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationToggleTrialAccessArgs = {
  user_id: Scalars['String']['input'];
  value: Scalars['Boolean']['input'];
};


export type MutationTokenSignInArgs = {
  token: Scalars['String']['input'];
};


export type MutationTrackAnnouncementsArgs = {
  _ids: Array<Scalars['String']['input']>;
};


export type MutationTrackArticleArgs = {
  input: TrackArticleInput;
};


export type MutationTrackFeedackArgs = {
  input: TrackFeedbackInput;
};


export type MutationTrackInitiateCheckoutArgs = {
  input: TrackInitiateCheckoutInput;
};


export type MutationTrackRequestInstSubscriptionArgs = {
  input: TrackRequestInstSubscriptionInput;
};


export type MutationTrackSearchArgs = {
  input: ArticleInput;
};


export type MutationTrackShowFeedbackArgs = {
  input: TrackVideoInput;
};


export type MutationTrackSubscribeArgs = {
  input: TrackSubscribeInput;
};


export type MutationTrackVideoBlockArgs = {
  input: TrackVideoInput;
};


export type MutationTrackVideoPlayArgs = {
  input: TrackVideoInput;
};


export type MutationTrackVideoTimeArgs = {
  input: TrackVideoTimeInput;
};


export type MutationTransferDuplicateDomainsArgs = {
  input: TransferDomainsInput;
};


export type MutationTransferInstitutionDataArgs = {
  input: TransferInstDataInput;
};


export type MutationTranslateArticlesArgs = {
  input: TranslateArticlesInput;
};


export type MutationUnsubscribeOrderArgs = {
  order_id: Scalars['String']['input'];
};


export type MutationUpdateAnnouncementArgs = {
  input: AnnouncementInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateCountriesArgs = {
  input: UpdateCountriesInput;
};


export type MutationUpdateFeedbackSettingsArgs = {
  input: FeedbackSettingsInput;
};


export type MutationUpdateInstEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateInstitutionArgs = {
  input: UpdateInstitutionInput;
};


export type MutationUpdateInstitutionContactsArgs = {
  contacts: Array<ContactPersonInput>;
  id: Scalars['String']['input'];
};


export type MutationUpdateIpRangeArgs = {
  id: Scalars['String']['input'];
  input: IpRangeInput;
};


export type MutationUpdateLocationArgs = {
  input: LocationInput;
};


export type MutationUpdateMediaLibraryArgs = {
  input: UpdateMediaLibraryInput;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String']['input'];
  input: OrderInputForLocation;
};


export type MutationUpdateOrderCmsArgs = {
  id: Scalars['String']['input'];
  input: UpdateOrderInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdatePreferenceArgs = {
  preference: EmailPreference;
};


export type MutationUpdatePriceArgs = {
  id: Scalars['String']['input'];
  input: UpdatePriceInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdatePurchaseSettingArgs = {
  input: UpdatePurchaseSettingInput;
};


export type MutationUpdateRedirectArgs = {
  input: UpdateRedirectInput;
};


export type MutationUpdateSiteSettingsArgs = {
  input: UpdateSiteSettingInput;
};


export type MutationUpdateStripePromoCodeArgs = {
  input: UpdateStripeCodeInput;
};


export type MutationUpdateTriageNotesArgs = {
  input: UpdateTriageNotesInput;
};


export type MutationUpdateTriageQueueStatusArgs = {
  input: UpdateTriageInput;
};


export type MutationUpdateTriageResponseArgs = {
  input: UpdateTriageResponseInput;
};


export type MutationUpdateTrialSettingsArgs = {
  input: TrialSettingsInput;
};


export type MutationUpdateUserCmsArgs = {
  input: UpdateUserInput;
};


export type MutationUpgradeSubscriptionArgs = {
  promocode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpsertSocialUserArgs = {
  input: SocialAuthInput;
};


export type MutationWriteLogArgs = {
  level: Scalars['String']['input'];
  message: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['String']['input']>;
};

export type Name = {
  __typename?: 'Name';
  first?: Maybe<Scalars['String']['output']>;
  last?: Maybe<Scalars['String']['output']>;
  middle?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
};

export type NewArticleVote = {
  __typename?: 'NewArticleVote';
  article_title: Scalars['String']['output'];
  t: Scalars['String']['output'];
  users_voted: Array<Scalars['String']['output']>;
  v: Scalars['Int']['output'];
};

export enum Operators {
  After = 'after',
  And = 'and',
  Before = 'before',
  Contains = 'contains',
  Equal = 'equal',
  GreaterThan = 'greater_than',
  GreaterThanOrEqual = 'greater_than_or_equal',
  LessThan = 'less_than',
  LessThanOrEqual = 'less_than_or_equal',
  NotContains = 'not_contains',
  NotEqual = 'not_equal',
  Or = 'or'
}

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID']['output'];
  amount?: Maybe<Scalars['Float']['output']>;
  article?: Maybe<Article>;
  articleId?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<OrderCurrency>;
  customInstitutionName?: Maybe<Scalars['String']['output']>;
  db_user_id?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<StripePromoCode>;
  end?: Maybe<Scalars['DateTime']['output']>;
  error_code?: Maybe<Scalars['String']['output']>;
  erroredAt?: Maybe<Scalars['DateTime']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  institutionObject?: Maybe<Institution>;
  isCanceled?: Maybe<Scalars['Boolean']['output']>;
  isTrialPeriod?: Maybe<Scalars['Boolean']['output']>;
  lastEditedBy?: Maybe<Scalars['String']['output']>;
  latest_invoice?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  payment_status?: Maybe<OrderPaymentStatus>;
  plan_id?: Maybe<Scalars['String']['output']>;
  plan_interval?: Maybe<OrderInterval>;
  promoCode?: Maybe<Scalars['String']['output']>;
  renewals?: Maybe<Scalars['Int']['output']>;
  require_login?: Maybe<RequireLogin>;
  restricted_specialties: Array<Scalars['String']['output']>;
  restricted_user_types: Array<Scalars['String']['output']>;
  start?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<OrderStatus>;
  stripeCoupon?: Maybe<Scalars['String']['output']>;
  stripePromoCode?: Maybe<Scalars['String']['output']>;
  type?: Maybe<OrderType>;
  updated: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export enum OrderCurrency {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Bwp = 'BWP',
  Byn = 'BYN',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Chf = 'CHF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Crc = 'CRC',
  Cuc = 'CUC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mru = 'MRU',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nio = 'NIO',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Ssp = 'SSP',
  Stn = 'STN',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Ves = 'VES',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xcd = 'XCD',
  Xof = 'XOF',
  Xpf = 'XPF',
  Yer = 'YER',
  Zar = 'ZAR',
  Zmw = 'ZMW',
  Zwl = 'ZWL'
}

export type OrderInput = {
  amount: Scalars['Float']['input'];
  amplitudeSessionId?: InputMaybe<Scalars['Float']['input']>;
  created: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  end: Scalars['DateTime']['input'];
  isTrialPeriod?: InputMaybe<Scalars['Boolean']['input']>;
  latest_invoice?: InputMaybe<Scalars['String']['input']>;
  plan_id?: InputMaybe<Scalars['String']['input']>;
  plan_interval: Scalars['String']['input'];
  promoCode?: InputMaybe<Scalars['String']['input']>;
  start: Scalars['DateTime']['input'];
  stripeCoupon?: InputMaybe<Scalars['String']['input']>;
  stripePromoCode?: InputMaybe<Scalars['String']['input']>;
  type: OrderType;
  user_id: Scalars['String']['input'];
};

export type OrderInputForLocation = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<OrderCurrency>;
  description?: InputMaybe<Scalars['String']['input']>;
  end: Scalars['DateTime']['input'];
  institution: Scalars['String']['input'];
  location: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  require_login: RequireLogin;
  restricted_specialties?: InputMaybe<Array<Scalars['String']['input']>>;
  restricted_user_types?: InputMaybe<Array<Scalars['String']['input']>>;
  start: Scalars['DateTime']['input'];
  type: OrderType;
};

export enum OrderInterval {
  Day = 'Day',
  Month = 'Month',
  NotApplicable = 'NotApplicable',
  Week = 'Week',
  Year = 'Year'
}

export type OrderListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderListOutput = {
  __typename?: 'OrderListOutput';
  count: Scalars['Int']['output'];
  dbQueryString: Scalars['String']['output'];
  orders: Array<Order>;
};

export enum OrderPaymentStatus {
  AmountCapturableUpdated = 'AmountCapturableUpdated',
  PaymentFailed = 'PaymentFailed',
  Processing = 'Processing',
  Succeeded = 'Succeeded',
  Unpaid = 'Unpaid'
}

export enum OrderStatus {
  Active = 'Active',
  Canceled = 'Canceled',
  Expired = 'Expired',
  Incomplete = 'Incomplete',
  IncompleteExpired = 'IncompleteExpired',
  PastDue = 'PastDue',
  Trialing = 'Trialing',
  Unpaid = 'Unpaid'
}

export enum OrderType {
  Default = 'default',
  Individual = 'individual',
  Institution = 'institution',
  Institutional = 'institutional',
  PurchaseArticle = 'purchase_article',
  RentArticle = 'rent_article',
  Standard = 'standard',
  StandardStripe = 'standard_stripe',
  Trial = 'trial'
}

export type Page = {
  __typename?: 'Page';
  _id: Scalars['String']['output'];
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  meta_desc?: Maybe<Scalars['String']['output']>;
  scripts?: Maybe<Array<Scalars['String']['output']>>;
  sidebar?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: PageStatus;
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type PageForSlug = {
  __typename?: 'PageForSlug';
  _id: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type PageInputFetch = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search_term?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type PageOutput = {
  __typename?: 'PageOutput';
  pages: Array<Page>;
  totalCount: Scalars['Int']['output'];
};

export enum PageStatus {
  Draft = 'draft',
  Publish = 'publish'
}

export type PartialRequest = {
  __typename?: 'PartialRequest';
  created?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  coupon?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  invoiceId: Scalars['String']['output'];
  order?: Maybe<Order>;
  orderId: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type PreviouslyStatedInst = {
  __typename?: 'PreviouslyStatedInst';
  date: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type PriceByCountry = {
  __typename?: 'PriceByCountry';
  _id: Scalars['ID']['output'];
  articleRestriction: ArticleRestrictionEnum;
  code: CountryEnum;
  coefficient: Scalars['Float']['output'];
  multiplier?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  prices: Array<StripePrice>;
  trialsEnabled: Scalars['Boolean']['output'];
};

export type PriceFilterInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type PriceOutputByCountry = {
  __typename?: 'PriceOutputByCountry';
  allProductIds: Array<Scalars['String']['output']>;
  count: Scalars['Int']['output'];
  countries: Array<PriceByCountry>;
  defaultPrices: Array<StripePrice>;
};

export type ProfileOptions = {
  __typename?: 'ProfileOptions';
  specialties: Array<Specialty>;
  userTypes: Array<UserType>;
};

export type Project = {
  __typename?: 'Project';
  hashed_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PromoCode = {
  __typename?: 'PromoCode';
  _id: Scalars['ID']['output'];
  bulkUnusedCodes: Array<Scalars['String']['output']>;
  bulkUsedCodes: Array<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  days?: Maybe<Scalars['Int']['output']>;
  expiration: Scalars['DateTime']['output'];
  institution?: Maybe<Institution>;
  interval?: Maybe<OrderInterval>;
  isSubscription: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  numberUnused?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  stripe?: Maybe<StripePromo>;
  times_redeemed?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  type: PromoCodeType;
  updated: Scalars['DateTime']['output'];
};

export enum PromoCodeDuration {
  Forever = 'forever',
  Once = 'once',
  Repeating = 'repeating'
}

export type PromoCodeListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  isSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type PromoCodeListOutput = {
  __typename?: 'PromoCodeListOutput';
  count: Scalars['Int']['output'];
  dbQueryString: Scalars['String']['output'];
  promocodes: Array<PromoCode>;
};

export enum PromoCodeType {
  Individual = 'individual',
  Institution = 'institution'
}

export type PublicationRequestInput = {
  abstract: Scalars['String']['input'];
  email: Scalars['String']['input'];
  full_name: Scalars['String']['input'];
  institution: Scalars['String']['input'];
  procedure: Scalars['String']['input'];
  rationale: Scalars['String']['input'];
  specialty: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  accessEvents: AccessEventsOutput;
  accessesByUserId?: Maybe<AccessEventsOutput>;
  addCRMTagsToOrderListResultsPreview: Scalars['Int']['output'];
  addCRMTagsToTriageQueueResultsPreview: Scalars['Int']['output'];
  allArticleIds: Array<Scalars['String']['output']>;
  allArticleVotes: Array<NewArticleVote>;
  allInstitutionsList: Array<Scalars['String']['output']>;
  announcement: Announcement;
  announcementForUser?: Maybe<Array<Announcement>>;
  announcements: Array<Announcement>;
  articleAccessStats: InstitutionArticleStatsOutput;
  articleById?: Maybe<Article>;
  articleBySlug?: Maybe<Article>;
  articles: ArticleOutput;
  articlesByIds: Array<Article>;
  articlesForRss: Array<Article>;
  articlesForSlug: Array<ArticleForSlug>;
  authorBySlug?: Maybe<Author>;
  authors: Array<Author>;
  categories?: Maybe<Array<Category>>;
  checkFrequentArticleViews: Scalars['Int']['output'];
  confSampleCases: Array<Article>;
  deleteInstitution: DeleteInstitutionOutput;
  featured_institutions: Array<Institution>;
  fetchArticles: ArticleOutput;
  fetchPageById?: Maybe<Page>;
  fetchPages: PageOutput;
  fetchRedirectById?: Maybe<Redirect>;
  fetchRedirects: RedirectOutput;
  files: MediaOutput;
  genCounterReport: Scalars['String']['output'];
  geolocation?: Maybe<Geolocation>;
  getAllOrders: OrderListOutput;
  getAllPromoCodes?: Maybe<PromoCodeListOutput>;
  getCombinedPromoCode: CombinedCodeOutput;
  getCountries: CountryListOutput;
  getDefaultPrices: Array<StripePrice>;
  getFeedbackList: FeedbackListOutput;
  getFeedbackModalAccessTypes: Array<AccessTypeEnum>;
  getFeedbackQuestionsForUser?: Maybe<FeedbackQuestion>;
  getFeedbackSettings: FeedbackSettings;
  getFeedbacksByInstitutionId: FeedbackListOutput;
  getIsRequestInstSubButtonPaperOn: Scalars['Boolean']['output'];
  getPaymentIntentStatus?: Maybe<Scalars['String']['output']>;
  getPriceByProductId: StripePrice;
  getPricingSectionData?: Maybe<Array<StripePrice>>;
  getPromoDetail?: Maybe<PromoCode>;
  getPurchaseAndRentPrices: Array<StripePrice>;
  getPurchasedArticles: Array<Order>;
  getPurchasedArticlesByUserId: Array<Order>;
  getRestrictedAccessTypes: Array<AccessTypeEnum>;
  getScienceOpenArticleByPubId?: Maybe<ScienceOpenXml>;
  getScienceOpenArticlesXml: Array<ScienceOpenXml>;
  getSiteSettings: SiteSetting;
  getSiteWideAnnouncements?: Maybe<Array<Announcement>>;
  getStripePromoCode: StripePromoCode;
  getStripePromoCodeByCode: StripePromoCode;
  getStripePromoCodes: StripePromoCodeListOutput;
  getStripePromocodeRedeems: RedeemListOutput;
  getTrialSettings: TrialSettings;
  getTrialSettingsForCountry: TrialSettings;
  getTypesWithAccess: Array<AccessTypeEnum>;
  hasArticleRestriction: Scalars['Boolean']['output'];
  instArticleEventLogs: AccessEventsOutput;
  institutionAccessStats: InstitutionAccessStats;
  institutionBlocksOverTime: ChartData;
  institutionById?: Maybe<Institution>;
  institutionTrafficBreakdownByContentType: ChartData;
  institutionTrafficBreakdownByUserType: ChartData;
  institutionTrafficOverTime: ChartData;
  institutionTrafficOverTimeByUserType: ChartData;
  institutionUserCountBreakdownByContentType: ChartData;
  institutionUserCountBreakdownByUserType: ChartData;
  institutionUserTypesStats: Array<InstitutionUserTypeStat>;
  institutionUsersOverTime: ChartData;
  institutionUsersOverTimeByUserType: ChartData;
  institution_subs: Array<Institution>;
  institutions: InstitutionOutput;
  isJobRunning: Scalars['Boolean']['output'];
  jobProgress: Scalars['Float']['output'];
  latestArticles: Array<Article>;
  orderById?: Maybe<Order>;
  ordersByUserId?: Maybe<Array<Order>>;
  pageBySlug?: Maybe<Page>;
  pages: Array<PageForSlug>;
  prices: Array<StripePrice>;
  pricesByCountry: PriceOutputByCountry;
  products: Array<StripeProduct>;
  profileOptions: ProfileOptions;
  promoCode?: Maybe<PromoCode>;
  redirectFor?: Maybe<Redirect>;
  scienceOpenLastGeneratedAt?: Maybe<Scalars['DateTime']['output']>;
  showFeedbackModal: ShowFeedbackModalOutput;
  specialties?: Maybe<Array<Specialty>>;
  testUpdateArticleStatsJob: Scalars['String']['output'];
  triageQueueById?: Maybe<TriageQueue>;
  triageQueueRequests: TriageQueueOutput;
  triageQueueRequestsByInstitution: TriageRequestsByUserOutput;
  upgradeSubscriptionPreview?: Maybe<UpgradeSubscriptionPreview>;
  user?: Maybe<User>;
  userAccessType: AccessType;
  userArticleVotes: Array<NewArticleVote>;
  userByEmail?: Maybe<User>;
  userById?: Maybe<User>;
  userDetail: User;
  userTypes?: Maybe<Array<UserType>>;
  users: UserOutput;
  usersByInstitution: UserOutput;
};


export type QueryAccessEventsArgs = {
  input?: InputMaybe<AccessFilterInput>;
};


export type QueryAccessesByUserIdArgs = {
  input: AccessesByUserIdInput;
};


export type QueryAddCrmTagsToOrderListResultsPreviewArgs = {
  input?: InputMaybe<OrderListInput>;
};


export type QueryAddCrmTagsToTriageQueueResultsPreviewArgs = {
  input?: InputMaybe<TriageQueueInput>;
};


export type QueryAnnouncementArgs = {
  id: Scalars['String']['input'];
};


export type QueryArticleAccessStatsArgs = {
  input: AccessFilterInput;
};


export type QueryArticleByIdArgs = {
  article_id: Scalars['String']['input'];
};


export type QueryArticleBySlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  publication_id: Scalars['String']['input'];
};


export type QueryArticlesArgs = {
  input?: InputMaybe<ArticleInput>;
};


export type QueryArticlesByIdsArgs = {
  article_ids: Array<Scalars['String']['input']>;
};


export type QueryAuthorBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCheckFrequentArticleViewsArgs = {
  institution_id: Scalars['String']['input'];
};


export type QueryDeleteInstitutionArgs = {
  input?: InputMaybe<DeleteInstitutionInput>;
};


export type QueryFetchArticlesArgs = {
  input?: InputMaybe<ArticleInputFetch>;
};


export type QueryFetchPageByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFetchPagesArgs = {
  input?: InputMaybe<PageInputFetch>;
};


export type QueryFetchRedirectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFetchRedirectsArgs = {
  input?: InputMaybe<RedirectInput>;
};


export type QueryFilesArgs = {
  input?: InputMaybe<MediaInput>;
};


export type QueryGenCounterReportArgs = {
  input: CounterInput;
};


export type QueryGetAllOrdersArgs = {
  input: OrderListInput;
};


export type QueryGetAllPromoCodesArgs = {
  input: PromoCodeListInput;
};


export type QueryGetCombinedPromoCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryGetCountriesArgs = {
  input: CountryListInput;
};


export type QueryGetFeedbackListArgs = {
  input: FeedbackListInput;
};


export type QueryGetFeedbackQuestionsForUserArgs = {
  anon_link_id: Scalars['String']['input'];
};


export type QueryGetFeedbacksByInstitutionIdArgs = {
  input: FeedbackListInput;
  institution_id: Scalars['String']['input'];
};


export type QueryGetPriceByProductIdArgs = {
  product_id: Scalars['String']['input'];
};


export type QueryGetPromoDetailArgs = {
  code: Scalars['String']['input'];
};


export type QueryGetPurchasedArticlesByUserIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetScienceOpenArticleByPubIdArgs = {
  publication_id: Scalars['String']['input'];
};


export type QueryGetStripePromoCodeArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStripePromoCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryGetStripePromoCodesArgs = {
  input: StripePromoCodeListInput;
};


export type QueryGetStripePromocodeRedeemsArgs = {
  id: Scalars['String']['input'];
  input: RedeemListInput;
};


export type QueryInstArticleEventLogsArgs = {
  input: AccessFilterInput;
};


export type QueryInstitutionAccessStatsArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionBlocksOverTimeArgs = {
  groupBy: Scalars['String']['input'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryInstitutionTrafficBreakdownByContentTypeArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionTrafficBreakdownByUserTypeArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionTrafficOverTimeArgs = {
  groupBy: Scalars['String']['input'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionTrafficOverTimeByUserTypeArgs = {
  groupBy: Scalars['String']['input'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionUserCountBreakdownByContentTypeArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionUserCountBreakdownByUserTypeArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionUserTypesStatsArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionUsersOverTimeArgs = {
  groupBy: Scalars['String']['input'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionUsersOverTimeByUserTypeArgs = {
  groupBy: Scalars['String']['input'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionsArgs = {
  input?: InputMaybe<InstitutionInput>;
};


export type QueryIsJobRunningArgs = {
  name: Scalars['String']['input'];
};


export type QueryJobProgressArgs = {
  name: Scalars['String']['input'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersByUserIdArgs = {
  user_id: Scalars['String']['input'];
};


export type QueryPageBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPricesArgs = {
  input?: InputMaybe<PriceFilterInput>;
};


export type QueryPricesByCountryArgs = {
  input: PriceFilterInput;
};


export type QueryPromoCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryRedirectForArgs = {
  from: Scalars['String']['input'];
};


export type QueryShowFeedbackModalArgs = {
  anon_link_id: Scalars['String']['input'];
};


export type QueryTriageQueueByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTriageQueueRequestsArgs = {
  input?: InputMaybe<TriageQueueInput>;
};


export type QueryTriageQueueRequestsByInstitutionArgs = {
  input?: InputMaybe<TriageQueueInput>;
  instId: Scalars['String']['input'];
};


export type QueryUpgradeSubscriptionPreviewArgs = {
  promocode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserInput>;
};


export type QueryUsersByInstitutionArgs = {
  input?: InputMaybe<UserInput>;
  instId: Scalars['String']['input'];
};

export enum QueryOperation {
  After = 'after',
  Before = 'before',
  Contains = 'contains',
  Equal = 'equal',
  GreaterThan = 'greater_than',
  GreaterThanOrEqual = 'greater_than_or_equal',
  IsNotNull = 'is_not_null',
  IsNotNullOrEmpty = 'is_not_null_or_empty',
  IsNull = 'is_null',
  IsNullOrEmpty = 'is_null_or_empty',
  LessThan = 'less_than',
  LessThanOrEqual = 'less_than_or_equal',
  NotContains = 'not_contains',
  NotEqual = 'not_equal'
}

export type RedeemListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type RedeemListOutput = {
  __typename?: 'RedeemListOutput';
  items: Array<Payment>;
  totalCount: Scalars['Int']['output'];
};

export type Redirect = {
  __typename?: 'Redirect';
  _id: Scalars['ID']['output'];
  author?: Maybe<User>;
  created?: Maybe<Scalars['DateTime']['output']>;
  from: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  stats?: Maybe<Array<RedirectStats>>;
  to: Scalars['String']['output'];
  track?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type RedirectInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  search_term?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type RedirectOutput = {
  __typename?: 'RedirectOutput';
  count: Scalars['Int']['output'];
  redirects: Array<Redirect>;
};

export type RedirectStats = {
  __typename?: 'RedirectStats';
  ip: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export enum RequireLogin {
  False = 'False',
  True = 'True'
}

export type Restriction = {
  __typename?: 'Restriction';
  article: ArticleRestrictionEnum;
};

export type Restrictions = {
  __typename?: 'Restrictions';
  access: InstitutionAccessState;
};

export type ScienceOpenXml = {
  __typename?: 'ScienceOpenXml';
  _id: Scalars['ID']['output'];
  articleId: Scalars['String']['output'];
  articlePublicationId: Scalars['String']['output'];
  generatedAt: Scalars['DateTime']['output'];
  generatedXml: Scalars['String']['output'];
};

export type ShowFeedbackModalOutput = {
  __typename?: 'ShowFeedbackModalOutput';
  show: Scalars['Boolean']['output'];
  showNextAt: Scalars['Int']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
};

export type SiteSetting = {
  __typename?: 'SiteSetting';
  _id: Scalars['String']['output'];
  displayPurchaseAndRentToAdminOnly: Scalars['Boolean']['output'];
  isPurchaseArticleFeatureOn: Scalars['Boolean']['output'];
  isRentArticleFeatureOn: Scalars['Boolean']['output'];
  isRequestInstSubButtonPaperOn: Scalars['Boolean']['output'];
  isTrialFeatureOn?: Maybe<Scalars['Boolean']['output']>;
  rentDuration: Scalars['Float']['output'];
  scienceOpenXmlGeneratedAt: Scalars['DateTime']['output'];
  trialDuration?: Maybe<Scalars['Float']['output']>;
  updated: Scalars['DateTime']['output'];
  updatedBy?: Maybe<User>;
};

export type Social = {
  __typename?: 'Social';
  facebook?: Maybe<SocialAuthDetails>;
  google?: Maybe<SocialAuthDetails>;
  linkedin?: Maybe<SocialAuthDetails>;
  saml?: Maybe<SocialAuthDetails>;
};

export type SocialAuthDetails = {
  __typename?: 'SocialAuthDetails';
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<SocialName>;
  provider?: Maybe<SocialProviderEnum>;
};

export type SocialAuthDetailsInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type SocialAuthInput = {
  displayName?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  provider: SocialProviderEnum;
};

export type SocialInput = {
  facebook?: InputMaybe<SocialAuthDetailsInput>;
  google?: InputMaybe<SocialAuthDetailsInput>;
  linkedin?: InputMaybe<SocialAuthDetailsInput>;
};

export type SocialName = {
  __typename?: 'SocialName';
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
};

export enum SocialProviderEnum {
  Facebook = 'Facebook',
  Google = 'Google',
  Linkedin = 'Linkedin',
  Saml = 'Saml'
}

export type Specialty = {
  __typename?: 'Specialty';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum StatusType {
  Default = 'default',
  Expired = 'expired',
  None = 'none',
  Standard = 'standard',
  Subscribed = 'subscribed',
  Trial = 'trial'
}

export type StripePrice = {
  __typename?: 'StripePrice';
  _id: Scalars['ID']['output'];
  countryCode?: Maybe<CountryEnum>;
  countryCodes?: Maybe<Array<CountryEnum>>;
  currency: Scalars['String']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  interval?: Maybe<OrderInterval>;
  nickname: Scalars['String']['output'];
  priceId?: Maybe<Scalars['ID']['output']>;
  product: Scalars['String']['output'];
  productName?: Maybe<Scalars['String']['output']>;
  unit_amount: Scalars['Int']['output'];
  unit_decimal?: Maybe<Scalars['String']['output']>;
};

export type StripeProduct = {
  __typename?: 'StripeProduct';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  prices: Array<StripePrice>;
};

export type StripePromo = {
  __typename?: 'StripePromo';
  price: Scalars['String']['output'];
};

export type StripePromoCode = {
  __typename?: 'StripePromoCode';
  _id: Scalars['String']['output'];
  active?: Maybe<Scalars['Boolean']['output']>;
  amount_off?: Maybe<Scalars['Float']['output']>;
  applies_to?: Maybe<Array<Scalars['String']['output']>>;
  code: Scalars['String']['output'];
  couponId: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  duration?: Maybe<PromoCodeDuration>;
  duration_in_months?: Maybe<Scalars['Float']['output']>;
  max_redemptions?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_off?: Maybe<Scalars['Float']['output']>;
  redeem_by?: Maybe<Scalars['DateTime']['output']>;
  times_redeemed: Scalars['Float']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type StripePromoCodeListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
};

export type StripePromoCodeListOutput = {
  __typename?: 'StripePromoCodeListOutput';
  items: Array<StripePromoCode>;
  totalCount: Scalars['Int']['output'];
};

export type SubChapter = {
  __typename?: 'SubChapter';
  number: Scalars['Int']['output'];
  parent: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type SubItem = {
  __typename?: 'SubItem';
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type SubItemInput = {
  number: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export enum SubType {
  Individual = 'individual',
  Institution = 'institution',
  NotCreated = 'notCreated',
  Trial = 'trial'
}

export type SubscriptionInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  display_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  institution_name: Scalars['String']['input'];
  message: Scalars['String']['input'];
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionType = {
  __typename?: 'SubscriptionType';
  fromInst?: Maybe<Scalars['String']['output']>;
  lastChecked: Scalars['DateTime']['output'];
  lastSubType?: Maybe<SubType>;
  lastSubTypeExpiry?: Maybe<Scalars['DateTime']['output']>;
  subType?: Maybe<SubType>;
};

export type TemporaryAccess = {
  __typename?: 'TemporaryAccess';
  _id: Scalars['ID']['output'];
  expiresAt: Scalars['DateTime']['output'];
  institution: Institution;
  source_ip: Scalars['String']['output'];
  user: User;
};

export type Thumbnail = {
  __typename?: 'Thumbnail';
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type TrackArticleInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  publication_id: Scalars['String']['input'];
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
  uniqueView?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TrackFeedbackInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  article_publication_id?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  feedback_id?: InputMaybe<Scalars['String']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  user?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['any']['input'];
};

export type TrackInitiateCheckoutInput = {
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
};

export type TrackRequestInstSubscriptionInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
};

export type TrackSubscribeInput = {
  orderAmount: Scalars['Float']['input'];
};

export type TrackVideoInput = {
  anon_link_id?: InputMaybe<Scalars['String']['input']>;
  block_type?: InputMaybe<Scalars['String']['input']>;
  publication_id: Scalars['String']['input'];
  referredFrom?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
  uniqueView?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TrackVideoTimeInput = {
  increment: Scalars['Int']['input'];
  time_watched: Scalars['Float']['input'];
  vidWatchId: Scalars['String']['input'];
};

export type TransferDomainsInput = {
  domain: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type TransferInstDataInput = {
  from: Array<Scalars['String']['input']>;
  to: Scalars['String']['input'];
};

export type TranslateArticlesInput = {
  article_ids: Array<Scalars['String']['input']>;
  enableImmediately?: InputMaybe<Scalars['Boolean']['input']>;
  languages: Array<Scalars['String']['input']>;
};

export type TranslationResult = {
  __typename?: 'TranslationResult';
  language: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  publication_id: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum TriageMarket {
  EntSurgery = 'ENT_Surgery',
  GeneralSurgery = 'General_Surgery',
  Hospital = 'Hospital',
  MedicalSchools = 'Medical_Schools',
  OrthopedicSurgery = 'Orthopedic_Surgery',
  Other = 'Other',
  Residency = 'Residency',
  SurgicalTech = 'Surgical_Tech'
}

export enum TriagePriority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium'
}

export type TriageQueue = {
  __typename?: 'TriageQueue';
  _id: Scalars['ID']['output'];
  accessType?: Maybe<AccessTypeEnum>;
  additional_info?: Maybe<AdditionalInfo>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailTemplate: Scalars['String']['output'];
  institution?: Maybe<Institution>;
  institution_name?: Maybe<Scalars['String']['output']>;
  market?: Maybe<TriageMarket>;
  notes?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<TriagePriority>;
  regionName?: Maybe<Scalars['String']['output']>;
  sentEmailAt?: Maybe<Scalars['DateTime']['output']>;
  type: TriageQueueStatus;
  updated?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type TriageQueueEmailTemplateArgs = {
  pocName?: InputMaybe<Scalars['String']['input']>;
};

export type TriageQueueEmailInput = {
  contactEmail: Scalars['String']['input'];
  id: Scalars['String']['input'];
  includeRequestorToCc: Scalars['Boolean']['input'];
  pocName?: InputMaybe<Scalars['String']['input']>;
};

export type TriageQueueInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TriageQueueOutput = {
  __typename?: 'TriageQueueOutput';
  count: Scalars['Int']['output'];
  dbQueryString: Scalars['String']['output'];
  triage_requests: Array<TriageQueue>;
};

export enum TriageQueueStatus {
  Ignored = 'ignored',
  Incoming = 'incoming',
  InstNotFound = 'inst_not_found',
  ManuallySent = 'manually_sent',
  PocNotFound = 'poc_not_found',
  PocSentToUser = 'poc_sent_to_user',
  ReadyToSend = 'ready_to_send',
  Removed = 'removed',
  Sent = 'sent'
}

export type TriageRequestByUser = {
  __typename?: 'TriageRequestByUser';
  _id: Scalars['ID']['output'];
  articleCount?: Maybe<Scalars['Float']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  inst_email?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  last_request_date?: Maybe<Scalars['DateTime']['output']>;
  last_visited?: Maybe<Scalars['DateTime']['output']>;
  loginCount?: Maybe<Scalars['Float']['output']>;
  registered?: Maybe<Scalars['DateTime']['output']>;
  requestCount?: Maybe<Scalars['Int']['output']>;
  requests: Array<PartialRequest>;
  specialty?: Maybe<Scalars['String']['output']>;
  user_type?: Maybe<Scalars['String']['output']>;
};

export type TriageRequestsByUserOutput = {
  __typename?: 'TriageRequestsByUserOutput';
  count: Scalars['Int']['output'];
  totalRequestCount?: Maybe<Scalars['Int']['output']>;
  triage_requests: Array<TriageRequestByUser>;
};

export type TrialSettings = {
  __typename?: 'TrialSettings';
  enabledCountries: Array<Scalars['String']['output']>;
  isTrialFeatureOn: Scalars['Boolean']['output'];
  trialDuration: Scalars['Float']['output'];
};

export type TrialSettingsInput = {
  enabledCountries: Array<Scalars['String']['input']>;
  isTrialFeatureOn: Scalars['Boolean']['input'];
  trialDuration: Scalars['Float']['input'];
};

export type UpdateArticleInput = {
  DOIStatus?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<UpdateContentInput>;
  has_complete_abstract?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  preprint_date?: InputMaybe<Scalars['DateTime']['input']>;
  production_id?: InputMaybe<Scalars['String']['input']>;
  publication_id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['DateTime']['input']>;
  restrictions?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContentInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  article?: InputMaybe<Scalars['String']['input']>;
  citations?: InputMaybe<Scalars['String']['input']>;
  cite_this_article?: InputMaybe<Scalars['String']['input']>;
  otoc?: InputMaybe<Array<ContentItemInput>>;
  outline?: InputMaybe<Scalars['String']['input']>;
  toc?: InputMaybe<Array<ContentItemInput>>;
  transcription?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCountriesInput = {
  articleRestriction?: InputMaybe<ArticleRestrictionEnum>;
  codes: Array<Scalars['String']['input']>;
  coefficient?: InputMaybe<Scalars['Float']['input']>;
  multiplier?: InputMaybe<Scalars['Float']['input']>;
  trialsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateInstitutionInput = {
  accessSettings?: InputMaybe<AccessSettingsInput>;
  aliases?: InputMaybe<Array<Scalars['String']['input']>>;
  category?: InputMaybe<Scalars['String']['input']>;
  domains?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<ImageInput>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  restrictMatchByName?: InputMaybe<Scalars['Boolean']['input']>;
  show_on_subscribers_page?: InputMaybe<Scalars['Boolean']['input']>;
  subscriber_display_name?: InputMaybe<Scalars['String']['input']>;
  urlLink?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMediaLibraryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateOrderInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  articleId?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<OrderCurrency>;
  customInstitutionName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  institution?: InputMaybe<Scalars['String']['input']>;
  isCanceled?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  payment_status?: InputMaybe<OrderPaymentStatus>;
  plan_interval?: InputMaybe<OrderInterval>;
  promoCode?: InputMaybe<Scalars['String']['input']>;
  require_login?: InputMaybe<RequireLogin>;
  restricted_specialties?: InputMaybe<Array<Scalars['String']['input']>>;
  restricted_user_types?: InputMaybe<Array<Scalars['String']['input']>>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<OrderStatus>;
  type?: InputMaybe<OrderType>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  meta_desc?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  scripts?: InputMaybe<Array<Scalars['String']['input']>>;
  sidebar?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePriceInput = {
  amount: Scalars['Int']['input'];
  countryCode?: InputMaybe<CountryEnum>;
  interval?: InputMaybe<OrderInterval>;
};

export type UpdateProfileInput = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  institution_name?: InputMaybe<Scalars['String']['input']>;
  institutional_email?: InputMaybe<Scalars['String']['input']>;
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  specialty?: InputMaybe<Scalars['ID']['input']>;
  user_type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePromoCodeInput = {
  _id: Scalars['ID']['input'];
  bulkUnusedCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  bulkUsedCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  days?: InputMaybe<Scalars['Int']['input']>;
  expiration?: InputMaybe<Scalars['DateTime']['input']>;
  interval?: InputMaybe<OrderInterval>;
  isSubscription?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  numberOfCodes?: InputMaybe<Scalars['Int']['input']>;
  numberUnused?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  times_redeemed?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PromoCodeType>;
};

export type UpdatePurchaseSettingInput = {
  article_ids: Array<Scalars['String']['input']>;
  isPurchaseArticleFeatureOn: Scalars['Boolean']['input'];
  isRentArticleFeatureOn: Scalars['Boolean']['input'];
  purchaseAllowedCountries?: InputMaybe<Array<CountryEnum>>;
};

export type UpdateRedirectInput = {
  from?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  track?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSiteSettingInput = {
  displayPurchaseAndRentToAdminOnly: Scalars['Boolean']['input'];
  isPurchaseArticleFeatureOn?: InputMaybe<Scalars['Boolean']['input']>;
  isRentArticleFeatureOn?: InputMaybe<Scalars['Boolean']['input']>;
  isRequestInstSubButtonPaperOn?: InputMaybe<Scalars['Boolean']['input']>;
  isTrialFeatureOn?: InputMaybe<Scalars['Boolean']['input']>;
  rentDuration?: InputMaybe<Scalars['Float']['input']>;
  trialDuration?: InputMaybe<Scalars['Float']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateStripeCodeInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  couponId: Scalars['String']['input'];
  max_redemptions?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  redeem_by?: InputMaybe<Scalars['DateTime']['input']>;
  times_redeemed?: InputMaybe<Scalars['Float']['input']>;
  valid?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateTriageInput = {
  id: Scalars['String']['input'];
  market?: InputMaybe<TriageMarket>;
  priority?: InputMaybe<TriagePriority>;
  type?: InputMaybe<TriageQueueStatus>;
};

export type UpdateTriageNotesInput = {
  id: Scalars['String']['input'];
  notes: Scalars['String']['input'];
};

export type UpdateTriageResponseInput = {
  id: Scalars['String']['input'];
  response: Scalars['String']['input'];
};

export type UpdateUserInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailNeedsConfirm?: InputMaybe<Scalars['Boolean']['input']>;
  emailVerifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  email_preference?: InputMaybe<EmailPreference>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasManualBlock?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<ImageInput>;
  instEmailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  instEmailVerifiedAt?: InputMaybe<Scalars['DateTime']['input']>;
  inst_email?: InputMaybe<Scalars['String']['input']>;
  institution?: InputMaybe<Scalars['String']['input']>;
  institution_name?: InputMaybe<Scalars['String']['input']>;
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
  isTrialFeatureOn?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  manualBlockMessage?: InputMaybe<Scalars['String']['input']>;
  matched_institution_name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  referer?: InputMaybe<Scalars['String']['input']>;
  referrerPath?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoles>;
  slug?: InputMaybe<Scalars['String']['input']>;
  social?: InputMaybe<SocialInput>;
  source_ip?: InputMaybe<Scalars['String']['input']>;
  specialty?: InputMaybe<Scalars['String']['input']>;
  trialAccessAt?: InputMaybe<Scalars['DateTime']['input']>;
  trialDuration?: InputMaybe<Scalars['Int']['input']>;
  trialsAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  user_type?: InputMaybe<Scalars['String']['input']>;
};

export type UpgradeSubscriptionPreview = {
  __typename?: 'UpgradeSubscriptionPreview';
  amount: Scalars['Float']['output'];
  cardLast4: Scalars['String']['output'];
  description: Scalars['String']['output'];
  promocodeApplied: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  accessExpiredAt?: Maybe<Scalars['DateTime']['output']>;
  accessType: AccessType;
  activeOrder?: Maybe<Order>;
  anon_link_id?: Maybe<Scalars['String']['output']>;
  articleCount?: Maybe<Scalars['Int']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailNeedsConfirm?: Maybe<Scalars['Boolean']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  emailVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  email_preference?: Maybe<EmailPreference>;
  hasManualBlock?: Maybe<Scalars['Boolean']['output']>;
  hasRequestedSubscription?: Maybe<Scalars['Boolean']['output']>;
  howFound?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  instEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  instEmailVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
  inst_email?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  institution_name?: Maybe<Scalars['String']['output']>;
  institutionalEmail?: Maybe<Scalars['String']['output']>;
  interests?: Maybe<Array<Scalars['String']['output']>>;
  isPasswordSet: Scalars['Boolean']['output'];
  isSubscribed?: Maybe<Scalars['Boolean']['output']>;
  isSubscribedFromInst?: Maybe<Scalars['Boolean']['output']>;
  isTrialFeatureOn?: Maybe<Scalars['Boolean']['output']>;
  isTrialsFeatureEnabled: Scalars['Boolean']['output'];
  lastSubType?: Maybe<SubType>;
  last_visited?: Maybe<Scalars['DateTime']['output']>;
  loginCount?: Maybe<Scalars['Int']['output']>;
  manualBlockMessage?: Maybe<Scalars['String']['output']>;
  matchStatus?: Maybe<MatchStatus>;
  matchedBy?: Maybe<MatchedBy>;
  matched_institution_name?: Maybe<Scalars['String']['output']>;
  name: Name;
  numSearches?: Maybe<Scalars['Int']['output']>;
  offsiteAccesses: Array<TemporaryAccess>;
  phone?: Maybe<Scalars['String']['output']>;
  prev_source_ip?: Maybe<Scalars['String']['output']>;
  previouslyStatedInstitutions?: Maybe<Array<PreviouslyStatedInst>>;
  promo_code?: Maybe<Scalars['String']['output']>;
  referer?: Maybe<Scalars['String']['output']>;
  referrerPath?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  requestSubscriptionCount?: Maybe<Scalars['Float']['output']>;
  role: UserRoles;
  showFeedbackQuestions: Scalars['Boolean']['output'];
  signInToken?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  social?: Maybe<Social>;
  source_ip?: Maybe<Scalars['String']['output']>;
  specialty?: Maybe<Scalars['String']['output']>;
  stripeData: UserStripeData;
  subActive: Scalars['Boolean']['output'];
  subscription?: Maybe<SubscriptionType>;
  total_time_watched?: Maybe<Scalars['Float']['output']>;
  trialAccessAt?: Maybe<Scalars['DateTime']['output']>;
  trialDuration?: Maybe<Scalars['Float']['output']>;
  trialsAllowed: Scalars['Boolean']['output'];
  user_type?: Maybe<Scalars['String']['output']>;
  user_type_other?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  globalFilters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  showAuthorsOnly?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort_by?: InputMaybe<Scalars['String']['input']>;
  sort_order?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  count: Scalars['Int']['output'];
  dbQueryString: Scalars['String']['output'];
  users: Array<User>;
};

export enum UserRoles {
  Admin = 'admin',
  Author = 'author',
  Librarian = 'librarian',
  Superadmin = 'superadmin',
  User = 'user'
}

export type UserStripeData = {
  __typename?: 'UserStripeData';
  isTrialsFeatureEnabled?: Maybe<Scalars['Boolean']['output']>;
  prices: Array<StripePrice>;
  stripeId: Scalars['String']['output'];
  trialDuration?: Maybe<Scalars['Int']['output']>;
  trial_order_count?: Maybe<Scalars['Int']['output']>;
};

export type UserType = {
  __typename?: 'UserType';
  _id: Scalars['ObjectId']['output'];
  pricingBracket: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type UserViews = {
  __typename?: 'UserViews';
  by_country: Array<ViewType>;
  by_institution: Array<ViewType>;
  by_user_type: Array<ViewType>;
  total: Scalars['Int']['output'];
};

export type ViewType = {
  __typename?: 'ViewType';
  key: Scalars['String']['output'];
  views: Scalars['Float']['output'];
};

export enum VisibilityEnum {
  Private = 'private',
  Public = 'public'
}

export type Wistia = {
  __typename?: 'Wistia';
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  internal_id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  status?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Thumbnail>;
  updated?: Maybe<Scalars['String']['output']>;
  uploaded?: Maybe<Scalars['String']['output']>;
};
