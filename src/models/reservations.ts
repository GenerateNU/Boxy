import { PrismaClient, reservations } from "@prisma/client";

export default class Reservations {
  constructor(private readonly reservationsDB: PrismaClient["reservations"]) {}

  async create(data: any) {
    try {
      // setting required attributes
      this.setDefaultAttributes(data);

      // input validation
      this.validateInputData(data);

      // add entry to database
      await this.reservationsDB.create({ data });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data['accepted'] = false;
    data['requested_on'] = new Date();
    data['host_id'] = 1;
  }

  private validateInputData(data: any) {
    // fetch by ID here

    const dates_available = fetch(data.listing_id);
    if (!data.dates_requested.every(date => dates_available.includes(date))) {
      throw new Error("Listing is not available during requested dates");
    }
  }
}
