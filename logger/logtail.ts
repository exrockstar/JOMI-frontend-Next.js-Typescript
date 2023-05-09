import { Logtail } from '@logtail/browser'

export const logtail = new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN)
