// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dayjs from 'dayjs'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isProduction } from 'common/constants'
import { logger } from 'logger/logger'

interface PasswordProtectRequest extends NextApiRequest {
  body: {
    password: string
    redirectUrl: string
  }
}

type Data = {
  message: string
}

export default function handler(
  req: PasswordProtectRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      if (
        req.body.password === 'jomi' ||
        req.body.password === process.env.PASSWORD_PROTECT
      ) {
        const pwCookie = serialize('jomi-pw-protect', 'true', {
          path: '/',
          expires: dayjs().add(1, 'year').toDate(),
          sameSite: 'lax',
          httpOnly: true,
          secure: isProduction
        })

        res.setHeader('Set-Cookie', pwCookie)
        res.status(200).json({ message: 'Success' })
        res.end()
      } else {
        res.status(400).json({ message: 'Incorrect Password' })
      }
    } catch (e) {
      res.status(500).json({ message: 'Internal server error' })
      logger.error(e.message)
    }
  } else {
    res.status(405).send({ message: 'Method not allowed' })
  }
}
