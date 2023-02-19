import { PrismaClient, listings } from "@prisma/client";
import { assert } from "console";
import prisma from "lib/db";
import { Decimal } from "@prisma/client/runtime";

export type ListingResponse = {
  listing_id: number;
  price: Decimal;
  name: string;
  proximity?: number;
  longitude?: Decimal;
  latitude?: Decimal;
};

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

  async fetchByID(id: number) {
    try {
      const response = await this.listingsDB.findUnique({
        where: {
          listing_id: id,
        },
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
      const lat1: number = ((data.latitude as any) * Math.PI) / 180;
      const lat2: number = ((listing.latitude as any) * Math.PI) / 180;

      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));
      let r = 3956;

      return c * r;
    };

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
          },
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
          latitude: true,
        },
      });

      let response: ListingResponse[] = listingResults.map((listing) => {
        const dist: number | undefined = distanceFilter(listing);
        delete listing.longitude;
        delete listing.latitude;
        return Object.assign({}, listing, { proximity: dist });
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

  private setDefaultAttributes(data: any) {
    data["editable"] = false;
    data["created_on"] = new Date();
    data["host_id"] = 1;
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
  }
}
