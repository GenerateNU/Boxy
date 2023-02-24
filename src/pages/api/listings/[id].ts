import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import ListingsDataTable from "@/models/listings";
import { listings } from "@prisma/client";
import listingDataTable from "lib/listingInstance";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getListingDetails,
    PUT: updateListing,
    DELETE: deleteListing,
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

async function getListingDetails(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await listingDataTable.getListing(req.body.id);
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
    await listingDataTable.updateListing(req.body);
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
    await listingDataTable.deleteListing(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "deleted listing" });
}
