export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** Any value */
  any: any;
};

export type Access = {
  __typename?: 'Access';
  accessType?: Maybe<AccessTypeEnum>;
  activity: ActivityType;
  anon_link_id?: Maybe<Scalars['String']>;
  article_categories_flat: Scalars['String'];
  article_publication_id?: Maybe<Scalars['String']>;
  article_title?: Maybe<Scalars['String']>;
  block_type?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  geolocation?: Maybe<GeoLocation>;
  institution?: Maybe<Institution>;
  ip_address_str?: Maybe<Scalars['String']>;
  order_amount?: Maybe<Scalars['Float']>;
  referredFrom?: Maybe<Scalars['String']>;
  referrerPath?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
  time_watched?: Maybe<Scalars['Float']>;
  uniqueView?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  user_agent?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type AccessEventsOutput = {
  __typename?: 'AccessEventsOutput';
  count: Scalars['Int'];
  events: Array<Access>;
};

export type AccessFilterInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  institution_id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type AccessSettings = {
  __typename?: 'AccessSettings';
  displayTrafficGraph: Scalars['Boolean'];
};

export type AccessSettingsInput = {
  displayTrafficGraph?: InputMaybe<Scalars['Boolean']>;
};

export type AccessType = {
  __typename?: 'AccessType';
  accessType?: Maybe<AccessTypeEnum>;
  expiry?: Maybe<Scalars['DateTime']>;
  institution_id?: Maybe<Scalars['String']>;
  institution_name?: Maybe<Scalars['String']>;
  isTrial?: Maybe<Scalars['Boolean']>;
  matchStatus?: Maybe<MatchStatus>;
  matchedBy?: Maybe<MatchedBy>;
  orderId?: Maybe<Scalars['String']>;
  requireLogin?: Maybe<Scalars['Boolean']>;
  shouldRequestInstVerification?: Maybe<Scalars['String']>;
  subscriptionExpiresAt?: Maybe<Scalars['DateTime']>;
  viaTemporaryIp?: Maybe<Scalars['Boolean']>;
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
  InstitutionSubscriptionExpired = 'InstitutionSubscriptionExpired',
  InstitutionalSubscription = 'InstitutionalSubscription',
  InstitutionalTrial = 'InstitutionalTrial',
  LimitedAccess = 'LimitedAccess',
  RequireSubscription = 'RequireSubscription'
}

export type AccessesByUserIdInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
  userID: Scalars['String'];
};

export enum ActivityType {
  Article = 'Article',
  CreateAccount = 'CreateAccount',
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
  display_name?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageInput>;
  institution?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  matched_institution_name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  user_role: UserRoles;
  user_type: Scalars['String'];
};

export type AdditionalInfo = {
  __typename?: 'AdditionalInfo';
  contactInfo?: Maybe<Scalars['String']>;
  pocs_email_sent?: Maybe<Array<Scalars['String']>>;
  question?: Maybe<Scalars['String']>;
  request_email_sent?: Maybe<Scalars['Boolean']>;
  response?: Maybe<Scalars['String']>;
  suggested_contact?: Maybe<Scalars['String']>;
};

export type Announcement = {
  __typename?: 'Announcement';
  _id: Scalars['ObjectId'];
  author?: Maybe<User>;
  backgroundColor?: Maybe<Scalars['String']>;
  cache_id: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  enabled: Scalars['Boolean'];
  filters?: Maybe<Array<FilterExpression>>;
  isPermanent?: Maybe<Scalars['Boolean']>;
  lastEditedBy?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  type: AnnouncementType;
  unique_views?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  user_views?: Maybe<UserViews>;
  views: Scalars['Float'];
};

export type AnnouncementInput = {
  _id: Scalars['String'];
  backgroundColor: Scalars['String'];
  content: Scalars['String'];
  enabled: Scalars['Boolean'];
  filters: Array<FilterExpressionInput>;
  isPermanent: Scalars['Boolean'];
  title?: InputMaybe<Scalars['String']>;
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
  DOIStatus?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  all_priority_sort?: Maybe<Scalars['Float']>;
  articleAccessType: AccessType;
  assets: Array<Assets>;
  authors: Array<Author>;
  authors_attr_html?: Maybe<Scalars['String']>;
  categories: Array<Category>;
  category_priority_sort?: Maybe<Scalars['Float']>;
  chapters: Array<Chapter>;
  comment_count: Scalars['Int'];
  comment_status?: Maybe<Scalars['String']>;
  content: Content;
  contentlength?: Maybe<Scalars['Int']>;
  created: Scalars['DateTime'];
  descriptionSEO?: Maybe<Scalars['String']>;
  display_last?: Maybe<Scalars['String']>;
  edit_last?: Maybe<Scalars['String']>;
  enabled_languages?: Maybe<Array<Scalars['String']>>;
  has_complete_abstract?: Maybe<Scalars['Boolean']>;
  hospital?: Maybe<Hospital>;
  image?: Maybe<Image>;
  isFree: Scalars['Boolean'];
  isPasswordProtected: Scalars['Boolean'];
  isPurchaseArticleFeatureOn?: Maybe<Scalars['Boolean']>;
  isRentArticleFeatureOn?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Scalars['String']>>;
  outdatedTranslations?: Maybe<Array<Scalars['String']>>;
  preprint_date?: Maybe<Scalars['DateTime']>;
  previousWistiaIDS?: Maybe<Array<Maybe<Scalars['String']>>>;
  production_id?: Maybe<Scalars['String']>;
  publication_id?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['DateTime']>;
  purchaseAllowedCountries?: Maybe<Array<CountryEnum>>;
  rentDuration: Scalars['Int'];
  restrictions?: Maybe<Restriction>;
  showPurchaseArticle: Scalars['Boolean'];
  showRentArticle: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
  stats?: Maybe<ArticleStats>;
  status: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updated: Scalars['DateTime'];
  vid_length?: Maybe<Scalars['String']>;
  visibility: VisibilityEnum;
  wistia?: Maybe<Wistia>;
  wistia_id?: Maybe<Scalars['String']>;
};

export type ArticleForSlug = {
  __typename?: 'ArticleForSlug';
  _id: Scalars['ID'];
  publication_id?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type ArticleInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  categoryIds?: InputMaybe<Scalars['String']>;
  display?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
  sort_by?: InputMaybe<ArticleSort>;
};

export type ArticleInputFetch = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search_term?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type ArticleOutput = {
  __typename?: 'ArticleOutput';
  articles: Array<Article>;
  totalCount: Scalars['Int'];
};

export type ArticlePurchaseInput = {
  amount: Scalars['Float'];
  articleId: Scalars['String'];
  description: Scalars['String'];
  end?: InputMaybe<Scalars['DateTime']>;
  start?: InputMaybe<Scalars['DateTime']>;
  stripeCoupon?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<OrderType>;
  user_id: Scalars['String'];
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
  averagePercentWatched: Scalars['Float'];
  last_checked: Scalars['DateTime'];
  pageLoads: Scalars['Int'];
  percentOfVisitorsClickingPlay: Scalars['Float'];
  plays: Scalars['Int'];
  views?: Maybe<Scalars['Int']>;
  visitors: Scalars['Int'];
};

export type Assets = {
  __typename?: 'Assets';
  _id?: Maybe<Scalars['ID']>;
  contentType: Scalars['String'];
  fileSize: Scalars['Float'];
  height: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID'];
  display_name?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  name?: Maybe<Name>;
  role?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  specialty?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  color: Scalars['String'];
  desc: Scalars['String'];
  displayName: Scalars['String'];
  name: Scalars['String'];
  short: Scalars['String'];
  slug: Scalars['String'];
  sortOrder: Scalars['Int'];
};

export type Chapter = {
  __typename?: 'Chapter';
  number: Scalars['Int'];
  subchapters?: Maybe<Array<SubChapter>>;
  time: Scalars['Int'];
  title: Scalars['String'];
};

