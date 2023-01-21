import type { NextApiRequest, NextApiResponse } from 'next'
import myDatabase from 'lib/db';
import jwt from 'jsonwebtoken';

type Message = {
    message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
    // POST - register new user
    if (req.method === 'POST') {
        const { body } = req;

        // checking for required fields
        if ("name" in body && "phone number" in body && "email" in body && "drivers_license_photo" in body && "username" in body && "password" in body) {
            myDatabase.addUser(body["name"], body["phone number"], body["email"], body["drivers_license_photo"], body["username"], body["password"]);        
            return res.status(200).send({message: 'user added'});
        }

        return res.status(403).json({message: "name, phone number, email, username, and password required"});
    } 

    return res.status(405).send({message: 'Only POST request allowed'})
}
