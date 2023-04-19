import type { NextApiRequest, NextApiResponse } from "next";
import { reservations } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import persistentReservationInstance from "lib/reservationInstance";
import Utils from "@/utils";
import persistentUserInstance from "lib/userInstance";

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
    DELETE: cancelReservation,
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
  res: NextApiResponse<Message>,
  session: Session
) {
  if (!session) {
    return res.status(401).send({ message: "user is not authenticated." });
  }

  const user = await persistentUserInstance.getUser(session.user?.email)

  if(!user.verified){
    return res.status(401).send({ message: "user is not verified." });
  }

  try {
    await persistentReservationInstance.create(req.body);
  } catch (error) {
    return res.status(403).send({ message: String(error) });
  }

  return res.status(200).send({ message: "created reservation" });
}

async function cancelReservation(
  req: NextApiRequest,
  res: NextApiResponse<Message>,
  session: Session
) {
  if (!session) {
    return res.status(401).send({ message: "user is not authenticated." });
  }

  try {
    const now = new Date();
    const email = session.user?.email
    const userID = await Utils.getUserId(email); 
    const reservation = await persistentReservationInstance.getReservation(req.body.id)
    if(!reservation) {
      return res.status(401).send({message : "reservation does not exist"})
    }
    for(var date of reservation.dates_requested) {
      if(date.getTime() > now.getTime()) {
        return res.send({message: "cannot cancel after dates requested"})
      }
    }
    if(userID != reservation.host_id && userID != reservation.stasher_id) {
      return res.status(401).send({ message: "only host or stasher can cancel this reservation"})
    }
    
    await persistentReservationInstance.cancelReservation(req.body.id)

  } catch(e) {
    throw(e);
  }

}
