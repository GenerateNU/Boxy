import type { NextApiRequest, NextApiResponse } from "next";
import persistentUserInstance from "lib/userInstance";

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

    try {
      await persistentUserInstance.signUp(body);
      console.log("successful user singup");
    } catch (error) {
      console.log("there is some error");
      if (error instanceof Error) {
        return res.status(403).send({ message: error.message });
      }
    }
    return res.status(200).send({ message: "user added" });
  }
  return res.status(405).send({ message: "Only POST request allowed" });
}
