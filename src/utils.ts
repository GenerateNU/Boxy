import prisma from "lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    return { exists: true, verified: true };
  }

  // Returns user_id given decoded payload from token
  public static async getUserId(payload: any) {
    // Find user info based on username
    const userInfo = await prisma.users.findUnique({
      where: {
          username: payload["sub"],
      },
  });

    // If user doesn't exists
    if (!userInfo) {
      throw new Error("User does not exists");
    }

    return userInfo["user_id"];
  }

}
