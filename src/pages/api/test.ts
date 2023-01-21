import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { VerifyOptions } from 'jsonwebtoken';

type Message = {
    message: string
}

// dummy endpoint to test authentication
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
    const token = req.body.token;

    jwt.verify(token, "secret_key_change_later", function(err: Error, decoded: string) {
        return res.json({message: `${decoded}`})
    })
}
