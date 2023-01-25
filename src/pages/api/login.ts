import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient()

type Message = {
    message: string,
    token?: string
}

async function getUser(username: string) {
    try {
        const user = await prisma.users.findUniqueOrThrow({
            where: {
                username: username,
            },
        })

        return user;
    // fix this in future with proper error handling
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
            if(error.message == "No users found") {
                console.log("Username not found or database empty.")
            }
        }
        return null
    }
}

// POST - login
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message>
) {
    if (req.method === 'POST') {
        const { body } = req;        

        // checking for required fields
        if ("username" in body && "password" in body) {
            const token  = jwt.sign(body['username'], 'secret_key_change_later');

            // get the user
            const user = await getUser(body['username'])
            
            // check the username was valid
            if (user == null) {
                return res.status(403).send({message:'username invalid', token: token})
            }

            //TODO: hash password before comparison to match database

            // obtain both passwords
            const userInputPassword = body['password']
            const actualUserPassword = user['password']

            // check that they match and handle
            if(userInputPassword == actualUserPassword) {
                return res.status(200).send({message: 'succesful log in', token: token}); 
            } else {
                return res.status(401).send({message: "incorrect username or password", token: token})
            }
                   
        }
        return res.status(401).json({message: "username AND password required"});
    }

    return res.status(405).send({message: 'Only POST request allowed'})
}
