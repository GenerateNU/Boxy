import { PrismaClient, Prisma } from '@prisma/client'
import isEmail from 'isemail'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";
import SHA3 from "crypto-js/sha3";
import jwt from "jsonwebtoken";


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
      this.usersDB.create({ data });
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
        throw Error()
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

    this.validateTokenHeader(headers)

    const tokenPayload: any = jwt.decode(headers["login_token"])

    try {
      await prisma.users.delete({
        where: {
          username: tokenPayload
        }
      })
    }
    catch (error) {
      throw new Error("Failed to delete user!")
    }
  }

  private setDefaultAttributes(data: any) {
    data["verified"] = false;
  }

  private validateInputData(data: any) {
    if (!isEmail.validate(data["email"])) {
      throw new Error("email must be in the proper format")
    }
    if(2000000000 > data["phone_number"] || 9999999999 < data["phone_number"]) {
      throw new Error("phone number must be in the proper format")
    }
  }

  private validateTokenHeader(data: any) {
    let token = data["login_token"]
    if (token == null) {
      throw new Error("no token provided!")
    }
    const tokenPayload = jwt.decode(token) 
    if (tokenPayload == null) {
      throw new Error("invalid token!")
    }
  }

  private hashPassword(password: string) {
    return SHA3(password).toString();
  }

  private setPassword(password: string, data: any) {
    data["password"] = password;
  }
}
