import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'
import { MiddlewareFactory } from './types'

type IPResponse = {
  country_code: string
  region_code: string
  city: string
}

async function getLocation(testIp: string) {
  const response = await fetch(`http://ipwho.is/${testIp}`)
  const data = (await response.json()) as IPResponse
  const location = {
    ip: testIp,
    country: data.country_code,
    region: data.region_code,
    city: data.city
  }

  return location
}
/**
 * Sets the test_ip cookie to contain ip, country, region and city information.
 * @param req
 * @returns
 */
export const withIpCookie: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    const { searchParams } = request.nextUrl

    if (searchParams.has('test_ip') && res) {
      const testIp = searchParams.get('test_ip')
      if (testIp === 'reset' || !testIp) {
        if (res instanceof NextResponse) {
          res.cookies.delete('test_ip')
        }
        return res
      }
      try {
        if (res instanceof NextResponse) {
          if (!res.cookies.get('test_ip')) {
            const location = await getLocation(testIp)

            res.cookies.set('test_ip', JSON.stringify(location), {
              httpOnly: true
            })
            res.cookies.set('jomi-ip', testIp)
          }
        }
        request.nextUrl.searchParams.delete('test_ip')
      } catch (e) {
        console.log(`failed to set test_ip`, e.message)
      }

      return res
    } else {
      if (res instanceof NextResponse) {
        res.cookies.set('jomi-ip', request.ip)
      }
    }

    return res
  }
}
