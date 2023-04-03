import type { NextApiRequest, NextApiResponse } from "next";
import listingDataTable from "lib/listingInstance";

type Message = {
  message: string;
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getAccountDetails,
    PUT: updateAccount,
    DELETE: deleteAccount,
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

async function getAccountDetails(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await stripe.accounts.retrieve(req.body.id);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "returned listing information" });
}

async function updateAccount(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await stripe.accounts.update(req.body.id, req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "updated listing" });
}

async function deleteAccount(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await stripe.accounts.del(req.body.id);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "deleted listing" });
}

