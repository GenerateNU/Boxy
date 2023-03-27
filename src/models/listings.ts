import { PrismaClient, listings } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export type ListingResponse = {
  listing_id: number;
  name: string;
  proximity?: number;
  longitude?: Decimal;
  latitude?: Decimal;
};

export type ViewResponse = {
  "my listings"?: number[];
};


export default class ListingsDataTable {
  constructor(private readonly listingsDB: PrismaClient["listings"]) {}

  async createListing(data: any) {
    try {
      this.setDefaultAttributes(data);
      this.validateInputData(data);

      await this.listingsDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  async updateListing(data: any) {
    try {
      this.validateInputData(data);

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

  async deleteListing(data: any) {
    try {
      await this.listingsDB.delete({
        where: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async getListing(id: number) {
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

  async getListings(data: any) {
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

  async getHostListings(userID: any) {
    try {
      const listingsResponse = await this.listingsDB.findMany({
        where: {
          host_id: userID,
        },
      });

      const listing_ids = new Array();
      listingsResponse.forEach(function (value) {
        listing_ids.push(value["listing_id"]);
      });

      let response: ViewResponse = { "my listings": listing_ids };

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

  private validatePrice(price: number) {
    if (price % 1 !== 0 || price <= 0) {
      throw new Error("price must be a positive integer");
    }
  }

  private validateZipCode(zipCode: string) {
    // TODO should this be type int?
    if (!/^\d{5}$/.test(zipCode)) {
      throw new Error("zip_code must be a string of exactly 5 digits");
    }
  }

  private validateState(state: string) {
    if (!/^[A-Z]{2}$/.test(state)) {
      // TODO import list of all state abbreviations
      throw new Error("state must be a string of exactly 2 uppercase letters");
    }
  }

  private validateAddress(address: string) {
    if (!/^\d+\s[A-Za-z]+\s[A-Za-z]+(\.|)$/.test(address)) {
      throw new Error(
        "address must match the pattern 'number street_name street_type'"
      );
    }
  }

  private validateSpaceAvailable(spaceAvailable: number[]) {
    // TODO figure out how to represent space available
    if (
      !spaceAvailable.every((value: any) => {
        return Number.isInteger(value) && value > 0;
      })
    ) {
      throw new Error("space_available must be an array of positive integers");
    }
  }

  private validateInputData(data: any) {
    try {
      // TODO do that thing - const {price, zip_code ...} = data?
      this.validatePrice(data.price);
      this.validateZipCode(data.zip_code);
      this.validateState(data.state);
      this.validateAddress(data.address);
      this.validateSpaceAvailable(data.space_available);
    } catch (e) {
      throw e;
    }
  }
}
