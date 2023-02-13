import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export type ListingResponse = {
  listing_id: number,
  price: Decimal,
  name: string,
  proximity?: number,
  longitude?: Decimal,
  latitude?: Decimal
}

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

  async fetchByID(id: number) {
    try {
      const response = await this.listingsDB.findUnique({
        where: {
          listing_id: id,
        }
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  // fetches the listings that meet the conditions in data body
  async fetch(data: any) {

    const distanceFilter = (listing: any) => {
      const lon1: number = (data.longitude * Math.PI) / 180;
      const lon2: number = (listing.longitude * Math.PI) / 180;
      const lat1: number = (data.latitude as any * Math.PI) / 180;
      const lat2: number = (listing.latitude as any * Math.PI) / 180;

      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));
      let r = 3956;

      return c * r;
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
      if (data.dates_available) {
        requestBody.push({
          dates_available: {
            hasEvery: new Date(data.dates_available),
          }
        });
      }
      var listingResults: ListingResponse[] = await this.listingsDB.findMany({
        where: {
          AND: requestBody,
        },
        select: {
          listing_id: true,
          price: true,
          name: true,
          longitude: true,
          latitude: true
        }
      });


      let response : ListingResponse[] = listingResults.map(listing => {
        const dist: number | undefined = distanceFilter(listing);
        delete listing.longitude;
        delete listing.latitude;
        return Object.assign({}, listing, {proximity: dist});
      }); 
      if (data.proximity) {
        response = response.filter((response) => {
          if (response.proximity !== undefined) {
            return response.proximity <= data.proximity;
          }
        });
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
