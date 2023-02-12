import Listings from "@/models/listings";
import prisma from "lib/db";

const persistentListingInstance = new Listings(prisma.listings);

export default persistentListingInstance;