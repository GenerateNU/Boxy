import ListingsDataTable from "@/models/listings";
import prisma from "lib/db";

const persistentListingInstance = new ListingsDataTable(prisma.listings);

export default persistentListingInstance;
