// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Cookies from 'cookies'
import { UserRoles } from 'graphql/types'
import jwt from 'jsonwebtoken'
type Data = {
  token: any
  ip: any
}

/**
 * Easily returns an admin token which is useful when testing the graphql API.
 * Just uncomment lines 20-23 below
 * @param req
 * @param res
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.APP_ENV === 'development') {
    const secret = process.env.SECRET
    const token = jwt.sign(
      { role: UserRoles.Superadmin, _id: 'NEXTJS_APP' },
      secret,
      {
        algorithm: 'HS256',
        expiresIn: '30m'
      }
    )
    // const cookie = new Cookies(req, res)
    res.status(200).json({
      token: token,
      ip: ''
    })
  }

  res.status(200).json({
    token: '',
    ip: ''
  })
}
