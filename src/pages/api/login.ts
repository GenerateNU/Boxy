import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

type Message = {
    message: string,
    token?: string
}

// POST - login
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
    if (req.method === 'POST') {
        const { body } = req;

        // checking for required fields
        if ("username" in body && "password" in body) {
            // to implement later: actually check if user exists in database

            const token  = jwt.sign(body['username'], 'secret_key_change_later');

            return res.status(200).send({message: 'logged in', token: token});
        }

        return res.status(403).json({message: "username and password required"});
    }

    return res.status(405).send({message: 'Only POST request allowed'})
}
