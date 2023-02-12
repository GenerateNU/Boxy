import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  if ("id"! in req.query) {
    return res
      .status(400)
      .json({ message: "missing id query in parameter string" });
  }

  // GET - get listing details given ID
  if (req.method === "GET") {
    return res.status(200).json({ message: "John Doe" });
  }

  // POST - edit listing given ID
  if (req.method === "POST") {
  }

  // DELETE - delete listing given ID
  if (req.method === "DELETE") {
  }

  return res.status(405).send({ message: "method not supported" });
}
