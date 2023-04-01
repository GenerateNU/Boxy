import type { NextApiRequest, NextApiResponse } from "next";
import persistentUserInstance from "lib/userInstance";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  const session = await getServerSession(req, res, authOptions);

  const supportedRequestMethods: { [key: string]: Function } = {
    POST: registerUser,
    DELETE: deleteUser,
    PUT: updateUser,
    GET: getUser,
  };

  if (req.method) {
    return supportedRequestMethods[req.method](req, res, session);
  }

  return res.status(405).send({ message: "request method not supported" });
}

async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<Message>,
  session: any
) {
  try {
    const response: any = await persistentUserInstance.getUser(session.user?.email);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Message>) {
  try {
    await persistentUserInstance.updateUser(req.body, req.headers);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }
  return res.status(200).send({ message: "user updated" });
}

async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
  try {
    await persistentUserInstance.signUp(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "user added" });
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse<Message>) {
  try {
    await persistentUserInstance.delete(req.headers);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "user deleted" });
}
