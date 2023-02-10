import { PrismaClient, Prisma } from '@prisma/client'
import isEmail from 'isemail'

export default class Users {
  constructor(private readonly usersDB: PrismaClient["users"]) {}

  async signUp(data: any) {
    try {

      // input validation (can add more validation methods and call them here)
      this.validateInputData(data);

      // setting required attributes
      this.setDefaultAttributes(data);

      this.usersDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data["verified"] = false;
  }

  private validateInputData(data: any) {
    if(!data.hasOwnProperty('name') || 
    !data.hasOwnProperty('phone_number') || 
    !data.hasOwnProperty('email') || 
    !data.hasOwnProperty('drivers_license_photo') || 
    !data.hasOwnProperty('username') ||
    !data.hasOwnProperty('password')) {
      throw new Error("all required fields must be inputted")
    }
    if (!isEmail.validate(data["email"])) {
      throw new Error("email must be in the proper format")
    }
    if(2000000000 > data["phone_number"] || 9999999999 < data["phone_number"]) {
      throw new Error("phone number must be in the proper format")
    }
  }
}
