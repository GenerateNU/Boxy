import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import { listings } from "@prisma/client";
import Listings from "@/models/listings";
import { ListingResponse } from "@/models/listings";

type Message = {
  message: string;
};

// Change to async
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse[] | listings[] | Message>
) {
  const { body } = req;
  const listingsObject = new Listings(prisma.listings);

  // GET - get listings and their basic details given filters
  if (req.method === "GET") {
    const { body } = req;
    const listingsDB = new Listings(prisma.listings);
    let response: ListingResponse[] = [];
    try {
      response = await listingsObject.fetch(body);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ message: e.message });
      }
    }
    return res.status(200).json(response);
  }

  // POST - create new listing
  if (req.method === "POST") {
    try {
      // Check if the user is logged in
      // (To be added in the future)

      if ("listing_id" in body) {
        // Update a current listing using Prisma
        await listingsObject.update(body);
      } else {
        // Create a new listing using Prisma
        await listingsObject.create(body);
      }
      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }

  if (req.method === "DELETE") {
    try {
      await listingsObject.delete(body);
      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }

  return res.status(405).send({ message: "method not supported" });
}
