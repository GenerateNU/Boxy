import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Utils from "@/utils";
import prisma from "lib/db";
import { ViewResponse } from "@/models/listings";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getHostListings,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res, session);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getHostListings(
  req: NextApiRequest,
  res: NextApiResponse<ViewResponse | Message>,
  session: Session
) {
  if (!session) {
    return res.status(401).send({ message: "user is not authenticated." });
  }

  try {
    // Decode token from request header
    const payload = Utils.decodeToken(req.body["token"]);
    const userID = Utils.getUserId(payload);
    const hostInstance = new Hosts(prisma.listings, prisma.users, prisma.reservations);
    const response = await hostInstance.getHostListings(payload);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}
