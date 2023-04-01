import { PrismaClient } from "@prisma/client";

export type ViewResponse = {
  "my reservation requests"?: number[];
  "my accepted reservations"?: number[];
  "my approved reservations"?: number[];
};

export type ReservationResponse = {
  reservation_id: number,
  listing_id: number,
  accepted: Boolean,
  accepted_on?: Date,
  requested_on?: Date,
  dates_requested?: Date[]
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

  async updateReservation(data: any) {
    try {
      this.validateInputData(data);

      await this.reservationsDB.update({
        where: {
          reservation_id: data["reservation_id"],
        },
        data: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteReservation(data: any) {
    try {
      await this.reservationsDB.delete({
        where: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async getReservation(id: number) {
    try {
      const res = await this.reservationsDB.findUnique({
        where: {
          reservation_id: id,
        }
      });

      // If response doesn't exists
      if (!res) {
        throw new Error("Reservation doesn't exists")
      }

      let response: ReservationResponse = {
        reservation_id: res["reservation_id"],
        listing_id: res["listing_id"],
        accepted: res["accepted"]
      }

      return response;
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

  private setDefaultAttributes(data: any) {
    data["accepted"] = false;
    data["requested_on"] = new Date();
    data["host_id"] = 1;
    data.dates_requested = data.dates_requested.map(
      (date: string | number | Date) => new Date(date)
    );
  }

  private async validateInputData(data: any) {
  //   const response = await this.reservationsDB.getReservation(data) {
  //     (
  //     data.listing_id
  //   );
  //   const dates_available = response?.dates_available;
  //   if (
  //     dates_available === undefined ||
  //     !data.dates_requested.every((date: Date) => {
  //       dates_available.includes(new Date(date));
  //     })
  //   ) {
  //     throw new Error("Listing is not available during requested dates");
  //   }
  // }
    return true;
  }
}
