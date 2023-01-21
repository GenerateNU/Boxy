import type { NextApiRequest, NextApiResponse } from 'next'

type Message = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message>
) {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(403).json({message: "invalid request method"})
    }

    if ("id" ! in req.query) {
        return res.status(400).json({message: "missing id query in parameter string"})
    }

    // GET - get user with given ID
    if (req.method === 'GET') {
    } 
    
    // POST - edit user with given ID
    if (req.method === 'POST') {
        // edit user with given id
    } 
    
    // DELETE - delete user with given ID
    if (req.method === 'DELETE') {
    }

}
