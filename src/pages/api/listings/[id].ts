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
  res: NextApiResponse<Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: listingDetail,
    PUT: updateListing,
    DELETE: deleteListing
  };

  if (!("id" in req.query)) {
    return res
      .status(400)
      .json({ message: "missing id query in parameter string" });
  }

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function listingDetail(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentListingInstance.fetchByID(req.body.id);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "returned listing information" });
}

async function updateListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentListingInstance.update(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "updated listing" });
}

async function deleteListing(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentListingInstance.delete(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "deleted listing" });
}
