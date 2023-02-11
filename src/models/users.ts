import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";
import SHA3 from "crypto-js/sha3";

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  public async signUp(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

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
          console.log(parseErrorMessage);
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

  private setDefaultAttributes(data: any) {
    data["verified"] = false;
  }

  private validateInputData(data: any) {
    if (false) {
      throw new Error("this is an error");
    }
  }

  private hashPassword(password: string) {
    return SHA3(password).toString();
  }

  private setPassword(password: string, data: any) {
    data["password"] = password;
  }
}
