import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/db';

type Message = {
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
    // POST - register new user
    if (req.method === 'POST') {
        const { body } = req;

        // checking for required fields
        if ("name" in body && "phoneNumber" in body && "email" in body && "driversLicensePhoto" in body && "username" in body && "password" in body) {
            await prisma.users.create({
                data : {
                    name: body["name"],
                    phone_number: body["phoneNumber"],
                    email: body["email"],
                    drivers_license_photo : body["driversLicensePhoto"],
                    verified: false,
                    username: body["username"],
                    password: body["password"]
                },
            })

            return res.status(200).send({message: 'user added'});
        }

        return res.status(403).json({message: "name, phone number, email, username, and password required"});
    } 

    return res.status(405).send({message: 'Only POST request allowed'})
}
