import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "console";
import {
  object,
  string,
  number,
  array,
  date,
  boolean,
  refine,
  integer,
} from "superstruct";

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
    data["host_id"] = 4;
  }

  private validateInputData(data: any) {
    assert(
      data,
      object({
        price: refine(
          number(),
          "price",
          (value) => value % 1 !== 0 && value > 0
        )
      })
    );
  }
}
