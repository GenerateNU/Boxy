import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/db";
import Users from "src/models/users";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  // POST - register new user
  if (req.method === "POST") {
    const { body } = req;

    // checking for required fields
    const users_db = new Users(prisma.users);
    try {
      await users_db.signUp(body);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(405).send({ message: e.message });
      }
    }
    return res.status(200).send({ message: "user added" });
  }
  return res.status(405).send({ message: "Only POST request allowed" });
}