export type Choice = {
  __typename?: 'Choice';
  description: Scalars['String'];
  value: Scalars['Float'];
};

export type ColumnFilter = {
  columnName: Scalars['String'];
  not?: InputMaybe<Scalars['Boolean']>;
  operation: QueryOperation;
  value?: InputMaybe<Scalars['any']>;
};

export type CombinedCodeOutput = {
  __typename?: 'CombinedCodeOutput';
  promoCode?: Maybe<PromoCode>;
  stripeCode?: Maybe<StripePromoCode>;
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  email: Scalars['String'];
  isMainContact?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type ContactPersonInput = {
  email: Scalars['String'];
  isMainContact: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  abstract?: Maybe<Scalars['String']>;
  article?: Maybe<Scalars['String']>;
  citations?: Maybe<Scalars['String']>;
  cite_this_article?: Maybe<Scalars['String']>;
  otoc: Array<ContentItem>;
  outline?: Maybe<Scalars['String']>;
  toc: Array<ContentItem>;
  transcription?: Maybe<Scalars['String']>;
};

export type ContentItem = {
  __typename?: 'ContentItem';
  _id: Scalars['ID'];
  id: Scalars['ID'];
  number: Scalars['Int'];
  subheaders: Array<SubItem>;
  text: Scalars['String'];
};

export type ContentItemInput = {
  number: Scalars['Int'];
  subheaders?: InputMaybe<Array<SubItemInput>>;
  text: Scalars['String'];
};

export type CounterAttribute = {
  attributeName: Scalars['String'];
  value: Scalars['String'];
};

export type CounterFilter = {
  filterName: Scalars['String'];
  value: Scalars['String'];
};

export type CounterInput = {
  institution_id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  metric_types?: InputMaybe<Array<Scalars['String']>>;
  report_attributes?: InputMaybe<Array<CounterAttribute>>;
  report_filters?: InputMaybe<Array<CounterFilter>>;
  report_id?: InputMaybe<Scalars['String']>;
  reporting_period_end?: InputMaybe<Scalars['DateTime']>;
  reporting_period_start?: InputMaybe<Scalars['DateTime']>;
  search_term?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
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
  Bq = 'BQ',
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
  Um = 'UM',
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
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type CreateInstitutionInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreatePageInput = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  scripts?: InputMaybe<Array<Scalars['String']>>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreatePromoCodeInput = {
  amount_off?: InputMaybe<Scalars['Float']>;
  applies_to?: InputMaybe<Array<Scalars['String']>>;
  code: Scalars['String'];
  duration?: InputMaybe<PromoCodeDuration>;
  duration_in_months?: InputMaybe<Scalars['Float']>;
  max_redemptions?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  percent_off?: InputMaybe<Scalars['Float']>;
  redeem_by?: InputMaybe<Scalars['DateTime']>;
};

export type CreateRedirectInput = {
  from: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
  track?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CreateSignInTokenInput = {
  id: Scalars['String'];
  redirect: Scalars['String'];
};

export type DeleteInstitutionInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type DeleteInstitutionOutput = {
  __typename?: 'DeleteInstitutionOutput';
  _id?: Maybe<Scalars['ID']>;
};

export type DeleteRedirectInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type DeleteRedirectOutput = {
  __typename?: 'DeleteRedirectOutput';
  _id?: Maybe<Scalars['ID']>;
};

export enum EmailPreference {
  All = 'all',
  None = 'none',
  Some = 'some'
}

export type ExtendedRegistrationInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  howFound?: InputMaybe<Scalars['String']>;
  institution_name?: InputMaybe<Scalars['String']>;
  institutional_email?: InputMaybe<Scalars['String']>;
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
  specialty: Scalars['ID'];
  user_type: Scalars['String'];
};

export type ExtendedRegistrationOutput = {
  __typename?: 'ExtendedRegistrationOutput';
  matchedWithInstitution?: Maybe<Scalars['Boolean']>;
  updatedAccess: AccessType;
  updatedUser: User;
};

export type Feedback = {
  __typename?: 'Feedback';
  _id: Scalars['String'];
  _institution?: Maybe<Institution>;
  anon_link_id?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  institution: Scalars['String'];
  method?: Maybe<Scalars['String']>;
  question?: Maybe<FeedbackQuestion>;
  questionId: Scalars['String'];
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  value: Scalars['any'];
};

export type FeedbackListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type FeedbackListOutput = {
  __typename?: 'FeedbackListOutput';
  count: Scalars['Int'];
  dbQueryString?: Maybe<Scalars['String']>;
  items: Array<Feedback>;
};

export type FeedbackQuestion = {
  __typename?: 'FeedbackQuestion';
  _id: Scalars['String'];
  choices?: Maybe<Array<Choice>>;
  createdAt: Scalars['DateTime'];
  createdBy: Scalars['String'];
  legends?: Maybe<Array<Scalars['String']>>;
  question: Scalars['String'];
  type: Scalars['String'];
};

export type FeedbackSettings = {
  __typename?: 'FeedbackSettings';
  selectedAccessTypes: Array<AccessTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
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
  columnName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  level: Scalars['Int'];
  operator: Operators;
  parentId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['any']>;
};

export type FilterExpressionInput = {
  columnName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  level: Scalars['Int'];
  operator: Operators;
  parentId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['any']>;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  continentCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  regionCode?: Maybe<Scalars['String']>;
  regionName?: Maybe<Scalars['String']>;
};

export type GeographicPriceInput = {
  amount?: InputMaybe<Scalars['Int']>;
  countryCode: CountryEnum;
  interval?: InputMaybe<OrderInterval>;
  percentageFromDefaultPrice?: InputMaybe<Scalars['Int']>;
  product_id: Scalars['String'];
};

export type Geolocation = {
  __typename?: 'Geolocation';
  capitolCity?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  regionName?: Maybe<Scalars['String']>;
};

export type Geometry = {
  __typename?: 'Geometry';
  height: Scalars['Float'];
  width: Scalars['Float'];
};

export type GetInstitutionInput = {
  id: Scalars['ID'];
};

export type Hospital = {
  __typename?: 'Hospital';
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  extension?: Maybe<FileExtensions>;
  filename?: Maybe<Scalars['String']>;
  filesize?: Maybe<Scalars['String']>;
  foreign?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
  geometry?: Maybe<Geometry>;
  length?: Maybe<Scalars['Float']>;
  metadata?: Maybe<ImageMetadata>;
  path?: Maybe<Scalars['Float']>;
};

export type ImageInput = {
  filename?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  length?: InputMaybe<Scalars['Int']>;
};

export type ImageMetadata = {
  __typename?: 'ImageMetadata';
  description?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
  filesize?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
  geometry?: Maybe<Geometry>;
  original_name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Institution = {
  __typename?: 'Institution';
  _id: Scalars['ID'];
  accessSettings: AccessSettings;
  aliases: Array<Scalars['String']>;
  aliases_str: Scalars['String'];
  articleViewsOverTime: Array<InstitutionAccessTraffic>;
  article_count: Scalars['Int'];
  article_count_anon: Scalars['Int'];
  automated_status: Scalars['String'];
  category?: Maybe<Scalars['String']>;
  closed_queries_count: Scalars['Int'];
  contacts: InstitutionContacts;
  created?: Maybe<Scalars['DateTime']>;
  domains: Array<Scalars['String']>;
  expiry: Scalars['Int'];
  expiry_date_cached?: Maybe<Scalars['DateTime']>;
  image?: Maybe<Image>;
  lastChecked?: Maybe<Scalars['DateTime']>;
  locations: Array<Location>;
  matchName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  open_queries_count: Scalars['Int'];
  pending_requests?: Maybe<Scalars['Int']>;
  points_of_contact?: Maybe<Array<ContactPerson>>;
  restrictMatchByName?: Maybe<Scalars['Boolean']>;
  restrictions: Restrictions;
  sent_requests: Scalars['Int'];
  show_on_subscribers_page?: Maybe<Scalars['Boolean']>;
  stats?: Maybe<InstitutionStats>;
  subscriber_display_name?: Maybe<Scalars['String']>;
  subscription: InstitutionSubscription;
  total_article_count: Scalars['Int'];
  total_requests?: Maybe<Scalars['Int']>;
  updated?: Maybe<Scalars['DateTime']>;
  urlLink?: Maybe<Scalars['String']>;
  user_count: Scalars['Int'];
};

export type InstitutionAccessInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  institutionId: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export enum InstitutionAccessState {
  Default = 'default',
  RequireRequest = 'require_request',
  RequireSubscription = 'require_subscription'
}

export type InstitutionAccessStats = {
  __typename?: 'InstitutionAccessStats';
  activeUsers: Scalars['Float'];
  anonymousArticleViews: Scalars['Float'];
  articleViewsByUser: Scalars['Float'];
  totalArticleViews: Scalars['Float'];
  totalLogins: Scalars['Float'];
  users: Scalars['Float'];
};

export type InstitutionAccessTraffic = {
  __typename?: 'InstitutionAccessTraffic';
  _id: Scalars['String'];
  count: Scalars['Int'];
};

export type InstitutionArticleStats = {
  __typename?: 'InstitutionArticleStats';
  _id: Scalars['String'];
  article?: Maybe<Article>;
  articleViews: Scalars['Int'];
  uniqueViews: Scalars['Int'];
  user_ids: Array<Scalars['String']>;
};

export type InstitutionArticleStatsOutput = {
  __typename?: 'InstitutionArticleStatsOutput';
  items: Array<InstitutionArticleStats>;
  totalCount: Scalars['Int'];
};

export type InstitutionContacts = {
  __typename?: 'InstitutionContacts';
  main: ContactPerson;
};

export type InstitutionInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  showExpiry?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type InstitutionOutput = {
  __typename?: 'InstitutionOutput';
  count: Scalars['Int'];
  dbQueryString: Scalars['String'];
  institutions: Array<Institution>;
};

export type InstitutionStats = {
  __typename?: 'InstitutionStats';
  articleCount?: Maybe<Scalars['Int']>;
  articleCountAnon?: Maybe<Scalars['Int']>;
  lastChecked?: Maybe<Scalars['DateTime']>;
  loginCount?: Maybe<Scalars['Int']>;
  totalArticleCount?: Maybe<Scalars['Int']>;
  totalSearches?: Maybe<Scalars['Int']>;
  userCount: Scalars['Int'];
};

export type InstitutionSubscription = {
  __typename?: 'InstitutionSubscription';
  expiredOrderStatus?: Maybe<OrderType>;
  last_checked?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  status?: Maybe<StatusType>;
};

export type InstitutionUserTypeStat = {
  __typename?: 'InstitutionUserTypeStat';
  count: Scalars['Float'];
  user_type: Scalars['String'];
};

export type IpRange = {
  __typename?: 'IpRange';
  _id: Scalars['ID'];
  created?: Maybe<Scalars['DateTime']>;
  end: Scalars['Float'];
  end_string: Scalars['String'];
  institution: Scalars['String'];
  lastEditedBy?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  start: Scalars['Float'];
  start_string: Scalars['String'];
  updated?: Maybe<Scalars['DateTime']>;
};

export type IpRangeInput = {
  end: Scalars['String'];
  institution: Scalars['String'];
  location: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  start: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  continent?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  ip_ranges: Array<IpRange>;
  orders: Array<Order>;
  region?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated?: Maybe<Scalars['DateTime']>;
  zip?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  continent?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  institution: Scalars['String'];
  region?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  zip?: InputMaybe<Scalars['String']>;
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
  _id: Scalars['ObjectId'];
  filename: Scalars['String'];
  length: Scalars['Int'];
  metadata?: Maybe<MediaMeta>;
  uploadDate?: Maybe<Scalars['DateTime']>;
};

export type MediaInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type MediaMeta = {
  __typename?: 'MediaMeta';
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type MediaOutput = {
  __typename?: 'MediaOutput';
  count?: Maybe<Scalars['Int']>;
  files: Array<Media>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCRMTagsToUsers: Scalars['Boolean'];
  addLanguagesToExistingArticles: Scalars['String'];
  addOrUpdateOrder: Scalars['Boolean'];
  addPurchaseArticleOrder: Scalars['Boolean'];
  addTranslationsHash: Scalars['String'];
  addTrialOrderForUser: Scalars['Boolean'];
  addVote: NewArticleVote;
  applyInstitutionToTriage: TriageQueue;
  cancelOrder: Scalars['Boolean'];
  checkOutdatedTranslations: Scalars['Boolean'];
  completeUserRegistration: ExtendedRegistrationOutput;
  confirmEmail?: Maybe<Scalars['String']>;
  confirmInstEmail?: Maybe<Scalars['String']>;
  createAnnouncement: Announcement;
  createGeographicPrice?: Maybe<StripePrice>;
  createInstitution: Institution;
  createIpRange?: Maybe<IpRange>;
  createLocation?: Maybe<Location>;
  createOrder?: Maybe<Order>;
  createOrderForUser?: Maybe<Order>;
  createPage: Page;
  createPublicationRequest: Scalars['Boolean'];
  createRedirect: Redirect;
  createSignInToken: Scalars['String'];
  createStripePromoCode: StripePromoCode;
  createUser: User;
  deleteAnnouncement: Scalars['String'];
  deleteIpRange: IpRange;
  deleteLocation?: Maybe<Location>;
  deleteMedia: Scalars['String'];
  deleteOrder?: Maybe<Order>;
  deletePage: Page;
  deletePrice?: Maybe<StripePrice>;
  deleteRedirect: DeleteRedirectOutput;
  deleteSignInToken: Scalars['Boolean'];
  deleteStripePromocode: Scalars['Boolean'];
  forgotPasswordCms: Scalars['Boolean'];
  generateAllScienceOpenXml: Scalars['String'];
  generateDOI: Article;
  generateScienceOpenXmlByArticle: Scalars['String'];
  getInstitution: Institution;
  handleFailedOrderPayment: Scalars['Boolean'];
  handleFreePromoCode: Scalars['Boolean'];
  loginToArticle: Scalars['Boolean'];
  markAnnouncementAsRead: Array<Scalars['String']>;
  redactVote: NewArticleVote;
  removeTemporaryAccessById: Scalars['Boolean'];
  requestSubscription: Scalars['Boolean'];
  resetPasswordCms?: Maybe<Scalars['String']>;
  resubscribeOrder?: Maybe<Order>;
  runJobManually: Scalars['String'];
  sendEmailConfirmation?: Maybe<Scalars['Boolean']>;
  sendInstEmailConfirmation?: Maybe<Scalars['Boolean']>;
  sendTriageQueueEmail: TriageQueue;
  setEnabledAnnouncement: Announcement;
  signIn?: Maybe<User>;
  signInUsingOldToken?: Maybe<User>;
  signUp: Scalars['String'];
  syncDefaultPricesToDb: Scalars['Boolean'];
  toggleTrialAccess: Scalars['Boolean'];
  tokenSignIn?: Maybe<User>;
  trackAnnouncement: Scalars['Boolean'];
  trackAnnouncements: Scalars['Boolean'];
  trackArticle: Scalars['Boolean'];
  trackFeedack?: Maybe<Feedback>;
  trackInitiateCheckout: Scalars['Boolean'];
  trackLogin: Scalars['Boolean'];
  trackRequestInstSubscription: Scalars['Boolean'];
  trackSearch: Scalars['Boolean'];
  trackShowFeedback: Scalars['Boolean'];
  trackSubscribe: Scalars['Boolean'];
  trackVideoBlock?: Maybe<Scalars['String']>;
  trackVideoPlay?: Maybe<Scalars['String']>;
  trackVideoTime: Scalars['Boolean'];
  translateArticles: Array<TranslationResult>;
  triggerUpdateUserSubscription: Scalars['String'];
  unsubscribeOrder?: Maybe<Order>;
  updateAllInstStats: Scalars['String'];
  updateAnnouncement: Announcement;
  updateArticle?: Maybe<Article>;
  updateContentLength: Scalars['String'];
  updateFeedbackSettings: FeedbackSettings;
  updateInstEmail: Scalars['Boolean'];
  updateInstitution?: Maybe<Institution>;
  updateInstitutionContacts?: Maybe<Institution>;
  updateIpRange?: Maybe<IpRange>;
  updateLocation?: Maybe<Location>;
  updateMediaLibrary?: Maybe<Media>;
  updateOrder?: Maybe<Order>;
  updateOrderCms?: Maybe<Order>;
  updatePage?: Maybe<Page>;
  updatePassword: Scalars['Boolean'];
  updatePreference: Scalars['Boolean'];
  updatePrice?: Maybe<StripePrice>;
  updateProfile: Scalars['Boolean'];
  updatePurchaseSetting: Array<Article>;
  updateRedirect?: Maybe<Redirect>;
  updateSiteSettings: SiteSetting;
  updateStripePromoCode: StripePromoCode;
  updateTriageNotes: TriageQueue;
  updateTriageQueueStatus: TriageQueue;
  updateTriageResponse: TriageQueue;
  updateTrialSettings: TrialSettings;
  updateUserCms: User;
  updateWistiaMetadata: Scalars['String'];
  upgradeSubscription?: Maybe<Scalars['Boolean']>;
  upsertSocialUser: User;
  writeLog: Scalars['Boolean'];
};


export type MutationAddCrmTagsToUsersArgs = {
  input?: InputMaybe<UserInput>;
  tags: Array<Scalars['String']>;
};


export type MutationAddOrUpdateOrderArgs = {
  input: OrderInput;
};


export type MutationAddPurchaseArticleOrderArgs = {
  input: ArticlePurchaseInput;
};


export type MutationAddVoteArgs = {
  article_title: Scalars['String'];
};


export type MutationApplyInstitutionToTriageArgs = {
  id: Scalars['String'];
  institution_id: Scalars['String'];
};


export type MutationCancelOrderArgs = {
  subscription_id: Scalars['String'];
};


export type MutationCompleteUserRegistrationArgs = {
  input: ExtendedRegistrationInput;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationConfirmInstEmailArgs = {
  token: Scalars['String'];
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
  _id: Scalars['String'];
};


export type MutationDeleteIpRangeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMediaArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String'];
};


export type MutationDeletePageArgs = {
  id: Scalars['String'];
};


export type MutationDeletePriceArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRedirectArgs = {
  input?: InputMaybe<DeleteRedirectInput>;
};


export type MutationDeleteSignInTokenArgs = {
  user_id: Scalars['String'];
};


export type MutationDeleteStripePromocodeArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordCmsArgs = {
  email: Scalars['String'];
};


export type MutationGenerateDoiArgs = {
  id: Scalars['String'];
};


export type MutationGenerateScienceOpenXmlByArticleArgs = {
  publication_id: Scalars['String'];
};


export type MutationGetInstitutionArgs = {
  input: GetInstitutionInput;
};


export type MutationHandleFailedOrderPaymentArgs = {
  error_code: Scalars['String'];
  order_id: Scalars['String'];
};


export type MutationHandleFreePromoCodeArgs = {
  code: Scalars['String'];
};


export type MutationLoginToArticleArgs = {
  password: Scalars['String'];
  publication_id: Scalars['String'];
};


export type MutationMarkAnnouncementAsReadArgs = {
  cacheId: Scalars['String'];
};


export type MutationRedactVoteArgs = {
  article_title: Scalars['String'];
};


export type MutationRemoveTemporaryAccessByIdArgs = {
  _id: Scalars['String'];
};


export type MutationRequestSubscriptionArgs = {
  input: SubscriptionInput;
};


export type MutationResetPasswordCmsArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationResubscribeOrderArgs = {
  order_id: Scalars['String'];
};


export type MutationRunJobManuallyArgs = {
  name: Scalars['String'];
};


export type MutationSendEmailConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationSendInstEmailConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationSendTriageQueueEmailArgs = {
  input: TriageQueueEmailInput;
};


export type MutationSetEnabledAnnouncementArgs = {
  _id: Scalars['String'];
  enabled: Scalars['Boolean'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignInUsingOldTokenArgs = {
  tokenId: Scalars['String'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationToggleTrialAccessArgs = {
  user_id: Scalars['String'];
  value: Scalars['Boolean'];
};


export type MutationTokenSignInArgs = {
  token: Scalars['String'];
};


export type MutationTrackAnnouncementArgs = {
  _id: Scalars['String'];
};


export type MutationTrackAnnouncementsArgs = {
  _ids: Array<Scalars['String']>;
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


export type MutationTranslateArticlesArgs = {
  input: TranslateArticlesInput;
};


export type MutationUnsubscribeOrderArgs = {
  order_id: Scalars['String'];
};


export type MutationUpdateAnnouncementArgs = {
  input: AnnouncementInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateFeedbackSettingsArgs = {
  input: FeedbackSettingsInput;
};


export type MutationUpdateInstEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateInstitutionArgs = {
  input: UpdateInstitutionInput;
};


export type MutationUpdateInstitutionContactsArgs = {
  contacts: Array<ContactPersonInput>;
  id: Scalars['String'];
};


export type MutationUpdateIpRangeArgs = {
  id: Scalars['String'];
  input: IpRangeInput;
};


export type MutationUpdateLocationArgs = {
  input: LocationInput;
};


export type MutationUpdateMediaLibraryArgs = {
  input: UpdateMediaLibraryInput;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String'];
  input: OrderInputForLocation;
};


export type MutationUpdateOrderCmsArgs = {
  id: Scalars['String'];
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
  id: Scalars['String'];
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
  price_id: Scalars['String'];
  promocode?: InputMaybe<Scalars['String']>;
};


export type MutationUpsertSocialUserArgs = {
  input: SocialAuthInput;
};


export type MutationWriteLogArgs = {
  level: Scalars['String'];
  message: Scalars['String'];
  meta?: InputMaybe<Scalars['String']>;
};

export type Name = {
  __typename?: 'Name';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  middle?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

export type NewArticleVote = {
  __typename?: 'NewArticleVote';
  article_title: Scalars['String'];
  t: Scalars['String'];
  users_voted: Array<Scalars['String']>;
  v: Scalars['Int'];
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
  _id: Scalars['ID'];
  amount?: Maybe<Scalars['Float']>;
  article?: Maybe<Article>;
  articleId?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  createdBy?: Maybe<Scalars['String']>;
  currency?: Maybe<OrderCurrency>;
  db_user_id?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<StripePromoCode>;
  end?: Maybe<Scalars['DateTime']>;
  error_code?: Maybe<Scalars['String']>;
  institution?: Maybe<Scalars['String']>;
  institutionObject?: Maybe<Institution>;
  isCanceled?: Maybe<Scalars['Boolean']>;
  isTrialPeriod?: Maybe<Scalars['Boolean']>;
  lastEditedBy?: Maybe<Scalars['String']>;
  latest_invoice?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  payment_status?: Maybe<OrderPaymentStatus>;
  plan_id?: Maybe<Scalars['String']>;
  plan_interval?: Maybe<OrderInterval>;
  promoCode?: Maybe<Scalars['String']>;
  renewals?: Maybe<Scalars['Int']>;
  require_login?: Maybe<RequireLogin>;
  restricted_specialties: Array<Scalars['String']>;
  restricted_user_types: Array<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  status?: Maybe<OrderStatus>;
  stripeCoupon?: Maybe<Scalars['String']>;
  stripePromoCode?: Maybe<Scalars['String']>;
  type?: Maybe<OrderType>;
  updated: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']>;
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
  amount: Scalars['Float'];
  created: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  end: Scalars['DateTime'];
  isTrialPeriod?: InputMaybe<Scalars['Boolean']>;
  latest_invoice?: InputMaybe<Scalars['String']>;
  plan_id?: InputMaybe<Scalars['String']>;
  plan_interval: Scalars['String'];
  promoCode?: InputMaybe<Scalars['String']>;
  start: Scalars['DateTime'];
  stripeCoupon?: InputMaybe<Scalars['String']>;
  stripePromoCode?: InputMaybe<Scalars['String']>;
  type: OrderType;
  user_id: Scalars['String'];
};

export type OrderInputForLocation = {
  amount: Scalars['Float'];
  currency?: InputMaybe<OrderCurrency>;
  description?: InputMaybe<Scalars['String']>;
  end: Scalars['DateTime'];
  institution: Scalars['String'];
  location: Scalars['String'];
  require_login: RequireLogin;
  restricted_specialties?: InputMaybe<Array<Scalars['String']>>;
  restricted_user_types?: InputMaybe<Array<Scalars['String']>>;
  start: Scalars['DateTime'];
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
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type OrderListOutput = {
  __typename?: 'OrderListOutput';
  count: Scalars['Int'];
  dbQueryString: Scalars['String'];
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
  _id: Scalars['String'];
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  meta_desc?: Maybe<Scalars['String']>;
  scripts?: Maybe<Array<Scalars['String']>>;
  sidebar?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status: PageStatus;
  title: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type PageForSlug = {
  __typename?: 'PageForSlug';
  _id: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type PageInputFetch = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search_term?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type PageOutput = {
  __typename?: 'PageOutput';
  pages: Array<Page>;
  totalCount: Scalars['Int'];
};

export enum PageStatus {
  Draft = 'draft',
  Publish = 'publish'
}

export type PartialRequest = {
  __typename?: 'PartialRequest';
  created?: Maybe<Scalars['DateTime']>;
  message?: Maybe<Scalars['String']>;
};

export type PreviouslyStatedInst = {
  __typename?: 'PreviouslyStatedInst';
  date: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
};

export type PriceFilterInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
};

export type ProfileOptions = {
  __typename?: 'ProfileOptions';
  specialties: Array<Specialty>;
  userTypes: Array<UserType>;
};

export type Project = {
  __typename?: 'Project';
  hashed_id: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PromoCode = {
  __typename?: 'PromoCode';
  _id: Scalars['ID'];
  bulkUnusedCodes: Array<Scalars['String']>;
  bulkUsedCodes: Array<Scalars['String']>;
  created: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  days?: Maybe<Scalars['Int']>;
  expiration: Scalars['DateTime'];
  interval?: Maybe<OrderInterval>;
  isSubscription: Scalars['Boolean'];
  notes: Scalars['String'];
  numberUnused?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  stripe?: Maybe<StripePromo>;
  title: Scalars['String'];
  type: PromoCodeType;
  updated: Scalars['DateTime'];
};

export enum PromoCodeDuration {
  Forever = 'forever',
  Once = 'once',
  Repeating = 'repeating'
}

export enum PromoCodeType {
  Individual = 'individual',
  Institution = 'institution'
}

export type PublicationRequestInput = {
  abstract: Scalars['String'];
  email: Scalars['String'];
  full_name: Scalars['String'];
  institution: Scalars['String'];
  procedure: Scalars['String'];
  rationale: Scalars['String'];
  specialty: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  accessEvents: AccessEventsOutput;
  accessesByUserId?: Maybe<AccessEventsOutput>;
  allArticleIds: Array<Scalars['String']>;
  allArticleVotes: Array<NewArticleVote>;
  allInstitutionsList: Array<Scalars['String']>;
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
  deleteInstitution: DeleteInstitutionOutput;
  featured_institutions: Array<Institution>;
  fetchArticles: ArticleOutput;
  fetchPageById?: Maybe<Page>;
  fetchPages: PageOutput;
  fetchRedirectById?: Maybe<Redirect>;
  fetchRedirects: RedirectOutput;
  files: MediaOutput;
  genCounterReport: Scalars['String'];
  geolocation?: Maybe<Geolocation>;
  getAllOrders: OrderListOutput;
  getCombinedPromoCode: CombinedCodeOutput;
  getDefaultPrices: Array<StripePrice>;
  getFeedbackList: FeedbackListOutput;
  getFeedbackModalAccessTypes: Array<AccessTypeEnum>;
  getFeedbackQuestionsForUser?: Maybe<FeedbackQuestion>;
  getFeedbackSettings: FeedbackSettings;
  getFeedbacksByInstitutionId: FeedbackListOutput;
  getPriceByProductId: StripePrice;
  getPurchaseAndRentPrices: Array<StripePrice>;
  getPurchasedArticles: Array<Order>;
  getPurchasedArticlesByUserId: Array<Order>;
  getScienceOpenArticleByPubId?: Maybe<ScienceOpenXml>;
  getScienceOpenArticlesXml: Array<ScienceOpenXml>;
  getSiteSettings: SiteSetting;
  getSiteWideAnnouncements?: Maybe<Array<Announcement>>;
  getStripePromoCode: StripePromoCode;
  getStripePromoCodeByCode: StripePromoCode;
  getStripePromoCodes: StripePromoCodeListOutput;
  getStripePromocodeRedeems: RedeemListOutput;
  getTrialSettings: TrialSettings;
  hasArticleRestriction: Scalars['Boolean'];
  hasServiceInCountry: Scalars['Boolean'];
  instArticleEventLogs: AccessEventsOutput;
  institutionAccessStats: InstitutionAccessStats;
  institutionById?: Maybe<Institution>;
  institutionTrafficOverTime: Array<InstitutionAccessTraffic>;
  institutionUserTypesStats: Array<InstitutionUserTypeStat>;
  institution_subs: Array<Institution>;
  institutions: InstitutionOutput;
  isJobRunning: Scalars['Boolean'];
  jobProgress: Scalars['Float'];
  latestArticles: Array<Article>;
  orderById?: Maybe<Order>;
  ordersByUserId?: Maybe<Array<Order>>;
  pageBySlug?: Maybe<Page>;
  pages: Array<PageForSlug>;
  prices: Array<StripePrice>;
  products: Array<StripeProduct>;
  profileOptions: ProfileOptions;
  promoCode?: Maybe<PromoCode>;
  redirectFor?: Maybe<Redirect>;
  scienceOpenLastGeneratedAt?: Maybe<Scalars['DateTime']>;
  showFeedbackModal: ShowFeedbackModalOutput;
  specialties?: Maybe<Array<Specialty>>;
  testUpdateArticleStatsJob: Scalars['String'];
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


export type QueryAnnouncementArgs = {
  id: Scalars['String'];
};


export type QueryArticleAccessStatsArgs = {
  input: AccessFilterInput;
};


export type QueryArticleByIdArgs = {
  article_id: Scalars['String'];
};


export type QueryArticleBySlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
  publication_id: Scalars['String'];
};


export type QueryArticlesArgs = {
  input?: InputMaybe<ArticleInput>;
};


export type QueryArticlesByIdsArgs = {
  article_ids: Array<Scalars['String']>;
};


export type QueryAuthorBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryDeleteInstitutionArgs = {
  input?: InputMaybe<DeleteInstitutionInput>;
};


export type QueryFetchArticlesArgs = {
  input?: InputMaybe<ArticleInputFetch>;
};


export type QueryFetchPageByIdArgs = {
  id: Scalars['String'];
};


export type QueryFetchPagesArgs = {
  input?: InputMaybe<PageInputFetch>;
};


export type QueryFetchRedirectByIdArgs = {
  id: Scalars['String'];
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


export type QueryGetCombinedPromoCodeArgs = {
  code: Scalars['String'];
};


export type QueryGetFeedbackListArgs = {
  input: FeedbackListInput;
};


export type QueryGetFeedbackQuestionsForUserArgs = {
  anon_link_id: Scalars['String'];
};


export type QueryGetFeedbacksByInstitutionIdArgs = {
  input: FeedbackListInput;
  institution_id: Scalars['String'];
};


export type QueryGetPriceByProductIdArgs = {
  product_id: Scalars['String'];
};


export type QueryGetPurchasedArticlesByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGetScienceOpenArticleByPubIdArgs = {
  publication_id: Scalars['String'];
};


export type QueryGetStripePromoCodeArgs = {
  id: Scalars['String'];
};


export type QueryGetStripePromoCodeByCodeArgs = {
  code: Scalars['String'];
};


export type QueryGetStripePromoCodesArgs = {
  input: StripePromoCodeListInput;
};


export type QueryGetStripePromocodeRedeemsArgs = {
  id: Scalars['String'];
  input: RedeemListInput;
};


export type QueryInstArticleEventLogsArgs = {
  input: AccessFilterInput;
};


export type QueryInstitutionAccessStatsArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionByIdArgs = {
  id: Scalars['String'];
};


export type QueryInstitutionTrafficOverTimeArgs = {
  groupBy: Scalars['String'];
  input: InstitutionAccessInput;
};


export type QueryInstitutionUserTypesStatsArgs = {
  input: InstitutionAccessInput;
};


export type QueryInstitutionsArgs = {
  input?: InputMaybe<InstitutionInput>;
};


export type QueryIsJobRunningArgs = {
  name: Scalars['String'];
};


export type QueryJobProgressArgs = {
  name: Scalars['String'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['String'];
};


export type QueryOrdersByUserIdArgs = {
  user_id: Scalars['String'];
};


export type QueryPageBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPricesArgs = {
  input?: InputMaybe<PriceFilterInput>;
};


export type QueryPromoCodeArgs = {
  code: Scalars['String'];
};


export type QueryRedirectForArgs = {
  from: Scalars['String'];
};


export type QueryShowFeedbackModalArgs = {
  anon_link_id: Scalars['String'];
};


export type QueryTriageQueueByIdArgs = {
  id: Scalars['String'];
};


export type QueryTriageQueueRequestsArgs = {
  input?: InputMaybe<TriageQueueInput>;
};


export type QueryTriageQueueRequestsByInstitutionArgs = {
  input?: InputMaybe<TriageQueueInput>;
  instId: Scalars['String'];
};


export type QueryUpgradeSubscriptionPreviewArgs = {
  price_id: Scalars['String'];
  promocode?: InputMaybe<Scalars['String']>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserDetailArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserInput>;
};


export type QueryUsersByInstitutionArgs = {
  input?: InputMaybe<UserInput>;
  instId: Scalars['String'];
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
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type RedeemListOutput = {
  __typename?: 'RedeemListOutput';
  items: Array<Order>;
  totalCount: Scalars['Int'];
};

export type Redirect = {
  __typename?: 'Redirect';
  _id: Scalars['ID'];
  author?: Maybe<User>;
  created?: Maybe<Scalars['DateTime']>;
  from: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  stats?: Maybe<Array<RedirectStats>>;
  to: Scalars['String'];
  track?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  updated?: Maybe<Scalars['DateTime']>;
};

export type RedirectInput = {
  limit?: InputMaybe<Scalars['Int']>;
  search_term?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type RedirectOutput = {
  __typename?: 'RedirectOutput';
  count: Scalars['Int'];
  redirects: Array<Redirect>;
};

export type RedirectStats = {
  __typename?: 'RedirectStats';
  ip: Scalars['String'];
  time: Scalars['DateTime'];
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
  _id: Scalars['ID'];
  articleId: Scalars['String'];
  articlePublicationId: Scalars['String'];
  generatedAt: Scalars['DateTime'];
  generatedXml: Scalars['String'];
};

export type ShowFeedbackModalOutput = {
  __typename?: 'ShowFeedbackModalOutput';
  show: Scalars['Boolean'];
  showNextAt: Scalars['Int'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
};

export type SiteSetting = {
  __typename?: 'SiteSetting';
  _id: Scalars['String'];
  displayPurchaseAndRentToAdminOnly: Scalars['Boolean'];
  isPurchaseArticleFeatureOn: Scalars['Boolean'];
  isRentArticleFeatureOn: Scalars['Boolean'];
  isTrialFeatureOn?: Maybe<Scalars['Boolean']>;
  rentDuration: Scalars['Float'];
  scienceOpenXmlGeneratedAt: Scalars['DateTime'];
  trialDuration?: Maybe<Scalars['Float']>;
  updated: Scalars['DateTime'];
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
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<SocialName>;
  provider?: Maybe<SocialProviderEnum>;
};

export type SocialAuthDetailsInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
};

export type SocialAuthInput = {
  displayName?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  familyName?: InputMaybe<Scalars['String']>;
  givenName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  middleName?: InputMaybe<Scalars['String']>;
  provider: SocialProviderEnum;
};

export type SocialInput = {
  facebook?: InputMaybe<SocialAuthDetailsInput>;
  google?: InputMaybe<SocialAuthDetailsInput>;
  linkedin?: InputMaybe<SocialAuthDetailsInput>;
};

export type SocialName = {
  __typename?: 'SocialName';
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
};

export enum SocialProviderEnum {
  Facebook = 'Facebook',
  Google = 'Google',
  Linkedin = 'Linkedin',
  Saml = 'Saml'
}

export type Specialty = {
  __typename?: 'Specialty';
  _id: Scalars['ID'];
  name: Scalars['String'];
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
  _id: Scalars['ID'];
  countryCode?: Maybe<CountryEnum>;
  countryCodes?: Maybe<Array<CountryEnum>>;
  currency: Scalars['String'];
  enabled?: Maybe<Scalars['Boolean']>;
  interval?: Maybe<OrderInterval>;
  nickname: Scalars['String'];
  priceId: Scalars['ID'];
  product: Scalars['String'];
  unit_amount: Scalars['Int'];
  unit_decimal?: Maybe<Scalars['String']>;
};

export type StripeProduct = {
  __typename?: 'StripeProduct';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  prices: Array<StripePrice>;
};

export type StripePromo = {
  __typename?: 'StripePromo';
  price: Scalars['String'];
};

export type StripePromoCode = {
  __typename?: 'StripePromoCode';
  _id: Scalars['String'];
  active?: Maybe<Scalars['Boolean']>;
  amount_off?: Maybe<Scalars['Float']>;
  applies_to?: Maybe<Array<Scalars['String']>>;
  code: Scalars['String'];
  couponId: Scalars['String'];
  created: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  duration?: Maybe<PromoCodeDuration>;
  duration_in_months?: Maybe<Scalars['Float']>;
  max_redemptions?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  percent_off?: Maybe<Scalars['Float']>;
  redeem_by?: Maybe<Scalars['DateTime']>;
  times_redeemed: Scalars['Float'];
  updatedBy?: Maybe<Scalars['String']>;
  valid: Scalars['Boolean'];
};

export type StripePromoCodeListInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type StripePromoCodeListOutput = {
  __typename?: 'StripePromoCodeListOutput';
  items: Array<StripePromoCode>;
  totalCount: Scalars['Int'];
};

export type SubChapter = {
  __typename?: 'SubChapter';
  number: Scalars['Int'];
  parent: Scalars['Int'];
  time: Scalars['Int'];
  title: Scalars['String'];
};

export type SubItem = {
  __typename?: 'SubItem';
  id: Scalars['ID'];
  number: Scalars['Int'];
  text: Scalars['String'];
};

export type SubItemInput = {
  number: Scalars['Int'];
  text: Scalars['String'];
};

export enum SubType {
  Individual = 'individual',
  Institution = 'institution',
  NotCreated = 'notCreated',
  Trial = 'trial'
}

export type SubscriptionInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['String']>;
  display_name: Scalars['String'];
  email: Scalars['String'];
  institution_name: Scalars['String'];
  message: Scalars['String'];
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
};

export type SubscriptionType = {
  __typename?: 'SubscriptionType';
  fromInst?: Maybe<Scalars['String']>;
  lastChecked: Scalars['DateTime'];
  lastSubType?: Maybe<SubType>;
  lastSubTypeExpiry?: Maybe<Scalars['DateTime']>;
  subType?: Maybe<SubType>;
};

export type TemporaryAccess = {
  __typename?: 'TemporaryAccess';
  _id: Scalars['ID'];
  expiresAt: Scalars['DateTime'];
  institution: Institution;
  source_ip: Scalars['String'];
  user: User;
};

export type Thumbnail = {
  __typename?: 'Thumbnail';
  height: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type TrackArticleInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  publication_id: Scalars['String'];
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
  uniqueView?: InputMaybe<Scalars['Boolean']>;
};

export type TrackFeedbackInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  article_publication_id?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  feedback_id?: InputMaybe<Scalars['String']>;
  method?: InputMaybe<Scalars['String']>;
  questionId: Scalars['String'];
  type: Scalars['String'];
  user?: InputMaybe<Scalars['String']>;
  value: Scalars['any'];
};

export type TrackInitiateCheckoutInput = {
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
};

export type TrackRequestInstSubscriptionInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
};

export type TrackSubscribeInput = {
  orderAmount: Scalars['Float'];
};

export type TrackVideoInput = {
  anon_link_id?: InputMaybe<Scalars['String']>;
  block_type?: InputMaybe<Scalars['String']>;
  publication_id: Scalars['String'];
  referredFrom?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
  uniqueView?: InputMaybe<Scalars['Boolean']>;
};

export type TrackVideoTimeInput = {
  increment: Scalars['Int'];
  time_watched: Scalars['Float'];
  vidWatchId: Scalars['String'];
};

export type TranslateArticlesInput = {
  article_ids: Array<Scalars['String']>;
  enableImmediately?: InputMaybe<Scalars['Boolean']>;
  languages: Array<Scalars['String']>;
};

export type TranslationResult = {
  __typename?: 'TranslationResult';
  language: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  publication_id: Scalars['String'];
  slug: Scalars['String'];
  success: Scalars['Boolean'];
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
  _id: Scalars['ID'];
  additional_info?: Maybe<AdditionalInfo>;
  countryCode?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  display_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailTemplate: Scalars['String'];
  institution?: Maybe<Institution>;
  institution_name?: Maybe<Scalars['String']>;
  market?: Maybe<TriageMarket>;
  notes?: Maybe<Scalars['String']>;
  priority?: Maybe<TriagePriority>;
  regionName?: Maybe<Scalars['String']>;
  sentEmailAt?: Maybe<Scalars['DateTime']>;
  type: TriageQueueStatus;
  updated?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};


export type TriageQueueEmailTemplateArgs = {
  pocName?: InputMaybe<Scalars['String']>;
};

export type TriageQueueEmailInput = {
  contactEmail: Scalars['String'];
  id: Scalars['String'];
  includeRequestorToCc: Scalars['Boolean'];
  pocName?: InputMaybe<Scalars['String']>;
};

export type TriageQueueInput = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
};

export type TriageQueueOutput = {
  __typename?: 'TriageQueueOutput';
  count: Scalars['Int'];
  dbQueryString: Scalars['String'];
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
  _id: Scalars['ID'];
  articleCount?: Maybe<Scalars['Float']>;
  display_name: Scalars['String'];
  email: Scalars['String'];
  inst_email: Scalars['String'];
  institution: Scalars['String'];
  last_request_date?: Maybe<Scalars['DateTime']>;
  last_visited?: Maybe<Scalars['DateTime']>;
  loginCount?: Maybe<Scalars['Float']>;
  registered?: Maybe<Scalars['DateTime']>;
  requestCount: Scalars['Int'];
  requests: Array<PartialRequest>;
  specialty: Scalars['String'];
  user_type: Scalars['String'];
};

export type TriageRequestsByUserOutput = {
  __typename?: 'TriageRequestsByUserOutput';
  count: Scalars['Int'];
  totalRequestCount: Scalars['Int'];
  triage_requests: Array<TriageRequestByUser>;
};

export type TrialSettings = {
  __typename?: 'TrialSettings';
  enabledCountries: Array<Scalars['String']>;
  isTrialFeatureOn: Scalars['Boolean'];
  trialDuration: Scalars['Float'];
};

export type TrialSettingsInput = {
  enabledCountries: Array<Scalars['String']>;
  isTrialFeatureOn: Scalars['Boolean'];
  trialDuration: Scalars['Float'];
};

export type UpdateArticleInput = {
  DOIStatus?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<UpdateContentInput>;
  has_complete_abstract?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  preprint_date?: InputMaybe<Scalars['DateTime']>;
  production_id?: InputMaybe<Scalars['String']>;
  publication_id?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['DateTime']>;
  restrictions?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateContentInput = {
  abstract?: InputMaybe<Scalars['String']>;
  article?: InputMaybe<Scalars['String']>;
  citations?: InputMaybe<Scalars['String']>;
  cite_this_article?: InputMaybe<Scalars['String']>;
  otoc?: InputMaybe<Array<ContentItemInput>>;
  outline?: InputMaybe<Scalars['String']>;
  toc?: InputMaybe<Array<ContentItemInput>>;
  transcription?: InputMaybe<Scalars['String']>;
};

export type UpdateInstitutionInput = {
  accessSettings?: InputMaybe<AccessSettingsInput>;
  aliases?: InputMaybe<Array<Scalars['String']>>;
  category?: InputMaybe<Scalars['String']>;
  domains?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  image?: InputMaybe<ImageInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  restrictMatchByName?: InputMaybe<Scalars['Boolean']>;
  show_on_subscribers_page?: InputMaybe<Scalars['Boolean']>;
  subscriber_display_name?: InputMaybe<Scalars['String']>;
  urlLink?: InputMaybe<Scalars['String']>;
};

export type UpdateMediaLibraryInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdateOrderInput = {
  amount?: InputMaybe<Scalars['Float']>;
  articleId?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<OrderCurrency>;
  description?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['DateTime']>;
  institution?: InputMaybe<Scalars['String']>;
  isCanceled?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  payment_status?: InputMaybe<OrderPaymentStatus>;
  plan_interval?: InputMaybe<OrderInterval>;
  promoCode?: InputMaybe<Scalars['String']>;
  require_login?: InputMaybe<RequireLogin>;
  restricted_specialties?: InputMaybe<Array<Scalars['String']>>;
  restricted_user_types?: InputMaybe<Array<Scalars['String']>>;
  start?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<OrderStatus>;
  type?: InputMaybe<OrderType>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type UpdatePageInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  meta_desc?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  scripts?: InputMaybe<Array<Scalars['String']>>;
  sidebar?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword?: InputMaybe<Scalars['String']>;
};

export type UpdatePriceInput = {
  amount: Scalars['Int'];
  countryCode?: InputMaybe<CountryEnum>;
  interval?: InputMaybe<OrderInterval>;
};

export type UpdateProfileInput = {
  display_name?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  institution_name?: InputMaybe<Scalars['String']>;
  institutional_email?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Array<Scalars['String']>>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  specialty?: InputMaybe<Scalars['ID']>;
  user_type?: InputMaybe<Scalars['String']>;
};

export type UpdatePurchaseSettingInput = {
  article_ids: Array<Scalars['String']>;
  isPurchaseArticleFeatureOn: Scalars['Boolean'];
  isRentArticleFeatureOn: Scalars['Boolean'];
  purchaseAllowedCountries?: InputMaybe<Array<CountryEnum>>;
};

export type UpdateRedirectInput = {
  from?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  track?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateSiteSettingInput = {
  displayPurchaseAndRentToAdminOnly: Scalars['Boolean'];
  isPurchaseArticleFeatureOn?: InputMaybe<Scalars['Boolean']>;
  isRentArticleFeatureOn?: InputMaybe<Scalars['Boolean']>;
  isTrialFeatureOn?: InputMaybe<Scalars['Boolean']>;
  rentDuration?: InputMaybe<Scalars['Float']>;
  trialDuration?: InputMaybe<Scalars['Float']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateStripeCodeInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  couponId: Scalars['String'];
  max_redemptions?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  redeem_by?: InputMaybe<Scalars['DateTime']>;
  times_redeemed?: InputMaybe<Scalars['Float']>;
  valid?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateTriageInput = {
  id: Scalars['String'];
  market?: InputMaybe<TriageMarket>;
  priority?: InputMaybe<TriagePriority>;
  type?: InputMaybe<TriageQueueStatus>;
};

export type UpdateTriageNotesInput = {
  id: Scalars['String'];
  notes: Scalars['String'];
};

export type UpdateTriageResponseInput = {
  id: Scalars['String'];
  response: Scalars['String'];
};

export type UpdateUserInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  display_name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailNeedsConfirm?: InputMaybe<Scalars['Boolean']>;
  emailVerifiedAt?: InputMaybe<Scalars['DateTime']>;
  email_preference?: InputMaybe<EmailPreference>;
  firstName?: InputMaybe<Scalars['String']>;
  hasManualBlock?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  image?: InputMaybe<ImageInput>;
  instEmailVerified?: InputMaybe<Scalars['Boolean']>;
  instEmailVerifiedAt?: InputMaybe<Scalars['DateTime']>;
  inst_email?: InputMaybe<Scalars['String']>;
  institution?: InputMaybe<Scalars['String']>;
  institution_name?: InputMaybe<Scalars['String']>;
  interests?: InputMaybe<Array<Scalars['String']>>;
  isTrialFeatureOn?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  manualBlockMessage?: InputMaybe<Scalars['String']>;
  matched_institution_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  referer?: InputMaybe<Scalars['String']>;
  referrerPath?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoles>;
  slug?: InputMaybe<Scalars['String']>;
  social?: InputMaybe<SocialInput>;
  source_ip?: InputMaybe<Scalars['String']>;
  specialty?: InputMaybe<Scalars['String']>;
  trialAccessAt?: InputMaybe<Scalars['DateTime']>;
  trialDuration?: InputMaybe<Scalars['Int']>;
  trialsAllowed?: InputMaybe<Scalars['Boolean']>;
  user_type?: InputMaybe<Scalars['String']>;
};

export type UpgradeSubscriptionPreview = {
  __typename?: 'UpgradeSubscriptionPreview';
  amount: Scalars['Float'];
  cardLast4: Scalars['String'];
  description: Scalars['String'];
  promocodeApplied: Scalars['Boolean'];
  type: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  accessExpiredAt?: Maybe<Scalars['DateTime']>;
  accessType: AccessType;
  activeOrder?: Maybe<Order>;
  anon_link_id?: Maybe<Scalars['String']>;
  articleCount?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  display_name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailNeedsConfirm?: Maybe<Scalars['Boolean']>;
  emailVerified: Scalars['Boolean'];
  emailVerifiedAt?: Maybe<Scalars['DateTime']>;
  email_preference?: Maybe<EmailPreference>;
  hasManualBlock?: Maybe<Scalars['Boolean']>;
  hasRequestedSubscription?: Maybe<Scalars['Boolean']>;
  howFound?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  instEmailVerified?: Maybe<Scalars['Boolean']>;
  instEmailVerifiedAt?: Maybe<Scalars['DateTime']>;
  inst_email?: Maybe<Scalars['String']>;
  institution?: Maybe<Scalars['String']>;
  institution_name?: Maybe<Scalars['String']>;
  institutionalEmail?: Maybe<Scalars['String']>;
  interests?: Maybe<Array<Scalars['String']>>;
  isPasswordSet: Scalars['Boolean'];
  isSubscribed?: Maybe<Scalars['Boolean']>;
  isSubscribedFromInst?: Maybe<Scalars['Boolean']>;
  isTrialFeatureOn?: Maybe<Scalars['Boolean']>;
  isTrialsFeatureEnabled: Scalars['Boolean'];
  lastSubType?: Maybe<SubType>;
  last_visited?: Maybe<Scalars['DateTime']>;
  loginCount?: Maybe<Scalars['Int']>;
  manualBlockMessage?: Maybe<Scalars['String']>;
  matchStatus?: Maybe<MatchStatus>;
  matchedBy?: Maybe<MatchedBy>;
  matched_institution_name?: Maybe<Scalars['String']>;
  name: Name;
  numSearches?: Maybe<Scalars['Int']>;
  offsiteAccesses: Array<TemporaryAccess>;
  phone?: Maybe<Scalars['String']>;
  prev_source_ip?: Maybe<Scalars['String']>;
  previouslyStatedInstitutions?: Maybe<Array<PreviouslyStatedInst>>;
  promo_code?: Maybe<Scalars['String']>;
  referer?: Maybe<Scalars['String']>;
  referrerPath?: Maybe<Scalars['String']>;
  regionName?: Maybe<Scalars['String']>;
  requestSubscriptionCount?: Maybe<Scalars['Float']>;
  role: UserRoles;
  showFeedbackQuestions: Scalars['Boolean'];
  signInToken?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  social?: Maybe<Social>;
  source_ip?: Maybe<Scalars['String']>;
  specialty?: Maybe<Scalars['String']>;
  stripeData: UserStripeData;
  subActive: Scalars['Boolean'];
  subscription?: Maybe<SubscriptionType>;
  total_time_watched?: Maybe<Scalars['Float']>;
  trialAccessAt?: Maybe<Scalars['DateTime']>;
  trialDuration?: Maybe<Scalars['Float']>;
  trialsAllowed: Scalars['Boolean'];
  user_type?: Maybe<Scalars['String']>;
  user_type_other?: Maybe<Scalars['String']>;
};

export type UserInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  filters?: InputMaybe<Array<ColumnFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort_by?: InputMaybe<Scalars['String']>;
  sort_order?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  count: Scalars['Int'];
  dbQueryString: Scalars['String'];
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
  isTrialsFeatureEnabled?: Maybe<Scalars['Boolean']>;
  prices: Array<StripePrice>;
  stripeId: Scalars['String'];
  trialDuration?: Maybe<Scalars['Int']>;
  trial_order_count?: Maybe<Scalars['Int']>;
};

export type UserType = {
  __typename?: 'UserType';
  _id: Scalars['ID'];
  type: Scalars['String'];
};

export type UserViews = {
  __typename?: 'UserViews';
  by_country: Array<ViewType>;
  by_institution: Array<ViewType>;
  by_user_type: Array<ViewType>;
  total: Scalars['Int'];
};

export type ViewType = {
  __typename?: 'ViewType';
  key: Scalars['String'];
  views: Scalars['Float'];
};

export enum VisibilityEnum {
  Private = 'private',
  Public = 'public'
}

export type Wistia = {
  __typename?: 'Wistia';
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  internal_id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  progress?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  status?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Thumbnail>;
  updated?: Maybe<Scalars['String']>;
  uploaded?: Maybe<Scalars['String']>;
};
