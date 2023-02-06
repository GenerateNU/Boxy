import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "lib/db";
import { PassThrough } from "stream";

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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          // This might break if there are multiple unique fields, no way to test right now
          const parseErrorMessage = error.message.split("`");
          const failedOn = parseErrorMessage[parseErrorMessage.length - 2];
          throw new Error("Unique Constraint Violation Failed on " + failedOn);
        }

        throw new Error(error.message);
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
      if (passwordInput !== passwordUser) {
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
}
