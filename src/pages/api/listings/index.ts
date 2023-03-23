import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "@prisma/client";
import { ListingResponse } from "@/models/listings";
import listingDataTable from "lib/listingInstance";
import { getServerSession, Session } from "next-auth";
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
    return supportedRequestMethods[req.method](req, res, session);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getListingsGivenFilters(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse[] | Message>,
  session: Session
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
  res: NextApiResponse<Message>,
  session: Session
) {
  if (!session) {
    return res.status(401).send({ message: "user is not authenticated" });
  }

  try {
    await listingDataTable.createListing(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "created listing" });
}
