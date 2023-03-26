import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "lib/db";
import { authOptions } from "./pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { users } from "@prisma/client";

export default class Utils {
  public static decodeToken(token: string) {
    return jwt.verify(token, "secret_key_change_later", (err, decoded) => {
      return decoded;
    });
  }

  public static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, "secret_key_change_later") as JwtPayload;
  }

  public static encodeValue(value: JwtPayload) {
    return jwt.sign(value, "secret_key_change_later");
  }

  public static async checkForUser(email: any) {
    let exists = false;
    let verified = false;

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (user) {
      exists = true;
    }

    const response: users[] = await prisma.users.findMany({
      where: {
        email: email,
        verified: true,
      },
    });

    if (response.length > 0) {
      verified = true;
    }

    return { exists: exists, verified: verified };
  }
}
