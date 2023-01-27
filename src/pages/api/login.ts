import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import { PrismaClient, Prisma } from '@prisma/client'
import { assert, object, string, size, refine, number, boolean } from 'superstruct'
import isEmail from 'isemail'
import { userAgent } from 'next/server';
import { userInfo } from 'os';

type Message = {
    message: string,
    token?: string
}

const prisma = new PrismaClient()

// Runtime validation
const Signup = object({
    name: string(),
    // a 10 digit number
    phoneNumber: size(number(), 2000000000, 9999999999),
    // string and a valid email address
    email: refine(string(), 'email', (v) => isEmail.validate(v)),
    driversLicensePhoto: string(),
    username: string(),
    password: string(),
    verified: boolean()
})

// POST - login
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message>
) {
    if (req.method === 'POST') {
        const { body } = req;

        // checking for required fields
        if ("name" in body && "phoneNumber" in body && "email" in body && "driversLicensePhoto" in body && "username" in body && "password" in body) {
            try {
                assert(body, Signup)
                prisma.users.create({
                    data: {
                        name: body.name,
                        phone_number: body.phoneNumber,
                        email: body.email,
                        drivers_license_photo: body.driversLicensePhoto,
                        username: body.username,
                        password: body.password,
                        verified: body.verified
                    }
                })
                return res.status(200).send({message: 'user added'});
            }

            catch (Error) {
                return res.status(403).json({ message: "phone and/or email are improperly formatted" });
            }
        }

        return res.status(403).json({ message: "username and password required" });
    }

    return res.status(405).send({ message: 'Only POST request allowed' })
}
