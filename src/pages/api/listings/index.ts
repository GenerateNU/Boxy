import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import { Decimal } from "@prisma/client/runtime";
import { listings } from "@prisma/client";
import Listings from "@/models/listings";

type Message = {
  message: string;
};

// Compute the distance in miles between two longitude and latitude points:
function calculateDistance(pos1: number[], pos2: number[]) {
  const lon1 = (pos1[0] * Math.PI) / 180;
  const lon2 = (pos1[1] * Math.PI) / 180;
  const lat1 = (pos2[0] * Math.PI) / 180;
  const lat2 = (pos2[1] * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 3956;

  return c * r;
}

// Change to async
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<listings[] | Message>
) {


  // GET - get listings and their basic details given filters
  if (req.method === "GET") {
    const { body } = req;
    const listingsDB = new Listings(prisma.listings);
    let response: listings[] = [];
    
    try {
      response = await listingsDB.fetch(body);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(405).send({ message: e.message });
      }
    }
    return res.status(200).json(response);
  }


  // POST - create new listing
  if (req.method === "POST") {
  }

  return res.status(405).send({ message: "method not supported" });
}
