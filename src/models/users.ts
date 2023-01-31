import { PrismaClient, users } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  async signUp(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

      await this.usersDB.create({ data });
    } catch (e) {
      throw e;
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
