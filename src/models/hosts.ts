import { PrismaClient } from "@prisma/client";

export default class Hosts {
    constructor(private readonly listingsDB: PrismaClient["listings"], 
                private readonly usersDB: PrismaClient["users"]) {}

    async getHostListings(data: any) {
        try {

            // Find user info based on username
            const userInfo = await this.usersDB.findUnique({
                where: {
                    username: data["username"],
                },
            });

            if (!userInfo) {
                throw new Error("User does not exists")
            }

            const listingResponse = await this.listingsDB.findMany({
                where: {
                    host_id: userInfo["user_id"],
                }
            })

            return listingResponse;
        } catch (e) {
            throw e;
        }
    }            
}
