import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import Listings from "@/models/listings";
import { listings } from "@prisma/client";
import persistentListingInstance from "lib/listingInstance";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<listings | null | Message>
) {
  let response: listings | null = null;
  const listingsDB = new Listings(prisma.listings);

  if (!("id" in req.query)) {
    return res
      .status(400)
      .json({ message: "missing id query in parameter string" });
  }

  // GET - get listing details given ID
  if (req.method === "GET") {
    try {
      response = await persistentListingInstance.fetchByID(req.body.id);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ message: e.message });
      }
    }
    return res.status(200).json(response);
  }

  // POST - create a new listing
  if (req.method === "POST") {
    try {
      // Create a new listing using Prisma
      await persistentListingInstance.create(req.body);

      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }

  // PUT - edit an existing listing
  if (req.method === "PUT") {
    try {
      // Update a current listing using Prisma
      await persistentListingInstance.update(req.body);

      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }

  // DELETE - delete listing given ID
  if (req.method === "DELETE") {
    try {
      await persistentListingInstance.delete(req.body);
      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }
  return res.status(405).send({ message: "method not supported" });
}
