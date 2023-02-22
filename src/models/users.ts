import { PrismaClient, Prisma } from "@prisma/client";
import isEmail from "isemail";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";
import SHA3 from "crypto-js/sha3";
import jwt_decode from "jwt-decode";
import Utils from "@/utils";

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  public async signUp(data: any) {
    try {
      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

      // setting required attributes
      this.setDefaultAttributes(data);

      // encrypt user password
      const hashedPassword: string = this.hashPassword(data["password"]);
      this.setPassword(hashedPassword, data);

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
        const hashedPassword: string = this.hashPassword(body["password"]);
        this.setPassword(hashedPassword, body);
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

  private setDefaultAttributes(data: any) {
    data["verified"] = false;
  }

  private validateInputData(data: any) {
    console.log(data);
    if (!isEmail.validate(data["email"])) {
      throw new Error("email must be in the proper format");
    }
    if (
      2000000000 > data["phone_number"] ||
      9999999999 < data["phone_number"]
    ) {
      throw new Error("phone number must be in the proper format");
    }
  }

  private hashPassword(password: string) {
    return SHA3(password).toString();
  }

  private setPassword(password: string, data: any) {
    data["password"] = password;
  }
}
