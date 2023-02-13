import { PrismaClient, listings } from "@prisma/client";
import { assert } from "console";
import prisma from "lib/db";

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
    if (data.price % 1 !== 0 || data.price <= 0) {
      throw new Error("price must be a positive integer");
    }

    if (!/^\d{5}$/.test(data.zip_code)) {
      throw new Error("zip_code must be a string of exactly 5 digits");
    }

    if (!/^[A-Z]{2}$/.test(data.state)) {
      throw new Error("state must be a string of exactly 2 uppercase letters");
    }

    if (!/^\d+\s[A-Za-z]+\s[A-Za-z]+(\.|)$/.test(data.address)) {
      throw new Error(
        "address must match the pattern 'number street_name street_type'"
      );
    }

    if (
      !data.space_available.every((value: any) => {
        return Number.isInteger(value) && value > 0;
      })
    ) {
      throw new Error("space_available must be an array of positive integers");
    }
    this.checkHostId(data.host_id);
  }

  // can add more input validation methods and call them in the method
  async checkHostId(host_id: number) {
    try {
      const findUser = await prisma.users.findUnique({
        where: {
          user_id: host_id,
        },
      });

      if (!findUser) {
        throw new Error("Host ID not found in users table");
      }
    } catch (e) {
      throw e;
    }
  }
}
