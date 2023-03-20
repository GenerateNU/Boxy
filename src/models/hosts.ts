import { listings, PrismaClient } from "@prisma/client";

export type ViewResponse = {
    "my listings"?: number[];
    "my reservation requests"?: number[];
    "my accepted reservations"?: number[];
  };


export default class Hosts {
    constructor(private readonly listingsDB: PrismaClient["listings"], 
                private readonly usersDB: PrismaClient["users"]) {}

    async getHostListings(data:any) {
        try {

            // Find user info based on username
            const userInfo = await this.usersDB.findUnique({
                where: {
                    username: data["username"],
                },
            });

            if (!userInfo) {
                throw new Error("User does not exists");
            }

            const listingsResponse = await this.listingsDB.findMany({
                where: {
                    host_id: userInfo["user_id"],
                }
            });

            const listing_ids = new Array();
            listingsResponse.forEach(function (value) {
                listing_ids.push(value["listing_id"]);
            });

            let response : ViewResponse = {"my listings": listing_ids};

            return response;
        } catch (e) {
            throw e;
        }
    }            
}
