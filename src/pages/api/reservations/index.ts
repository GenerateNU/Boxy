import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import { reservations } from "@prisma/client";
import persistentReservationInstance from "lib/reservationInstance";

type Message = {
  message: string;
};

// Change to async
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reservations[] | Message>
) {
  const supportedRequestMethods: { [key: string]: Function } = {
    GET: getReservationsGivenFilters,
    POST: createReservation,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getReservationsGivenFilters(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  throw new Error("not implemented");
}

async function createReservation(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentReservationInstance.create(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "created reservation" });
}
