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

  private setDefaultAttributes(data: any) {}

  private validateInputData(data: any) {
    if (false) {
      throw new Error("this is an error");
    }
  }

  // can add more input validation methods and call them in the method
}
