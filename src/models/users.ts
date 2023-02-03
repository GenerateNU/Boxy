import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { assert, object, string, size, refine, number, boolean } from 'superstruct'
import isEmail from 'isemail'
import { userAgent } from 'next/server';
import { userInfo } from 'os';

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
    assert(data, object({
      name: string(),
      phone_number: size(number(), 2000000000, 9999999999),
      email: refine(string(), 'email', (v) => isEmail.validate(v)),
      drivers_license_photo: string(),
      username: string(),
      password: string()
    }))
  }
}
