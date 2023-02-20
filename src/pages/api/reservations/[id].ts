import type { NextApiRequest, NextApiResponse } from "next";
import prisma from 'lib/db';
import Reservations from "@/models/reservations";
import { reservations } from '@prisma/client';

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<reservations | null | Message>
) {
  if (!("id" in req.query)) {
    return res.status(400).json({message: "missing id query in parameter string"})
  }

  // GET - get listing details given ID
  if (req.method === 'GET') {
    throw new Error("not implementeed");
  }

  // POST - edit listing given ID
  if (req.method === "POST") {
    throw new Error("not implemented");
  }

  // DELETE - delete listing given ID
  if (req.method === "DELETE") {
  }

  return res.status(405).send({ message: "method not supported" });
}
