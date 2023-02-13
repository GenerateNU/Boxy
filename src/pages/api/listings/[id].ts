import prisma from 'lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import Listings from "@/models/listings";
import { listings } from '@prisma/client';

type Message = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<listings | null | Message>
) {
  if (!("id" in req.query)) {
    return res.status(400).json({message: "missing id query in parameter string"})
  }

  // GET - get listing details given ID
  if (req.method === 'GET') {
    let response: listings | null = null;
    const listingsDB = new Listings(prisma.listings);
    try {
      response = await listingsDB.fetchByID(req.body.id);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ message: e.message });
      }
    }
    return res.status(200).json(response);
  }

  // POST - edit listing given ID
  if (req.method === 'POST') {

  }

  // DELETE - delete listing given ID
  if (req.method === 'DELETE') {

  }

  return res.status(405).send({message: 'method not supported'})
}
