import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "@prisma/client";
import { ListingResponse } from "@/models/listings";
import persistentListingInstance from "lib/listingInstance";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: filteredListings,
    POST: createListing,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function filteredListings(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentListingInstance.fetch(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "user added" });
}

async function createListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentListingInstance.create(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "user added" });
}
