import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import persistentUserInstance from "lib/userInstance";

type Message = {
  message: string;
  token?: string;
};

// POST - login
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  if (req.method === "POST") {
    const { body } = req;
    const token = jwt.sign(body["username"], "secret_key_change_later");

    try {
      await persistentUserInstance.logIn(body["username"], body["password"]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(403).send({ message: error.message });
      }
    }

    return res.status(200).send({ message: "logged in", token: token });
  }

  return res.status(405).send({ message: "Only POST request allowed" });
}
