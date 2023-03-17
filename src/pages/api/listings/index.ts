import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "@prisma/client";
import { ListingResponse } from "@/models/listings";
import listingDataTable from "lib/listingInstance";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getSession } from "next-auth/react";
import prisma from "lib/db";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);

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
  try {
    //const session = await getServerSession(req, res, authOptions);
    await authorize(req, session);
    await listingDataTable.createListing(req.body);
  } catch (error) {
    console.error(error);
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "created listing" });
}

async function authorize(req: NextApiRequest, session: any) {
  const session1 = await getSession({ req });

  if (!session) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userEmail = session.user.email ?? null;
  console.log(userEmail);
  if (!userEmail) {
    throw new Error("User email not found.");
  }

  const user = await prisma.users.findUnique({ where: { email: userEmail } });
  console.log(user);
  if (!user || !user.verified) {
    throw new Error("You must be a verified user to perform this action.");
  }

  return true;
}
