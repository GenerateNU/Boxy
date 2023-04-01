import { PrismaClient } from "@prisma/client";
import persistentListingInstance from "lib/listingInstance";

export type ViewResponse = {
  "my reservation requests"?: number[];
  "my accepted reservations"?: number[];
  "my approved reservations"?: number[];
};

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

  async getHostReservations(userID: any) {
    try {
      const reservationResponse = await this.reservationsDB.findMany({
        where: {
          host_id: userID,
        },
      });

      const reservation_ids = new Array();
      reservationResponse.forEach(function (value) {
        reservation_ids.push(value["reservation_id"]);
      });

      let response: ViewResponse = { "my reservation requests": reservation_ids };

      return response;
    } catch (e) {
      throw e;
    }
  }

  async getStasherReservations(userID: any) {
    try {
      const reservationResponse = await this.reservationsDB.findMany({
        where: {
          stasher_id: userID,
        },
      });

      const reservation_ids = new Array();
      reservationResponse.forEach(function (value) {
        reservation_ids.push(value["reservation_id"]);
      });

      let response: ViewResponse = {"my reservation requests": reservation_ids};

      return response;
    } catch (e) {
      throw e;
    }
  }

  async getReservation(id: number) {
    try {
      const response = await this.reservationsDB.findUnique({
        where: {
          reservation_id: id,
        },
      });
      return response;
    } catch(e) {
      throw e;
    }
  }

  async cancelReservation(id: number, now: Date) {
    try {
      await this.reservationsDB.update({
        where: {
          reservation_id: id,
        },
        data: {
          cancelled: true,
          cancelled_on: now
        }
      });
    } catch(e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data["accepted"] = false;
    data["requested_on"] = new Date();
    data["host_id"] = 1;
    data["cancelled"] = false;
    data.dates_requested = data.dates_requested.map(
      (date: string | number | Date) => new Date(date)
    );
  }

  private async validateInputData(data: any) {
    const response = await persistentListingInstance.getListing(
      data.listing_id
    );
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
