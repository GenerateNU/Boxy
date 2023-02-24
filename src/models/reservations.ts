import { PrismaClient } from "@prisma/client";
import persistentListingInstance from "lib/listingInstance";

export default class Reservations {
  constructor(private readonly reservationsDB: PrismaClient["reservations"]) {}

  async create(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation
      await this.validateInputData(data);

      // add entry to database
      await this.reservationsDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data["accepted"] = false;
    data["requested_on"] = new Date();
    data["host_id"] = 1;
    data.dates_requested = data.dates_requested.map(
      (date: string | number | Date) => new Date(date)
    );
  }

  private async validateInputData(data: any) {
    const response = await persistentListingInstance.fetchByID(data.listing_id);
    const dates_available = response?.dates_available;
    if (
      dates_available === undefined ||
      !data.dates_requested.every((date: Date) => {
        dates_available.includes(new Date(date));
      })
    ) {
      throw new Error("Listing is not available during requested dates");
    }
  }
}
