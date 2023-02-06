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

    function distanceFilter(listing: any) {
      const lon1 = (data.longitude * Math.PI) / 180;
      const lon2 = (listing.longitude * Math.PI) / 180;
      const lat1: number = (data.latitude as any * Math.PI) / 180;
      const lat2: number = (listing.latitude as any * Math.PI) / 180;

      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));
      let r = 3956;

      console.log(c*r)
      return c * r < data.proximity;
    }
    
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

      var listingResults: listings[] = await this.listingsDB.findMany({
        where: {
          AND: requestBody,
        },
      });

      let response = listingResults; 
      if (data.proximity) {
          response = listingResults.filter(distanceFilter)
      }

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
