import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "@prisma/client";
import { ListingResponse } from "@/models/listings";
import listingDataTable from "lib/listingInstance";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getListingsGivenFilters,
    POST: createListing,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getListingsGivenFilters(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse[] | Message>
) {
  try {
    const response = await listingDataTable.getListings(req.query);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}

async function createListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await listingDataTable.createListing(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "created listing" });
}
