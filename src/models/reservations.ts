import { PrismaClient, listings, reservations } from "@prisma/client";
import listingDataTable from "lib/listingInstance";



export type ViewResponse = {
  "my reservation requests"?: number[];
  "my accepted reservations"?: number[];
  "my approved reservations"?: number[];
};

export type ReservationResponse = {
  reservation_id: number;
  listing_id: number;
  accepted: Boolean;
  accepted_on?: Date;
  requested_on?: Date;
  dates_requested?: Date[];
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

  async deleteReservation(id: number) {
    try {
      await this.reservationsDB.delete({
        where: {
          reservation_id: id,
        },
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
        },
      });

      // If response doesn't exists
      if (!res) {
        throw new Error("Reservation doesn't exists");
      }

      let response: ReservationResponse = {
        reservation_id: res["reservation_id"],
        listing_id: res["listing_id"],
        accepted: res["accepted"],
      };

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
          cancelled: false,
        },
      });

      const reservation_ids = new Array();
      reservationResponse.forEach(function (value) {
        reservation_ids.push(value["reservation_id"]);
      });

      let response: ViewResponse = {
        "my reservation requests": reservation_ids,
      };

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

      let response: ViewResponse = {
        "my reservation requests": reservation_ids,
      };

      return response;
    } catch (e) {
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
          cancelled_on: now,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  private setDefaultAttributes(data: any) {
    data["accepted"] = false;
    data["requested_on"] = new Date();
    data["host_id"] = data.host_id
    data["cancelled"] = false;
    // data.dates_requested = data.dates_requested.map(
    //   (date: string | number | Date) => new Date(date)
    // );
  }

  private async validateInputData(data: any) {
      const dates_available = data.dates_available
      const start_date_requested = data.dates_requested[0]
      const end_date_requested = data.dates_requested[1]

      if (
        dates_available === undefined ||
        await this.datesAreAvailable(start_date_requested, end_date_requested, data)
        
      ) {
        throw new Error("Listing is not available during requested dates");
      }
  }

  private async datesAreAvailable(start:Date, end:Date, data:any): Promise<boolean>{
    // get all the listing reservations
    // from reservation list get reserved dates
    // check if dates requested are in reserved dates list
    const start_date_requested = data.dates_requested[0]
    const end_date_requested = data.dates_requested[1]


    const reservations = await this.reservationsDB.findMany({
      where:
      {
        listing_id: data.listing_id
      }
    })

    if (reservations.length == 0) {
      return true
    }
    

    for(let i =0; i <= reservations.length; i++) {
      let start_date_reserved = reservations[i].dates_requested[0]
      let end_date_reserved = reservations[i].dates_requested[1]
      const isStartDateInReservedBlock = (start_date_requested > start_date_reserved && start_date_requested < end_date_reserved)
      const isEndDateInReservedBlock = (end_date_requested > start_date_reserved && end_date_requested < end_date_reserved)

      if( isStartDateInReservedBlock || isEndDateInReservedBlock) {
        return false
      }
    }
    return true
  }
}
