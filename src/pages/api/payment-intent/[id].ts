import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  return res.status(405).send({ message: "request method not supported" });
}
