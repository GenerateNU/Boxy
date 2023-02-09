import { PrismaClient, listings } from "@prisma/client";
import { assert } from "console";
import prisma from "lib/db";
import { object, number, refine, string, array } from "superstruct";

export default class Listings {
  constructor(private readonly listingsDB: PrismaClient["listings"]) {}

  // Creates a new entry
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

  //Update listing
  async update(data: any) {
    try {

      // input validation
      this.validateInputData(data);

      // update entry in database
      await this.listingsDB.update({
        where: {
          listing_id: data["listing_id"],
        },
        data: data,
      });
    } catch (e) {
      throw e;
    }
  }

  // Delete listing
  async delete(data: any) {
    try {
      // delete entry in database
      await this.listingsDB.delete({
        where: data,
      });
    } catch (e) {
      throw e;
    }
  }

  // fetches the listings that meet the conditions in data body
  async fetch(data: any) {
    try {
      const requestBody = [];
      if (data.price) {
        requestBody.push({
          price: {
            lte: data.price,
          },
        });
      }
      if (data.amenities) {
        requestBody.push({
          amenities: {
            hasEvery: data.amenities,
          },
        });
      }

      var listingResults = await this.listingsDB.findMany({
        where: {
          AND: requestBody,
        },
        select: {
          listing_id: true,
          price: true,
          name: true,
        },
      });

      const response: listings[] = listingResults.map((object: any) => {
        return Object.assign({}, object, { proximity: 10 });
      });

      return response;
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
        ),
        zip_code: refine( 
          string(),
          "zip_code",
          (value) => /^\d{5}$/.test(value)
        ),
        state: refine(
          string(),
          "state",
          (value) => /^[A-Z]{2}$/.test(value)
        ),
        address: refine(
          string(),
          "address",
          (value) => /^\d+\s[A-Za-z]+\s[A-Za-z]+(\.|)$/.test(value)
        ),
        space_available: refine(
          array(number()),
          "space_available",
          (values: number[]) => values.every(value => Number.isInteger(value) && value > 0)
        ),        
      })
    );
  }

  // can add more input validation methods and call them in the method
  async checkHostId(host_id: number) {
    try {
      const findUser = await prisma.users.findUnique({
        where: {
          user_id: number
        }
    })
    } 
  }
}
