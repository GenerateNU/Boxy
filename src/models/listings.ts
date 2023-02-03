import { PrismaClient, listings } from "@prisma/client";

export default class Listings {
  constructor(private readonly listingsDB: PrismaClient["listings"]) {}

  async create(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation
      this.validateInputData(data);

      // add entry to database
      await this.listingsDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data["editable"] = false;
    data["created_on"] = new Date();
  }

  private validateInputData(data: any) {
    if (false) {
      throw new Error("this is an error");
    }
  }

  // can add more input validation methods and call them in the method
}
