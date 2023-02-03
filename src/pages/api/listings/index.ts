import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import Listings from "@/models/listings";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  // GET - get listings and their basic details given filters
  if (req.method === "GET") {
    return res.status(200).json({ message: "" });
  }

  // POST - create new listing
  if (req.method === "POST") {
    try {
      //extract listing info from request body
      const { body } = req;

      // Check if the user is logged in
      // (To be added in the future)

      // Create a new listing using Prisma
      const newListing = new Listings(prisma.listings);
      await newListing.create(body);
      return res.status(201).json({ message: "Successful" });
    } catch (error) {
      return res.status(400).json({ message: String(error) });
    }
  }

  return res.status(405).send({ message: "method not supported" });
}
