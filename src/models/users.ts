import { PrismaClient, Prisma } from "@prisma/client";
import isEmail from "isemail";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";
import SHA3 from "crypto-js/sha3";
import jwt, { JwtPayload } from "jsonwebtoken";
import Utils from "@/utils";

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  public async signUp(data: any) {
    try {
      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

      this.setDefaultAttributes(data);

      // create user
      await this.usersDB.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          // This might break if there are multiple unique fields, no way to test right now
          const parseErrorMessage = error.message.split("`");
          const failedOn = parseErrorMessage[parseErrorMessage.length - 2];
          throw new Error("Unique Constraint Violation Failed on " + failedOn);
        }
      } else {
        throw error;
      }
    }
  }

  public async updateUser(body: any, headers: any) {
    try {
      this.validateInputData(body);

      // encrypt changed user password
      if (body.password) {
        body["password"] = this.hashPassword(body["password"]);
      }

      //decode user id from the request headers
      const token = headers["login_token"];
      const decoded: any = Utils.decodeToken(token);

      // update user
      await this.usersDB.update({
        where: {
          username: decoded,
        },
        data: body,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          const parseErrorMessage = error.message.split("`");
          const failedOn = parseErrorMessage[parseErrorMessage.length - 2];
          throw new Error("Unique Constraint Violation Failed on " + failedOn);
        }
      } else {
        throw error;
      }
    }
  }

  public async login(usernameInput: string, passwordInput: string) {
    if (passwordInput === null || usernameInput === null) {
      throw Error();
    }

    const hashPasswordInput = this.hashPassword(passwordInput);

    try {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          username: usernameInput,
        },
      });

      // check that password match
      const passwordUser = user["password"];

      if (passwordInput === null) {
        throw Error();
      }

      const hashPasswordInput = this.hashPassword(passwordInput);

      if (hashPasswordInput !== passwordUser) {
        throw Error();
      }
    } catch (error) {
      throw new Error("Incorrect username or password");
    }
  }

  async delete(headers: any) {
    console.log(headers);
    try {
      this.validateTokenHeader(headers);

      const tokenPayload: any = jwt.decode(headers["login_token"]);
      console.log(tokenPayload);
      await prisma.users.delete({
        where: {
          username: tokenPayload.sub,
        },
      });

      // TODO: Delete corresponding reservations
      // query reservations database findMany where host is username
      // filter through that for pedning reservations
      // if one is active/pending fail
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete user!");
    }
  }

  private hashPassword(password: string) {
    return SHA3(password).toString();
  }

  private setDefaultAttributes(data: any) {
    data["verified"] = false;
    data["password"] = this.hashPassword(data["password"]);
  }

  private validateEmail(email: string) {
    if (!isEmail.validate(email)) {
      throw new Error("email must be in the proper format");
    }
  }

  private validatePhoneNumber(phone_number: Number) {
    if (2000000000 > phone_number || 9999999999 < phone_number) {
      throw new Error("phone number must be in the proper format");
    }
  }

  private validateInputData(data: any) {
    try {
      this.validateEmail(data["email"]);
      this.validatePhoneNumber(data["phone_number"]);
    } catch (e) {
      throw e;
    }
  }

  private validateTokenHeader(data: any) {
    let token = data["login_token"];
    if (token == null) {
      throw new Error("no token provided!");
    }

    const verifiedPayload = Utils.verifyToken(token);

    if (
      verifiedPayload.exp === undefined ||
      verifiedPayload.exp < Math.floor(Date.now() / 1000)
    ) {
      throw new Error("Token Expired or Invalid!");
    }
    if (!/^[A-Za-z0-9]*$/.test(data["username"])) {
      throw new Error("username must be only numbers and letters");
    }
  }
}
