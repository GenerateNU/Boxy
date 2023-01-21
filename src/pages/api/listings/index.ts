import type { NextApiRequest, NextApiResponse } from 'next'

type Listing = {
    id: string,
    price: Number,
    name: string,
    proximity: Number
}

// GET - get listings and their basic details given filters
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Listing[]>
) {

  res.status(200).json([])
}
