import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

type Message = {
  message: string;
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    POST: createConnectAccount,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function createConnectAccount(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const product = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    return res.status(200).send(product);
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
}

/**
 * In order to pay out to users, need to use Stripe Connect to create accounts, link them, then make transfers between them
 * 
 * STEPS (tentative)
 * when user creates boxy account, prompt them to create an optional stripe account
 * - if they accept, go through steps of creation and linking to boxy account, also add the account id to user in database
 * - otherwise, notify them that they will be unable to create listings, and skip
 * when user creates listing, create a stripe product, and add id to listing in database
 * 
 * for checkout, there are some options
 * 
 * OPTION 1:
 * - when user purchases a listing, go through checkout, then keep the payment in the boxy account until the move in date for easier refunds
 * - create a charge for the transaction, store it in the reservation database
 * - when move-in day arrives, add the charged amount to the host's account metadata (or somewhere else???), here we can deduct fees and whatnot
 * - every week, clear the total balance and make a transfer to the host's connected account
 * 
 * OPTION 2:
 * - stripe checkout has an option to specify a destination account
 * - we can use this to support direct payments from stasher to host (and we can also apply a fee that will go to boxy stripe acc)
 * - this method will probably be cleaner codewise and processwise, however, since the payments are direct, we cannot hold until day of the move-in
 * - we still will want to store charges here for refunds and stuff, and also to show user history
 */