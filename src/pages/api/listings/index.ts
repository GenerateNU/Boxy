import type { NextApiRequest, NextApiResponse } from 'next'

type Listing = {
    id: string,
    price: Number,
    name: string,
    proximity: Number
}

type Message = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Listing[] | Message>
) {
  // GET - get listings and their basic details given filters
  if (req.method === 'GET') {
    return res.status(200).json([])
  }

  // POST - create new listing
  if (req.method === 'POST') {

  }  

  return res.status(405).send({message: 'method not supported'})
}
