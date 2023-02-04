import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  public async signUp(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

      // create user

      // TODO: We need to encrypt the password before putting it into the database.
      await this.usersDB.create({ data });
      console.log("no issues created user in db");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          throw new Error("Unique Constraint Violation Failed.");
        }

        throw new Error(error.message);
      }
    }
  }

  public async logIn(usernameInput: string, passwordInput: string) {
    try {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          username: usernameInput,
        },
      });

      // check that password match
      const passwordUser = user["password"];
      if (passwordInput === passwordUser) {
        return;
      } else {
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      throw error;
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
}
