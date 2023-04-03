import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

type Message = {
  message: string;
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);
  
  const supportedRequestMethods: { [key: string]: Function } = {
    POST: createProduct,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const product = await stripe.products.create(req.body);
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
}